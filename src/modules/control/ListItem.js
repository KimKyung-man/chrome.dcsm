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

    function ListItem(data) {
        var self = this;
        // elem create logic
        /*
        <a href="#" class="list-group-item">
            <h4 class="list-group-item-heading">
                <sapn data-dcsm='list-item-artcon'></span>
                <span data-dcsm='list-item-title'></span>
            </h4>
            <p class="list-group-item-text">
                <small>
                    <span data-dcsm='list-item-num'></span>
                    <span data-dcsm='list-item-author'></span>
                    <span data-dcsm='list-item-ip'></span>
                    <span data-dcsm='list-item-date'></span>
                </small>
            </p>
        </a>
        */

        var _elem = elemCstr('a', 'list-group-item');
        var _elem_title = elemCstr('span', undefined, 'list-item-title');
        var _elem_artcon = elemCstr('span', undefined, 'list-item-artcon');
        var _elem_num = elemCstr('span', undefined, 'list-item-num');
        var _elem_author = elemCstr('span', undefined, 'list-item-author');
        var _elem_ip = elemCstr('span', undefined, 'list-item-ip');
        var _elem_date = elemCstr('span', undefined, 'list-item-date');

        var _temp_elem_h4 = elemCstr('h4', 'list-group-item-heading');
        var _temp_elem_p = elemCstr('p', 'list-group-item-text');
        var _temp_elem_small = document.createElement('small');
        
        _temp_elem_h4.appendChild(_elem_artcon);
        _temp_elem_h4.appendChild(_elem_title);
        
        _temp_elem_small.appendChild(_elem_num);
        _temp_elem_small.appendChild(_elem_author);
        _temp_elem_small.appendChild(_elem_ip);
        _temp_elem_small.appendChild(_elem_date);
        _temp_elem_p.appendChild(_temp_elem_small);
        
        _elem.appendChild(_temp_elem_h4);
        _elem.appendChild(_temp_elem_p);
        // end of: elem create logic
        
        // bind event
        _elem.onclick = function(){
            ListItem.prototype.onclick.call(self);
        };
        // end of: bind event
        
        this.elem = _elem;
        this.elem_title = _elem_title;
        this.elem_artcon = _elem_artcon;
        this.elem_num = _elem_num;
        this.elem_author = _elem_author;
        this.elem_ip = _elem_ip;
        this.elem_date = _elem_date;
        
        if(!data) return;
        else this.data = data;
        
        this.setNum(data.num);
        this.setTitle(data.title);
        this.setArtcon(data.artcon);
        this.setAuthor(data.author);
        this.setDate(data.date);
    }

    ListItem.prototype.setNum = function (str) {
        this.elem_num.textContent = str;
    }
    
    ListItem.prototype.setTitle = function (str) {
        this.elem_title.textContent = str;
    }

    ListItem.prototype.setAuthor = function (str) {
        this.elem_author.textContent = str;
    }

    ListItem.prototype.setIp = function (str) {
        this.elem_ip.textContent = str;
    }

    ListItem.prototype.setDate = function (str) {
        this.elem_date.textContent = str;
    }
    
    ListItem.prototype.setArtcon = function (strUrl){
        if(!strUrl)
            return this.elem_artcon.innerHTML = "";
        if (!this.elem_artcon.children.length)
            this.elem_artcon.appendChild(document.createElement('img'))
        this.elem_artcon.children[0].src = strUrl;
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
    
    ListItem.prototype.click = function(){
        this.elem.clcik();
    }

    return ListItem;
});