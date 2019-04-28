var path = require('path'),
	fs = require('fs');

var staticExtns = [ '.html', '.css', '.js', '.png', '.jpg', '.ico', '.txt', '.json', '.xml'];

function isStatic(resourceName){
	var extn = path.extname(resourceName);
	return staticExtns.indexOf(extn) >= 0;
}

module.exports = function(staticFolderPath){
	return function(req, res, next){
		if (isStatic(req.urlObj.pathname)){
			var resource = path.join(staticFolderPath, req.urlObj.pathname);
			if (!fs.existsSync(resource)){
				res.statusCode = 404;
				res.end();
				next();
				return;
			}
			var stream = fs.createReadStream(resource);
			stream.pipe(res);
			stream.on('end', function(){
				next();
			});
		} else {
			next();
		}
	}
}