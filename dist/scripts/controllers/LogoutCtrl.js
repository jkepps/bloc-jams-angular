(function() {
	function LogoutCtrl($location, $auth) {

		if (!$auth.isAuthenticated()) { return; }

		$auth.logout()
			.then(function() {
				alert('You have been logged out');
				$location.path('/');
			});
	}

	angular
		.module('blocJams')
		.controller('LogoutCtrl', ['$location', '$auth', LogoutCtrl]);
})();