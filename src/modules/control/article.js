/*
    control/article.js
*/
define([
    './content',
    './comment',
    'parser/_all'
],function (content, comment, parser) {
    var article = {
        init: function () {
            content.init();
            comment.init();
        },
        update: function (xml) {
            var listData = parser.list.call(this, xml);
            var cttData = parser.content.call(this, xml);
            
            content.update.call(this, cttData);
            comment.refresh.call(this);
        },
        name: 'article'
    }

    return article;
});