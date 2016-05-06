// client side

var socket = io(); //create socket io instance

// set up canvas for drawing
function setup(){
	var myCanvas = createCanvas(400, 400);
	$('canvas').attr('id', 'canvasStyling');
}

function draw() {
	if (mouseIsPressed){
		if (mouseButton == RIGHT){
			clear();
		}
		ellipse(mouseX, mouseY, 4, 4);
		socket.emit('bolita', {x: mouseX, y:mouseY });
	}
}

socket.on('newBolita', function(data){
	// console.log(data);
	ellipse(data.x, data.y, 4, 4);
});

// message going to be emitted to server via that socket when button is clicked
var button = document.querySelector('#send-message');

var messagesUl = $('#chat-messages'); //unordered list for messages
var message = $('#message'); //select input field for message
var author = $('#author'); //select input field for author
var sendButton = $('#send-message');

sendButton.on('click', function(event){
	socket.emit('chat', {author: author.val(), message: message.val()});
	message.val('');
	author.val('');
});

socket.on('message-received', function(data){
	console.log(data);
	// add each need message as a list item
	var newMessage = '<li>' + data.author + ': ' + data.message + '</li>';
	messagesUl.append(newMessage);
});




