var fs = require('fs');
var fileName = 'sample.txt',
	options = { encoding : 'utf8' };

/*var fileContents = fs.readFileSync(fileName, options);
console.log(fileContents);*/

fs.readFile(fileName, options, function(err, fileContents){
	if (err){
		console.log('something went wrong');
		console.log(err);
		return;
	}
	console.log(fileContents);
	console.log('Thats all folks!!');
});

