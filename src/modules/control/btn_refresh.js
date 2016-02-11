/*
    control/btn_refresh.js
*/
define([
    './list'
], function (list) {

    var elem = null;
    var autoRefresh = {
        'timer': null,
        'action': function () {
            elem.click();
        },
        'trigger': function (e) {
            if (e.isTrusted && autoRefresh.timer !== null) {
                clearInterval(autoRefresh.timer);
                autoRefresh.timer = setInterval(autoRefresh.action, 5000);
            } else autoRefresh.action();
        },
        'set': function () {
            this.timer = setInterval(this.action, 5000);
            elem.addEventListener('click', this.trigger, false);
        }
    }

    function btn_onclick(e) {
        list.refresh();
    }

    var btn_refresh = {
        name: 'btn_refresh',
        init: function () {
            elem = document.getElementById('btn_refresh');
            elem.addEventListener('click', btn_onclick, false);
            autoRefresh.set();
        }
    }

    return btn_refresh;
});