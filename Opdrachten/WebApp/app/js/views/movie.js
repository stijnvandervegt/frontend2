(function() {

    movieApp.views.movie = {
        template: 'app/templates/movie',
        el: '#content',
        data: movieApp.data.movies,
        init: function() {
            this.beforeRender();
        },
        beforeRender: function() {
            var _this = this;
            movieApp.managers.movie.getData(function(movies) {
                
                var template = movieApp.Templates[_this.template];
                
                //overwrite movie object
                _this.data.movies = movies;
                var html = template(_this.data);
                
                _this.render(html);

            });

        },
        render: function(html) {
            movieApp.utils.setHtml(this.el, html);
        }
    };

})();