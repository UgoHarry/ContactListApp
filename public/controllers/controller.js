var contactApp = angular.module('contactApp', ['ui.bootstrap']);

contactApp.controller('appControl', ['$scope', '$http', '$modal', function($scope, $http, $modal){

	var refresh = function(){
		$http.get('/contactList').success(function(data){
			console.log("I got the data");
			$scope.contacts = data;
		});
	};

refresh();

	//METHOD SENDS TO POST REQUEST FOR ADDING CONTACT
	$scope.addContact = function(){
		console.log($scope.contact);
		$http.post('/contactList', $scope.contact).success(function(response){
			console.log(response);
			refresh();
		});
	};

	//METHOD SENDS DELETE REQUEST DELETING SPECIFIC CONTACT RECORD
	$scope.remove = function(id){
		console.log(id);
		$http.delete('/contactList/' + id).success(function(response) {
			refresh();
		});

	};

	//METHOD SENDS GET REQUEST TO RETRIEVE CONTACT RECORD TO BE UPDATED
	$scope.edit = function(id){
		//console.log(id);
		//RETRIEVE RECORD FROM DATABASE
		$http.get('/contactList/' + id).success(function(response){
			var modalInstance = $modal.open({	//USE MODAL SERVICE TO CREATE A MODAL INSTANCE
		      templateUrl: 'views/contactEditModal.html',
		      controller: 'contactModalInstance',
		      resolve: {
		        members: function () {
		          return response;
		        }
		      }
		    });

			//HANDLES PROMISE/RESULT THAT IS PASSED WHEN MODAL INSTANCE IS CLOSED
			modalInstance.result.then(function (contact){
				$scope.contact = contact;
				$http.put('/contactList/' + $scope.contact._id, $scope.contact).success(function(response){
					refresh();
					$scope.contact = null;
				});
			});
		});
	};
}]);

//CONTROLLER FOR THE MODAL INSTANCE 
contactApp.controller('contactModalInstance', ['$scope','$modalInstance', 'members', function($scope, $modalInstance, members) {
	    
	    $scope.contact = members;
	    //console.log($scope.contact);

	    //METHOD TO CLOSE MODAL AND PASS RESULTS
	    $scope.update = function(){
	    	$modalInstance.close($scope.contact);
	    };

	    //METHOD TO DISMISS AND PASS A REASON(NOT RESULT!)
	    $scope.cancel = function(){
	        $modalInstance.dismiss('cancel');
	    };
	}]);
