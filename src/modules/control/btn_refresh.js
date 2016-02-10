/*
    control/btn_refresh.js
*/
define([
    './list'
],function (list) {
    
    var elem = null;
    
    function btn_onclick(){
        list.refresh();
    }
    
    var btn_refresh = {
        name: 'btn_refresh',
        init: function () {
            elem = document.getElementById('btn_refresh');
            elem.onclick = btn_onclick; 
        }
    }

    return btn_refresh;
});