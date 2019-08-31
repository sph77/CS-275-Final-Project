const express = require('express');
const socket = require('socket.io');
const db = require('../config/database');
const message = require('../models/Message');

//socket.io
var users={};
var rooms={}
const io = socket(server);
io.on('connection',(socket) =>{
	console.log("connection")

	//join user to a room
	socket.on('join',(room) =>{
		if(rooms[room] != []){
			var temp = rooms[room]
			temp.push(socket.id)
		}
		else{
			rooms[room]=[socket.id]
		}
		socket.join(room)
		//send the saved messages
		message.findAll({order:[['time','DESC']],where:{rownum <= 30,crn=room}})
		.then(messages =>{
			io.to(socket.id).emit("display",messages)
		})
		.catch(err => console.log(err))s

	//send messages to whoever is in the room
	socket.on('message',(data) =>{
		db.each('insert into messages values(?,?,?,?)',[data.crn,data.user,data.message,data.time])
		io.to(data.crn).emit('chat',data)
	})

	//Check whose on
	socket.on('on',(data) =>{
		users[data.User]=socket.id;
		console.log("There is "+Object.keys(users).length+" on")
		io.sockets.emit('on',users);
	});

	//notify when someone is typing
	socket.on('type',(data) => {
		socket.broadcast.to(data.crn).emit('type',data);
	})

	socket.on('disconnect',function(){
		for(var name in users){
			if(users[name]==socket.id){
				for(var room in rooms){
					if(rooms[room].include(socket.id)){
						var temp = rooms[room]
						delete temp[socket.id]
						socket.leave(room)
						rooms[room]=temp
					}
				}
				delete users[name]
				io.sockets.emit('on',users)
			}
		}
		console.log("There is "+Object.keys(users).length+" on")
		console.log('disconnected')
	})
	
});