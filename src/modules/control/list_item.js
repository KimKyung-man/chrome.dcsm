/*
    control/list_item.js
*/
define(function () {
    function list_item() {
        this.elem = (function () {
            var rst = document.createElement('a');
            rst.className = 'list-group-item';
        })();

        var _elem_title = (function () {
            var rst = document.createElement('h4');
            rst.className = 'list-group-item-heading';
            rst.dataset.dcsm = 'list-item-title';
        })();
        var _elem_username = document.createElement('span');
        var _elem_ip = document.createElement('span');
        var _elem_iate = document.createElement('span');
    }

    return list_item;
});