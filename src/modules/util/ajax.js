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
      /* 아래의 헤더만 있으면 페이지를 반환함. */
      /* 이전 글 no 가 없으면 페이지를 반환하지 않았던 이유임. */
      // accept text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
        $.ajax({
            'type': head.type,
            'chach': false,
            'async': true,
            'url': head.url,
            'data': head.data ? head.data : undefined,
            'headers': {
              Accept : "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
            },
            'success': cb,
            'err': cb
        });
    }
    return ajax;
});