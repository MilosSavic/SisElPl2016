(function() {
	"use strict";

	angular
		.module('merchant-app.insurance')
		.controller('InsuranceController', InsuranceController);


	InsuranceController.$inject = ['$scope','$window','$location','Insurance','Region','$state','$rootScope','User','InsuranceData','SideBar','Amount','crTranslator','crTranslations','EmailService'];
	function InsuranceController($scope,$window,$location,Insurance,Region,$state,$rootScope,User,InsuranceData,SideBar,Amount,crTranslator,crTranslations,EmailService) {
		var ic = this;
		
		ic.currentLanguage = crTranslations[crTranslator.getLanguage()].LANGUAGE;
		
		$scope.$watch('ic.insuranceForm.$invalid', function(form) {
		  if(form) {
			  SideBar.setUsersActive(false);
			  SideBar.setHouseActive(false);
			  SideBar.setCarActive(false);
			  SideBar.setDataActive(false);
			// your code...
		  }
		});
		
		ic.insurance = InsuranceData.getInsuranceData();
		ic.numberOfUsers = InsuranceData.getInsuranceData().numberOfUsers;


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
		ic.datepickerEnd.minDate = new Date(ic.datepickerEnd.minDate.valueOf()+86400000);
		
		if(ic.insurance.startDate)
			ic.datepickerEnd.minDate = new Date(ic.insurance.startDate.valueOf()+86400000);
		if(ic.insurance.endDate)
		{
			if(ic.insurance.startDate){
			var startDatePlus1 = new Date(ic.insurance.startDate.valueOf()+86400000);
				if(ic.insurance.endDate<startDatePlus1)
				{	
					ic.insurance.endDate = undefined;
					
				}
			else {
				//
			}
		}
		}

		ic.startDatePicked = function(){
			
			if(ic.insurance.startDate)
			ic.datepickerEnd.minDate = new Date(ic.insurance.startDate.valueOf()+86400000);
			if(ic.insurance.endDate)
			{
				var startDatePlus1 = new Date(ic.insurance.startDate.valueOf()+86400000);
				if(ic.insurance.endDate<startDatePlus1)
				{	
					ic.insurance.endDate = undefined;
				}
			}
		}

		Region.get(function(response){ic.regions = response.regions;}, function(err){$state.go('main.error',{errorOrderId: 1})});
		Amount.get(function(response){ic.amounts = response.amounts;}, function(err){$state.go('main.error',{errorOrderId: 1})});

		ic.addInsurance = function() {
				ic.insurance.$save(success);

		};

		ic.goToUsersForm = function(){
			//broj korisnika se menja jedino ako kliknemo na next dugme.
			ic.insurance.numberOfUsers = ic.numberOfUsers;
			if(ic.insurance.numberOfUsers){

				ic.lastSaveSuccess = true;

				SideBar.setUsersActive(true);
				if(InsuranceData.getInsuranceData().users)
				if(ic.insurance.numberOfUsers!=InsuranceData.getInsuranceData().users.length){
				SideBar.setDataActive(false);
				SideBar.setHouseActive(false);
				SideBar.setCarActive(false);
				}
				InsuranceData.addUsers(ic.insurance.numberOfUsers);

				$state.go('main.usersInsuranceForm',{userIndex:1});

			}
				SideBar.setUserCount(InsuranceData.getInsuranceData().numberOfUsers);
		}



		function success() {
			console.log("Insurance added...")
			$location.path('/insurance');
		}


		
	}
})();


