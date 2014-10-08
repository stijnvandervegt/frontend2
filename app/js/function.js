(function() {
	'use strict'
	
	var settings = {
		url: 'http://dennistel.nl/movies'
	};
	
	// HELPERS
	 function fail(thing) { throw new Error(thing); }
	
	// Returns true if @x is not null
    function exists(x) {
        return x !== null;
    }
	
	// Returns true if @x is not false and not null
    function truthy(x) {
        return (x !== false) && exists(x);
    }
	
	// Calls the function @action1 when @condition is met and @action2 if it is not.
    function doWhen(condition, action1, action2) {
        return truthy(condition) ? action1() : action2();
    }
	
	// Returns an instantiation of object @Target if it exists in the environment.
	function instantiateIfExists(Target) {
        return doWhen(exists(Target), function () {
            return new Target();
        });
    }
	
	// Returns a request object that can read files based on the users browser environment
    function chooseRequestObject() {
        return instantiateIfExists(window.XMLHttpRequest) || instantiateIfExists(window.ActiveXObject) || fail("Your platform doesn't support HTTP request objects");
    }
	
	function readFileContents(url) {
        var request = chooseRequestObject();
        request.open("GET", url, false);
        request.send(null);
        setData(url, request.responseText);
        return JSON.parse(request.responseText);
    }
    function getData(url) {
        return (typeof localStorage.getItem(url)) ? JSON.parse(localStorage.getItem(url)) : readFileContents(url);
    }
	function setData(url, data) {
        localSorage.setItem(url, data);
    }
	function getTarget(target, callback) {		
		return callback((typeof document.querySelectorAll(target) !== 'undefined') ? document.querySelector(target) : fail('target not found'));		
	}
	
	// ROUTING
    function showMovies() {
        print(getHtml('movie', { movies: setMovieData(getData(settings.url)) } ), '.wrapper');
    }
    function showAbout() {

    }
    function initializePages() {
        return Router({
            '/about': showAbout,
            '/movies': showMovies
        });
    }

	// HANDLEBARS
	function getHtml(template, data) {
		return Views[template](data);
	}

    // DATA
    function setMovieData(movies) {
        return _.map(movies, function(movie, i) {
            movie.reviews = _.reduce(movie.reviews, function(prev, review) {
                return prev + review.score;
            }, 0) / movie.reviews.length;

            return movie;
        });
    }

	// APPLICATION
	function map() {
		
	}
	
	function routing() {
		
	}
	
	function print(html, target) {
		return getTarget(target, function(el) {			
			el.innerHTML = html;
		});
	}

	//setPushState();

    initializePages().init();


})();