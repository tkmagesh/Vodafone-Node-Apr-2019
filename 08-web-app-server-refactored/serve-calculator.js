var querystring = require('querystring'),
	calculator = require('./calculator');

module.exports = function(req, res, next){
	if (req.method === 'GET' & req.urlObj.pathname === '/calculator'){
		var queryData = querystring.parse(req.urlObj.query),
			op = queryData.op,
			x = parseInt(queryData.x),
			y = parseInt(queryData.y);
			var result = calculator[op](x,y);
			res.write(result.toString());
			res.end();
			next();
			/*calculator[op](x,y, function(result){
				console.log('serving calculator result');
				res.write(result.toString());
				res.end();		
			});*/
		
	} else if (req.method === 'POST' & req.urlObj.pathname === '/calculator'){
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
			next();
		});
	} else {
		next();
	}
}