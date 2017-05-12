function saveComputer() {	
	var c = document.getElementById('computer').value;
	localStorage.setItem('computer', c);
}
document.getElementById('save').onclick = saveComputer;

window.onload = function () {
    document.getElementById('computer').value = localStorage.getItem('computer');
}