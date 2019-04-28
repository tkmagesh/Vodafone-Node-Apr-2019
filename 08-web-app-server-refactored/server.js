var http = require('http');
	
var dataParser = require('./data-parser'),
	serveStatic = require('./serve-static'),
	serveCalculator = require('./serve-calculator'),
	notFoundHandler = require('./not-found-handler'),
	app = require('./app');

app.use(dataParser);
app.use(serveStatic);
app.use(serveCalculator);
app.use(notFoundHandler);


var server = http.createServer(app);

server.listen(8080);
server.on('listening', function(){
	console.log('web server listening on 8080...!');
});