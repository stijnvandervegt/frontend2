(function() {

	angular.module('myApp', ['ngRoute']);

	angular.module('myApp')
		.config(function( $routeProvider ) {
			$routeProvider
				.when('/home'), {
					templateUrl: 'views/home.html'
				})
				.when('/movies', {
					templateUrl: 'views/movies.html'
				})
				.otherwise({
					redirectTo: '/home'
				})				
		});

})();