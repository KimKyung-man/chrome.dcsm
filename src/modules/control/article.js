/*
    control/article.js
*/
define([
    './content',
    './comment',
    './form_comment_write',
    'parser/_all',
    'reader/content'
], function (content, comment, form_cmt_wr, parser, contentReader) {
    var mask;

    var article = {
        elem: null,
        init: function () {
            article.elem = document.getElementById('dcsm-content');
            content.init();
            comment.init();
            form_cmt_wr.init(function (datam, cttData) {
                comment.refresh(cttData);
            });
            mask = document.getElementById('dcsm-article-mask');
        },
        update: function (data, srcItem) {
            
            // add content A-tag event
            // it will be moved to module
            var tag_a = data.content.getElementsByTagName('a');
            var checker1 = /(http:\/\/gall.dcinside.com)?\/board\/view\/\?(((id=[a-zA-Z0-9]+)|(no=[0-9]+))&?)+/i;
            var checker2 = /(http:\/\/gall.dcinside.com)?\/[a-z0-9]+\/[0-9]+/i;
            for (var i = 0; i < tag_a.length; ++i) {
                var matched = checker1.exec(tag_a[i].href);
                var targetURL = null
                if (matched) {
                    targetURL = matched[0];
                } else {
                    matched = checker2.exec(tag_a[i].href);
                    if (matched) {
                        var temp = matched[0].split('/');
                        var num = temp.pop();
                        var id = temp.pop();
                        targetURL = 'http://gall.dcinside.com/board/view/?page=1&id=' + id + '&no=' + num;
                    }
                }

                if (targetURL) tag_a[i].addEventListener('click', function (e) {
                    e.preventDefault();
                    contentReader(targetURL, function (data) {
                        article.update(data);
                    })
                })
            }
            // end of: add content A-tag event

            content.update(data);
            comment.refresh(data);
            form_cmt_wr.update(data);
            if (srcItem) srcItem.update(data);

            if (mask.style.display !== 'none')
                mask.style.display = 'none';
        },
        name: 'article'
    }

    return article;
});