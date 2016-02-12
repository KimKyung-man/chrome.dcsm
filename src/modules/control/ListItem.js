/*
    control/ListItem.js
*/
define(function () {

    function elemCstr(tagName, className, dataDcsm) {
        var rst = document.createElement(tagName);
        if (className) rst.className = className;
        if (dataDcsm) rst.dataset.dcsm = dataDcsm;
        return rst;
    }

    // TODO: Show cnt_comment
    function ListItem(data) {
        var self = this;
        // elem create logic
        /*
        <a href="#" class="list-group-item">
            <h4 class="list-group-item-heading">
                <sapn data-dcsm='artcon'></span>
                <span data-dcsm='title'></span>
            </h4>
            <p class="list-group-item-text">
                <small>
                    <span data-dcsm='num'></span>
                    <span data-dcsm='author'></span>
                    <span data-dcsm='gallcon'></span>
                    <span data-dcsm='mbcon'></span>
                    <span data-dcsm='ip'></span>
                    <span data-dcsm='rcmmd'></span>
                    <span data-dcsm='cnt_comment'></span>
                    <span data-dcsm='viewd'></span>
                    <date data-dcsm='date'></date>
                </small>
            </p>
        </a>
        */

        var _elem = elemCstr('a', 'list-group-item');
        var _elem_title = elemCstr('span', undefined, 'title');
        var _elem_artcon = elemCstr('span', undefined, 'artcon');
        var _elem_gallcon = elemCstr('span', undefined, 'gallcon');
        var _elem_mbcon = elemCstr('span', undefined, 'mbcon');
        var _elem_num = elemCstr('span', undefined, 'num');
        var _elem_author = elemCstr('span', undefined, 'author');
        var _elem_ip = elemCstr('span', undefined, 'ip');
        var _elem_viewed = elemCstr('span', undefined, 'viewed');
        var _elem_rcmmd = elemCstr('span', undefined, 'rcmmd');
        var _elem_cnt_comment = elemCstr('span', undefined, 'cnt_comment');
        var _elem_date = elemCstr('date', undefined, 'date');

        var _temp_elem_h4 = elemCstr('h4', 'list-group-item-heading');
        var _temp_elem_p = elemCstr('p', 'list-group-item-text');
        var _temp_elem_small = document.createElement('small');

        _temp_elem_h4.appendChild(_elem_artcon);
        _temp_elem_h4.appendChild(_elem_title);

        _temp_elem_small.appendChild(_elem_num);
        _temp_elem_small.appendChild(_elem_author);
        _temp_elem_small.appendChild(_elem_gallcon);
        _temp_elem_small.appendChild(_elem_mbcon);
        _temp_elem_small.appendChild(_elem_ip);
        _temp_elem_small.appendChild(_elem_rcmmd);
        _temp_elem_small.appendChild(_elem_cnt_comment);
        _temp_elem_small.appendChild(_elem_viewed);
        _temp_elem_small.appendChild(_elem_date);
        _temp_elem_p.appendChild(_temp_elem_small);

        _elem.appendChild(_temp_elem_h4);
        _elem.appendChild(_temp_elem_p);
        // end of: elem create logic
        
        // bind event
        _elem.onclick = function () {
            ListItem.prototype.onclick.call(self);
        };
        // end of: bind event
        
        this.elem = _elem;
        this.elem_title = _elem_title;
        this.elem_artcon = _elem_artcon;
        this.elem_num = _elem_num;
        this.elem_author = _elem_author;
        this.elem_gallcon = _elem_gallcon;
        this.elem_mbcon = _elem_mbcon;
        this.elem_ip = _elem_ip;
        this.elem_viewed = _elem_viewed;
        this.elem_rcmmd = _elem_rcmmd;
        this.elem_cnt_comment = _elem_cnt_comment;
        this.elem_date = _elem_date;

        if (!data) return;
        else this.data = data;

        this.setNum(data.num);
        this.setTitle(data.title);
        this.setArtcon(data.artcon);
        this.setAuthor(data.author);
        this.setGallcon(data.gallcon);
        this.setViewed(data.viewed);
        this.setRcmmd(data.rcmmd);
        this.setDate(data.date);
        this.setCntComment(data.cnt_comment);
    }

    ListItem.prototype.setNum = function (str) {
        this.elem_num.textContent = str;
    }

    ListItem.prototype.setTitle = function (str) {
        this.elem.title = str;
        this.elem_title.textContent = str;
    }

    ListItem.prototype.setAuthor = function (str) {
        this.elem_author.textContent = str;
    }

    ListItem.prototype.setGallcon = function (strUrl) {
        if (!strUrl)
            return this.elem_gallcon.innerHTML = "";
        if (!this.elem_gallcon.children.length)
            this.elem_gallcon.appendChild(document.createElement('img'))
        this.elem_gallcon.children[0].src = strUrl;
    }

    ListItem.prototype.setMbcon = function (strUrl) {
        if (!strUrl)
            return this.elem_mbcon.innerHTML = "";
        if (!this.elem_mbcon.children.length)
            this.elem_mbcon.appendChild(document.createElement('img'))
        this.elem_mbcon.children[0].src = strUrl;
    }

    ListItem.prototype.setIp = function (str) {
        this.elem_ip.textContent = str;
    }

    ListItem.prototype.setDate = function (str) {
        this.elem_date.textContent = str;
    }

    ListItem.prototype.setArtcon = function (strUrl) {
        if (!strUrl)
            return this.elem_artcon.innerHTML = "";
        if (!this.elem_artcon.children.length)
            this.elem_artcon.appendChild(document.createElement('img'))
        this.elem_artcon.children[0].src = strUrl;
    }

    ListItem.prototype.setIp = function (str) {
        this.elem_ip.textContent = str;
    }

    ListItem.prototype.setViewed = function (str) {
        this.elem_viewed.textContent = str;
    }

    ListItem.prototype.setRcmmd = function (str) {
        this.elem_rcmmd.textContent = str;
    }

    ListItem.prototype.setCntComment = function (str) {
        this.elem_cnt_comment.textContent = str;
    }

    ListItem.prototype.getTitle = function () {
        return this.elem_title.textContent;
    }

    ListItem.prototype.getAuthor = function () {
        return this.elem_author.textContent;
    }

    ListItem.prototype.getIp = function () {
        return this.elem_ip.textContent;
    }

    ListItem.prototype.getDate = function () {
        return this.elem_date.textContent;
    }
    
    // event
    ListItem.prototype.onclick = function () {

    }

    ListItem.prototype.click = function () {
        this.elem.clcik();
    }

    ListItem.prototype.update = function (data) {
        this.setViewed(data.viewed);
        this.setCntComment(data.cnt_comment);
        if (data.ip) this.setIp(data.ip);
        if (data.rcmmd) this.setRcmmd(data.rcmmd);
        if (data.mbcon) this.setMbcon(data.mbcon);
    }

    return ListItem;
});