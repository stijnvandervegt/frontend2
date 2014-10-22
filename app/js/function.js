/*(function() {
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
	
    function notEmpty(x) {
        return x !== '';
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
        (notEmpty(request.responseText)) ? setData(url, request.responseText) : false;          
        return JSON.parse(request.responseText);
    }
    // Get data from url or localStorage
    function getData(url) {        
        return (localStorage.getItem(url) !== null) ? JSON.parse(localStorage.getItem(url)) : readFileContents(url);
    }

    // Set data in local storage
	function setData(url, data) {
        localStorage.setItem(url, data);
    }
	
    // Get html Target for view
    function getTarget(target, callback) {	
		return callback((typeof document.querySelectorAll(target) !== 'undefined') ? document.querySelector(target) : fail('target not found'));		
	}
	
	// ROUTING
    function showMovies() {        
        print(getHtml('movie', { movies: truthy(getData(settings.url)) ? setMovieData(getData(settings.url)) : [] } ), '.wrapper');
    }
    function showMovie(movieId) {        
        print(getHtml('moviedetail', searchObject({id: parseInt(movieId)}, getData(settings.url), _.first) ), '.wrapper');
    }
    function showAbout() {        
        print(getHtml('about', {}), '.wrapper');
    }
    function initializePages() {
        return Router({
            '/about': showAbout,
            '/movies': showMovies,            
            '/movies/:movieId': showMovie            
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
    function searchObject(search, data, action) {      
        return action(_.where(data, search));
    }
    function filterObject(filter, model, data) {
        return _.filter(data, function(item) {
            return (model == filter) ? item : [];
        });
    }

	

    // APPLICATION	
	function print(html, target) {
		return getTarget(target, function(el) {			
			el.innerHTML = html;
		});
	}
	
    initializePages().init();

})();*/

(function() {
    'use script'

    // Create a save reference to the movieApp
    var movieApp = function(obj) {
        if (obj instanceof movieApp) return obj;
        if (!(this instanceof movieApp)) return new movieApp(obj);
        this.movieAppwrapped = obj;
    };

    this.movieApp = movieApp;

    movieApp.version = 0.1;


    
    // Check if something exist
    function exists(x) { return x !== null; }    

    // Returns true if @x is not false and not null
    function truth(x) { return (x !== false) && exists(x); }

    //error message
    function fail(thing) { throw new Error(thing); }

    // Get element and return function
    function getEl(target) {      
        return function(fn) {            
            return (exists(document.querySelector(target))) ? fn(document.querySelector(target)) : fail('element is not found');  
        }      
    }
    // Calls the function @action1 when @condition is met and @action2 if it is not.
    function doWhen(condition, action1, action2, params) { 
        console.log(condition);       
        return truth(condition) ? action1(params) : action2(params);
    }    

    //print html to element in dom
    function printHtml(el) {        
        return function(html) {                   
            el.innerHTML = html;
        }
    }

    // Add event listener to an element or an parent element with childs
    function eventListener(el) {        
        return function(type, fn, child) {                          
            if(exists(child)) {
                el.addEventListener(type, function(e) {   
                    console.log(e.toElement.localName, child);             
                    (e.toElement.localName == child) ? fn(e) : false;                
                });
            } else {
                el.addEventListener(type, fn);
            }
        }
    }

    function filter() {
        console.log(this);
    }

    function movies(param) {
        console.log('movies page');
        getEl('.wrapper')(printHtml)('test html');
        getEl('.filter')(eventListener)('click', filter, 'a');
    }
    function movieSingle(param) {
        console.log(param);
    }

    function about() {
        console.log('about page');
    }

    function pageNotFound() {
        console.log('page not found');
    }

    // Pages
    Satnav({
        html5: false, // don't use pushState
        force: true, // force change event on same route
        poll: 100 // poll hash every 100ms if polyfilled
    })
    .navigate({
        path: 'about',
        directions: function(params) {
           about();   
        }
    })
    .navigate({
        path: 'movies/?{optional}',
        directions: function(params) {              
            doWhen(params.hasOwnProperty('optional'), movieSingle, movies, params);
        }
    })
    .otherwise('/') 
    .change(function(params,old) {
        console.log(params);
        console.log(old);
    })
    .go();

}).call(this);
