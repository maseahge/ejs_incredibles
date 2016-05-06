// server side

console.log('server working');
var io = require('socket.io')();

// event listeners for canvas
io.on('connection', function(socket){
	// console.log(io);
	console.log('a new user connection:' + socket.id);
	socket.on('bolita', function(data){
		// console.log(data);
		io.emit('newBolita', data) 
	})
	socket.broadcast.emit
});

//listens for connection and sends message received (io.emit) to client
io.on('connection', function(socket){
	socket.on('chat', function(data){
		// console.log(data);
		io.emit('message-received', data)
	});
})

module.exports = io;