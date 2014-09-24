(function() {

    movieApp.managers.movie = {  
        method: 'GET',
        url: 'http://dennistel.nl/movies',      
        init: function() {

        },
        getData: function(callback) {
            
            movieApp.utils.xhr.trigger(this.method, this.url, function(response) {                
                
                callback(JSON.parse(response));

            });
        }
    };

})();