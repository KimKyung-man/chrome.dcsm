/*
    parser/article.js
    parse article info using xml
*/
define(function () {

    var gallid = null;

    function content(xml) {
        var rst = new Object;

        var body = xml.getElementById('dgn_content_de');
        if (!body) return undefined;

        var head = body.children[0].children[0]
            .getElementsByTagName('dd');

        rst['id'] = gallid || (gallid = xml.getElementById('id').value);
        rst['num'] = xml.getElementById('no').value;
        rst['title'] = head[0].textContent;
        rst['user_id'] = head[1].children[0]
            .getAttribute('user_id');
        rst['author'] = rst['user_name']
        = head[1].children[0].getAttribute('user_name');
        rst['viewed'] = head[2].textContent.trim();
        rst['cnt_comment'] = head[3].textContent.trim();
        rst['date'] = body.children[0].children[1].children[0]
            .children[0].children[0].textContent.trim();
        rst['ip'] = body.children[0].children[1].children[0]
            .children[1].textContent.trim();
        rst['content'] = body.children[19] // div.re_gall_box_1
            .children[0].children[0].lastElementChild // table
            .children[0].children[0].children[0] // tbody tr td
            .cloneNode(true);
        rst['btn_rcmmd_up'] = xml
            .getElementById('recommend_vote_up');
        rst['btn_rcmmd_down'] = xml
            .getElementById('recommend_vote_down');
        rst['btn_userhit'] = xml
            .getElementById('confirm_userhit');
        rst['cnt_rcmmd_up']
        = rst['btn_rcmmd_up'].textContent.trim();
        rst['cnt_rcmmd_down']
        = rst['btn_rcmmd_down'].textContent.trim();

        rst['check_6'] = xml.getElementById('check_6').value;
        rst['check_7'] = xml.getElementById('check_7').value;
        rst['check_8'] = xml.getElementById('check_8').value;

        rst['best_id'] = (rst['id'] === 'best')
            ? xml.getElementById('best_id').value : undefined;
        rst['best_no'] = (rst['id'] === 'best')
            ? xml.getElementById('best_no').value : undefined;
        rst['best_fno'] = (rst['id'] !== 'best')
            ? xml.getElementById('best_fno').value : undefined;

        return rst;
    }

    return content;
});