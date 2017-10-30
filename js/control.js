var context = "";
var url = ""
var credential = "";
var password = "";
var username = "";
var workspace = "";

var roleParam = {
  user:  { side: "right",  image: "user.png" },
  bot:   { side: "left",   image: "watson-logo.png" }
};


function connect() {
  username = $('.form-group [name=username]').val();
  password = $('.form-group [name=password]').val();
  workspace = $('.form-group [name=workspace]').val();

  var role = "bot";
  url = "https://gateway.watsonplatform.net/conversation/api/v1/workspaces/"
 
  var data = {};
  if (username == "" || password == "" || workspace == "") {
    $(".alert").removeClass("hidden");
    return;
  } else {
    $(".alert").addClass("hidden");
    credential = window.btoa(username + ':' + password);
    url = url + workspace +"/message?version=2017-05-26"
  }

  requestApi(role, data);
}


function requestApi(role, data) {

  $.ajax({
    type: 'POST',
    url: url,
    data: JSON.stringify(data),
    dataType: 'json',
    headers:{
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: "Basic " + credential
    },

    xhrFields: {
      withCredentials: true
    },
    
    // 200 OK
    success: function (json_data) {   
      console.log(json_data.output.text[0]);
      context = json_data.context;
      addMessage(role, json_data.output.text[0]);
    },
    // HTTP Error
    error: function () {         
      alert("Error Occurred. Reload Browser & Try Again.");
    },

    complete: function () {      
    }
  })
}


function addMessage(role, text) {
  var imageDiv   = "<div id='icon' class='media-" + roleParam[role]["side"] + "'><img src='img/" + roleParam[role]["image"] + "'></div>";
  var messageDiv = "<div class='media-body " + roleParam[role]["side"] + "-body'><div>" + text + "</div></div>"
   
  if (role == "bot") {
    message = $("<div id='" + roleParam[role]["side"] + "' class='media'>" + imageDiv + messageDiv + "</div>");
  } else {
    message = $("<div id='" + roleParam[role]["side"] + "' class='media'>" + messageDiv + imageDiv + "</div>");
  }

  $(".card-block").append(message);  
  $('html, body').animate({scrollTop: $(document).height()}, 10);
  $('#input').val('').focus();
}


function reset() {
  $(".card-block").empty();
  connect();
}


function userInput(){
  var text = $('.input-group [name=userinput]').val();
  var role = "user";
  var data = { "input": { "text": text }, "alternate_intents": true, "context":context }
  if (text == "") {
    return;
  } else {
    if (username == "" || password == "" || workspace == "") {
      $(".alert").removeClass("hidden");
      return;
    } else {
      $(".alert").addClass("hidden");
      addMessage(role, text);
      requestApi("bot", data);  
    }
  }
}