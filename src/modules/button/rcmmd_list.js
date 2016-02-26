/*
    button/rcmmd_up.js
*/
define([
    'control/list',
    'parser/queryString'
], function (list, qs) {

    var elem = null;
    var isActive = false;

    function btn_onclick(e) {
        if (isActive) elem.dataset.dcsm = 'deactive';
        else elem.dataset.dcsm = 'active';
        
        isActive = !isActive; // toggle
        list.set_mod_rcmmd(isActive);
        list.reboot();
    }

    var rcmmd_list = {
        name: 'rcmmd_list',
        init: function () {
            elem = document.getElementById('dcsm-btn-rcmmd-list');
            if (isActive = (qs('exception_mode') === 'recommend'))
                elem.dataset.dcsm = 'active';

            elem.addEventListener('click', btn_onclick, false);
        }
    }

    return rcmmd_list;
});