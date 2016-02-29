(function () {
    var option = {
        default: null,
        init: function () {
            // get default
            (function (callback) {
                var xhr = new XMLHttpRequest;
                xhr.open('GET', 'default.json', true);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4
                        && (xhr.status === 200
                            || xhr.status === 0)) {
                        callback(JSON.parse(xhr.responseText));
                    }
                }
                xhr.send(null);
            })(function (data) {
                option.default = data;
                option.restore();
            });
        },
        restore: function () {
            if (!option.default) return console.err("option is not initiated");
            chrome.storage.sync.get(option.default, function (items) {
                (function dfs(name, value, dvalue, callback) {
                    for (var prop in value) {
                        if (typeof (value[prop]) === 'object') {
                            dfs(name + '-' + prop, value[prop], dvalue[prop], callback);
                        } else callback(name + '-' + prop, value[prop], dvalue[prop]);
                    }
                })('option', items, option.default, function (id, value, dvalue) {
                    if (value !== dvalue) {
                        try {
                            document.getElementById(id).value = value;
                        } catch(e){
                            console.err("undetected option id: " + id, e);   
                        }
                    }
                });
            });

        },
        save: function (callback) {
            if (!option.default) return console.err("option is not initiated");
            var rst = new Object;
            (function dfs(name, dvalue, src, callback) {
                for (var prop in dvalue) {
                    src[prop] = {};
                    if (typeof (dvalue[prop]) === 'object') {
                        dfs(name + '-' + prop, dvalue[prop], src[prop], callback)
                    } else callback(name + '-' + prop, dvalue[prop], src, prop);
                }
            })('option', option.default, rst, function (id, dvalue, src, prop) {
                var trg = document.getElementById(id);
                if ((trg.value === "") || (trg.value === dvalue)) {
                    src[prop] = dvalue;
                } else src[prop] = trg.value;
            });
            chrome.storage.sync.set(rst, callback);
        }
    };
    return option;
})().init();

// option-write-postfix
(function () {
    var trg = document.getElementById('option-write-postfix');
    var help = document.getElementById('option-write-postfix-help');
    help.value = trg.value.length;

    trg.addEventListener('input', function (e) {
        help.value = trg.value.length
    });

    trg.addEventListener('blur', function (e) {
        trg.value = trg.value.trimRight();
        help.value = trg.value.length
    });
})();