(function() {
	"use strict";

	angular
		.module('company-registry.users')
		.controller('UsersController', UsersController);

	UsersController.$inject = ['$location','Insurance','$state','User','$stateParams','HouseInsurance','InsuranceData','SideBar','Sport'];
	function UsersController($location,Insurance,$state,User,$stateParams,HouseInsurance,InsuranceData,SideBar,Sport) {
		var uc = this;
		uc.page = $stateParams.userIndex;

		console.log(InsuranceData.getInsuranceData());
		//uc.user = $rootScope.insurance.users[uc.page-1];
		uc.user = InsuranceData.getInsuranceData().users[uc.page-1];
		Sport.get(function(response){uc.sports = response.sports;});
		
		if(uc.page==1)
		{
			uc.firstPage = true;
		}
		else uc.firstPage = false;

		if(uc.page==InsuranceData.getInsuranceData().numberOfUsers)
		{
			uc.lastPage = true;
		}
		else uc.lastPage=false;

		uc.next = function(){
			if(!uc.lastPage){

				//if(!$rootScope.insurance.users[uc.page-1])
				//	$rootScope.insurance.users.push(uc.user);
				uc.page++;
				$state.go('main.usersInsuranceForm',{userIndex:uc.page});
				
			}

		}

		uc.goToHouseInsurance = function(){
			//if(!$rootScope.insurance.users)
			//	$rootScope.insurance.users = [];
			//if(!$rootScope.insurance.users[uc.page-1])
			//	$rootScope.insurance.users.push(uc.user);
			//if(!rootScope.insurance.houseInsurance)
			//	$rootScope.insurance.houseInsurance = new HouseInsurance();
			if(!InsuranceData.getInsuranceData().houseInsurance)
				InsuranceData.addHouseInsurance();
			SideBar.setHouseActive(true);
			$state.go('main.houseInsuranceForm');
		}
		function success() {
			console.log("Insurance added...")
			$location.path('/employee');
		}
	}
})();