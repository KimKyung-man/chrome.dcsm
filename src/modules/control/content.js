/*
    control/content.js
*/
define([
    'util/_all'
], function (util) {

    var selectedData = null;

    var content = {
        elem: new Object,
        name: 'content',
        init: function () {
            var _elem = document.getElementById('dcsm-article');
            content.addEventListener = function () { _elem.addEventListener.apply(undefined, arguments); };
            content.removeEventListener = function () { _elem.removeEventListener.apply(undefined, arguments); }; 
            content.dispatchEvent = function () { _elem.dispatchEvent.apply(undefined, arguments); }; 
            content.elem.content = document.getElementById('dcsm-article-content');
            content.elem.title = _elem.querySelectorAll('[data-dcsm="title"]')[0];
            content.elem.author = _elem.querySelectorAll('[data-dcsm="author"]')[0];
            content.elem.gallcon = _elem.querySelectorAll('[data-dcsm="gallcon"]')[0];
            content.elem.viewed = _elem.querySelectorAll('[data-dcsm="viewed"]')[0];
            content.elem.cnt_comment = _elem.querySelectorAll('[data-dcsm="cnt_comment"]')[0];
            content.elem.cnt_rcmmd_up = _elem.querySelectorAll('[data-dcsm="cnt_rcmmd_up"]')[0];
            content.elem.cnt_rcmmd_down = _elem.querySelectorAll('[data-dcsm="cnt_rcmmd_down"]')[0];
            content.elem.date = _elem.querySelectorAll('[data-dcsm="date"]')[0];
            content.elem.ip = _elem.querySelectorAll('[data-dcsm="ip"]')[0];
            content.elem.mbcon = _elem.querySelectorAll('[data-dcsm="mbcon"]')[0];
        },
        update: function (data) {
            selectedData = data;
            if (data.title) content.elem.title.textContent = data.title;
            if (data.author) content.elem.author.textContent = data.author;
            if (data.viewed) content.elem.viewed.textContent = data.viewed;
            if (data.cnt_comment) content.elem.cnt_comment.textContent = data.cnt_comment;
            if (data.cnt_rcmmd_up) content.elem.cnt_rcmmd_up.textContent = data.cnt_rcmmd_up;
            if (data.cnt_rcmmd_down) content.elem.cnt_rcmmd_down.textContent = data.cnt_rcmmd_down;
            if (data.date) content.elem.date.textContent = data.date;
            if (data.ip) content.elem.ip.textContent = data.ip;
            if (data.content) {
                while (content.elem.content.firstChild)
                    content.elem.content.removeChild(content.elem.content.firstChild);
                while (data.content.firstChild)
                    content.elem.content.appendChild(data.content.firstChild);
            }
            if (data.gallcon) {
                if (!content.elem.gallcon.children.length)
                    content.elem.gallcon.appendChild(document.createElement('img'))
                content.elem.gallcon.children[0].src = data.gallcon;
            } else if (content.elem.gallcon.children.length) {
                content.elem.gallcon.removeChild(content.elem.gallcon.firstChild);
            }

            if (data.mbcon) {
                if (!content.elem.mbcon.children.length)
                    content.elem.mbcon.appendChild(document.createElement('img'))
                content.elem.mbcon.children[0].src = data.mbcon;
            } else if (content.elem.mbcon.children.length) {
                content.elem.mbcon.removeChild(content.elem.mbcon.firstChild);
            }

            var update_end = new Event('update_end');
            update_end.data = data;
            content.dispatchEvent(update_end);
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
        },
        addEventListener: null,
        removeEventListener: null
    }

    return content;
});