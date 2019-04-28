function add(x,y,callback){
	console.log('	[@Service] processing ', x, ' and ', y);
	setTimeout(function(){
		var result = x + y;
		console.log('	[@Service] returning result');
		callback(result);
	}, 4000);
}

function addAsync(x,y){
	console.log('	[@Service] processing ', x, ' and ', y);
	var p = new Promise(function(resolveFn, rejectFn){
		setTimeout(function(){
			var result = x + y;
			console.log('	[@Service] returning result');
			resolveFn(result);
		}, 4000);
	});
	return p;
}

async function addAsyncClient(x,y){
	/*cosnole.log('[@Client] triggering addAsync');
	var p = addAsync(100,200);
	p.then(function(result){
		console.log('[@Client] result = ', result);
	})*/

	console.log('[@Client] triggering addAsync');
	var result = await addAsync(100,200);
	console.log('[@Client] result = ', result);
}

module.exports = {
	add : add
}

/*
client

var p = addAsync(100,200);
p.then(function(result){
	console.log('[@Client] result = ', result);
})


var p = addAsync(100,200);
//then, catch
var p2 = p.then(function(result){
	console.log('[@Client] result = ', result);
	var p2 = new Promise(function(resolveFn, rejectFn){
		setTimeout(function(){
			var doubleResult = result * 2;
			resolveFn(doubleResult);
    	}, 4000);
    });
	return p2;
})


var p = addAsync(100,200);
//then, catch
var p2 = p.then(function(result){
	console.log('[@Client] result = ', result);
	var p2 = new Promise(function(resolveFn, rejectFn){
		var doubleResult = result * 2;
		resolveFn(doubleResult);
    });
	return p2;
})


var p = addAsync(100,200);
//then, catch
var p2 = p.then(function(result){
	console.log('[@Client] result = ', result);
	var doubleResult = result * 2;
	var p2 = Promise.resolve(doubleResult);
	return p2;
})

*/