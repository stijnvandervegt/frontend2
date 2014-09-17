(function() {
	'user strict';

    geo.gps = {
        currentPosition: false,
        SANDBOX: 'SANDBOX',
        LINEAIR: 'LINEAIR',
        GPS_AVAILABLE: 'GPS_AVAILABLE',
        GPS_UNAVAILABLE: 'GPS_UNAVAILABLE',
        POSITION_UPDATED: 'POSITION_UPDATED',
        interval: false,
        intervalCounter: false,
		init: function() {
			geo.debug.message("Controleer of GPS beschikbaar is...");

		    ET.addListener(this.GPS_AVAILABLE, this.startInterval);
		    ET.addListener(this.GPS_UNAVAILABLE, function(){geo.debug.message('GPS is niet beschikbaar.')});

		    (geo_position_js.init())?ET.fire(this.GPS_AVAILABLE):ET.fire(this.GPS_UNAVAILABLE);
		},
		startInterval: function(event) {
            geo.debug.message("GPS is beschikbaar, vraag positie.");

            geo.gps.updatePosition();
		    geo.gps.interval = self.setInterval(geo.gps.updatePosition, geo.gps.REFRESH_RATE);
		    ET.addListener(geo.gps.POSITION_UPDATED, geo.gps.checkLocations);
		},
		updatePosition: function() {
			this.intervalCounter++;

    		geo_position_js.getCurrentPosition(geo.gps.setPosition, geo.debug.errorHandler, { enableHighAccuracy: true });
		},
		setPosition: function(position) {
			this.currentPosition = position;
    		ET.fire("POSITION_UPDATED");

            geo.debug.message(intervalCounter+" positie lat:"+position.coords.latitude+" long:"+position.coords.longitude);
		},
		checkLocations: function(event) {
            var locaties =  [
                {
                    "name": "Theo Thijssenhuis",
                    "description": "",
                    "coordinate": {
                        "latitude": 52.35955620231157,
                        "longitude": 4.908019635968003
                    },
                    "radius": 50,
                    "onEnter":"#tth_enter",
                    "onExit":"#tth_exit"
                },
                {
                    "name": "Jan Bommerhuis",
                    "description": "",
                    "coordinate": {
                        "latitude": 52.35981828737461,
                        "longitude": 4.909543130688462
                    },
                    "radius": 30,
                    "onEnter":"#jbh_enter"
                },
                {
                    "name": "Koninklijk Instituut voor de Tropen",
                    "description": "",
                    "coordinate": {
                        "latitude": 52.36228181098596,
                        "longitude": 4.920969341091904
                    },
                    "radius": 10,
                    "onEnter":"#kit_enter",
                    "onExit":"#kit_exit"
                },
                {
                    "name": "Crea",
                    "description": "",
                    "coordinate": {
                        "latitude": 52.36322525173981,
                        "longitude": 4.912826154522691
                    },
                    "radius": 30,
                    "onEnter":"#crea_enter",
                    "onExit":"#crea_exit"
                }];
			// Liefst buiten google maps om... maar helaas, ze hebben alle coole functies
    		for(var i = 0; i < locaties.length; i++) {
	        	var locatie = {coords:{latitude: locaties[i][3],longitude: locaties[i][4]}};

		        if(geo.gps.calculateDistance(locatie, geo.gps.currentPosition) < locaties[i][2]){

		            // Controle of we NU op die locatie zijn, zo niet gaan we naar de betreffende page
		            if(window.location!=locaties[i][1] && localStorage[locaties[i][0]]=="false"){
		                // Probeer local storage, als die bestaat incrementeer de locatie
		                try {
		                    (localStorage[locaties[i][0]]=="false")?localStorage[locaties[i][0]]=1:localStorage[locaties[i][0]]++;
		                } catch(error) {
                            geo.debug.message("Localstorage kan niet aangesproken worden: "+error);
		                }

						// TODO: Animeer de betreffende marker
		                window.location = locaties[i][1];
		                geo.debug.message("Speler is binnen een straal van "+ locaties[i][2] +" meter van "+locaties[i][0]);
					}
				}
			}
		},
		calculateDistance: function(p1, p2){
		    var pos1 = new google.maps.LatLng(p1.coords.latitude, p1.coords.longitude);
		    var pos2 = new google.maps.LatLng(p2.coords.latitude, p2.coords.longitude);
		    return Math.round(google.maps.geometry.spherical.computeDistanceBetween(pos1, pos2), 0);
		}
	};
	
})();