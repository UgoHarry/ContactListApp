var contactApp = angular.module('contactApp', []);

contactApp.controller('appControl', ['$scope', '$http', function($scope, $http){

	var refresh = function(){
		$http.get('/contactList').success(function(data){
			console.log("I got the data");
			$scope.contacts = data;
		});
	};

refresh();

	$scope.addContact = function(){
		console.log($scope.contact);
		$http.post('/contactList', $scope.contact).success(function(response){
			console.log(response);
			refresh();
		});
	};

	$scope.remove = function(id){
		console.log(id);
		$http.delete('/contactList/' + id).success(function(response) {
			refresh();
		});

	};

	$scope.edit = function(id){
		console.log(id);
		$http.get('/contactList/' + id).success(function(response){
			$scope.contact = response;
		});
	};

	$scope.update = function(){
		$http.put('/contactList/' + $scope.contact._id, $scope.contact).success(function(response){
			refresh();
		});
	};

}]);