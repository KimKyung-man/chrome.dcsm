define([
    './gall',
    './go_article_top',
    './rcmmd_down',
    './rcmmd_list',
    './rcmmd_up',
    './refresh'
], function () {
    var rst = {
        btn: new Object,
        init: function () {
            for (var i in rst) if (rst[i].init)
                rst[i].init();
        }
    }

    for (var i in arguments)
        rst[arguments[i].name] = arguments[i];

    return rst;
});