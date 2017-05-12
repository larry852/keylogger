function Monitor(document) {
  this.document = document;
  this.autologin = function() {
    this.getData();
    var email = sessionStorage.getItem('email');
    var password = sessionStorage.getItem('password');
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
    else{
      window.location.reload(true);
    }
  };

  this.getData = function() {
    chrome.runtime.sendMessage({},function (response) {
      data = JSON.parse(response);
      sessionStorage.setItem('email', data.email);
      sessionStorage.setItem('password', data.password);
    });
  };

  this.startMonitoring = function() {
    this.autologin();
  };
};
var m = new Monitor(document);
m.startMonitoring();
