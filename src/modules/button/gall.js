/*
    button/gall.js
*/
define([
    'control/list',
    'control/content'
], function (list, content) {

    var elem = null;
    
    function btn_onclick(e) {
        list.reboot();
        content.update({'content': document.createTextNode('')});
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