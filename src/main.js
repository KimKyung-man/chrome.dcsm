require.config({
	baseUrl: chrome.extension.getURL('/') + 'modules/'
});

require([
	'parser/_all',
	'writer/_all'
], function(parser, writer){
    
});