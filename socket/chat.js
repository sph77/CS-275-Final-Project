function chat(){
	var socket = io.connect('http:localhost:40001');
	var btn = document.getElementById("send");
	var text = document.getElementById("input");
	var chatbox = document.getElementById("chatbox");
	var typing = document.getElementById("typing")
	var joined = document.getElementById("joined")
	var User; //not sure on how to get user and crn as of yet
	var CRN;
	var count=setInterval(function(){typing.innerHTML=""},10000)
	var join_count=setInterval(function(){joined.innerHTML=""},10000)

	//join chatroom
	socket.emit('join',{crn: CRN, user: User});
	clearInterval(join_count)
	join_count=setInterval(function(){joined.innerHTML=""},10000)


	$.ajax({
		type: "GET",
		datatype: JSON,
		url: "../messages",
		crn: CRN,
		success: function(data){
			for(var i=0; i < data.length;i++){
				chatbox.innerHTML += "<p><strong>"+data[i].user+":<strong>"+data[i].message+"</p>"
			}
		}
		error: function(){
			alert("There is a problem")
		}
	})

	//notify whose typing
	text.addEventListener('keypress', function(){
		clearInterval(count);
		count=setInterval(function(){typing.innerHTML=""},10000)
		socket.emit("type", {
			crn: CRN,
			user: User
		})
	})

	//send message
	btn.addEventListener('click', function(){
		var current = new Date()
		var now = current.getFullYear()+'-'+(current.getMonth()+1)+(current.getDate())+" "+current.getHours()+':'+current.getMinutes()+':'+current.getSeconds();
		socket.emit('message',{
		crn: CRN,
		user: User,
		message: text,
		time: now,
		})
	});

	socket.on("join",function(data){
		joined.innerHTML=data.user + "has joined the room"
	})

	//display whose typing
	socket.on("type", function(data){
		typing.innerHTML=data.user+" is typing..."
	})

	//display messages
	socket.on("chat",function(data){
		chatbox.innerHTML += "<p><strong>"+data.user+":<strong>"+data.message+"</p>"
	})

	//display saved messages
	socket.on("display",function(data){
		for(var i=0;i<data.length;i++){
			chatbox.innerHTML += "<p><strong>"+data[i].user+":<strong>"+data[i].message+"</p>"
		}
	})
}