var router = function() {

    // Set Router from direction router library.
    var router = {
        controller: Router({
            '/about': this.showAbout,
            '/movies': this.showMovies
        }),
        showAbout: function() {
            console.log('about');
        },
        showMovies: function() {
            console.log('movie');
        }
    };

    return router;

}();