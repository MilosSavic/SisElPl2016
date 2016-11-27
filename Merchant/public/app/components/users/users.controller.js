(function() {
	"use strict";

	angular
		.module('company-registry.users')
		.controller('UsersController', UsersController);

	UsersController.$inject = ['$location','Insurance','$state','$rootScope','User'];
	function UsersController($location,Insurance,$state,$rootScope,User) {
		var uc = this;

		console.log($rootScope.insurance);


		//Determining the number of users in order to create an adequate form
		var users = [];
		for(var i=1; i<$rootScope.insurance.numberOfUsers; i++)
			{
				var user = new User();
				users.push(user);
			}

		uc.contractor = new User();
		uc.users = users;

		uc.goToHouseInsurance = function(){
			$state.go('main.houseInsuranceForm');
		}
		function success() {
			console.log("Insurance added...")
			$location.path('/employee');
		}
	}
})();