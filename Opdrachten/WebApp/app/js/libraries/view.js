var View = (function() {

    function View(template, el) {
        this.template = template;
        this.el = el;
    }
    View.prototype.init = function() {

        if(typeof this.beforeRender != 'undefined') {
            this.beforeRender();
        } else {
            this.render('');
        }
    }
    View.prototype.render = function(html) {
        movieApp.helper.setHtml(this.el, html);
    }

    return View;

})();