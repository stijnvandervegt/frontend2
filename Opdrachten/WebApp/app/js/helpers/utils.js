(function() {

    movieApp.utils = {
        append: function(el, html) {
            document.querySelector(el).appendChild(html);
        },
        setHtml: function(el, html) {
            var container = document.querySelector(el);
            container.innerHTML = html;
        }
    };

})();