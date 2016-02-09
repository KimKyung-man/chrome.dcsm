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
            <td><span data-dcsm="author">잠온다</span>
                <span data-dcsm="gallcon"></span></td>
            <td data-dcsm="content"></td>
            <td data-dcsm="date"></td>
        </tr>
        */

        var _elem = elemCstr('tr');
        var _elem_author = elemCstr('span', undefined, 'author');
        var _elem_gallcon = elemCstr('span', undefined, 'gallcon');
        var _elem_content = elemCstr('td', undefined, 'content');
        var _elem_date = elemCstr('td', undefined, 'date');

        var _temp_elem_td = document.createElement('td');

        _temp_elem_td.appendChild(_elem_author);
        _temp_elem_td.appendChild(_elem_gallcon);
        _elem.appendChild(_temp_elem_td);
        _elem.appendChild(_elem_content);
        _elem.appendChild(_elem_date);
        // end of: elem create logic
        
        
        
        this.elem = _elem;
        this.elem_author = _elem_author;
        this.elem_gallcon = _elem_gallcon;
        this.elem_content = _elem_content;
        this.elem_date = _elem_date;
        
        console.log(data);
        if (!data) return;
        else this.data = data;

        this.setAuthor(data.author);
        this.setGallcon(data.gallcon);
        this.setContent(data.content);
        this.setDate(data.date);
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

    CommentItem.prototype.setContent = function (str) {
        this.elem_content.textContent = str;
    }

    CommentItem.prototype.setDate = function (str) {
        this.elem_date.textContent = str;
    }
    
    return CommentItem;
});