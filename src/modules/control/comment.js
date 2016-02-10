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

    var comment = {
        init: function () {
            elem = document.getElementById('dcsm-comment-list')
                .getElementsByTagName('tbody')[0];
            csrf_token = util.getCookie('ci_c');
        },
        items: new Array(),
        refresh: function (data) {
            // init
            comment.items = new Array();
            elem.innerHTML = "";
            util.ajax({
              'type': 'POST',
              'url': '/comment/view/',
              'data': {
                  'ci_t': csrf_token,
                  'id': data.id || document.getElementById('id').value,
                  'no': data.num
              }
            }, function(data){
                var doc = document.implementation.createHTMLDocument('');
                doc.open();
                doc.write(data);
                var parsed = parser.comment(doc);
                for(var i in parsed){
                    var item = new CommentItem(parsed[i]);
                    comment.items.push(item);
                    elem.appendChild(item.elem);
                }
                doc.close();
            });
        },
        name: 'comment'
    }

    return comment;
});