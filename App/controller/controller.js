angular.module('myApp.controller',[])
.controller('registerCtrl', ['$scope','Authentication','$location', function($scope,Authentication,$location){
	 $scope.login = function() {
    Authentication.login($scope.user);
  }; //login

  $scope.logout = function() {
    Authentication.logout();
     $scope.message = 'successfuly log out!';
     $scope.showlogout =true
      setTimeout(function(){
    	        $location.path('/orders');

    	  console.log(Authentication.logout());
    	       

    	},2000)
 
  }; //logout

  $scope.register = function() {
    Authentication.register($scope.user);
  }; // register
}])
.controller('ordersCtrl', ['$scope', function($scope){

	
}])
