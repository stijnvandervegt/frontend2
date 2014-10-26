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
    function getEl(target, all) {      
        return function(fn) {            
            if(all === true) {
                return (exists(document.querySelector(target))) ? fn(document.querySelectorAll(target)) : fail('element is not found'+ target);  
            } else {
                return (exists(document.querySelector(target))) ? fn(document.querySelector(target)) : fail('element is not found'+ target);  
            }
        }          
    }
  
    // Hash change
    function hashChange(route) {
        location.hash = '/'+ route +'/';
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
    function toggleClass(el, options) {       
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

    function getActiveData(elements, value, compare) {
        return _.map(elements, function(item) {                          
                return (item.className == compare) ? item.getAttribute(value) : false;            
            return item;
        });
    }
    
    // Hammer touch event
    function touchEvent(type, el, fn) {
        var mc = new Hammer(el);        
        mc.on(type, function(ev) {           
            fn(ev);
        });
    }

    function filter(e, options) {     
        toggleClass(e, {el: e.target, className: 'active'});
        //console.log(getActiveData(getEl('.filter a', true)(get), 'data-value', 'active'));
        //console.log(filterObject(getActiveData(getEl('.filter a', true)(get), 'data-value'), options.type, options.data));
        options.fn(
            options.template(
                {movies: filterObject(getActiveData(getEl('.filter a', true)(get), 'data-value', 'active'), options.type, options.data)}
            )
        );        
    }

    function filterObject(filter, model, data) {       
        return _.filter(data, function(item) {
            
            if(item.genres.length > 1) {
                return (_.contains(
                    _.map(item[model], function(val) { 
                        return _.contains(filter, val) ? true : false;
                    }), false)
                ) ? false : item;
            } else {
                return (_.contains(filter, item.genre)) ? item : false;                 
            }
        });

       /* return _.filter(data, function(item) {
            (_.reduce(item[model], function(val) {
                return _.contains(filter, val) ? true : false;
            }) === true) ? item : false;
                    
            //return (exists(item[model]) && _.contains(item[model], filter)) ? item : false;
        });*/
       
    }

    function sortObject(e, options) {          
          options.fn(
            options.template(
                {movies: sortObjectMovies(options.data, options.type)}
            )
        );
    }
    function sortObjectMovies(data, order) {
        return _.sortBy(data.movies, function(item) {
            if(order == 'desc') {
                return (!isNaN(item.reviews)) ? -item.reviews : false;
            } else {
                return (!isNaN(item.reviews)) ? +item.reviews : false;
            }
        });
    }

    function setMovies(data) {            
         return {
            movies: _.map(data, function(movie, i) {            
                if(movie.reviews.length > 0) {
                    movie.reviews = _.reduce(movie.reviews, function(prev, review) {                    
                        return prev + review.score;                    
                    }, 0) / movie.reviews.length;               
                } else {
                    movie.reviews = '-';
                }
                        
                movie.genre = _.reduce(movie.genres, function(prev, val) {
                    return prev +', '+ val;
                });

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
        
        // set loader
        getEl('.main')(printHtml)(
            _.template(getEl('#loader')(getHtml))({})
        );

        // set data                             
        setTimeout(function() {
            getEl('.main')(printHtml)(
                _.template(
                    getEl('#movies')(getHtml)            
                )(
                    setMovies(getData(settings.url))
                )
            );
            // set genres
            getEl('.tools')(printHtml)(_.template(getEl('#genres')(getHtml))(setGenres(getData(settings.url))));
            setFilter();
            setOrder();
        }, 400);

    }
    function movieSingle(param) {                
        getEl('.main')(printHtml)(_.template(getEl('#singleMovie')(getHtml))(getData(settings.url+'/'+param.id)));        
        //touch swipe back
        touchEvent('swiperight', getEl('.main')(get), backToMovies);
    }

    // temporary hack to movies
    function backToMovies() {         
         hashChange('movies');
    }
    

    function about() {
        getEl('.main')(printHtml)(_.template(getEl('#about')(getHtml))());
    }

    function setNav() {
        addEvent(
            getEl('.btn_nav')(get), 
            'click', 
            'a', 
            toggleClass, 
            {
                className: 'hide',
                el: getEl('nav.global')(get)
            }   
        );          
    }

    function setFilter() {
        addEvent(
            getEl('.btn_filter')(get), 
            'click', 
            'a', 
            toggleClass, 
            {
                className: 'hide',
                el: getEl('.tools')(get)
            }   
        );
        addEvent (
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

    function setOrder() {
        addEvent (
            getEl('.sort')(get),
            'click',                     
            'a', 
            sortObject,                     
            {
                data: setMovies(getData(settings.url)),
                type: 'desc',
                fn:  getEl('.main')(printHtml),
                template: _.template(getEl('#movies')(getHtml)) 
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
           movies();   
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
