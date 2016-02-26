/*
    parser/comment.js
    parse comment info using xml
*/
define(function () {
    function comment(xml) {
        var rst = new Array;

        var lists = xml.getElementsByClassName('reply_line');
        if (!lists.length) return rst;

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
            //rstItem['delete_btn'] = itemBody[3].children[0] ?
            //  itemBody[3].children[0].children[0].src : null;
            rstItem['delete_btn'] = itemBody[3].children[0] ?
              itemBody[3].children[0] : null;
            rstItem['delete_btn'] = itemBody[3].children[0] ?
              itemBody[3].children[0] : null;

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