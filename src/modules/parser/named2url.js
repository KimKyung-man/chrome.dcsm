/*
    parser/named2url.js
*/
define(function () {
    var src = {
        'icon_txt_n': 'http://nstatic.dcinside.com/dgn/gallery/images/update/icon_text.png',
        'icon_pic_n': 'http://nstatic.dcinside.com/dgn/gallery/images/update/icon_picture.png',
        'icon_notice': 'http://nstatic.dcinside.com/dgn/gallery/images/update/icon_notice.png'
    };

    function named2url(name) {
        return src[name];
    }

    return named2url;
});