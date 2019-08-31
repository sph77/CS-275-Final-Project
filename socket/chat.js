function chat(){
	var socket = io.connect('http:localhost:40001');
	var btn = document.getElementById("send");
	var text = document.getElementById("input");
	var chatbox = document.getElementById("chatbox");
	var typing = document.getElementById("typing")
	var count=setInterval(function(){typing.innerHTML=""},10000)

	//join chatroom
	socket.emit('join',crn);

	//notify whose typing
	text.addEventListener('keypress', function(){
		clearInterval(count);
		count=setInterval(timer,10000);
		socket.emit("type", function(){
			crn:"1",
			user:"jason"
		})
	})

	//send message
	btn.addEventListener('click', function(){
		var current = new Date()
		var now = current.getFullYear()+'-'+(current.getMonth()+1)+(current.getDate())+" "+current.getHours()+':'+current.getMinutes()+':'+current.getSeconds();
		socket.emit('message',function(){
		crn: "1",
		user: "jason",
		message: text,
		time: now,
		})
	});

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
		for(var i=0,i<data.length;i++){
			chatbox.innerHTML += "<p><strong>"+data[i].user+":<strong>"+data[i].message+"</p>"
		}
	})
}