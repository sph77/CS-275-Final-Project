const express = require('express');
const sock = require('socket.io')
const db = require('../config/database');

//socket.io
var users={};
var rooms={}
module.exports = function(server){
	const io = sock(server)
	io.on('connection',(socket) =>{
		console.log("connection")

		//join user to a room
		socket.on('join',(room) =>{
			if(rooms[room.crn] != null){
				var temp = rooms[room.crn]
				temp.push(socket.id)
			}
			else{
				rooms[room.crn]=[socket.id]
			}
			socket.join(room.crn)
			io.to(room.crn).emit('join',room)
		})

		//send messages to whoever is in the room
		socket.on('message',(data) =>{
			//db.each('insert into messages values(?,?,?,?)',[data.crn,data.user,data.message,data.time])
			io.in(data.crn).emit('chat',data)
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
}