/*
    button/rcmmd_down.js
*/
define([
    'control/content'
], function (content) {

    var elem = null;

    function btn_onclick(e) {
        content.rcmmd_down(function(data){
            console.log(data);
        })
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