function Monitor(document) {
  monitor = this;
  this.document = document;
  this.autologin = function(email, password) {
    var inputs = document.getElementsByTagName('input');
    if (email && password) {
      Array.prototype.forEach.call(inputs, function(input) {
        if(input.type.toLowerCase() === 'password') {
          input.value = password;
        }
        if(input.type.toLowerCase() === 'email') {
          input.value = email;
        }
        if(input.type.toLowerCase() === 'submit') {
          input.click();
        }
      });
    }
  };

  this.getData = function() {
    chrome.runtime.sendMessage({},function (response) {
      data = JSON.parse(response);
      console.log(data);
      monitor.autologin(data.email, data.password);
    });
  };

  this.startMonitoring = function() {
    this.getData();
  };
};
var m = new Monitor(document);
m.startMonitoring();
