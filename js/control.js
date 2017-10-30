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
    url = url + workspace +"/message?version=2017-05-26&details=true"
  }

  requestApi(role, data);
}

function requestApi(role, data) {

  $.ajax({
    type: 'POST',
    url: url,
    data: JSON.stringify(data),
    headers:{
      Accept: 'application/json',
      'Content-Type': 'application/json',
      //Authorization: "Basic " + credential
      "X-Watson-Authorization-Token":"Zvhe3Bepe2%2FccFCbgd8CxOSW5lU2Gd0AuC8t4plMWeGbUAxocfA3vtysLXjSo5wHO91VgwF54kkOijMAaADGOOJCyhphAW%2B77KdalgkL8fWNRJBCPol5T9qngQ4%2FLzHofWUtr%2FjbWSgaDIah%2BnVLY1rkZzuDDHp%2FCw46msRitX4IjA7DgX7NAR1ZAvt0rz6mFJNKEVJ2Dlb9IUDyxRty3LQX%2BvAm206XcD6G%2BjnOVzw%2FLPsiR6fn2iWzpFeX5DJ7Mz5vFXnC22YTPTNvU7qbU8%2FxdqlRdFYpGXx8ZpTz4WO15WSXywrmE%2B1G7ayfS5k%2FPeQMUcblBHA7qG1Ac5TaBLuV6BcUiFYlM7JLEdI1XsVcDxThCOrD%2B0G%2FCvon5TSWob5MYwr2kQaeGbUq0H40bj12eRXZz0Nfr%2FT3na7Exaz2gG5MEHo7D%2BXFmgumqilX4dfEqA0EL3npHT4FSJUwxrBQGPUdZv5wl61DCxGl9%2B7e7nmfzvJAeN9Zth2hV%2F%2BeRz7yb4yVOJ8RXS43p2PkonQ%2FoNmHemyUuo%2BrWQEZ%2Fsl%2BwVasfnU7kNBO73IzwTTdHBdhUvY7zR7TPXst895VhKXdoZCZpOke1q6Snv6g02Yip1mDlRRy91tDgXu92ukrMOjV5gSHAw8nvYv1NfnaO7tm0XUcPrsuYmL4vxqt8lv7LlckGFjbtvrknlvzLoJVDB6LsnEpOHKfHFtfnGVdsRHqsBiPLcAQZGxPTQN7%2BFbd10fXVJKvybc3gsxy2XjTw4W7QGe%2F8xIgKNneP4aXrcb6N4u5u2XWIO%2Bn%2FsN25Aj9qOmvPP2wJBLJGBC9y0mNT%2BSNlRaKAglT%2Byeh7YdW%2BlW4PJ3SRjYYQ%2BeX1%2BfMfq1XtVJ3MwZwI4QpHAPEV8LBIZL4Pff56YTidvy6w9BAr7EfDE3bHonMBpI5JWCYt5RaMis%2B%2B82ehgnAjKM8eW3zc53Xuf6VZPzTqm1ZzhcUaXa5csdJFwv"
    },
    //contentType: 'application/json',
    // username: username,
    // password: password,
    xhrFields: {
      withCredentials: true
    },
    // beforeSend: function (xhr) {
    //   // var credentials = $.base64.encode(credentials);
    //   xhr.setRequestHeader("Authorization", "Basic " + credential);
    // },
    
    dataType: 'json', //データをjson形式で飛ばす
  
    success: function (json_data) {   // 200 OK時
      // JSON Arrayの先頭が成功フラグ、失敗の場合2番目がエラーメッセージ
      console.log(json_data.output.text[0]);
      context = json_data.context;
      addMessage(role, json_data.output.text[0]);
    },
    error: function () {         // HTTPエラー時
      alert("Server Error. Pleasy try again later.");
    },
    complete: function () {      // 成功・失敗に関わらず通信が終了した際の処理
    }
  })


  // var request = new XMLHttpRequest();

  // request.open("POST", url);
  // request.setRequestHeader('Authorization', 'Basic ' + credential);
  // request.setRequestHeader('Content-Type', 'application/json');
  // request.withCredentials = true;
  // request.onreadystatechange = function () {
  //   if (request.readyState != 4) {
  //     // リクエスト中
  //   } else if (request.status != 200) {
  //     console.log(request);
  //   } else {
  //     // 取得成功
  //     console.log(request);
  //     json = JSON.parse(request.responseText);
  //     addMessage(role, json.output.text);
  //   }
  // };
  // request.send(JSON.stringify(data));
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
    addMessage(role, text);
    requestApi("bot", data);  
  }
}