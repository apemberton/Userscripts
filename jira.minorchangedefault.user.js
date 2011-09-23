// ==UserScript==
// @name    Default Confluence Minor Change to True
// @namespace  http://www.andypemberton.com/sandbox/userscripts
// @description  Default the 'minor change' checkbox to true for Confluence
// @match *://*/confluence/pages/editpage.action*
// ==/UserScript==

(function() {

	var editInput = document.getElementById('minorEdit');
	if(minorEdit != null){
		minorEdit.checked = true;
	}

})();
