angular.module('myApp.services',[])
.factory('Authentication',
  ['$rootScope', '$firebaseAuth', '$firebaseObject',
  '$location', 'FIREBASE_URL', function($rootScope,$firebaseAuth,$firebaseObject,$location,FIREBASE_URL){

  var ref = new Firebase(FIREBASE_URL);
  var auth = $firebaseAuth(ref);

  auth.$onAuth(function(authUser) {
    if (authUser) {
      var userRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid );
      var userObj = $firebaseObject(userRef);
      $rootScope.currentUser = userObj;
    } else {
      $rootScope.currentUser = '';
    }
  });
  var myObject = {
    login: function(user) {

      auth.$authWithPassword({
        email: user.email,
        password: user.password
      }).then(function(regUser) {
        $location.path('/orders');
      }).catch(function(error) {
       $rootScope.message = error.message;
       $rootScope.showerror=true;
      });
    }, 

    logout: function() {
      	return auth.$unauth();   
    }, 

    requireAuth: function() {
      return auth.$requireAuth();
    }, 

    register: function(user) {
      auth.$createUser({
        email: user.email,
        password: user.password
      }).then(function(regUser) {

        var regRef = new Firebase(FIREBASE_URL + 'users')
        .child(regUser.uid).set({
          date: Firebase.ServerValue.TIMESTAMP,
          regUser: regUser.uid,
          username: user.username,
          email:  user.email,
          isAdmin:false
        }); 

        myObject.login(user);

      }).catch(function(error) {
        $scope.message = error.message;
        $scope.showmsg=true;

      }); 
    } 
  };

  return myObject;

}])
.factory('checkAdmin', ['FIREBASE_URL','$firebaseAuth','$firebaseArray','$rootScope', function(FIREBASE_URL,$firebaseAuth,$firebaseObject,$rootScope){
return function(){
		var obj
  	  var ref = new Firebase(FIREBASE_URL);
      var auth = $firebaseAuth(ref);
  	 auth.$onAuth(function(authUser) {
    if (authUser) {
      var ref = new Firebase(FIREBASE_URL + 'users/' + authUser.uid );
     ref.on("value", function(snapshot) {
     
      return {obj:snapshot.val()};
}, function (errorObject) {
    return {obj: errorObject.code};
});     
    } 
  });
  	}
 
}])