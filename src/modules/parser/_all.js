define([
    './content',
    './comment',
    './gall',
    './list',
    './queryString'
], function () {
    var rst = new Object;
    for (var i in arguments)
        rst[arguments[i].name] = arguments[i];
    return rst;
});