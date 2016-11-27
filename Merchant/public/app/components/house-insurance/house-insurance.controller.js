(function() {
	"use strict";

	angular
		.module('company-registry.house-insurance')
		.controller('HouseInsuranceController', HouseInsuranceController);

	HouseInsuranceController.$inject = ['$location','Insurance','$state'];
	function HouseInsuranceController($location,Insurance,$state) {
		var hic = this;

		hic.goToCarInsurance = function(){
			$state.go('main.carInsuranceForm');
		}
		function success() {
			console.log("Insurance added...")
			$location.path('/employee');
		}
	}
})();