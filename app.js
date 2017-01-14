var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    twitter = require('twitter');
	server.listen(3000);
	
var trackingVariable = 'javascript';

var twit = new twitter({
	consumer_key: '',
	consumer_secret: '',
	access_token_key: '',
	access_token_secret: ''
});

var stream1 = twit.stream('statuses/filter', { track: trackingVariable }, function(stream) {
	stream.on('data', function (data) {
    io.sockets.emit('tweet', data.text);
  });
});

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function(socket){
	socket.on('send message', function(data){
		trackingVariable = data;
	});
});


