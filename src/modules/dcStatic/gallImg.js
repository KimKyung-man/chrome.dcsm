/*
    parser/gallImg.js
    parse gallImg
*/
define(function () {
    function gallImg(id) {
        if(!id) return null;
        
        var baseURL = 'http://zzbang.dcinside.com/'
        var suffix = '_temp.jpg'

        return baseURL + id + suffix;
    }

    return gallImg;
});