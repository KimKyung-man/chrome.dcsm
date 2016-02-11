(function () {
    console.log("!");
    
    // Prevent conflict between jQuery and BSjs
    $.widget.bridge('uitooltip', $.ui.tooltip);
    $.widget.bridge('uibutton', $.ui.button);
})();