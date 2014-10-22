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

    // settings for MovieApp
    var settings = {
        url: 'http://dennistel.nl/movies'
    };    
    
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
        return truth(condition) ? action1(params) : action2(params);
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
        (exists(request.responseText)) ? setData(url, request.responseText) : false;          
        return JSON.parse(request.responseText);
    }

    //print html to element in dom
    function printHtml(el) {        
        return function(html) {                   
            el.innerHTML = html;
        }
    }

    // get html from element
    function getHtml(el) {
         return el.innerHTML;
    }

    // Set data in local storage
    function setData(url, data) {
        localStorage.setItem(url, data);
    }

     function getData(url) {        
        return (localStorage.getItem(url) !== null) ? JSON.parse(localStorage.getItem(url)) : readFileContents(url);
    }

    // Add event listener to an element or an parent element with childs
    function eventListener(el) {        
        return function(type, fn, child) {                          
            if(exists(child)) {
                el.addEventListener(type, function(e) {                            
                    (e.toElement.localName == child) ? fn(e) : false;                
                });
            } else {
                el.addEventListener(type, fn);
            }
        }
    }

    function setMovies(data) {            
         return {
            movies: _.map(data, function(movie, i) {            
                movie.reviews = _.reduce(movie.reviews, function(prev, review) {
                    return prev + review.score;
                }, 0) / movie.reviews.length;
                

                return movie;
                }),
            genres: _.reduceRight(_.pluck(data, 'genres'), function(a, b) { return _.sortBy(_.union(a, b)); }, [])
        };
    }

    function filter(e) {
        
        console.log(filterObject(e.target.getAttribute('data-value'), 'genres', setMovies(getData(settings.url))['movies']));
        return function(type, data) {            
            return filterObject(e.target.getAttribute('data-value'), type, data); 
        }

    }

    function filterObject(filter, model, data) {
        return _.filter(data, function(item) {            
            return (_.contains(item[model], filter)) ? item : false;
        });
    }

    function movies(param) {                            
        console.log(setMovies(getData(settings.url)));
        getEl('.wrapper')(printHtml)(_.template(getEl('#movies')(getHtml))(setMovies(getData(settings.url))));
        getEl('.filter')(eventListener)('click', filter, 'a');
    }
    function movieSingle(param) {
        console.log(param.id);
        console.log(getData(settings.url+'/'+param.id));
        getEl('.wrapper')(printHtml)(_.template(getEl('#singleMovie')(getHtml))(getData(settings.url+'/'+param.id)));
    }

    function about() {
        getEl('.wrapper')(printHtml)(_.template(getEl('#about')(getHtml))());
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
        path: 'movies/?{id}',
        directions: function(params) {              
            doWhen(params.hasOwnProperty('id'), movieSingle, movies, params);
        }
    })
    .otherwise('/') 
    .change(function(params,old) {
        
    })
    .go();

}).call(this);
