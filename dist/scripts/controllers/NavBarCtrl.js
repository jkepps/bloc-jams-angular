(function() {
	function NavBarCtrl($scope, $auth) {
		$scope.isAuthenticated = function() {
			return $auth.isAuthenticated();
		};
	}

	angular
		.module('blocJams')
		.controller('NavBarCtrl', ['$scope', '$auth', NavBarCtrl]);
})();