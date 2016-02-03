/*
    parser/comment.js
    parse comment info using xml
*/
define(function () {
    function comment(xml) {
        var rst = new Array;

        var lists = xml.getElementById('comment_list');
        if (lists) lists
            = lists.getElementsByClassName('reply_line');
        else return rst;

        for (var i = 0; i < lists.length; ++i) {
            var itemBody = lists[i].children;
            var rstItem = new Object;

            rstItem['user_id']
            = itemBody[0].getAttribute('user_id');
            rstItem['user_name']
            = itemBody[0].getAttribute('user_name');
            rstItem['date']
            = itemBody[2].textContent.trim();

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