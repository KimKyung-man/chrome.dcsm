/*
    parser/list.js
    parse list info using xml
*/
define([
    './named2url',
    './queryString',
], function (n2url, qs) {
    function list(xml) {
        var rst = new Array;

        var lists = xml.getElementById('dgn_wide');
        if (lists) {
            lists = lists.getElementsByTagName('tbody')[0].children;
        } else if (
            lists = xml.getElementById('dgn_gallery_left')
            ) {
            lists = Array.prototype.slice.call(
                lists.getElementsByTagName('thead')[0].children
                , 1);   // children[0] is thead
        } else return undefined;

        var index = {
            'num': 0,
            'author': 2,
            'date': 3,
            'viewed': 4,
            'rcmmd': 5
        }

        for (var i = 0; i < lists.length; ++i) {
            var itemBody = lists[i].children;
            var rstItem = new Object;

            for (var prop in index) {
                rstItem[prop]
                = itemBody[index[prop]].textContent;
            }

            if (!isNaN(rstItem['num'])) {
                if (rstItem['num'] === '') { // current
                    rstItem['num']
                    = parseInt(qs('no', this.url));
                    rstItem.isCurrent = true;
                } else rstItem['num'] = parseInt(rstItem['num']);
            }

            rstItem['title']
            = itemBody[1].children[0]
                .textContent.trim();

            rstItem['cnt_comment']
            = itemBody[1].children[1]
            ? itemBody[1].children[1]
                .textContent.trim()
            : null;

            rstItem['link']
            = itemBody[1]
                .children[0]            // <a>
                .getAttribute('href');  // article link

            rstItem['artcon']
            = n2url(itemBody[1]
                .children[0].classList[0]);

            rstItem['user_id']
            = itemBody[index['author']]
                .getAttribute('user_id');

            rstItem['user_name']
            = itemBody[index['author']]
                .getAttribute('user_name');

            rstItem['gallcon']
            = rstItem['user_id']
                ? itemBody[index['author']]     // if has user_id
                    .getElementsByTagName('img')[0]
                : null;

            rstItem['is_fixed']
            = rstItem['user_id']
                ? rstItem['gallcon']
                    .src.search('g_fix') > 0    // if has g_fix icon
                : false;

            rst.push(rstItem);
        }

        return rst;
    }

    return list;
});