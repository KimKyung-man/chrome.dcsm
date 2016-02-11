/*
    control/btn_gall.js
*/
define([
    './list',
    './content'
], function (list, content) {

    var elem = null;
    
    function btn_onclick(e) {
        list.reboot();
        content.update({'content': document.createTextNode('')});
        document.getElementById('dcsm-article-mask').style.display = 'block';
    }

    var btn_refresh = {
        name: 'btn_gall',
        init: function () {
            elem = document.getElementById('dcsm-gall-name');
            elem.addEventListener('click', btn_onclick, false);
        }
    }

    return btn_refresh;
});