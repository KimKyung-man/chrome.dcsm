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
    
    // DC야 아푸지마!!
    var cs_nextPage = false;
    var cs_refresh = false;

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
                if (!parsed[i].isNotice)
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
            if (cs_nextPage) return;
            cs_nextPage = true;

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

                for (var i in parsed) {
                    if (!parsed[i].isNotice)
                        list.addItem(parsed[i]);
                }

                setTimeout(function () {
                    cs_nextPage = false;
                }, 3000);
            })
        },
        refresh: function () {
            if (cs_refresh) return;
            cs_refresh = true;

            var targetURL = 'http://gall.dcinside.com/board/view/?id='
                + gallId + '&no=1&page=1';
            util.ajax({
                'type': 'GET',
                'url': targetURL
            }, function (data) {
                var doc = document.implementation.createHTMLDocument('');
                doc.open();
                doc.write(data);
                var parsed = parser.list(doc);
                doc.close();

                for (var i in parsed) {
                    // reverse
                    var item = parsed[parsed.length - i - 1];
                    if (item.isNotice)
                        break; // notice
                    list.addItem(item);
                }

                setTimeout(function () {
                    cs_refresh = false;
                }, 3000);
            })
        },
        reboot: function () {
            list.currentPage = 1;
            list.items = new Array();
            elem.style.display = 'none';
            while (elem.firstChild) // clear node
                elem.removeChild(elem.firstChild);
            elem.style.display = 'block';
            cs_refresh = false;
            list.refresh();
        }
    }
    return list;
});