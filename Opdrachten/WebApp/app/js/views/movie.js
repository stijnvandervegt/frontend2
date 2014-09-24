var movieView = (function() {

    var view = {
        template: 'app/templates/movie',
        el: '#content',
        data: movieApp.data.movies,
        init: function() {
            this.beforeRender();
        },
        beforeRender: function() {

            var template = movieApp.Templates[this.template];
            var html = template(this.data);
            this.render(html);

        },
        render: function(html) {
            movieApp.helper.setHtml(this.el, html);
        }
    };

    return view;

}();