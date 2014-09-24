(function() {

    var showAbout = function() {
        console.log('about');        
        movieApp.views.about.init();
    };
    var showMovies = function() {
        console.log('movie');
        movieApp.views.movie.init();
    };

    // Set Router from direction router library.
    movieApp.router =  Router({
        '/about': showAbout,
        '/movies': showMovies
    });


})();