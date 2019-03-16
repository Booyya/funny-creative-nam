var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);
var clientList = [];
var endTime = new Date().getTime();

app.ws('/chatWS', function(ws, req) { ws.send(endTime);
  ws.on('message', function(msg) {
    for(var i = 0;i<clientList.length;i++){
      try{
      if(new Date().getTime() - 10000 < msg < new Date().getTime()+10000){
        endTime = new Date().getTime();
      }
      else{
      clientList[i].send(msg);
      console.log(req);
      }}
      catch(e){
        console.log(e);
      }
    }
  });
  clientList.push(ws);
  ws.on('close',function(){
    for(var i=0;i<clientList.length;i++){
      if (clientList[i] == ws) {
        clientList.splice(i, 1); 
        
      }
    }
    //leave();
  });
});

app.use(express.static("static"))
app.listen(3000,()=>console.log("server started"));
