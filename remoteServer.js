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

let adminSocket = null;
let j2 = null;
let j3 = null;
let j4 = null;

io.on('connection', function(socket){
  socket.userId = userId ++;

  console.log('a user connected, user id: ' + socket.userId);


  socket.on('spawn', function(msg){
		//msg = JSON.parse(msg);
		console.log('message from user ' + msg.pseudo);
		io.emit("spawn",msg.pseudo);
  });

  
  
  socket.on('launch', function(){
	if(!adminSocket){
		adminSocket = socket;
		console.log("admin set");
		io.emit("connectPlayer",1);
	} else if(!j2){
		j2 = socket;
		console.log("j2 set");
		io.emit("connectPlayer",2);
	} else if(!j3){
		j3 = socket;
		console.log("j3 set");
		io.emit("connectPlayer",3);
	} else if(!j4){
		j4 = socket;
		console.log("j4 set");
		io.emit("connectPlayer",4);
	} else 
		socket.emit("wait player");
});

socket.on('start', function(){
	console.log("La partie commence");
	io.emit("start");
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