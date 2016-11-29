(function() {
	"use strict";

	angular
		.module('company-registry.car-insurance')
		.controller('CarInsuranceController', CarInsuranceController);

	CarInsuranceController.$inject = ['$location','CarInsurance','$state','InsuranceData','SideBar'];
	function CarInsuranceController($location,CarInsurance,$state,InsuranceData,SideBar) {
		var cic = this;
		cic.carInsurance = InsuranceData.getInsuranceData().carInsurance;

		cic.goToCarInsurance = function(){
			$state.go('main.carInsuranceForm');
		}

		cic.addCarInsurance = function() {
			 console.log('savee');
			cic.carInsurance.$save(success);
		}

		cic.goToFinalPage = function(){
			SideBar.setDataActive(true);
			$state.go('main.dataPage');
		}

		function success() {
			console.log("Car Insurance added...")
			$location.path('/employee');
		}
	}
})();