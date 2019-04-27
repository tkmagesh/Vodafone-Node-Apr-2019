var http = require('http');

var server = http.createServer(function(req /* IncomingMessage */, res /* ServerResponse */){

	
	res.write('<h1>Introduction to Node.js</h1>');
	res.end();
});

server.listen(8080);