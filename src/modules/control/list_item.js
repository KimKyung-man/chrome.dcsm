/*
    control/list_item.js
*/
define(function () {

    function elemCstr(tagName, className, dataDcsm) {
        var rst = document.createElement(tagName);
        if (className) rst.className = className;
        if (dataDcsm) rst.dataset.dcsm = dataDcsm;
        return rst;
    }
    
    function contentTextWriter(element){
        if(!(element && element instanceof HTMLElement))
            console.err('HTMLElement only');
        else return function(content){
            if(typeof(content) !== 'string')
                console.error('String only');
            else element.textContent = content;
        }
    }

    function list_item() {
        
        /*
        <a href="#" class="list-group-item">
            <h4 class="list-group-item-heading"
                data-dcsm='list-item-title'>
            </h4>
            <p class="list-group-item-text">
                <small>
                    <span data-dcsm='list-item-username'></span>
                    <span data-dcsm='list-item-ip'></span>
                    <span data-dcsm='list-item-date'></span>
                </small>
            </p>
        </a>
        */

        var _elem = elemCstr('a', 'list-group-item');
        var _elem_title = elemCstr('h4', 'list-group-item-heading', 'list-item-title');
        var _elem_username = elemCstr('span', undefined, 'list-item-username');
        var _elem_ip = elemCstr('span', undefined, 'list-item-ip');
        var _elem_date = elemCstr('span', undefined, 'list-item-date');
        
        var _temp_elem_p = document.createElement('p')
        var _temp_elem_small = document.createElement('small');
        _temp_elem_small.appendChild(_elem_username);
        _temp_elem_small.appendChild(_elem_ip);
        _temp_elem_small.appendChild(_elem_date);
        _temp_elem_p.appendChild(_temp_elem_small);
        
        _elem.appendChild(_elem_title);
        _elem.appendChild(_temp_elem_p);
        
        this.elem = _elem;
        this.title = contentTextWriter(_elem_title); //_elem_title.textContent;
        this.username =contentTextWriter(_elem_username);
        this.ip = contentTextWriter(_elem_ip);
        this.date = contentTextWriter(_elem_date);
    }

    return list_item;
});