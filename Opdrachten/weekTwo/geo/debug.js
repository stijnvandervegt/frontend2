var geo = geo || {};

(function() {

	geo.debug = {
        customDebugging: false,
        debugId: false,
		errorHandler: function(code, message) {
			geo.debug.message('geo.js error '+code+': '+ message);
		},
		message: function(message) {
			(this.customDebugging && this.debugId)?document.getElementById(this.debugId).innerHTML:console.log(message);
		},
		setCustomDebugging: function(debugId) {
			debugId = this.debugId;
		    customDebugging = true;
		}
	};

})();

