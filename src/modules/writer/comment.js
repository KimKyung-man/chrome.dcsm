/*
    write/comment.js
    write comment
*/
define([
    'util/_all',
    'parser/_all'
], function (util, parser) {
    //TODO
    function comment(xml, name, password, content, cb) {
        if (!(xml && name && password && content)) {
            console.err('Expectation Failed');
            return false
        };

        var gallInfo = parser.gall(xml);

        util.ajax({
            'type': 'POST',
            'url': '/forms/comment_submit',
            'data': {
                'ci_t': xml.getElementsByName('ci_t')[0].value,
                'name': (name === true)
                    ? undefined : name,
                'password': (password === true)
                    ? undefined : password,
                'memo': content,
                'id': (gallInfo.id === 'best')
                    ? xml.getElementById('best_id').value
                    : gallInfo.id,
                'no': (gallInfo.id === 'best')
                    ? xml.getElementById('best_no').value
                    : xml.getElementById('no').value,
                'best': (gallInfo.id === 'best')
                    ? 'BEST' : '',
                'best_pno': xml.getElementById('no').value,
                'best_orgin': (gallInfo.id !== 'best')
                    ? xml.getElementById('best_fno').value
                    : '',
                'check_6': xml.getElementById('check_6').value,
                'check_7': xml.getElementById('check_7').value,
                'check_8': xml.getElementById('check_8').value,
                'campus': 0,
                'recommend': 0
            }
        }, function (data) {
            console.log(data);
        });
    }

    return comment;
});