/*
    control/comment.js
*/
define([
    './CommentItem',
    'parser/_all',
    'util/_all'
], function (CommentItem, parser, util) {

    var elem;
    var csrf_token;
    var gall_id;
    var gall_no;

    var comment = {
        name: 'comment',
        init: function () {
            elem = document.getElementById('dcsm-comment-list')
                .getElementsByTagName('tbody')[0];
            csrf_token = util.getCookie('ci_c');
        },
        items: new Array(),
        refresh: function (data) {
            // init
            comment.items = new Array();
            comment.clear();

            /*
             * 댓글삭제 후 리프레쉬 상태에서는
             * gall_id와 gall_no를 가져오지 못할 뿐더러,
             * 다시 초기화 할 이유가 없다.
             */
            if(!gall_id) gall_id = data.id || document.getElementById('id').value;
            if(!gall_no) gall_no = data.num;

            util.ajax({
                'type': 'POST',
                'url': '/comment/view/',
                'data': {
                    'ci_t': csrf_token,
                    'id': gall_id,
                    'no': gall_no
                }
            }, function (data) {
                var doc = document.implementation.createHTMLDocument('');
                doc.open();
                doc.write(data);
                var parsed = parser.comment(doc);
                for (var i in parsed) {
                    var item = new CommentItem(parsed[i]);
                    comment.items.push(item);
                    elem.appendChild(item.elem);
                    var img = item.elem_delete_btn.getElementsByTagName("img");
                    if(img[0]) {
                      img[0].addEventListener('click', function(){ comment.doDelete(this); }, false);
                    }
                }
                doc.close();
            });
        },
        doDelete : function(imgTag){
            if(!confirm('지울꼬야?')) return;
            util.ajax({
                'type': 'POST',
                'url': '/forms/comment_delete_submit',
                'data': {
                    ci_t: util.getCookie('ci_c'),
                    no : imgTag.dataset.p_no,
                    id : gall_id,
                    p_no: imgTag.dataset.p_no,
                    re_no : imgTag.dataset.no,
                    best : '',
                    best_origin : '',
                    check_7 : ''
                }
            }, function(){
              setTimeout(comment.refresh, 1000);
            });
        },
        clear: function () {
                while (elem.firstChild)
                    elem.removeChild(elem.firstChild);
            }
        };

    return comment;
});