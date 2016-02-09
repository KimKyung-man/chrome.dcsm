/*
    control/list.js
*/
define([
    './ListItem',
    'parser/queryString'
], function (ListItem, qs) {

    var elem;

    var list = {
        currentPage : 1,
        init: function(){
            elem = document.getElementById('dcsm-list').children[0];
            var crntPg = qs('page', document.location.href);
            if(crntPg) list.currentPage = parseInt(crntPg);
        },
        items: new Array,
        addItem: function (data) {
            var item = new ListItem(data);
            if (!list.items.length
                || (list.items[list.items.length - 1].data.num > data.num)) {
                list.items.push(item);
                elem.appendChild(item.elem);
            } else if (list.items[0].data.num < data.num) {
                list.items.unshift(item);
                elem.insertBefore(item.elem, list.items[1].elem);
            } else {
                onsole.error('Aready Exists');
                return false;
            }
            return true;
        },
        name: 'list'
    }

    return list;
});