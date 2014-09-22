var aboutView = function() {
    var view = {
        template: 'app/templates/about',
        el: '#content',
        init: function() {
            this.beforeShow();
        },
        beforeShow: function() {

            var post = {
                title: 'My First Post',
                date: '10/10/2013'
            };
            var template = movieApp.Templates[this.template];
            var html = template(post);
            this.render(html);

        },
        render: function(html) {

            var container = document.querySelector(this.el);
            container.innerHTML = html;

        }
    };

    return view;

}();