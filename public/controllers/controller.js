var contactApp = angular.module('contactApp', ['ui.bootstrap']);

contactApp.controller('appControl', ['$scope', '$http', '$modal', function($scope, $http, $modal){

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
			var modalInstance = $modal.open({
		      //animation: $scope.animationsEnabled,
		      templateUrl: 'views/contactEditModal.html',
		      controller: 'contactModalInstance',
		      //size: size,
		      resolve: {
		        members: function () {
		          return response;
		        }
		      }
		    });
		});
	};

	//TODO: Consider moving this inside the modal instance controller
	$scope.update = function(){
		console.log($scope.contact);
		/**$http.put('/contactList/' + $scope.contact._id, $scope.contact).success(function(response){
			refresh();
		});**/
	};

}]);


contactApp.controller('contactModalInstance', ['$scope','$modalInstance', 'members', function($scope, $modalInstance, members) {
	    
	    $scope.contact = members;
	    //console.log($scope.contact);
	    $scope.ok = function(){
	        $modalInstance.dismiss('cancel');
	    };
	}]);
