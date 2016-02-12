/*
    control/content.js
*/
define([
    'util/_all'
], function (util) {

    var elem = new Object;
    var selectedData = null;

    var content = {
        name: 'content',
        init: function () {
            var _elem = document.getElementById('dcsm-article');
            elem.content = document.getElementById('dcsm-article-content');
            elem.title = _elem.querySelectorAll('[data-dcsm="title"]')[0];
            elem.author = _elem.querySelectorAll('[data-dcsm="author"]')[0];
            elem.gallcon = _elem.querySelectorAll('[data-dcsm="gallcon"]')[0];
            elem.viewed = _elem.querySelectorAll('[data-dcsm="viewed"]')[0];
            elem.cnt_comment = _elem.querySelectorAll('[data-dcsm="cnt_comment"]')[0];
            elem.cnt_rcmmd_up = _elem.querySelectorAll('[data-dcsm="cnt_rcmmd_up"]')[0];
            elem.cnt_rcmmd_down = _elem.querySelectorAll('[data-dcsm="cnt_rcmmd_down"]')[0];
            elem.date = _elem.querySelectorAll('[data-dcsm="date"]')[0];
            elem.ip = _elem.querySelectorAll('[data-dcsm="ip"]')[0];
            elem.mbcon = _elem.querySelectorAll('[data-dcsm="mbcon"]')[0];
        },
        update: function (data) {
            selectedData = data;
            if (data.title) elem.title.textContent = data.title;
            if (data.author) elem.author.textContent = data.author;
            if (data.viewed) elem.viewed.textContent = data.viewed;
            if (data.cnt_comment) elem.cnt_comment.textContent = data.cnt_comment;
            if (data.cnt_rcmmd_up) elem.cnt_rcmmd_up.textContent = data.cnt_rcmmd_up;
            if (data.cnt_rcmmd_down) elem.cnt_rcmmd_down.textContent = data.cnt_rcmmd_down;
            if (data.date) elem.date.textContent = data.date;
            if (data.ip) elem.ip.textContent = data.ip;
            if (data.content) {
                while (elem.content.firstChild)
                    elem.content.removeChild(elem.content.firstChild);
                while (data.content.firstChild)
                    elem.content.appendChild(data.content.firstChild);
            }
            if (data.gallcon) {
                if (!elem.gallcon.children.length)
                    elem.gallcon.appendChild(document.createElement('img'))
                elem.gallcon.children[0].src = data.gallcon;
            } else if (elem.gallcon.children.length) {
                elem.gallcon.removeChild(elem.gallcon.firstChild);
            }

            if (data.mbcon) {
                if (!elem.mbcon.children.length)
                    elem.mbcon.appendChild(document.createElement('img'))
                elem.mbcon.children[0].src = data.mbcon;
            } else if (elem.mbcon.children.length) {
                elem.mbcon.removeChild(elem.mbcon.firstChild);
            }
        },
        rcmmd_up: function (cb) {
            // set coockie
            (function (name, value, expirehours, domain) {
                var today = new Date();
                today.setTime(today.getTime() + (60 * 60 * 1000 * expirehours));
                document.cookie = name + "=" + escape(value) + "; path=/; domain=" + domain + "; expires=" + today.toGMTString() + ";";
            })('' + selectedData.id + selectedData.num + '_Firstcheck', 'Y', 3, 'dcinside.com');

            var sendForm = {
                'ci_t': util.getCookie('ci_c'),
                'id': selectedData.id,
                'no': selectedData.num,
                'recommend': selectedData.recommend,
                'vote': 'vote',
                'user_id': selectedData.check_3
            }

            util.ajax({
                'type': 'POST',
                'url': '/forms/recommend_vote_up',
                'data': sendForm,
            }, cb);
        },
        rcmmd_down: function (cb) {
            // set coockie
            (function (name, value, expirehours, domain) {
                var today = new Date();
                today.setTime(today.getTime() + (60 * 60 * 1000 * expirehours));
                document.cookie = name + "=" + escape(value) + "; path=/; domain=" + domain + "; expires=" + today.toGMTString() + ";";
            })('' + selectedData.id + selectedData.num + '_Firstcheck_down', 'Y', 3, 'dcinside.com');

            var sendForm = {
                'ci_t': util.getCookie('ci_c'),
                'id': selectedData.id,
                'no': selectedData.num,
                'recommend': selectedData.recommend,
                'vote': 'vote'
            }

            util.ajax({
                'type': 'POST',
                'url': '/forms/recommend_vote_down',
                'data': sendForm,
            }, cb);
        }
    }

    return content;
});