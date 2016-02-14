/*
    button/go_article_top.js
*/
define([
    'control/content'
], function (content) {

    var elem = null;
    var target = null;

    function btn_onclick(e) {
        target.scrollTop = 0;
    }

    var go_article_top = {
        name: 'go_article_top',
        init: function () {
            elem = document.getElementById('dcsm-btn-go-article-top');
            target = document.getElementById('dcsm-content');
            elem.addEventListener('click', btn_onclick, false);
            content.sub_update_end(btn_onclick);
        }
    }

    return go_article_top;
});