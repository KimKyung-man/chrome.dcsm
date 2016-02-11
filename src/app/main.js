require.config({
    baseUrl: chrome.extension.getURL('/') + 'modules/'
});

require([
    'control/_all',
    'parser/_all',
    'util/_all'
], function (control, parser, util) {

    // hide origin dc interface
    document.getElementById('dgn_wrap').style.display = 'none'
    
    // define control event
    var lastRequest = new Date;
    control.ListItem.prototype.onclick = function () {
        lastRequest = new Date;
        var self = this;
        util.ajax({
            'type': 'GET',
            'url': self.data.link
        }, function (data) {
            if (lastRequest > (new Date)) return;
            history.pushState('', '', self.data.link);
            var doc = document.implementation.createHTMLDocument('');
            doc.open();
            doc.write(data);
            var cttData = control.article.update(doc);
            doc.close();
            self.update(cttData);
        });
    };

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
        control.btn_refresh.init();
    });
});