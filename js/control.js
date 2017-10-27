var context = "";
var url = ""
var credential = "";
var roleParam = {
  user:  { side: "right",  image: "user.png" },
  bot:   { side: "left",   image: "watson-logo.png" }
};


function connect() {
  var username = $('.form-group [name=username]').val();
  var password = $('.form-group [name=password]').val();
  var workspace = $('.form-group [name=workspace]').val();
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
  var request = new XMLHttpRequest();

  request.open("POST", url);
  request.setRequestHeader('Authorization', 'Basic ' + credential);
  request.setRequestHeader('Content-Type', 'application/json');
  request.withCredentials = true;
  request.onreadystatechange = function () {
    if (request.readyState != 4) {
      // リクエスト中
    } else if (request.status != 200) {
      console.log(request);
    } else {
      // 取得成功
      console.log(request);
      json = JSON.parse(request.responseText);
      addMessage(role, json.output.text);
    }
  };
  request.send(JSON.stringify(data));
}

function addMessage(role, text) {
  var imageDiv   = "<div id='icon' class='media-" + roleParam[role]["side"] + "'><img src='img/" + roleParam[role]["image"] + "'></div>";
  var messageDiv = "<div class='media-body " + roleParam[role]["side"] + "-body'><div>" + text + "</div></div>"
  context = json.context;
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
    addMessage(role, text);
    requestApi("bot", data);  
  }
}