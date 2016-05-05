// client side

var socket = io();

function setup(){
	createCanvas(400, 400);
	background(150, 204, 240);
	// socket = io.connect('http://localhost:3000')
}

//draw when you click mouse
//clear canvas when you right click
function draw() {
	if (mouseIsPressed){
		if (mouseButton == RIGHT){
			clear();
		}
		ellipse(mouseX, mouseY, 4, 4);
		socket.emit('bolita', {x: mouseX, y:mouseY })
	}
	// if (mouseClicked){
	// 	clear();
	// }

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
	var newMessage = document.createElement('div');
	newMessage.className = "messages";
	newMessage.appendChild(document.createTextNode(data));
	console.log(newMessage)
	console.log(document.querySelector('#messages'))
	document.querySelector('#messages').appendChild(newMessage);
});




