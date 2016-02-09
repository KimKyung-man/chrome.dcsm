/*
    control/article.js
*/
define([
    './content',
    'parser/_all'
],function (content, parser) {
    var article = {
        init: function () {
            content.init();
        },
        update: function (xml) {
            var data = parser.content(xml);
            content.update(data);
        },
        name: 'article'
    }

    return article;
});