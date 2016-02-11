(function () {
    console.log("!");
    
    $.widget.bridge('uitooltip', $.ui.tooltip);
    $.widget.bridge('uibutton', $.ui.button);
})();