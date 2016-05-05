// client side

var socket = io();

function setup(){
	var myCanvas = createCanvas(400, 400);
	$('canvas').attr('id', 'canvasStyling');
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
}


socket.on('newBolita', function(data){
	// console.log(data);
	ellipse(data.x, data.y, 4, 4);
})

// message going to be emitted to server via that socket when button is clicked
var button = document.querySelector('#send-message');

// button.addEventListener('click', function(event){
// 	var input = document.querySelector('#message');
// 	var input_author = document.querySelector('#author');
// 	console.log(input.value);
// 	console.log(input_author.value);
// 	socket.emit('chat', input.value);
// 	socket.emit('chat', input_author.value);
// 	input.value = '';
// 	input_author.value = '';
// })




// socket.on('message-received', function(data){
// 	console.log(data);
// 	var newMessage = document.createElement('div');
// 	var newMessageAuthor = document.createElement('div');
// 	newMessage.className = "messages";
// 	newMessageAuthor.className = "authors";
// 	newMessageAuthor.appendChild(document.createTextNode(data));
// 	newMessage.appendChild(document.createTextNode(data));
// 	// console.log(newMessage)
// 	// console.log(newMessageAuthor)
// 	// console.log(document.querySelector('#messages'))
// 	document.querySelector('#messages').appendChild(newMessage);
// });

var messagesUl = $('#chat-messages');
var message = $('#message');
var author = $('#author');
var sendButton = $('#send-message');

sendButton.on('click', function(event){
	socket.emit('chat', {author: author.val(), message: message.val()});
	message.val('');
	author.val('');
});

socket.on('message-received', function(data){
	console.log(data);
	// console.log returns: Object {author: "mari", message: "hi"}
	var newMessage = '<li>' + data.author + ': ' + data.message + '</li>';
	// var newMessageLi = $(newMessage);
	// messagesUl.append(newMessageLi);
	//decide on append vs prepend
	messagesUl.append(newMessage);
});




