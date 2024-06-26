var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var count = 0

//Partager les dossiers

app.use(express.static(__dirname + '/public'));//allows access to public directory


app.get('/jquery', function(req, res){
	count++;
	res.sendFile(__dirname + '/jquery-3.6.4.min.js');
});


// setup des variables
var userId = 0;

let adminSocket = null;
let j2 = null;
let j3 = null;
let j4 = null;




//Action à la connexion d'un socket
io.on('connection', function(socket){
  socket.userId = userId ++;

  console.log('a user connected, user id: ' + socket.userId);
  
  //Définir un joueur à une connexion
  socket.on('launch', function(){
	if(!adminSocket){
		adminSocket = socket;
		console.log("admin set");
		socket.emit("connectPlayer",1);
	} else if(!j2){
		j2 = socket;
		console.log("j2 set");
		socket.emit("connectPlayer",2);
	} else if(!j3){
		j3 = socket;
		console.log("j3 set");
		socket.emit("connectPlayer",3);
	} else if(!j4){
		j4 = socket;
		console.log("j4 set");
		socket.emit("connectPlayer",4);
	} else 
		socket.emit("wait player");
	});



	//démarrer le jeu
	socket.on('start', function(msg){
		const id = msg;
		io.emit("serverReady");
	});

	socket.on('playerReady',function(msg){
		const id = msg;
		io.emit("connectPlayer"+id);
	})



	// Commandes joueurs

	socket.on('up', function(msg){
		const id = msg;
		console.log("joueur "+id +" user has pressed up");
		io.emit("up"+id);
	});

	socket.on('down', function(msg){
		const id = msg;
		console.log("joueur "+id +" user has pressed down");
		io.emit("down"+id);
	});

	socket.on('right', function(msg){
		const id = msg;
		console.log("joueur "+id +" user has pressed right");
		io.emit("right"+id);
	});

	socket.on('left', function(msg){
		const id = msg;
		console.log("joueur "+id +" user has pressed left");
		io.emit("left"+id);
	});

	socket.on('jump', function(msg){
		const id = msg;
		console.log("joueur "+id +" user has pressed jump");
		io.emit("jump"+id);
	})

		//Reload partie
		socket.on('gameFinished', function(){
			io.emit('serverFinish');
			console.log("jeu fini");
		})

		socket.on('clientReload', function(){
			adminSocket= null;
			j2 = null;
			j3 = null;
			j4 = null;
			io.emit("serverReload");
		})
});



//écouter port 3000
http.listen(3000, function(){
	console.log('listening on *:3000');
});