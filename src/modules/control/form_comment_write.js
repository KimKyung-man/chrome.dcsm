/*
    control/form_comment_write.js
*/
define(function (list) {
    
    var elem = null;
    var form_data = null;
    
    function form_onsubmit(e){
        e.preventDefault();
        if(form_data === null) alert('Data not updated');
        console.log('!!');
    }
    
    var btn_refresh = {
        name: 'form_comment_write',
        init: function () {
            elem = document.getElementById('dcsm-comment-write');
            elem.onsubmit = form_onsubmit;
        },
        update: function(data){
            form_data = data;
        }
    }

    return btn_refresh;
});