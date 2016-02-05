/*
    auth/status.js
    check login status
*/
define(function () {
	/*
		if logged-in, return user id
		else return null
	*/
    function status(xml) {
        var id = xml.getElementById('favorite_gallog_img')
            .href.split('.com/')[1];
        return id ? id : null;
    }
    return status;
});