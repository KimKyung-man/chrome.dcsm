/*
    button/go_list.js
*/
define([
    'control/content'
], function (content) {


    var go_list = {
        name: 'go_list',
        elem : null,        
        init: function () {
            elem = document.getElementById('dcsm-btn-go-list');
            elem.addEventListener('click', function(){
                go_list.onclick();
            }, false);
        },
        onclick: function(){}
    }

    return go_list;
});