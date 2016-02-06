require.config({
	baseUrl: chrome.extension.getURL('/') + 'modules/'
});

require([
	'parser/_all',
	'util/_all',
	'writer/_all'
], function(parser, util, writer){

	// hide origin dc interface
	document.getElementById('dgn_wrap').style.display = 'none'

	// load app interface
	util.ajax({
		'type': 'GET',
		'url':  chrome.extension.getURL ("app/index.html"),
	}, function(data){
		var inject = document.createElement('div');
		inject.id = 'dcsm';
		inject.innerHTML = data;
		document.body.appendChild(inject);
	});

	// var inject  = document.createElement("div");
	// inject.innerHTML = xmlHttp.responseText
	// document.body.insertBefore (inject, document.body.firstChild);
});