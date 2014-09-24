(function() {

    movieApp.managers.movie = {  
        method: 'GET',
        url: 'http://dennistel.nl/movies',      
        init: function() {

        },
        getData: function(callback) {
            var _this = this;
            
            console.log(localStorage.getItem('movies'));
            if(localStorage.getItem('movies') !== null) {                
                var data = localStorage.getItem('movies')
                callback(JSON.parse(data));
            } else {
                movieApp.utils.xhr.trigger(this.method, this.url, function(response) {                
                    var data = JSON.parse(response);
                    _this.saveData(data);
                    callback(data);
                });
            }

        },
        saveData: function(data) {
            localStorage.setItem('movies', JSON.stringify(data));
        }
    };

})();