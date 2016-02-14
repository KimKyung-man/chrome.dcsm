/*
    control/form_comment_write.js
*/
define([
    './dccon',
    './DcconItem',
    'auth/status',
    'util/_all'
], function (dccon, DcconItem, auth, util) {

    var isLoggedIn = null;
    var elem = null;
    var callback = null;
    var form_data = null;

    function form_onsubmit(e) {
        if (e) e.preventDefault();
        if (form_data === null) alert('Data not updated');

        elem.elements.submit.disabled = true;
        elem.elements.username.readonly = true;
        elem.elements.password.readonly = true;
        elem.elements.content.readonly = true;

        var username = (isLoggedIn === false)
            ? elem.elements.username.value : undefined;
        var password = (isLoggedIn === false)
            ? elem.elements.password.value : undefined;
        var content = elem.elements.content.value;

        var targetURL = 'http://gall.dcinside.com/board/view/?id='
            + form_data.id + '&no=' + form_data.num;

        var sendData = {
            'type': 'POST',
            'url': '/forms/comment_submit',
            'headers': {
                'X-Alt-Referer': targetURL,
                'Accept': 'text/html,application/xhtml+xml,application/xml,*/*'
            },
            'data': {
                'ci_t': util.getCookie('ci_c'),
                'name': username,
                'password': password,
                'memo': content,
                'id': (form_data.id === 'best')
                    ? form_data.best_id
                    : form_data.id,
                'no': (form_data.id === 'best')
                    ? form_data.best_no
                    : form_data.num,
                'best': (form_data.id === 'best')
                    ? 'BEST' : undefined,
                'best_pno': (form_data.id === 'best')
                    ? form_data.num : undefined,
                'best_orgin': (form_data.id !== 'best')
                    ? form_data.best_fno : undefined,
                'check_6': form_data.check_6,
                'check_7': form_data.check_7,
                'check_8': form_data.check_8,
                'campus': 0,
                'recommend': '0'
            }
        }
        console.log(form_data);
        if(form_data.package_idx){ // dccon
            sendData.url = '/dccon/insert_icon';
            sendData.data.memo = undefined;
            sendData.data.input_type = 'comment';
            sendData.data.package_idx
                = form_data.package_idx;
            sendData.data.detail_idx
                = form_data.detail_idx;
        }

        util.ajax(sendData, function (data) {
            console.log(data);
            elem.elements.submit.removeAttribute('disabled');
            if (isLoggedIn) {
                elem.elements.username.removeAttribute('readonly');
                elem.elements.password.removeAttribute('readonly');
            }
            elem.elements.content.removeAttribute('readonly');
            elem.elements.content.value = ''; // clear
            
            if (callback && typeof callback === 'function')
                callback(data, form_data);
        });
    }

    var form_comment_write = {
        name: 'form_comment_write',
        init: function (cb) {
            elem = document.getElementById('dcsm-comment-write');
            isLoggedIn = auth();
            callback = cb;
            elem.onsubmit = form_onsubmit;
            dccon.init();

            if (isLoggedIn) {
                var mask = document.getElementById('dcsm-comment-write-authMask');
                mask.style.display = "block";
                mask.textContent = isLoggedIn;

                elem.elements.username.readonly = true;
                elem.elements.password.readonly = true;
                elem.elements.username.removeAttribute('required');
                elem.elements.password.removeAttribute('required');
            }
        },
        update: function (data) {
            form_data = data;
        }
    }

    DcconItem.prototype.onclick = function () {
        form_data.package_idx = this.data.packageIndex;
        form_data.detail_idx = this.data.index;
        form_onsubmit();
    }

    return form_comment_write;
});