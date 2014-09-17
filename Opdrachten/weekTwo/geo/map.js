(function() {
	geo.map = {
		map: false,
		updateMap: false,
		currentPositionMarker: false, 
		locatieRij: [],
		markerRij: [],
		generate: function(myOptions, canvasId) {
            console.log(myOptions);
            console.log(canvasId);

			// TODO: Kan ik hier asynchroon nog de google maps api aanroepen? dit scheelt calls
		    geo.debug.message("Genereer een Google Maps kaart en toon deze in #"+canvasId)
		    this.map = new google.maps.Map(document.getElementById(canvasId), myOptions);

		    var routeList = [];
		    // Voeg de markers toe aan de map afhankelijk van het tourtype
            geo.debug.message("Locaties intekenen, tourtype is: "+tourType);
		    for (var i = 0; i < locaties.length; i++) {

		        // Met kudos aan Tomas Harkema, probeer local storage, als het bestaat, voeg de locaties toe
		        try {
		            (localStorage.visited==undefined||isNumber(localStorage.visited))?localStorage[locaties[i][0]]=false:null;
		        } catch (error) {
                    geo.debug.message("Localstorage kan niet aangesproken worden: "+error);
		        }

		        var markerLatLng = new google.maps.LatLng(locaties[i][3], locaties[i][4]);
		        routeList.push(markerLatLng);

		        this.markerRij[i] = {};
		        for (var attr in locatieMarker) {
		            this.markerRij[i][attr] = locatieMarker[attr];
		        }
		        this.markerRij[i].scale = locaties[i][2]/3;

		        var marker = new google.maps.Marker({
		            position: markerLatLng,
		            map: map,
		            icon: markerRij[i],
		            title: locaties[i][0]
		        });
		    }
		    // TODO: Kleur aanpassen op het huidige punt van de tour
		    if(tourType == LINEAIR){
		        // Trek lijnen tussen de punten
                geo.debug.message("Route intekenen");
		        var route = new google.maps.Polyline({
		            clickable: false,
		            map: map,
		            path: routeList,
		            strokeColor: 'Black',
		            strokeOpacity: .6,
		            strokeWeight: 3
		        });
		    }
			// Voeg de locatie van de persoon door
		    this.currentPositionMarker = new google.maps.Marker({
		        position: kaartOpties.center,
		        map: this.map,
		        icon: positieMarker,
		        title: 'U bevindt zich hier'
		    });

		    // Zorg dat de kaart geupdated wordt als het POSITION_UPDATED event afgevuurd wordt
		    ET.addListener(POSITION_UPDATED, update_positie);
		},
		updatePosition: function(event) {
			// use currentPosition to center the map
		    var newPos = new google.maps.LatLng(currentPosition.coords.latitude, currentPosition.coords.longitude);
		    this.map.setCenter(newPos);
		    currentPositionMarker.setPosition(newPos)
		}

	};	
})();
