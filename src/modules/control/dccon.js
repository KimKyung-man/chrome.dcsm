/*
    control/comment.js
*/
define([
    './CommentItem',
    'parser/_all',
    'util/_all'
], function (CommentItem, parser, util) {

    var head = null;
    var body = null;
    var csrf_token = null;
    var parsed = null;

    function makeList(data) {
        data = data || parsed;
        for (var i in data) {
            // head
            // <li role="presentation" > <a href="#home" aria- controls="home" role= "tab" data- toggle="tab" > Home < /a></li >
            // body
            // <div role="tabpanel" class="tab-pane active" id="home">a...</div>

        }
    }

    var dccon = {
        name: 'dccon',
        init: function () {
            head = document.getElementById('dcsm-dccon-list-head');
            body = document.getElementById('dcsm-dccon-list-body');
            csrf_token = util.getCookie('ci_c');

            util.ajax({
                'type': 'POST',
                'url': '/dccon/lists',
                'data': {
                    'ci_t': csrf_token,
                    'target': 'icon',
                    'arr_idx': []
                },
            }, function (data) {
                var temp = document.createElement('div');
                temp.innerHTML = JSON.parse(data).html;
                makeList(parsed = parser.dccon(temp));
            });
        }
    }

    return dccon;
});