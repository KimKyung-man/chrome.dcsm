define([
    './content',
    './comment',
    './dccon',
    './gall',
    './list',
    './named2url',
    './queryString'
], function () {
    var rst = new Object;
    for (var i in arguments)
        rst[arguments[i].name] = arguments[i];
    return rst;
});