/*
    parser/list.js
    parse list info using xml
*/
define(function () {
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
            'title': 1,
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

            rstItem['link']
            = itemBody[index['title']]
                .children[0]            // <a>
                .getAttribute('href');  // article link

            // i think it could be more efficient way
            // or
            // TODO: make name table
            rstItem['icon_src']
            = window.getComputedStyle(
                itemBody[index['title']].children[0]
                ).backgroundImage.split('\"')[1];

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