var fs = require('fs'),
	fileName = 'sample.txt',
	options = { encoding : 'utf8'};

var stream = fs.createReadStream(fileName, options);

/*var dataEventCount  = 0;
stream.on('data', function(chunk){
	console.log(chunk);
	++dataEventCount;
});

stream.on('end', function(){
	console.log('Thats all folks!');
	console.log('dataEventCount = ', dataEventCount);
});

stream.on('error', function(err){
	console.log('something went wrong');
	console.log(err);
});*/

stream.pipe(process.stdout);

var dataEventCount  = 0;
stream.on('data', function(chunk){
	++dataEventCount;
});

stream.on('end', function(){
	console.log('Thats all folks!');
	console.log('dataEventCount = ', dataEventCount);
});