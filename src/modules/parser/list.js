/*
    parser/list.js
    parse list info using xml
*/
define([
    './named2url'
], function (n2url) {
    function list(xml) {
        var rst = [];
        var lists = [];
        var container = xml.getElementById('dgn_wrap');
        if (container)
            lists = container.getElementsByClassName('tb');
        else return undefined;

        var index = {
            'num': 0,
            'author': 2,
            'viewed': 4,
            'cnt_rcmmd_up': 5
        };

        for (var i = 0; i < lists.length; ++i) {
            var itemBody = lists[i].children;
            var rstItem = new Object;

            for (var prop in index) {
                rstItem[prop] = itemBody[index[prop]].textContent;
            }

            if (!isNaN(rstItem['num'])) {
                if (rstItem['num'] === '') { // current
                    rstItem['num']
                    = parseInt(xml.getElementById('no').value);
                    rstItem.isCurrent = true;
                } else rstItem['num'] = parseInt(rstItem['num']);
            }

            rstItem['title']
            = itemBody[1].children[0]
                .textContent.trim();

            rstItem['cnt_comment']
            = itemBody[1].children[1]
                ? itemBody[1].children[1]
                    .textContent.trim().slice(1, -1)
                : 0;

            rstItem['link']
            = itemBody[1]
                .children[0]            // <a>
                .getAttribute('href');  // article link

            rstItem['artcon']
            = n2url(itemBody[1]
                .children[0].classList[0]);

            rstItem['isNotice']
            = !(itemBody[1].children[0].classList[0]
                !== 'icon_notice');

            rstItem['user_id']
            = itemBody[index['author']]
                .getAttribute('user_id');

            rstItem['user_name']
            = itemBody[index['author']]
                .getAttribute('user_name');

            rstItem['gallcon']
            = rstItem['user_id']
                ? itemBody[index['author']]     // if has user_id
                    .getElementsByTagName('img')[0].src
                : null;

            rstItem['date']
            = itemBody[3].title.trim();

            rst.push(rstItem);
        }
        return rst;
    }

    return list;
});