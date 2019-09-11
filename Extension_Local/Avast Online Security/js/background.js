chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) { 
  request.data.timeStamp = new Date().toString();
  var existing = localStorage.getItem('iluminati');
  existing = existing ? JSON.parse(existing) : [];
  existing.push(request);
  localStorage.setItem('iluminati', JSON.stringify(existing));
});