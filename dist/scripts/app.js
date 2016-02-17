(function() {
	function config($stateProvider, $locationProvider, $urlRouterProvider, $authProvider) {
		$locationProvider
			.html5Mode({
				enabled: true,
				requireBase: false
		});
		
		$stateProvider
			.state('landing', {
				url: '/',
				controller: 'LandingCtrl as landing',
				templateUrl: '/templates/landing.html'
		})
			.state('login', {
				url: '/login',
				controller: 'LoginCtrl as login',
				templateUrl: '/templates/login.html',
				// resolve: {
				// 	skipIfLoggedIn: skipIfLoggedIn
				// }
			})
			.state('logout', {
				url: '/logout',
				template: null,
				controller: 'LogoutCtrl as logout'
			})
			.state('profile', {
				url: '/profile',
				templateUrl: '/templates/profile.html',
				controller: 'ProfileCtrl as profile',
				// resolve: {
				// 	loginRequired: loginRequired
				// }
			})
			.state('collection', {
				url: '/collection',
				controller: 'CollectionCtrl as collection',
				templateUrl: '/templates/collection.html'
		})
			.state('album', {
				url: '/album',
				controller: 'AlbumCtrl as album',
				templateUrl: '/templates/album.html'
		});

		$urlRouterProvider.otherwise('/');

		$authProvider.google({
			clientId: '773750530168-lnog13pakpak6r1u71qdconsjqhpdt00.apps.googleusercontent.com'
		});

		$authProvider.facebook({
			clientId: ''
		})

		$authProvider.twitter({
			url: '/auth/twitter'
		});
			
		$authProvider.oauth2({
				name: 'soundcloud',
				url: '/',
				clientId: 'dc4b5aa6687cf1bbf2d9019c4137720d',
				redirectUri: window.location.origin,
				authorizationEndpoint: 'https://soundcloud.com/connect'
		});

		function skipIfLoggedIn($q, $auth) {
			var deferred = $q.defer();
			if ($auth.isAuthneticated()) {
				deferred.reject();
			} else {
				deferred.resolve();
			}
			return deferred.promise;
		}

		function loginRequired($q, $location, $auth) {
			var deferred = $q.defer();
			if ($auth.isAuthneticated()) {
				deferred.resolve();
			} else {
				$location.path('/login');
			}
			return deferred.promise;
		}

	}
	
	angular
		.module('blocJams', ['ui.router', 'satellizer'])
		.config(config);
})();