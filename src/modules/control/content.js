/*
    control/content.js
*/
define(function () {

    var elem = new Object;

    var content = {
        init: function(){
            _elem = document.getElementById('dcsm-article');
            elem.content = document.getElementById('dcsm-article-content');
            elem.title = _elem.querySelectorAll('[data-dcsm="title"]');
            elem.author = _elem.querySelectorAll('[data-dcsm="author"]');
            elem.viewed = _elem.querySelectorAll('[data-dcsm="viewed"]');
            elem.cntComment = _elem.querySelectorAll('[data-dcsm="cntComment"]');
            elem.date = _elem.querySelectorAll('[data-dcsm="date"]');
        },
        update: function (data) {
            if(data.title) elem.title.textContent = data.title;
            if(data.author) elem.author.textContent = data.textContent;
            if(data.viewed) elem.viewed.textContent = data.viewed;
            if(data.cntComment) elem.cntComment.textContent = data.cntComment;
            if(data.date) elem.date.textContent = data.date;
            if(data.content) elem.content.appendChild(data.content);
        },
        name: 'content'
    }

    return content;
});