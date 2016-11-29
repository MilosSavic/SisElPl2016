(function() {
	"use strict";

	angular
		.module('company-registry.house-insurance')
		.controller('HouseInsuranceController', HouseInsuranceController);

	HouseInsuranceController.$inject = ['$location','HouseInsurance','$state','CarInsurance','InsuranceData','SideBar'];
	function HouseInsuranceController($location,HouseInsurance,$state,CarInsurance,InsuranceData,SideBar) {
		var hic = this;
		hic.houseInsurance = InsuranceData.getInsuranceData().houseInsurance;

		hic.goToCarInsurance = function(){
			if(!InsuranceData.getInsuranceData().carInsurance)
				InsuranceData.addCarInsurance();
			SideBar.setCarActive(true);
			$state.go('main.carInsuranceForm');
		}

		hic.addHouseInsurance = function() {
			 console.log('savee');
				hic.houseInsurance.$save(success);
		};

		function success() {
			console.log("House Insurance added...")
			$location.path('/employee');
		}
	}
})();