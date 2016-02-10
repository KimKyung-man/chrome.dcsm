/*
    control/article.js
*/
define([
    './content',
    './comment',
    './form_comment_write',
    'parser/_all'
],function (content, comment, form_cmt_wr, parser) {
    var article = {
        init: function () {
            content.init();
            comment.init();
        },
        update: function (xml) {
            var cttData = parser.content(xml);
            
            content.update(cttData);
            comment.refresh(cttData);
            form_cmt_wr.update(cttData);
        },
        name: 'article'
    }

    return article;
});