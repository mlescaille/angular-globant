'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$http', function($scope, $http) {
	$scope.github_repos = "";
	$scope.details = "undefined";
	//$scope.user = "mlescaille";
	if($scope.user === undefined){
		$scope.details = "Usuario incorrecto."
	}
	else{
		$scope.getRepos();
	}

	$scope.getRepos = function(){
		$scope.details = "";
		var config = {
		method: "GET",
		url: "https://api.github.com/users/" + $scope.user + "/repos"
	}
		var response = $http(config);
		$scope.github_repos_name = [];
		response.success(function(data, status, headers, config){
			$scope.github_repos_owner_login = data[0].owner.login;
			$scope.github_repos_name = data;

			alert("Bien!! " );

		}).error(function(data, status, headers, config){
			$scope.details = "Ha fallado la peticion. Estado: " + status;
		});
	};

}])


.directive('repos', function(){
	return {
		restric: 'E',
		link: function(scope, element, attrs){
			scope.jdata = attrs.json_repos;
		},
		template: '<input type = "text" name = "user" ng-model = "user">'
	}
})
;
