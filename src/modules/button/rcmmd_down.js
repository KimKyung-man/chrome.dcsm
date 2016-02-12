/*
    button/rcmmd_down.js
*/
define(function () {

    var elem = null;

    function btn_onclick(e) {

    }

    var rcmmd_down = {
        name: 'rcmmd_down',
        init: function () {
            elem = document.getElementById('dcsm-btn-rcmmd-down');
            elem.addEventListener('click', btn_onclick, false);
        }
    }

    return rcmmd_down;
});