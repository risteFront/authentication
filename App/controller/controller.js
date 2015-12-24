angular.module('myApp.controller',[])
.controller('registerCtrl', ['$scope','Authentication','$location','$rootScope', function($scope,Authentication,$location,$rootScope){
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
.controller('aboutCtrl', ['$scope','$rootScope','checkAdmin','FIREBASE_URL','$firebaseAuth', function($scope,$rootScope,checkAdmin,FIREBASE_URL,$firebaseAuth){

		var obj
  	  var ref = new Firebase(FIREBASE_URL);
      var auth = $firebaseAuth(ref);
  	 auth.$onAuth(function(authUser) {
    if (authUser) {
      var ref = new Firebase(FIREBASE_URL + 'users/' + authUser.uid );
     ref.on("value", function(snapshot) {
     
   var obj =snapshot.val();
      console.log(obj.isAdmin)
      if(obj.isAdmin === true){
      	$scope.message = "You have a privilages to acces this section!:)";
      }else{
      	$scope.message = "you don't have a privilages to access this page!"
      }
}, function (errorObject) {
   console.log("error"+ errorObject.code);
});     
    } 
  });
 
}])
