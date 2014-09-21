var aboutView = function() {
    var view = {
        template: 'about',
        init: function() {
            this.show();
        },
        show: function() {
            console.log('laad hier template handlebars in en get data from manager');

            //var template = Handlebars.templates['about'];
            var post = {
                title: 'My First Post',
                date: '10/10/2013'
            };
            var template = movieApp.Templates['"app/templates/about'];
           /* template({
                title: 'All posts',
                posts: [
                    { title: 'First post', '10/10/2013'},
                    { title: 'Second post', '10/11/2013'}
                ]
            });*/
            console.log(template);
        }
    };

    return view;

}();