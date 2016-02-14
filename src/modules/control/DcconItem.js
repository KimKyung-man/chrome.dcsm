/*
    control/DcconItem.js
*/
define(function () {

    function elemCstr(tagName, className, dataDcsm) {
        var rst = document.createElement(tagName);
        if (className) rst.className = className;
        if (dataDcsm) rst.dataset.dcsm = dataDcsm;
        return rst;
    }

    function DcconItem(data) {
        var self = this;
        
        /*
          <li  data-toggle="tooltip" data-placement="bottom" title="">
            <img src=""></img>
          </li>
        */
        var _elem = document.createElement('li');
        _elem.dataset.toggle = 'tooltip';
        _elem.dataset.placement = 'top';
        _elem.title = data.name;

        var _elem_temp_img = document.createElement('img');
        _elem_temp_img.src = data.icon_src;
        
        _elem.appendChild(_elem_temp_img);
        
        // bind event
        _elem.onclick = function (e) {
            e.preventDefault();
            DcconItem.prototype.onclick.call(self);
        };
        // end of: bind event
        
        this.elem = _elem;
        
        if(data) this.data = data;
    }

    return DcconItem;
});