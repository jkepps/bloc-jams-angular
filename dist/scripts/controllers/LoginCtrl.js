(function() {
	function LoginCtrl($scope, $auth) {

		$scope.login = function () {
			$auth.login($scope.user)
				.then(function() {
					alert("You have successfully signed in!");
					$location.path('/');
				})
				.catch(function(error) {
					alert(error.data.message, error.status);
				});
		};
		
		$scope.authenticate = function(provider) {
			$auth.authenticate(provider)
				.then(function() {
					alert("You have successfully signed in with " + provider + "!");
					$location.path('/');
				})
				.catch(function(error) {
					if (error.error) {
						alert(error.error);
					} else if (error.data) {
						alert(error.data.message, error.status);
					} else {
						alert(error);
					}
				});
		};

	}

	angular
		.module('blocJams')
		.controller('LoginCtrl', ['$scope', '$auth', LoginCtrl]);
})();