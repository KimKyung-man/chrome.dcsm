/*
    button/gall.js
*/
define([
    'control/list',
    'control/content',
    'control/comment'
], function (list, content, comment) {

    var elem = null;
    
    function btn_onclick(e) {
        list.reboot();
        content.update({'content': document.createTextNode('')});
        comment.clear();
        document.getElementById('dcsm-article-mask').style.display = 'block';
    }

    var gall = {
        name: 'gall',
        init: function () {
            elem = document.getElementById('dcsm-gall-name');
            elem.addEventListener('click', btn_onclick, false);
        }
    }

    return gall;
});