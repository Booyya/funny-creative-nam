var socket = new WebSocket("WSS://"+location.host+"/chatWS")
var submit = document.getElementById("SubmitButton");
var input = document.getElementById("inputText");
var messagesHistory = [];
var user = "";
var firstMessage = true;
var endTime;
//When the user hits enter, send thing to all
function submitText(){
  if(document.getElementById("inputText").value.trim() != ""){
    var username = getUrlParameter("username");
    console.log(document.getElementById("inputText").value);
    socket.send(username + ": " + document.getElementById("inputText").value);
    el.innerH
    socket.send("<br />");
    document.getElementById("inputText").value = "";
    document.getElementById("inputText").focus();
  }
}
window.addEventListener("beforeunload", function(e){
   leave();
}, false);
function leave(){
  var username = getUrlParameter("username");
  /*document.getElementById("messages").innerHTML=*/ socket.send(getUrlParameter("username")+" has left.");
  socket.send("<br />");
}

function join(){
  var username = getUrlParameter("username");
  if(document.getElementById("messages").innerHTML==null){
    document.getElementById("messages").textContent= socket.send(getUrlParameter("username")+" has joined.");
  }
  else{
    document.getElementById("messages").innerText= socket.send(document.getElementById("messages").textContent+getUrlParameter("username")+" has joined.");
    socket.send("<br />");
  }
  
}



function addToChat(thingToAdd){
  var username = getUrlParameter("username");
  document.getElementById("messages").textContent= document.getElementById("messages").textContent+"\n"+thingToAdd;
    messagesHistory.push(document.getElementById("messages").textContent+"\n"+username+": "+thingToAdd);
    

}
socket.addEventListener('open', function (event) {
});




// Listen to messages 
socket.addEventListener('message', function (event) {
    if(firstMessage){
      endTime = event.data;
      firstMessage = 0
    }
    console.log('Message from server ', event.data);
    addToChat(event.data);
});

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

function toChat(){
  window.location = "chat.html";
}

function timer(endTime){
  var currTime = new Date().getTime();
  var distance = 3600000-(currTime-endTime);
  var minutes = Math.floor((distance % (1000 * 60 *60)) / (1000 * 60)).toString();
  var seconds = Math.floor((distance % (1000 * 60)) / 1000).toString();
  if(seconds.length < 2){
    seconds = "0" + seconds
  }
  if(minutes.length < 2){
    minutes = "0" + minutes 
  }
  document.getElementById('timerButton').value = "0" + ":" + minutes + ":" + seconds;
  }
function verify(){
  var cookieMonster = document.cookie;
  console.log(cookieMonster);
  alert('this is an alert')
  if(cookieMonster.length == 0){
    alert("continued here");
    document.cookie += "username="+document.getElementById("username") + "; expires=" + new Date(new Date().getTime()+360000) + "; path=/";
    document.getElementById("timerButton").value = "1:00:00"
    endTime = new Date().getTime();
    console.log(Date(endTime))
    socket.send(endTime);
    clearInterval(g);
    location.reload();
  }
  else{
    alert("hola")
    document.getElementById("timerText").disabled = true;
  }
}

// var keypress = require('keypress');
//   var key = event.which || event.keyCode;
//   console.log("key pressed");
//   if (key==13) {
//     submitText();
//   }
