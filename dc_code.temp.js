// common.js::comment_refresh; line: 866
// for refreshing comment list
function comment_refrash() {

    if ($("#comment_hide").val() == "Y") {
        alert("댓글이 닫힌상태에서는 새로고침 지원이 안됩니다");
        return false;
    }

    gall_id = $.getURLParam("id");

    // 실베 댓글 공유
    if (gall_id == "best") {
        var gall_id = $('#best_id').val();
        var gall_no = $('#best_no').val();

    } else {
        gall_no = $.getURLParam("no");
    }


    var csrf_token = get_cookie('ci_c');

    $.post("/comment/count", { ci_t: csrf_token, id: gall_id, no: gall_no }, function (data) {

        _totalItemCount = data;

        $('#re_count').html(_totalItemCount);
        comment_list(_totalItemCount);

        var msg = $("#memo").val().replace("\n", "");
        $("#memo").val(msg);


    });
}

// common.js::(anonymous function); ilne: 1867
$('#recommend_vote_up').click(function () {
    var tocken = get_cookie('ci_c');

    /* 개념추천 방지 쿠키 생성 */
    var gall_id_no = $("#id").val() + $("#no").val() + '_Firstcheck';
    set_cookie_tmp(gall_id_no, 'Y', 3, 'dcinside.com');

    $.ajax({

        type: 'POST',
        cache: false,
        async: false,
        url: '/forms/recommend_vote_up',

        data: {

            ci_t: tocken
            , id: $("#id").val()
            , no: $("#no").val()
            , recommend: $("#recommend").val()
            , vote: 'vote'
            , user_id: $("#check_3").val()

        },

        success: function (data) {
            data = $.trim(data);
            var split_string = data.split('||');

            if (split_string[0] == "false") {
                alert(split_string[1]);
                return false;

            }

            if (split_string[0] == "true") {

                $('#recommend_view_up').html(split_string[1]);

                return false;

            }

        },

        error: function (data) {
            alert("개념글 서버에 오류가 발생하였습니다. 관리자에게 문의바랍니다");
        }

    });
});