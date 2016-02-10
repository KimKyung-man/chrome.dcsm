require.config({
    baseUrl: chrome.extension.getURL('/') + 'modules/'
});

require([
    'control/_all',
    'parser/_all',
    'util/_all',
    'writer/_all'
], function (control, parser, util, writer) {

    // hide origin dc interface
    document.getElementById('dgn_wrap').style.display = 'none'

    // define control event
    control.ListItem.prototype.onclick = function(){
        var self = this;
        util.ajax({
            'type': 'GET',
            'url': self.data.link
        }, function(data){
            var doc = document.implementation.createHTMLDocument('');
            doc.open();
            doc.write(data);
            control.article.update.call(this, doc);
            doc.close();
            control.list.nextPage();
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
        
        // set gall name
        document.getElementById('dcsm-gall-name').textContent
        = parser.gall().name + '갤러리';

        // control init
        control.list.init();
        control.article.init();
    });
});