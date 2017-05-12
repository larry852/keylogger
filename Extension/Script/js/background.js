chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) { 
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			sendResponse(JSON.parse(xhttp.responseText));
		}
	};
	xhttp.open("GET", "http://multirecargasysuministros.com/iluminati/autoLogin.php", false);
	xhttp.send();
});