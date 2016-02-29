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

    function CommentItem(data) {
        var self = this;
        // elem create logic
        /*
        <tr>
            <td><span data-dcsm="author"></span>
                <span data-dcsm="gallcon"></span></td>
            <td><span data-dcsm="content"></span>
                <small data-dcsm="ip"></small></td>
             <td>
             <span data-dcsm="date"></span>
             <span data-dcsm="delete_btn"></span>
             </td>
        </tr>
        */

        var _elem = elemCstr('tr');
        var _elem_author = elemCstr('span', undefined, 'author');
        var _elem_gallcon = elemCstr('span', undefined, 'gallcon');
        var _elem_content = elemCstr('span', undefined, 'content');
        var _elem_ip = elemCstr('small', undefined, 'ip');
        var _elem_date = elemCstr('span', undefined, 'date');
        var _elem_delete_btn = elemCstr('span', undefined, 'delete_btn');

        var _temp_elem_td1 = document.createElement('td');
        var _temp_elem_td2 = document.createElement('td');
        var _temp_elem_td3 = document.createElement('td');

        _temp_elem_td1.appendChild(_elem_author);
        _temp_elem_td1.appendChild(_elem_gallcon);
        _temp_elem_td2.appendChild(_elem_content);
        _temp_elem_td2.appendChild(_elem_ip);
        _temp_elem_td3.appendChild(_elem_date);
        _temp_elem_td3.appendChild(_elem_delete_btn);

        _elem.appendChild(_temp_elem_td1);
        _elem.appendChild(_temp_elem_td2);
        _elem.appendChild(_temp_elem_td3);
        // end of: elem create logic

        this.elem = _elem;
        this.elem_author = _elem_author;
        this.elem_gallcon = _elem_gallcon;
        this.elem_content = _elem_content;
        this.elem_ip = _elem_ip;
        this.elem_date = _elem_date;
        this.elem_delete_btn = _elem_delete_btn;

        if (!data) return;
        else this.data = data;

        this.setAuthor(data.author);
        this.setGallcon(data.gallcon);
        this.setContent(data.content);
        this.setIp(data.ip);
        this.setDate(data.date);
        this.setDeleteBtn(data.delete_btn);
    }

    CommentItem.prototype.setAuthor = function (str) {
        this.elem_author.textContent = str;
    }

    CommentItem.prototype.setGallcon = function (strUrl) {
        if(!strUrl)
            return this.elem_gallcon.innerHTML = "";
        if (!this.elem_gallcon.children.length)
            this.elem_gallcon.appendChild(document.createElement('img'))
        this.elem_gallcon.children[0].src = strUrl;
    }

    CommentItem.prototype.setContent = function (content) {
        if(content instanceof HTMLImageElement){ // dccon
            this.elem_content.appendChild(content);
        } else this.elem_content.textContent = content;
    }

    CommentItem.prototype.setIp = function (str) {
        this.elem_ip.textContent = str;
    }

    CommentItem.prototype.setDate = function (str) {
        this.elem_date.textContent = str;
    }

    CommentItem.prototype.setDeleteBtn = function (deleteBtn) {
        if(deleteBtn === null) return;
        this.elem_delete_btn.appendChild(deleteBtn);
    }

    return CommentItem;
});