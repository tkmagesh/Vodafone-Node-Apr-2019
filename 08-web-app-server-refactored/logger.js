var chalk = require('chalk');

module.exports = function(req, res, next){
	var logMessage = chalk.red(req.method) + '\t' + chalk.blue(req.urlObj.pathname) + '\t';
	var startTime = new Date();
	res.on('finish', function(){
		var endTime = new Date(),
			delta = endTime - startTime;
		logMessage += chalk.green(res.statusCode) + '\t' + chalk.bgWhite(delta + 'ms');
		console.log(logMessage);
	});
	next();
};