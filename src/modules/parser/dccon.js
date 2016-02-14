/*
    parser/dccon.js
*/
define([
    './queryString'
], function (qs) {

    function dccon(elem) {
        var rst = new Array;
        var pkgs = elem.children;
        for (var i = 0; i < pkgs.length; ++i) {
            var pkg = pkgs[i];
            var pkgHead = pkg.children[0];
            var pkgBody = pkg.children[1];

            var rstItem0 = new Object;
            rstItem0['items'] = new Array;
            rstItem0['name'] = pkgHead.title;
            rstItem0['index'] = pkgHead.getAttribute('package_idx');
            rstItem0['icon_src'] = pkgHead.children[0].src;

            var itemTebs = pkgBody.children;
            for (var j = 0; j < itemTebs.length; ++j) {
                var items = itemTebs[j].children;
                
                for (var k = 0; k < items.length; ++k) {
                    var item = items[k].children[0].children[0];
                    var rstItem1 = new Object;
                    rstItem1['name'] = item.title;
                    rstItem1['packageIndex'] = rstItem0.index; 
                    rstItem1['index'] = item.getAttribute('detail_idx');
                    rstItem1['icon_src'] = item.children[0].src;

                    rstItem0.items.push(rstItem1);
                }
            }
            
            rst.push(rstItem0);
        }
        return rst;
    }

    return dccon;
});