/*
    parser/queryString.js
    parse queryString
*/
define(function () {

    // http://stackoverflow.com/a/901144
    // thank you jolly.exe
    function queryString(name, url) {
        name = name.replace(/[\[\]]/g, "\\$&");
        url = url ? url : window.location.href;

        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)")
        var results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';

        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    return queryString;
});