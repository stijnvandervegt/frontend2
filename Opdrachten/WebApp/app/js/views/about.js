var aboutView = function() {

    function About() {

        this.template = 'app/templates/about';
        this.el = '#content';
        this.data = movieApp.data.about,
        this.beforeRender = function() {
            var template = movieApp.Templates[this.template];
            var html = template(this.data);
            this.render(html);
        }

    }

    About.prototype = new View();

    return new About();

}();