(function() {
	function config($stateProivder, $locationProvider) {
		$locationProvider
			.html5Mode({
				enabled: true,
				requireBase: false
		});
		
		$stateProivder
			.state('landing', {
				url: '/',
				templateUrl: '/templates/landing.html'
		})
			.state('album', {
				url: '/album',
				templateUrl: '/templates/album.html'
		});
	}
	
	angular
		.module('blocJams', ['ui.router'])
		.config(config);
})();