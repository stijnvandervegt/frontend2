/***
* cmdaan.js
*   Bevat functies voor CMDAan stijl geolocatie welke uitgelegd
*   zijn tijdens het techniek college in week 5.
*
*   Author: J.P. Sturkenboom <j.p.sturkenboom@hva.nl>
*   Credit: Dive into html5, geo.js, Nicholas C. Zakas
*
*   Copyleft 2012, all wrongs reversed.
*/

var APP = APP || {};

(function(window, document) {

	APP.controller = {

	};

    APP.event = {
        _listeners: {},
        addListener:function(a,c){

        },
        fire:function(a){

        },
        removeListener:function(a,c) {

        }
    }

    APP.geo = {
        GPS_AVAILABLE: 'GPS_AVAILABLE',
        GPS_UNAVAILABLE: 'GPS_UNAVAILABLE',
        POSITION_UPDATED: 'POSITION_UPDATED',
        REFRESH_RATE: 1000,
        currentPosition: false,
        _start_interval: function(event) {

        },
        _update_position: function() {

        },
        _set_position: function(position){

        },
        _set_position: function(position) {

        }
    };

	APP.map = {
        locatieRij: [],
        generate_map: function(myOptions, canvasId) {

        },
        update_positie: function (event) {

        },
        _check_locations: function(event) {

        },
        _calculate_distance: function(p1, p2){

        }
	};

	APP.debug = {
		_geo_error_handler: function(code, message) {
		    debug_message('geo.js error '+code+': '+message);
		},
		debug_message: function (message){
		    (customDebugging && debugId)?document.getElementById(debugId).innerHTML:console.log(message);
		},
		set_custom_debugging: function(debugId){
		    debugId = this.debugId;
		    customDebugging = true;
		}
	};

	APP.utils = {
        isNumber: function(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
        }
	};


})(window, document);

// Variable declaration
var SANDBOX = "SANDBOX";
var LINEAIR = "LINEAIR";


