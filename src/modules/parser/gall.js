/*
    parser/gall.js
    parse gall info using xml
*/
define([
    './queryString',
    'dcStatic/gallImg'
],function (qs, gimg) {
    function gall(xml) {
        var url = this.url;

        var rst = new Object;
        rst['id'] =  qs('id', url);
        rst['page'] = qs('page', url);
        rst['name'] = xml.getElementById('dgn_gallery_left')
            .getElementsByClassName('gallery_title')[0]
            .getElementsByClassName('tit')[0]
            .textContent.trim();
        rst['img'] = gimg(rst['id']);
        
        return rst;
    }

    return gall;
});