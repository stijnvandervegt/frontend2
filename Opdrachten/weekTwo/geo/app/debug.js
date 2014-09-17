(function() {	
	customDebugging: false, 
	debugId: false,
	geo.debug = {
		errorHandler: function(code, message) {
			debug_message('geo.js error '+code+': '+message);
		},
		message: function(message) {
			(customDebugging && debugId)?document.getElementById(debugId).innerHTML:console.log(message);
		}
		setCustomDebugging: function(debugId) {
			debugId = this.debugId;
		    customDebugging = true;
		}
	};

})();

