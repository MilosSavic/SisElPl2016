(function() {
	"use strict";

	angular
		.module('merchant-app.insurance')
		.controller('InsuranceController', InsuranceController);

	InsuranceController.$inject = ['$location','Insurance','Region','Test','$state','$rootScope','User','InsuranceData','SideBar','Amount'];
	function InsuranceController($location,Insurance,Region,Test,$state,$rootScope,User,InsuranceData,SideBar,Amount) {
		var ic = this;
		
		if(!$rootScope.insurance)
			$rootScope.insurance = new Insurance();
		ic.insurance = InsuranceData.getInsuranceData();

		ic.datepickerStart = {
			minDate: new Date(),
			maxDate: new Date(2222,11,30),
			format: 'mediumDate',
			opened: false
		};

		ic.datepickerEnd = {
			minDate: new Date(),
			maxDate: new Date(2222,11,30),
			format: 'mediumDate',
			opened: false
		};

		ic.startDatePicked = function(){
			if(ic.insurance.startDate)
			ic.datepickerEnd.minDate = ic.insurance.startDate;
			if(ic.insurance.endDate)
			{
				if(ic.insurance.endDate<ic.insurance.startDate)
					ic.insurance.endDate = ic.insurance.startDate;
			}
		}

		Region.get(function(response){ic.regions = response.regions;});
		Amount.get(function(response){ic.amounts = response.amounts;});
		Test.get(function(response){console.log(response.payments);});



		ic.addInsurance = function() {
				ic.insurance.$save(success);

		};

		ic.goToUsersForm = function(){
			if(ic.insurance.numberOfUsers){

				SideBar.setUsersActive(true);
				if(InsuranceData.getInsuranceData().users)
				if(ic.insurance.numberOfUsers!=InsuranceData.getInsuranceData().users.length){
				SideBar.setDataActive(false);
				SideBar.setHouseActive(false);
				SideBar.setCarActive(false);
				}
				InsuranceData.addUsers(ic.insurance.numberOfUsers);
				//$rootScope.insurance.users = [];
				//for(var i=0; i<ic.insurance.numberOfUsers; i++)
				//	$rootScope.insurance.users.push(new User());

				$state.go('main.usersInsuranceForm',{userIndex:1});

			}



			//side bar
			//$rootScope.usersIndices = [];
			//for(var i=1; i<=InsuranceData.getInsuranceData().numberOfUsers;i++){
			//	$rootScope.usersIndices.push(i);
			//}
				SideBar.setUserCount(InsuranceData.getInsuranceData().numberOfUsers);
		}



		function success() {
			console.log("Insurance added...")
			$location.path('/employee');
		}
	}
})();