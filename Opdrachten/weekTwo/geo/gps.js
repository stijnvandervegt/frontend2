(function() {
	'user strict';
	geo.gps = {
		init: function() {
			debug_message("Controleer of GPS beschikbaar is...");

		    ET.addListener(GPS_AVAILABLE, _start_interval);
		    ET.addListener(GPS_UNAVAILABLE, function(){debug_message('GPS is niet beschikbaar.')});

		    (geo_position_js.init())?ET.fire(GPS_AVAILABLE):ET.fire(GPS_UNAVAILABLE);
		},
		startInterval: function(event) {
			debug_message("GPS is beschikbaar, vraag positie.");
		    _update_position();
		    interval = self.setInterval(_update_position, REFRESH_RATE);
		    ET.addListener(POSITION_UPDATED, _check_locations);
		},
		updatePosition: function() {
			intervalCounter++;
    		geo_position_js.getCurrentPosition(_set_position, _geo_error_handler, {enableHighAccuracy:true});
		},
		setPosition: function() {
			currentPosition = position;
    		ET.fire("POSITION_UPDATED");
    		debug_message(intervalCounter+" positie lat:"+position.coords.latitude+" long:"+position.coords.longitude);			
		},
		checkLocations: function(event) {
			// Liefst buiten google maps om... maar helaas, ze hebben alle coole functies
    		for(var i = 0; i < locaties.length; i++) {
	        	var locatie = {coords:{latitude: locaties[i][3],longitude: locaties[i][4]}};

		        if(_calculate_distance(locatie, currentPosition)<locaties[i][2]){

		            // Controle of we NU op die locatie zijn, zo niet gaan we naar de betreffende page
		            if(window.location!=locaties[i][1] && localStorage[locaties[i][0]]=="false"){
		                // Probeer local storage, als die bestaat incrementeer de locatie
		                try {
		                    (localStorage[locaties[i][0]]=="false")?localStorage[locaties[i][0]]=1:localStorage[locaties[i][0]]++;
		                } catch(error) {
		                    debug_message("Localstorage kan niet aangesproken worden: "+error);
		                }

						// TODO: Animeer de betreffende marker
		                window.location = locaties[i][1];
		                debug_message("Speler is binnen een straal van "+ locaties[i][2] +" meter van "+locaties[i][0]);
					}
				}
			}
		},
		// Bereken het verchil in meters tussen twee punten
		calculateDistance: function(p1, p2){
		    var pos1 = new google.maps.LatLng(p1.coords.latitude, p1.coords.longitude);
		    var pos2 = new google.maps.LatLng(p2.coords.latitude, p2.coords.longitude);
		    return Math.round(google.maps.geometry.spherical.computeDistanceBetween(pos1, pos2), 0);
		}
	};
	
})();