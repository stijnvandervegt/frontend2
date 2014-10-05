(function () {
	'use strict'

	var defaultSettings = {

	};


	var movieApp = function(obj) {
	
	};

	this.movieApp = movieApp;

	movieApp.data = movieApp.settings = undefined;

	// Define functions
	function getData(url) {
		return function() {
			return doRequest(url);
		}
	}

})();