/*
    control/form_comment_write.js
*/
define([
    'util/_all'
], function (util) {
    
    //TODO
    function write() {
    }

    var elem = null;
    var callback = null;
    var form_data = null;

    function form_onsubmit(e) {
        e.preventDefault();
        if (form_data === null) alert('Data not updated');
        
        var username = elem.elements.username.value;
        var password = elem.elements.password.value;
        var content = elem.elements.content.value;

        var targetURL = 'http://gall.dcinside.com/board/view/?id='
            + form_data.id + '&no=' + form_data.num;
        history.pushState('', '', targetURL);
        
        var sendData = {
            'type': 'POST',
            'url': '/forms/comment_submit',
            'headers': {
                'X-Alt-Referer': targetURL,
                'Accept': 'text/html,application/xhtml+xml,application/xml,*/*'
            },
            'data': {
                'ci_t': util.getCookie('ci_c'),
                'name': (username === true)
                    ? undefined : username,
                'password': (password === true)
                    ? undefined : password,
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
        
        util.ajax(sendData, function (data) {
            if (callback && typeof callback === 'function')
                callback(data, form_data);
            elem.elements.content.value = ''; // clear
        });
    }

    var btn_refresh = {
        name: 'form_comment_write',
        init: function (cb) {
            elem = document.getElementById('dcsm-comment-write');
            callback = cb;
            elem.onsubmit = form_onsubmit;
        },
        update: function (data) {
            form_data = data;
        }
    }

    return btn_refresh;
});