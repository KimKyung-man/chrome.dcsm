define([
    './article',
    './btn_gall',
    './btn_refresh',
	'./content',
    './form_comment_write',
    './list',
    './ListItem'
], function () {
    var rst = new Object;
    for (var i in arguments)
        rst[arguments[i].name] = arguments[i];
    return rst;
});