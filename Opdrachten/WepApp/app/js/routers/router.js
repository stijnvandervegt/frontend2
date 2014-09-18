var router = function() {

    var showAbout = function() {
        console.log('about');
    };
    var showMovies = function() {
        console.log('movie');
    };

    // Set Router from direction router library.
    var router =  Router({
        '/about': showAbout,
        '/movies': showMovies
    });

    return router;

}();