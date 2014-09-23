// Local scope
function localScope() {}
	var iterator = '';
	var max = 100;
	var min = 1;
	console.log(max);
}
//global scope
var iterator = '';
var max = 100;
var min = 1;

function userGlobalVariable() {
	console.log(max);
}

localScope();
userGlobalVariable();

//Closure example
function countMax(number) {
	var max = number;
	return function(amount) {
		return max + amount;
	}
}

var max = countMax(8);
console.log(countMax(12));