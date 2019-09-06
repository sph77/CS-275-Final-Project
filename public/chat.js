function chat(){
	var socket = io.connect('http://localhost:40001');
	var btn = document.getElementById("send");
	var text = document.getElementById("input");
	var chatbox = document.getElementById("chatbox");
	var typing = document.getElementById("typing");
	var joined = document.getElementById("joined");
	var User= prompt("Please enter your name");
	var CRN = $("#CRNdiv").text();
	var count=setInterval(function(){typing.innerHTML=" "},10000)
	var join_count=setInterval(function(){joined.innerHTML=" "},10000)

	//join chatroom
	socket.emit('join',{crn: CRN, user: User});
	clearInterval(join_count)
	join_count=setInterval(function(){joined.innerHTML=" "},10000)


	/*$.ajax({
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
	})*/

	//notify whose typing
	text.addEventListener('keypress', function(){
		clearInterval(count);
		count=setInterval(function(){typing.innerHTML=""},10000)
		socket.emit("type", {
			crn: CRN,
			user: User
		})
	})

	text.addEventListener('keyup', function(){
		if (event.keyCode === 13) { // Enter was pressed
			event.preventDefault();
			btn.click();
		}
	})

	//send message
	btn.addEventListener('click', function(){
		var current = new Date()
		var now = current.getFullYear()+'-'+(current.getMonth()+1)+(current.getDate())+" "+current.getHours()+':'+current.getMinutes()+':'+current.getSeconds();
		socket.emit('message',{
		crn: CRN,
		user: User,
		message: text.value,
		time: now,
		})
		text.value = "";
	});

	socket.on("join",function(data){
		joined.innerHTML=data.user + " has joined the room"
	})

	//display whose typing
	socket.on("type", function(data){
		typing.innerHTML=data.user+" is typing..."
	})

	//display messages
	socket.on("chat",function(data){
		chatbox.innerHTML = "<p><strong>"+data.user+": </strong>"+data.message+"</p>" + chatbox.innerHTML;
	})

	//display saved messages
	socket.on("display",function(data){
		for(var i=0;i<data.length;i++){
			chatbox.innerHTML += "<p><strong>"+data[i].user+": </strong>"+data[i].message+"</p>"
		}
	})
}
