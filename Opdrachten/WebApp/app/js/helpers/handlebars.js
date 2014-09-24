(function() {

    Handlebars.registerHelper('strip-scripts', function(context) {
        var html = context;
        // context variable is the HTML you will pass into the helper
        // Strip the script tags from the html, and return it as a Handlebars.SafeString
        return new Handlebars.SafeString(html);
    });

})();