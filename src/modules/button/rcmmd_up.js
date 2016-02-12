/*
    button/rcmmd_up.js
*/
define([
    'control/content'
], function (content) {

    var elem = null;

    function btn_onclick(e) {
        content.rcmmd_up(function(data){
            console.log(data);
        })
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