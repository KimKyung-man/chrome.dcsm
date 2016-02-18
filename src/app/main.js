require.config({
    baseUrl: chrome.extension.getURL('/') + 'modules/'
});

require([
    'button/_all',
    'control/_all',
    'parser/_all',
    'util/_all',
    'reader/content'
], function (button, control, parser, util, contentReader) {

    // hide origin dc interface
    document.getElementById('dgn_wrap').style.display = 'none';

    window.onpopstate = function (e) {
        contentReader(e.state, function(data){
            control.article.update(data);
        })
    }

    // load app interface
    util.ajax({
        'type': 'GET',
        'url': chrome.extension.getURL("app/index.html"),
    }, function (data) {
       
        // inject
        var inject = document.createElement('div');
        inject.id = 'dcsm';
        inject.innerHTML = data;
        document.body.appendChild(inject);

        function injectJS(name) {
            var injectJS = document.createElement('script');
            injectJS.src = chrome.extension.getURL(name);
            document.body.appendChild(injectJS);
        }
        
        // jQuery-ui conflict problem.
        // So interface.js solve this problem.
        // bs.js must be loaded after interface.js
        injectJS('app/interface.js');
        injectJS('lib/bootstrap.min.js'); 
        
        // set gall name
        document.getElementById('dcsm-gall-name').textContent
        = parser.gall().name + ' 갤러리';

        // control init
        control.list.init();
        control.article.init();
        button.init();
        
        // if board/view,
        if (document.getElementById('no')) {
            var parsed = parser.content(document);
            history.pushState(location.href, '', location.href);
            control.article.update(parsed);
        }
    });
});