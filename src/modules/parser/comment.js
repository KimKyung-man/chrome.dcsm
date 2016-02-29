/*
    parser/comment.js
    parse comment info using xml
*/
define(function () {
    function comment(xml) {
        var rst = new Array;
        console.log("in comment");
        var lists = xml.getElementsByClassName('reply_line');
        if (!lists.length) return rst;
        console.log(lists)
        for (var i = 0; i < lists.length; ++i) {
            var itemBody = lists[i].children;
            var rstItem = new Object;

            rstItem['user_id']
            = itemBody[0].getAttribute('user_id');
            rstItem['author'] = rstItem['user_name']
            = itemBody[0].getAttribute('user_name');
            rstItem['date']
            = itemBody[2].textContent.trim();
            rstItem['gallcon']
            = itemBody[0].children[1]
                ? itemBody[0].children[1].children[0].src : null;

            rstItem['delete_btn'] = (function () {
              /*
               * 비회원과 회원의 댓글 이미지를 달리 줘도 좋을듯
               * @see http://gall.dcinside.com/_js/common.js
               */

                var commentCommand = itemBody[3].children[0].href;
                var splitedCommand = commentCommand.split(':')[1];
                if(splitedCommand.indexOf("del") === 0){
                  /* 내 계정의 댓글 삭제 */
                    var args = /\(\s*([^)]+?)\s*\)/.exec(splitedCommand);
                    var splitedParams = args[1].replace(/'/g, "").split(/\s*,\s*/);

                    var deleteBtn = document.createElement('img');
                    deleteBtn.src = itemBody[3].children[0].children[0].src;
                    deleteBtn.dataset.no = splitedParams[0];
                    deleteBtn.dataset.p_no = splitedParams[1];
                    deleteBtn.dataset.id = splitedParams[2];
                    deleteBtn.dataset.i = splitedParams[3];
                    return deleteBtn;
                } else {
                    /* 비회원이거나, 다른 사람의 댓글 딜리트. */
                    return null;
                }
            })();

            rstItem['content'] = (function () {
                var dccon = itemBody[1].getElementsByClassName('written_dccon');
                if (dccon.length) {
                    var img = document.createElement('img');
                    img.src = dccon[0].src;
                    return img;
                } else return itemBody[1].childNodes[0].textContent.trim();
            })();

            rstItem['ip'] = rstItem['user_id']
                ? null : itemBody[1].children[0].textContent.trim();

            rst.push(rstItem);
        }

        return rst;
    }

    return comment;
});