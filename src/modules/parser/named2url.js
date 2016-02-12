/*
    parser/named2url.js
*/
define(function () {
    var src = {
        'icon_txt_n': 'http://nstatic.dcinside.com/dgn/gallery/images/update/icon_text.png',
        'icon_pic_n': 'http://nstatic.dcinside.com/dgn/gallery/images/update/icon_picture.png',
        'icon_notice': 'http://nstatic.dcinside.com/dgn/gallery/images/update/icon_notice.png',
        'icon_pic_b': 'http://nstatic.dcinside.com/dgn/gallery/images/update/icon_picture_b.png',
        'icon_txt_b': 'http://nstatic.dcinside.com/dgn/gallery/images/update/icon_text_b.png',
        'sec_icon': 'http://nstatic.dcinside.com/dgn/gallery/images/update/sec_icon.png',
        'icon_movie': 'http://nstatic.dcinside.com/dgn/gallery/images/update/icon_movie.png'
    };

    function named2url(name) {
        return src[name];
    }

    return named2url;
});