const express = require('express');
const socket = require('socket.io');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const server = app.listen("40001", function(){
	console.log("starting");
});
app.use(express.static("."));

//socket.io
var users={};
const io = socket(server);
io.on('connection',(socket) =>{
	console.log("connection")

	//Check whose on
	socket.on('on',(data) =>{
		users[data.User]=socket.id;
		console.log("There is "+Object.keys(users).length+" on")
		io.sockets.emit('on',users);
	});

	//Send back the saved global messages
	db.each(`select User,message From messages where id="global" order by time`, (err, row) => {
  	if (err){
	  	throw err;
	  }
	  io.sockets.emit('global',row)
	});

	//Messages to everyone
	socket.on('global',(data) =>{
		io.sockets.emit('global',data);
		//save messages to database
		db.run('Insert into messages values(?,?,?,"global")',[data.User,data.message,data.time])
	})

	//private messsages
	socket.on('private',(data) =>{
		socket.emit('private',data)
		io.to(users[data.to]).emit('private',data);
		db.run('Insert into private values(?,?,?,?)',[data.User,data.to,data.message,data.time])
	})

	//notify when someone is typing
	socket.on('type',(data) => {
		socket.broadcast.emit('type',data);
	})

	socket.on('disconnect',function(){
		for(var name in users){
			if(users[name]==socket.id){
				delete users[name]
				io.sockets.emit('on',users)
			}
		}
		console.log("There is "+Object.keys(users).length+" on")
		console.log('disconnected')
	})
	
});

//database
var db = new sqlite3.Database('data.db',(err) =>{
	if(err){
		console.log(err)
	}
	else{
		console.log("DB connected")
	}
});
db.run('CREATE TABLE if not exists messages(User text,message text, time timestamp, id text)')
db.run('CREATE TABLE if not exists private(User text, to text,message text, time timestamp)')

