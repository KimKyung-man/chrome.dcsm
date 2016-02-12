/*
    button/rcmmd_down.js
*/
define([
    'control/content'
], function (content) {

    var elem = null;

    function btn_onclick(e) {
        elem.setAttribute('disabled', '');
        elem.classList.remove('btn-default');
        elem.classList.add('btn-primary');

        content.rcmmd_down(function (data) {
            var isSucc = (data.trim().split('||')[0] == 'true');
            elem.classList.remove('btn-primary');
            if (isSucc) elem.classList.add('btn-warning');
            else elem.classList.add('btn-danger');
        })
    }

    function handle_content_update_end() {
        elem.removeAttribute('disabled');
        elem.classList.remove('btn-warning');
        elem.classList.remove('btn-danger');
        elem.classList.add('btn-default');
    }

    var rcmmd_down = {
        name: 'rcmmd_down',
        init: function () {
            elem = document.getElementById('dcsm-btn-rcmmd-down');
            elem.addEventListener('click', btn_onclick, false);
            content.sub_update_end(handle_content_update_end);
        }
    }

    return rcmmd_down;
});