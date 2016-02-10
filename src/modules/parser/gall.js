/*
    parser/gall.js
    parse gall info using xml
*/
define([
    './queryString'
],function (qs, gimg) {
    var parsed = null;
    
    function gall() {
        if(parsed) return parsed
        
        var url = document.location.href;
        
        var rst = new Object;
        rst['id'] =  qs('id', url);
        rst['page'] = qs('page', url);
        rst['name'] = document.getElementById('dgn_gallery_left')
            .getElementsByClassName('gallery_title')[0]
            .getElementsByClassName('tit')[0]
            .textContent.trim();
        
        parsed = rst;
        return rst;
    }

    return gall;
});