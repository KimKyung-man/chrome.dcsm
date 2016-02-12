/*
    button/rcmmd_up.js
*/
define(function () {

    var elem = null;

    function btn_onclick(e) {

    }

    var rcmmd_up = {
        name: 'rcmmd_up',
        init: function () {
            elem = document.getElementById('dcsm-btn-rcmmd-up');
            elem.addEventListener('click', btn_onclick, false);
        }
    }

    return rcmmd_up;
});