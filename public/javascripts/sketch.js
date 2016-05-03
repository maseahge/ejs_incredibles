// client side

var socket = io();

function setup(){
	createCanvas(400, 400);
	background(150, 204, 240);
	// socket = io.connect('http://localhost:3000')
}


function draw() {
	if (mouseIsPressed){
		ellipse(mouseX, mouseY, 4, 4);
		socket.emit('bolita', {x: mouseX, y:mouseY })
	}

}

socket.on('newBolita', function(data){
	console.log(data);
	ellipse(data.x, data.y, 4, 4);
})

// message going to be emitted to server via that socket when button is clicked
var button = document.querySelector('#send-message');
button.addEventListener('click', function(event){
	var input = document.querySelector('#message');
	console.log(input.value);
	//how do I append the message to the ul with id=messages?
	socket.emit('chat', input.value);
	input.value = '';
})


socket.on('message-received', function(data){
	console.log(data);
	var newMessage = document.createElement('li');
	newMessage.appendChild(document.createTextNode(data));
	console.log(newMessage)
	console.log(document.querySelector('#messages'))
	document.querySelector('#messages').appendChild(newMessage);
	// $('#messages').append($('#message').text(data));
	//append data to i=ul?
});


