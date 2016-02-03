/*
    parser/gall.js
    parse gall info using xml
*/
define(['./queryString'],function (qs) {
    function gall(xml) {
        url = xml.location.href;

        var rst = new Object;
        rst['id'] =  qs('id', url);
        rst['page'] = qs('page', url);
        rst['name'] = xml.getElementById('dgn_gallery_left')
            .getElementsByClassName('gallery_title')[0]
            .getElementsByClassName('tit')[0]
            .textContent.trim();
        
        return rst;
    }

    return gall;
});