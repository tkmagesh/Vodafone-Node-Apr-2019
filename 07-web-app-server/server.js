var http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url'),
	querystring = require('querystring'),
	calculator = require('./calculator');

var staticExtns = [ '.html', '.css', '.js', '.png', '.jpg', '.ico', '.txt', '.json', '.xml'];

function isStatic(resourceName){
	var extn = path.extname(resourceName);
	return staticExtns.indexOf(extn) >= 0;
}

var server = http.createServer(function(req, res){
	var urlObj = url.parse(req.url);
	console.log(req.method + '\t' + urlObj.pathname);
	if (isStatic(urlObj.pathname)){
		var resource = path.join(__dirname, urlObj.pathname);
		if (!fs.existsSync(resource)){
			res.statusCode = 404;
			res.end();
			return;
		}
		var stream = fs.createReadStream(resource);
		stream.pipe(res);
	} else if (req.method === 'GET' & urlObj.pathname === '/calculator'){
		var queryData = querystring.parse(urlObj.query),
			op = queryData.op,
			x = parseInt(queryData.x),
			y = parseInt(queryData.y),
			result = calculator[op](x,y);
		res.write(result.toString());
		res.end();
	} else if (req.method === 'POST' & urlObj.pathname === '/calculator'){
		var rawData = '';
		req.on('data', function(chunk){
			rawData += chunk;
		});
		req.on('end', function(){
			var bodyData = querystring.parse(rawData),
				op = bodyData.op,
				x = parseInt(bodyData.x),
				y = parseInt(bodyData.y),
				result = calculator[op](x,y);
			res.write(result.toString());
			res.end();
		});
	} else {
		res.statusCode = 404;
		res.end();
	}
});
server.listen(8080);
server.on('listening', function(){
	console.log('web server listening on 8080...!');
});