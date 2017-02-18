(function() {
	"use strict";

	angular
		.module('merchant-app.users')
		.controller('UsersController', UsersController);
		
	UsersController.$inject = ['$scope','$location','Insurance','$state','User','$stateParams','HouseInsurance','InsuranceData','SideBar','Sport','crTranslator', 'crTranslations'];
	function UsersController($scope,$location,Insurance,$state,User,$stateParams,HouseInsurance,InsuranceData,SideBar,Sport,crTranslator, crTranslations) {
		if(!SideBar.isUsersActive())
		{
			$state.go('main.insuranceForm');
			return;
		}
		var uc = this;
		uc.page = $stateParams.userIndex;	

		console.log(uc.page);
		
		$scope.$watch('uc.usersForm.$invalid', function(form) {
		  if(form) {
			  SideBar.setHouseActive(false);
			  SideBar.setCarActive(false);
			  SideBar.setDataActive(false);
			// your code...
		  }
		});

		

		console.log(InsuranceData.getInsuranceData());
		

		uc.number = InsuranceData.getInsuranceData().numberOfUsers;

		console.log(uc.number);

		//uc.user = $rootScope.insurance.users[uc.page-1];
		uc.user = InsuranceData.getInsuranceData().users[uc.page-1];
		Sport.get(function(response){uc.sports = response.sports;}, function(err){$state.go('main.error',{errorOrderId: 1})});

		uc.currentLanguage = crTranslations[crTranslator.getLanguage()].LANGUAGE;
		console.log(uc.currentLanguage);

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
			console.log("User added...")
			$location.path('/user');
		}
	}
})();