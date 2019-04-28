var fs = require('fs'),
	path = require('path');

var fileName = path.join(__dirname, 'bugData.json')

//callback based
/*function getData(callback){
	fs.readFile(fileName, { encoding : 'utf8'}, function(err, fileContents){
		if (err){
			console.log(err);
			return callback(err);
		}
		var bugs = JSON.parse(fileContents);
		callback(null, bugs);
	})
}

function saveData(bugs, callback){
	fs.writeFile(fileName, JSON.stringify(bugs), function(err){
		callback(err);
	});
}*/


//Promise based
function getData(){

	var p = new Promise(function(resolveFn, rejectFn){
		fs.readFile(fileName, { encoding : 'utf8'}, function(err, fileContents){
			if (err){
				return rejectFn(err);
			}
			var bugs = JSON.parse(fileContents);
			resolveFn(bugs);
		});
	});
	return p;
}

function saveData(bugs){
	var p = new Promise(function(resolveFn, rejectFn){
		fs.writeFile(fileName, JSON.stringify(bugs), function(err){
			if (err){
				return rejectFn(err);
			} else {
				resolveFn({});
			}
		});	
	})
	return p;
	
}

module.exports = {
	getData : getData,
	saveData : saveData
};