(function() {

    movieApp.utils = {
        append: function(el, html) {
            document.querySelector(el).appendChild(html);
        },
        setHtml: function(el, html) {
            var container = document.querySelector(el);
            container.innerHTML = html;
        },
        xhr:{
			trigger: function (type, url, success, data) {
				var req = new XMLHttpRequest;
				req.open(type, url, true);

				req.setRequestHeader('Content-type','application/json');

				type === 'POST' ? req.send(data) : req.send(null);

				req.onreadystatechange = function() {
					if (req.readyState === 4) {
						if (req.status === 200 || req.status === 201) {
							success(req.responseText);
						}
					}
				}
			}
		}
    };

})();