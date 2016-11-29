(function() {
	"use strict";

	angular
		.module('company-registry.users')
		.controller('UsersController', UsersController);

	UsersController.$inject = ['$location','Insurance','$state','$rootScope','User','$stateParams'];
	function UsersController($location,Insurance,$state,$rootScope,User,$stateParams) {
		var uc = this;
		uc.page = $stateParams.userIndex;

		console.log($rootScope.insurance);
		uc.user = new User();
		
		if(uc.page==1)
		{
			uc.firstPage = true;
		}
		else uc.firstPage = false;

		if(uc.page==$rootScope.insurance.numberOfUsers)
		{
			uc.lastPage = true;
		}
		else uc.lastPage=false;

		uc.next = function(){
			if(!$rootScope.insurance.users)
				$rootScope.insurance.users = [];
			if(!uc.lastPage){
				if(!$rootScope.insurance.users[uc.page-1])
					$rootScope.insurance.users.push(uc.user);
				uc.page++;
				$state.go('main.usersInsuranceForm',{userIndex:uc.page});
				
			}

		}

		uc.goToHouseInsurance = function(){
			if(!$rootScope.insurance.users)
				$rootScope.insurance.users = [];
			if(!$rootScope.insurance.users[uc.page-1])
				$rootScope.insurance.users.push(uc.user);
			$state.go('main.houseInsuranceForm');
		}
		function success() {
			console.log("Insurance added...")
			$location.path('/employee');
		}
	}
})();