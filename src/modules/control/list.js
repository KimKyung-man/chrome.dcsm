/*
    control/list.js
*/
define([
    './ListItem',
    'parser/_all',
    'util/_all'
], function (ListItem, parser, util) {

    var elem;
    var gallId;

    var list = {
        name: 'list',
        currentPage: 1,
        init: function () {
            elem = document.getElementById('dcsm-list').children[0];
            gallId = parser.queryString('id', document.baseURI);
            
            // bind end of scroll
            var elemP = elem.parentElement;
            elemP.onscroll = function (evt) {
                if (elemP.scrollTop + elemP.clientHeight >= elemP.scrollHeight)
                    list.nextPage();
            }
            
            // initial list
            var parsed = parser.list(document);
            for (var i in parsed) {
                if (typeof (parsed[i].num) !== 'number')
                    continue; // notice
                list.addItem(parsed[i]);
            }
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
            } else return false;
            return true;
        },
        nextPage: function () {
            var targetURL = 'http://gall.dcinside.com/board/view/?id='
                + gallId + '&no=1&page=' + (++list.currentPage);
            util.ajax({
                'type': 'GET',
                'url': targetURL
            }, function (data) {
                var doc = document.implementation.createHTMLDocument('');
                doc.open();
                doc.write(data);
                var parsed = parser.list(doc);
                doc.close();
                for (var i in parsed)
                    list.addItem(parsed[i]);
            })
        }
    }
    return list;
});