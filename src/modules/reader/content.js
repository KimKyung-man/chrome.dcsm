/*
    reader/content.js
*/
define([
    'util/ajax',
    'parser/content'
], function (ajax, contentParser) {

    var baseURL = 'http://gall.dcinside.com/board/view/?page=1';

    function byURL(url, callback) {
        ajax({
            'type': 'GET',
            'url': url
        }, function (data) {
            var doc = document.implementation.createHTMLDocument('');
            doc.open();
            doc.write(data);
            var parsed = contentParser(doc);
            doc.close;

            if (typeof callback === 'function')
                callback(parsed);
        });
    }

    function byValue(id, num, callback) {
        byURL.apply(this, [
            baseURL + '&id=' + id + '&no=' + num,
            callback
        ]);
    }

    function content() {
        var l = arguments.length;
        if (l === 2) return byURL.apply(this, arguments);
        if (l === 3) return byValue.apply(this, arguments);
    }

    return content;
});