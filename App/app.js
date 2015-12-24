'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.version',
  'firebase',
  'myApp.controller',
  'myApp.services'
])
.constant('FIREBASE_URL', 'https://medical-insurance.firebaseio.com/')

.config(['$routeProvider', function($routeProvider) {
	$routeProvider
	.when('/login',{
		templateUrl:'views/login.html',
		controller:"registerCtrl"
	})
	.when('/register',{
		templateUrl:"views/register.html",
		controller:'registerCtrl'
	})
	.when('/orders',{
	templateUrl:"views/orders.html",
	controller:'ordersCtrl'
	})
	.when('/about',{
	templateUrl:"views/about.html",
	controller:'aboutCtrl'
	})
  $routeProvider.otherwise({redirectTo: '/login'});
}])
.run(['$rootScope', '$location',
  function($rootScope, $location) {
    $rootScope.$on('$routeChangeError',
      function(event, next, previous, error) {
        if (error=='AUTH_REQUIRED') {
          $rootScope.message = 'Sorry, you must log in to access that page';
          $location.path('/login');
        } // AUTH REQUIRED
      }); //event info
  }]); //run
