/*
    reader/list.js
*/
define([
    'util/ajax',
    'parser/list'
], function (ajax, listParser) {

    //var baseURL = 'http://gall.dcinside.com/board/view/?page=1';

    function byURL(url, callback) {
        ajax({
            'type': 'GET',
            'url': url
        }, function (data) {
            var doc = document.implementation.createHTMLDocument(url);
            doc.open();
            doc.write(data);
            var parsed = listParser(doc);
            doc.close();

            if (typeof callback === 'function')
                callback(parsed);
        });
    }

    /*
    function byValue(id, num, callback) {
        byURL.apply(this, [
            baseURL + '&id=' + id + '&no=' + num,
            callback
        ]);
    }
    */

    function list() {
        var l = arguments.length;
        if (l === 2) return byURL.apply(this, arguments);
        //if (l === 3) byValue.apply(this, arguments);
    }

    return list;
});