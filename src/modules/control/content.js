/*
    control/content.js
*/
define(function () {

    var elem = new Object;

    var content = {
        init: function () {
            var _elem = document.getElementById('dcsm-article');
            elem.content = document.getElementById('dcsm-article-content');
            elem.title = _elem.querySelectorAll('[data-dcsm="title"]')[0];
            elem.author = _elem.querySelectorAll('[data-dcsm="author"]')[0];
            elem.gallcon = _elem.querySelectorAll('[data-dcsm="gallcon"]')[0];
            elem.viewed = _elem.querySelectorAll('[data-dcsm="viewed"]')[0];
            elem.cnt_comment = _elem.querySelectorAll('[data-dcsm="cnt_comment"]')[0];
            elem.date = _elem.querySelectorAll('[data-dcsm="date"]')[0];
            elem.ip = _elem.querySelectorAll('[data-dcsm="ip"]')[0];
        },
        update: function (data) {
            if (data.title) elem.title.textContent = data.title;
            if (data.author) elem.author.textContent = data.author;
            if (data.viewed) elem.viewed.textContent = data.viewed;
            if (data.cnt_comment) elem.cnt_comment.textContent = data.cnt_comment;
            if (data.date) elem.date.textContent = data.date;
            if (data.ip) elem.ip.textContent = data.ip;
            if (data.content) {
                elem.content.innerHTML
                = data.content.innerHTML;
                // TODO: make efficient
                // fuckin text is not copied
                // while (elem.content.firstChild)
                //     elem.content.removeChild(elem.content.firstChild);
                // for( var i in data.content)
                //     elem.content.appendChild(data.content[i]);
            }
            if (data.gallcon) {
                if (!elem.gallcon.children.length)
                    elem.gallcon.appendChild(document.createElement('img'))
                elem.gallcon.children[0].src = data.gallcon;
            } else elem.gallcon.innerHTML = "";
        },
        name: 'content'
    }

    return content;
});