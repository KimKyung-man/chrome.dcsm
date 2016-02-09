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
                .getElementsByTagName('tbody');
            csrf_token = util.getCookie('ci_c');
        },
        refresh: function () {
            var self = this;
            
            util.ajax({
              'type': 'POST',
              'url': '/comment/view/',
              'data': {
                  'ci_t': csrf_token,
                  'id': parser.queryString('id', self.url),
                  'no': parser.queryString('no', self.url)
              }
            }, function(data){
                var doc = document.implementation.createHTMLDocument('');
                doc.open();
                doc.write(data);
                // parse
                parser.comment(doc);
                doc.close();
            });
        },
        name: 'comment'
    }

    return comment;
});