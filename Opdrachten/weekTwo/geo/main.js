
(function() {
	'use strict';

	geo.controller = {		
		init: function(){
		    geo.gps.init();
            geo.map.generate('map', {
                "center": [52.35955620231157, 4.908019635968003],
                "zoom": 15,
                "disableDefaultUI": true,
                "draggable": false,
                "scrollwheel": false,
                "mapTypeControl": false,
                "navigationControl": false,
                "mapTypeId": "ROADMAP"
            });
		}
	};

	geo.controller.init();
})();