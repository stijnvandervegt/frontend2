(function(movieApp) {
    movieApp.helper = {
        append: function(el, html) {
            document.querySelector(el).appendChild(html);
        }
    };

    return movieApp.helper
})(movieApp || {});