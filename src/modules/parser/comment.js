/*
    parser/comment.js
    parse comment info using xml
*/
define(function () {
    function comment(xml) {
        var rst = new Array;

        var lists = xml.getElementsByClassName('reply_line');
        if(!lists.length) return rst;

        for (var i = 0; i < lists.length; ++i) {
            var itemBody = lists[i].children;
            var rstItem = new Object;

            rstItem['user_id']
            = itemBody[0].getAttribute('user_id');
            rstItem['author'] = rstItem['user_name']
            = itemBody[0].getAttribute('user_name');
            rstItem['date']
            = itemBody[2].textContent.trim();
            rstItem['gallcon']
            = itemBody[0].children[1]
            ? itemBody[0].children[1].children[0].src : null;

            rstItem['content'] = (function () {
                var dccon
                    = itemBody[1].getElementsByClassName('written_dccon')
                if (dccon.length) {
                    rstItem['dccon'] = true;
                    return dccon[0].src;
                } else {
                    rstItem['dccon'] = false;
                    return itemBody[1].textContent.trim();
                }
            })();

            rst.push(rstItem);
        }

        return rst;
    }

    return comment;
});