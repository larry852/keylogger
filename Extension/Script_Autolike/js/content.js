function Monitor(document) {
  delay = 10000;
  this.document = document;
  monitor = this;
  this.autoLike = function(link,facebook,finish) {
    if (!finish) {
      if (facebook == null) {
        chrome.runtime.sendMessage({nextPage: false, resetPage: false, finish: true, nextFacebook: false},function (response) {}); 
      }
      else if (link == null) {
        window.onload = function () {
         if (document.URL == "https://www.facebook.com/") {
          document.querySelector('[data-click=profile_icon]').childNodes[0].click();
        }
        setTimeout(function() {
          menu = document.getElementById('userNavigationLabel');
          menu.click();
          monitor.logout();
        }, delay);
      }
    }else if (document.URL == "https://www.facebook.com/") {      
      var email = facebook.formData.email;
      var password = facebook.formData.pass;
      var inputs = document.getElementsByTagName('input'); 
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
      window.onload = function () {
       window.open(link,'_self');        
     }
   }else if (document.URL == link){
    window.onload = function () {
     var buttons = document.getElementsByClassName("likeButton"); 
     if (buttons[0] != undefined) buttons[0].click();
     chrome.runtime.sendMessage({nextPage: true, resetPage: false, finish: false, nextFacebook: false},function (response) {});
     url = 'https://www.facebook.com/'
     window.open(url,'_self');
   }
 }
 else{
  chrome.runtime.sendMessage({nextPage: false, resetPage: true, finish: false, nextFacebook: true},function (response) {});
  setTimeout(function() {
    url = 'https://www.facebook.com/'
    window.open(url,'_self');
  }, delay);
}
}
};

this.getData = function() {
  chrome.runtime.sendMessage({nextPage: false, resetPage: false, finish: false, nextFacebook: false},function (response) {
    monitor.autoLike(response[0],response[1], response[2]);
  });
};

this.logout = function() {
  try {
    document.querySelector("form[action='https://www.facebook.com/logout.php?button_name=logout&button_location=settings']").submit();    
    chrome.runtime.sendMessage({nextPage: false, resetPage: true, finish: false, nextFacebook: false},function (response) {});
  }
  catch(err) {
    setTimeout(function() {monitor.logout()}, 5000);
  }
};

this.startMonitoring = function() {
  this.getData();
};
};
var m = new Monitor(document);
m.startMonitoring();
