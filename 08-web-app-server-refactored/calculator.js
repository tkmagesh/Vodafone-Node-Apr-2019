var calculator = {
	addAsync(x,y, callback){
		setTimeout(function(){
			var result = x + y;
			callback(result);
		}, 3000);
	},
	add(x,y){
		return x + y;
	},
	subtract(x,y){
		return x - y;
	},
	multiply(x,y){
		return x * y;
	},
	divide(x,y){
		return x / y;
	}
};

module.exports = calculator;