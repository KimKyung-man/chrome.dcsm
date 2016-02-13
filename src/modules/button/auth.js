/*
    button/auth.js
*/
define([
    'auth/status'
], function (staus) {

    var elem = null;

    var auth = {
        name: 'auth',
        init: function () {
            elem = document.getElementById('dcsm-btn-auth');
            if(staus()){ // logged-in
                elem.classList.add('glyphicon-log-out');
                elem.title = "Logout";
                elem.href = 'https://dcid.dcinside.com/join/logout.php?s_url='
                    + encodeURIComponent(location.href);
            } else {
                elem.classList.add('glyphicon-log-in');
                elem.title = "Login";
                elem.href = 'https://dcid.dcinside.com/join/login.php?s_url='
                    + encodeURIComponent(location.href);
            }
        }
    }

    return auth;
});