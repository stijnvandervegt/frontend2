function Person(name) {
	this.name = name;
	this.speak = function(string) {
		var returnString = this.name +' zegt: '+ string;
		return returnString;
	}
}
Person.prototype.walk = function() {
	return 'walking';
}
Person.prototype.eat = function() {
	return 'eating';
}

var person = new Person('Bob');
console.log(person.speak('hallo'));
console.log(person.walk());
console.log(person.eat());

// Object literal
var PersonLiteral = {
	name: 'Name',
	init: function(name) {
		this.name = name;
	},
	speak: function(string) {
		var returnString = this.name +' zegt: '+ string;
		return returnString;
	},
	walk: function() {
		return 'walking';
	},
	eat: function() {
		return 'eating';
	}
};
	
PersonLiteral.init('Bob');
console.log(PersonLiteral.speak('hallo'));
console.log(PersonLiteral.walk());
console.log(PersonLiteral.eat());
	
	

