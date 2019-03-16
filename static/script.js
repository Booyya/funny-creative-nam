var socket = new WebSocket("ws://"+location.host+"/chatWS")
var submit = document.getElementById("SubmitButton");
var input = document.getElementById("inputText");
var messagesHistory = [];
var user = "";
var startTime;
var firstMessage = true;
//When the user hits enter, send thing to all
function submitText(){
  if(document.getElementById("inputText").value.trim() != ""){
    var username = getUrlParameter("username");
    console.log(document.getElementById("inputText").value);
    socket.send(username + ": " + document.getElementById("inputText").value);
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
}

function join(){
  var username = getUrlParameter("username");
  if(document.getElementById("messages").innerHTML==null){
     socket.send(getUrlParameter("username")+" has joined.");
  }
  else{
   socket.send(document.getElementById("messages").innerHTML+"<br />"+getUrlParameter("username")+" has joined.");
  }
  
}



function addToChat(thingToAdd){
  var username = getUrlParameter("username");
  document.getElementById("messages").innerHTML= document.getElementById("messages").innerHTML+"<br />"+thingToAdd;
    messagesHistory.push(document.getElementById("messages").innerHTML+"<br />"+username+": "+thingToAdd);
    

}
socket.addEventListener('open', function (event) {
});




// Listen to messages 
socket.addEventListener('message', function (event) {
    if(firstMessage){
      startTime = event.data
      firstMessage=0;
    }
    else{
      console.log('Message from server ', event.data);
      addToChat(event.data);}
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

function timer(){
  var currTime = new Date().getTime();
  distance = 20000-(startTime-currTime);
  console.log(startTime)
  console.log(currTime)
  console.log(distance)
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60).toString());
  var seconds = Math.floor((distance % (1000 * 60)) / 1000).toString();
  if(seconds.length < 2){
    seconds = "0" + seconds
  }
  if(minutes.length < 2){
    minutes = "0" + minutes
  }
  document.getElementById('timerButton').value = "0:" + minutes + ":" + seconds;
  if (document.getElementById('timerButton').value =="0:00:00"){
    document.documentElement.innerHTML = '';
  }
  }

function verify(){
  document.getElementById('timerText').disable=true;
  }

// var keypress = require('keypress');
//   var key = event.which || event.keyCode;
//   console.log("key pressed");
//   if (key==13) {
//     submitText();
//   }
