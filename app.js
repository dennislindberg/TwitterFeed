var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    twitter = require('twitter');
	server.listen(3000);
	
var trackingVariable = 'javascript';

var twit = new twitter({
	consumer_key: '1nZnCQZ4Ib8szFZNbc1BSqT22',
	consumer_secret: 'hObznQ200SeDbmUcAWJHftUlaAQ35RtdF1zwXHhRJk99myEmW7',
	access_token_key: '819157416562589696-CwAiu8hmyIW6uj8veFTNj4iAFWmcZwm',
	access_token_secret: 'vsA1k5p89l1CVjvJkoenUmpWl7QoEQJzf7Z17tMd75BZ1'
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


