/*
    control/comment.js
*/
define([
    './DcconItem',
    'parser/_all',
    'util/_all'
], function (DcconItem, parser, util) {

    var modal = null;
    var head = null;
    var body = null;
    var csrf_token = null;
    var parsed = null;

    function makeList(data) {
        data = data || parsed;
        for (var i in data) {
            // logic: create elem
            /* //head
               <li role="presentation" >
                 <a href="#dcsm-dccon-list-{data.index}" role="tab" data-toggle="tab">{data.name}</a>
               </li >
            
               // body
               <div role="tabpanel" class="tab-pane" id="dcsm-dccon-list-{data.index}">
                 <ul class="clearfix"><li>{data.items}</li></ul>
               </div>
            */
            var itemId = 'dcsm-dccon-list-' + data[i].index;
            
                // head
            var _elem_temp_a = document.createElement('a');
            var _elem_head = document.createElement('li');
            
            _elem_temp_a.href = '#' + itemId;
            _elem_temp_a.dataset.toggle = 'tab';
            _elem_temp_a.setAttribute('role', 'tab');
            _elem_temp_a.textContent = data[i].name;
            _elem_head.setAttribute('role', 'presentation');
            _elem_head.appendChild(_elem_temp_a);
            
                // body
            var _elem_temp_ul = document.createElement('ul');
            var _elem_body = document.createElement('div');
            
            _elem_temp_ul.className = 'clearfix';
            _elem_body.id = itemId;
            _elem_body.setAttribute('role', 'tabpanel');
            _elem_body.className = 'tab-pane';
            _elem_body.appendChild(_elem_temp_ul);
            // end of: logic
            
            head.appendChild(_elem_head);
            body.appendChild(_elem_body);
            
            var items = data[i].items
            for(var j in items){
                var item = new DcconItem(items[j]);
                _elem_temp_ul.appendChild(item.elem);
            }
        }
        
        // activate first
        head.firstChild.classList.add('active');
        body.firstChild.classList.add('active');
    }

    var dccon = {
        name: 'dccon',
        init: function () {
            modal = document.getElementById('dcsm-dccon');
            head = document.getElementById('dcsm-dccon-list-head');
            body = document.getElementById('dcsm-dccon-list-body');
            csrf_token = util.getCookie('ci_c');

            util.ajax({
                'type': 'POST',
                'url': '/dccon/lists',
                'data': {
                    'ci_t': csrf_token,
                    'target': 'icon',
                    'arr_idx': []
                },
            }, function (data) {
                var temp = document.createElement('div');
                temp.innerHTML = JSON.parse(data).html;
                makeList(parsed = parser.dccon(temp));
            });
        }
    }

    return dccon;
});