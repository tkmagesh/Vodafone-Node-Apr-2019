var http = require('http'),
	fs = require('fs'),
	path = require('path');

var server = http.createServer(function(req /* IncomingMessage */, res /* ServerResponse */){

	var resource = path.join(__dirname, req.url);

	console.log(resource);
	
	if (!fs.existsSync(resource)){
		res.statusCode = 404;
		res.end();
		return;
	}

	var stream = fs.createReadStream(resource);
	stream.pipe(res);
});

server.listen(8080);

server.on('listening', function(){
	console.log('server listening on 8080...!');
});