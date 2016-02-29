/*
    option.js
*/
define(function () {
    var dvalues = null; // defulat values
    var cvalues = {}; // custom values

    // Doesnt have to wait DOM
    (function init() {
        // get default
        (function (callback) {
            var xhr = new XMLHttpRequest;
            xhr.open('GET', chrome.extension.getURL('/app/option/default.json'), true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4
                    && (xhr.status === 200
                        || xhr.status === 0)) {
                    callback(JSON.parse(xhr.responseText));
                }
            }
            xhr.send(null);
        })(function (data) {
            dvalues = data;
            restore();
        });
    })();

    function restore() {
        if (!dvalues) return console.err("option is not initiated");
        chrome.storage.sync.get(dvalues, function (items) {
            (function dfs(name, value, dvalue, callback) {
                for (var prop in value) {
                    if (typeof (value[prop]) === 'object') {
                        dfs(name + '-' + prop, value[prop], dvalue[prop], callback);
                    } else callback(name + '-' + prop, value[prop], dvalue[prop]);
                }
            })('option', items, dvalues, function (id, value, dvalue) {
                cvalues[id] = value;
            });
            console.log('done');
        });
    }
    
    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        if (message.method == 'change_option') restore();
    });

    function option(id, callback, step) {
        console.log(cvalues);
        var oid = 'option-' + id;
        if (cvalues[oid]) return callback(cvalues[oid]);
        else setTimeout(function () {
            if (!step) step = 0;
            if (step > 10) return callback(null);
            else return option(id, callback, ++step);
        }, 500)
    }

    return option;
});