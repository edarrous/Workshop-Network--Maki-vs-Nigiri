var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var count = 0

app.use(express.static(__dirname + '/public'));//allows access to public directory


app.get('/jquery', function(req, res){
	count++;
	res.sendFile(__dirname + '/jquery-3.6.4.min.js');
	//
});

var userId = 0;
var jID = 0;

let adminSocket = null;
let unrealSocket = null;

io.on('connection', function(socket){
  socket.userId = userId ++;

  console.log('a user connected, user id: ' + socket.userId);

  socket.on('unreal', function(msg){
	//msg = JSON.parse(msg);
	console.log('unreal connected');
});

  socket.on('spawn', function(msg){
		//msg = JSON.parse(msg);
		console.log('message from user ' + msg.pseudo);
		io.emit("spawn",msg.pseudo);
  });
  
  socket.on('spawn2', function(msg){
	if(!adminSocket){
		adminSocket = socket;
		socket.emit("confirm admin");
	}
	//msg = JSON.parse(msg);
	console.log('message from user ' + msg.pseudo);
	io.emit("spawn2",msg.pseudo);
	io.emit(jID);
});

  socket.on('up', function(msg){
		console.log(msg);
		//msg = JSON.parse(msg);
		console.log("a "+msg.pseudo+" user has pressed up");
		io.emit("up",msg.pseudo);
  });
  
  socket.on('down', function(msg){
		//msg = JSON.parse(msg);
		console.log('user ' + msg.pseudo+" has pressed down");
		io.emit("down",msg.pseudo);
  });
  
  socket.on('right', function(msg){
	//msg = JSON.parse(msg);
	console.log('user ' + msg.pseudo+" has pressed right");
	io.emit("right",msg.pseudo);
});

socket.on('left', function(msg){
	//msg = JSON.parse(msg);
	console.log('user ' + msg.pseudo+" has pressed left");
	io.emit("left",msg.pseudo);
});

socket.on('jump', function(msg){
	//msg = JSON.parse(msg);
	console.log('user ' + msg.pseudo+" has pressed jump");
	io.emit("jump",msg.pseudo);
});

});


http.listen(3000, function(){
	console.log('listening on *:3000');
});