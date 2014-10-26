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

    // if you get something out a function
    function get(x) {
        return x;
    }

    // Get element and return function
    function getEl(target) {      
        return function(fn) {            
            return (exists(document.querySelector(target))) ? fn(document.querySelector(target)) : fail('element is not found'+ target);  
        }          
    }

    // Add class from element
    function addClass(el, className) {        
        el.className += className;
    }
    // Remove class from element
    function removeClass(el, className) {        
        el.className = el.className.replace(className, '');
    }
    // Toggle Class on element with given options.el and options.className
    function toggle(el, options) {       
        console.log(options.el.className);
        (options.el.className.indexOf(options.className) == -1) ? addClass(options.el, options.className) : removeClass(options.el, options.className);         
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
    function addEvent(el, type, child, fn, options) {        
        if(exists(child)) {                            
            el.addEventListener(type, function(e) {                  
                (e.toElement.localName == child) ? fn(e, options) : false;
                return e.preventDefault();                
            });
        } else {                
            el.addEventListener(type, function(e) {
                fn(e, options);
                return e.preventDefault();                
            });
        }        
    }
    
    function filter(e, options) {
        options.fn
        (
           options.template        
            (
                setMovies(filterObject(e.target.getAttribute('data-value'), options.type, options.data))
            )
        );
        
    }

    function filterObject(filter, model, data) {       
        return _.filter(data, function(item) {                    
            return (exists(item[model]) && _.contains(item[model], filter)) ? item : false;
        });
    }
    function setMovies(data) {            
         return {
            movies: _.map(data, function(movie, i) {            
                movie.reviews = _.reduce(movie.reviews, function(prev, review) {
                    return prev + review.score;
                }, 0) / movie.reviews.length;
                

                return movie;
            })            
        };
    }
    function setGenres(data) {
        return {
            genres: _.reduceRight(_.pluck(data, 'genres'), function(a, b) { return _.sortBy(_.union(a, b)); }, [])
        };
    }
    function movies(param) {                                    
        getEl('.main')(printHtml)(_.template(getEl('#movies')(getHtml))(setMovies(getData(settings.url))));
        getEl('.tools')(printHtml)(_.template(getEl('#genres')(getHtml))(setGenres(getData(settings.url))));

        
        addEvent
                (
                    getEl('.filter')(get),
                    'click',                     
                    'a', 
                    filter,                     
                    {
                        type: 'genres',
                        data: setMovies(getData(settings.url))['movies'],
                        fn:  getEl('.main')(printHtml),
                        template: _.template(getEl('#movies')(getHtml))                            
                    }

            );

        

    }
    function movieSingle(param) {        
        getEl('.main')(printHtml)(_.template(getEl('#singleMovie')(getHtml))(getData(settings.url+'/'+param.id)));        
    }

    function about() {
        getEl('.main')(printHtml)(_.template(getEl('#about')(getHtml))());
    }

    function setNav() {
        addEvent(
            getEl('.btn_nav')(get), 
            'click', 
            'a', 
            toggle, 
            {
                className: 'hide',
                el: getEl('nav.global')(get)
            }   
        );          
    }

    // Pages
    Satnav({
        html5: false, // don't use pushState
        force: true, // force change event on same route
        poll: 100 // poll hash every 100ms if polyfilled
    })
    .navigate({
        path: '/',
        directions: function(params) {           
           setNav();
           about();   
        }
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
