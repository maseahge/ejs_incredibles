// server side

console.log('server working');
var io = require('socket.io')();

// event listeners
io.on('connection', function(socket){
	// console.log(io);
	console.log('a new user connection:' + socket.id);
	socket.on('bolita', function(data){
		// console.log(data);
		io.emit('newBolita', data)
	})
	socket.broadcast.emit
});



io.on('connection', function(socket){
	// when we emit, bein sent to client
	socket.on('chat', function(data){
		// console.log(data);
		io.emit('message-received', data)
	});
})
 // $('_').submit(function(){
 //   socket.emit('chat message', $('#message').val());
 //   $('#message').val('');
 //   return false;
 // });


module.exports = io;