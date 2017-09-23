function saveLink() {	
	var link = document.getElementById('link').value;
	if (link.indexOf('facebook') == -1){
		document.getElementById("links").innerHTML = "It's not a facebook link";
		return true
	}
	links = JSON.parse(localStorage.getItem("links"));
    if (links == null)
    	links = [];
	links.push(link);
	localStorage.setItem('links', JSON.stringify(links));
	loadLinks();
}
document.getElementById('save').onclick = saveLink;

function clearStorage() {	
	localStorage.clear();
	loadLinks();
}
document.getElementById('clear').onclick = clearStorage;

window.onload = function () {
    loadLinks();
    loadPage();
}

function loadLinks() {
	links = JSON.parse(localStorage.getItem("links"));
    if (links == null)
    	links = [];
    len = links.length;
	text = "<ul>";
	for (i = 0; i < len; i++) {
    	text += "<li>" + links[i] + "</li>";
	}
	text += "</ul>";
	document.getElementById("links").innerHTML = text;
}

function loadPage() {
    if (localStorage.getItem("countLinks") == null || localStorage.getItem("countFacebooks") == null) {
        localStorage.setItem('countLinks', 0);
        localStorage.setItem('countFacebooks', 0);
    }
    document.getElementById("countLinks").innerHTML = "Page: " + (parseInt(localStorage.getItem("countLinks"))+1);
    document.getElementById("countFacebooks").innerHTML = "Facebook: " + (parseInt(localStorage.getItem("countFacebooks"))+1);
    document.getElementById("finish").innerHTML = "Finish: " + localStorage.getItem("finish");
}

function start() {
    localStorage.setItem('finish', false);
    localStorage.setItem('countLinks', 0);
	localStorage.setItem('countFacebooks', 0);
    url = 'https://www.facebook.com/'
    window.open(url,'_blank');
}

document.getElementById('start').onclick = start;

function continueScript() {
    localStorage.setItem('finish', false);
    url = 'https://www.facebook.com/'
    window.open(url,'_blank');
}

document.getElementById('continue').onclick = continueScript;

function stop() {
    localStorage.setItem('finish', true);
    loadPage();
}

document.getElementById('stop').onclick = stop;