/*
    util/ajax.js
*/
define(['jquery-2.2.0.min'], function ($) {
    function ajax(head, cb) {

        // why the fuck doesnt fucking work.
        /*
    	var req = new XMLHttpRequest();
    	var params = (function(){
    		var rst = '';
    		for(var prop in head.data){
    			if(head.data[prop] === undefined) continue;
    			rst = rst + '&' + prop + '=' + head.data[prop];
    		}
    		return rst.slice(1);
    	})();

    	req.open(head.type, head.url, true);
        req.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");

		req.onreadystatechange = function(){
            console.log(req);
        };
    	req.send(params);
        */

        $.ajax({
            'type': head.type,
            'chach': false,
            'async': false,
            'url': head.url,
            'data': head.data ? head.data : null,
            'success': cb,
            'err': cb
        });
    }
    return ajax;
});