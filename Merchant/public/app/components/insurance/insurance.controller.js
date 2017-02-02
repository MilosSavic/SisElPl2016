(function() {
	"use strict";

	angular
		.module('merchant-app.insurance')
		.controller('InsuranceController', InsuranceController);


	InsuranceController.$inject = ['$location','Insurance','Region','$state','$rootScope','User','InsuranceData','SideBar','Amount','crTranslator', 'crTranslations'];
	function InsuranceController($location,Insurance,Region,$state,$rootScope,User,InsuranceData,SideBar,Amount,crTranslator, crTranslations) {
		var ic = this;

		$.get("https://localhost:3000/success");
		
		ic.currentLanguage = crTranslations[crTranslator.getLanguage()].LANGUAGE;
		console.log(ic.currentLanguage);
		
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

		ic.addInsurance = function() {
				ic.insurance.$save(success);

		};

		ic.goToUsersForm = function(){
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
			$location.path('/insurance');
		}


		
	}
})();


/*(function() {
	'use strict';

	angular
		.module('merchant-app.insurance')
		.controller('InsController', InsController);

	InsController.$inject = ['insuranceService'];
	function InsController(insuranceService) {
		var ic = this;

		ic.insuranceDB = new insuranceService();
		insuranceService.getInsurancesDB().then(function(insurancesDB) {
			ic.insurancesDB = insurancesDB;
		});
		ic.saveInsuranceDB = saveInsuranceDB;
		ic.resetDB = resetDB;
		ic.deleteInsuranceDB = deleteInsuranceDB;

		ic.lastSaveSuccessDB = true;
		ic.lastDeleteIndexDB = -1;

		function saveInsuranceDB() {
			insuranceService.saveInsuranceDB(ic.insuranceDB);
			ic.resetDB();
		}

		function resetDB() {
			ic.insuranceDB = new insuranceService();
		}

		function deleteInsuranceDB(insuranceDB) {
			insuranceService.removeInsuranceDB(insuranceDB);
		}
	}
})();


(function() {
	'use strict';

	angular
		.module('merchant-app.insurance')
		.controller('InsControllerInit', InsControllerInit);

	InsControllerInit.$inject = ['insuranceServiceInit'];
	function InsControllerInit(insuranceServiceInit) {
		var ic = this;
		ic.insurances = insuranceServiceInit.getInsurances();
		ic.saveInsurance = saveInsurance;
		ic.reset = reset;
		ic.deleteInsurance = deleteInsurance;

		ic.lastSaveSuccess = true;
		ic.lastDeleteIndex = -1;

		function saveInsurance() {
			ic.lastSaveSuccess = insuranceServiceInit.addInsurance(ic.insurance);
			ic.insurance = {};
		}

		function reset() {
			ic.insurance = {};
		}

		function deleteInsurance(_id) {
			insuranceServiceInit.removeInsurance(_id);
		}
	}
})();*/