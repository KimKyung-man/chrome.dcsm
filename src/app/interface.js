(function () {
    // set write button href.
    // i didnt make the module.
    // so sorry about that.
    document.getElementById('dcsm-btn-write').href
    = '/board/write/?id=' + document.getElementById('id').value;
    
    // Prevent conflict between jQuery and BSjs
    $.widget.bridge('uitooltip', $.ui.tooltip);
    $.widget.bridge('uibutton', $.ui.button);
})();