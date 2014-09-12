(function() {
	geo.utils = {
		isNumber: function(n) {
			return !isNaN(parseFloat(n)) && isFinite(n);
		}
	};
})();