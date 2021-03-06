/*
 control/list.js
 */
define([
    'option',
    './article',
    './ListItem',
    'parser/_all',
    'util/_all',
    'reader/content',
    'reader/list',
    'button/go_list'
], function (option, article, ListItem, parser, util, contentReader, listReader, btn_go_list) {

    var elem;
    var gallId;
    var mod_rcmmd = false;  // 개념글 보니?

    // DC야 아푸지마!!
    var cs_nextPage = false;
    var cs_refresh = false;

    function setView(dir) {
        var container = elem.parentElement;
        var parent = container.parentElement;
        if (dir === 'left') parent.insertBefore(container, parent.firstElementChild);
        else if (dir === 'right') parent.appendChild(container);
    }

    var list = {
        name: 'list',
        currentPage: 1,
        init: function () {
            elem = document.getElementById('dcsm-list').children[0];
            gallId = parser.queryString('id', document.baseURI);
            mod_rcmmd = parser.queryString('exception_mode') === 'recommend';

            option('list-view', function (val) {
                console.log(val);
                setView(val);
            })

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
        // revers of items
        rItems: new Array,
        addItem: function (data) {
            var item = new ListItem(data);
            if (!list.items.length
                || (list.items[list.items.length - 1].data.num > data.num)) {
                list.items.push(item);
                list.rItems.unshift(item);
                elem.appendChild(item.elem);
            } else if (list.items[0].data.num < data.num) {
                list.items.unshift(item);
                list.rItems.push(item);
                elem.insertBefore(item.elem, list.items[1].elem);
            } else {
                var trg = list.findItemByNum(data.num);
                if (trg) trg.update(data);
            };
            return true;
        },
        // 'num' is article's 글번호.  
        findItemByNum: function (num) {
            num = parseInt(num);
        
            // 한페이지에 글이 36개 로드됨.
            // 만약 찾으려는 것이 최신 ListItem과 차이가 36보다 작으면
            // 정방향 탐색, 그렇지 않으면 역방향 탐색이 효율적일 것.
            var isRecent = list.items[0].getNum() - num < 36;
            var finder = function (el) { return el.getNum() === num; }

            if (isRecent) return list.items.find(finder);
            else return list.rItems.find(finder);
        },
        nextPage: function () {
            if (cs_nextPage) return;
            cs_nextPage = true;
            var targetURL = 'http://gall.dcinside.com/board/lists/?id='
                + gallId + '&page=' + (++list.currentPage);
            if (mod_rcmmd) targetURL += '&exception_mode=recommend';

            listReader(targetURL, function (data) {
                for (var i in data) {
                    if (!data[i].isNotice)
                        list.addItem(data[i]);
                }

                setTimeout(function () {
                    cs_nextPage = false;
                }, 3000);
            });
        },
        refresh: function () {
            if (cs_refresh) return;
            cs_refresh = true;

            var targetURL = 'http://gall.dcinside.com/board/lists/?id='
                + gallId + '&page=' + 1;
            if (mod_rcmmd) targetURL += '&exception_mode=recommend';

            listReader(targetURL, function (data) {
                for (var i in data) {
                    // reverse
                    var item = data[data.length - i - 1];
                    if (item.isNotice) break; // notice

                    list.addItem(item);
                }

                setTimeout(function () {
                    cs_refresh = false;
                }, 3000);
            });
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
        },
        set_mod_rcmmd: function (val) {
            if (!arguments.length) mod_rcmmd = !mod_rcmmd; // toglle
            else if (val) mod_rcmmd = true;
            else mod_rcmmd = false;
        },
        get_mod_rcmmd: function () {
            return mod_rcmmd;
        }
    }

    // define control event
    var lastRequest = null;
    ListItem.prototype.onclick = function () {
        lastRequest = new Date;
        var sendTime = lastRequest;
        var self = this;

        contentReader(self.data.link, function (data) {
            if (lastRequest > sendTime) return;
            data.link = self.data.link;
            article.update(data, self);

            if (!((article.elem.offsetHeight > 0)
                && (article.elem.offsetWidth > 0))) {
                // if content not visible
                elem.parentElement.classList.add('hidden-xs');
                article.elem.classList.remove('hidden-xs');
            }
        });
    };

    // define beutton event
    btn_go_list.onclick = function () {
        article.elem.classList.add('hidden-xs');
        elem.parentElement.classList.remove('hidden-xs');
    }

    return list;
});