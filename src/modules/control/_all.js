define([
    './article',
	'./content',
    './List',
    './ListItem'
], function () {
    var rst = new Object;
    for (var i in arguments)
        rst[arguments[i].name] = arguments[i];
    return rst;
});