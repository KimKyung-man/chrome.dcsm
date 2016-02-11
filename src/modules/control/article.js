/*
    control/article.js
*/
define([
    './content',
    './comment',
    './form_comment_write',
    'parser/_all'
],function (content, comment, form_cmt_wr, parser) {
    var mask;
    
    var article = {
        init: function () {
            content.init();
            comment.init();
            form_cmt_wr.init(function(datam, cttData){
                comment.refresh(cttData);
            });
            mask = document.getElementById('dcsm-article-mask');
        },
        update: function (xml) {
            var cttData = parser.content(xml);
            
            content.update(cttData);
            comment.refresh(cttData);
            form_cmt_wr.update(cttData);
            
            if(mask.style.display !== 'none')
                mask.style.display = 'none';
                
            return cttData;
        },
        name: 'article'
    }

    return article;
});