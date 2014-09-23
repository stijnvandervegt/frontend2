var router = function(movieApp) {

    var showAbout = function() {
        console.log('about');
        aboutView.init();
    };
    var showMovies = function() {
        console.log('movie');
        movieView.init();
    };

    // Set Router from direction router library.
    movieApp.router =  Router({
        '/about': showAbout,
        '/movies': showMovies
    });

    return movieApp;

}(movieApp || {});