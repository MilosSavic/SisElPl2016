(function() {
	"use strict";

	angular
		.module('company-registry.car-insurance')
		.controller('CarInsuranceController', CarInsuranceController);

	CarInsuranceController.$inject = ['$location','CarInsurance','$state'];
	function CarInsuranceController($location,CarInsurance,$state) {
		var cic = this;
		cic.carInsurance = new CarInsurance();

		cic.goToCarInsurance = function(){
			$state.go('main.carInsuranceForm');
		}

		cic.addCarInsurance = function() {
			 console.log('savee');
				cic.carInsurance.$save(success);

		};
		function success() {
			console.log("Car Insurance added...")
			$location.path('/employee');
		}
	}
})();