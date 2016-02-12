define([
    './ajax',
    './getCookie',
    './Observer'
], function () {
    var rst = new Object;
    for (var i in arguments)
        rst[arguments[i].name] = arguments[i];
    return rst;
});