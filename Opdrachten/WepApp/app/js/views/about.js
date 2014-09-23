var aboutView = function() {

    var view = {
        template: 'app/templates/about',
        el: '#content',
        data: movieApp.data.about,
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