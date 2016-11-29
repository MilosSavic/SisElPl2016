(function() {
	"use strict";

	angular
		.module('company-registry.house-insurance')
		.controller('HouseInsuranceController', HouseInsuranceController);

	HouseInsuranceController.$inject = ['$location','HouseInsurance','$state'];
	function HouseInsuranceController($location,HouseInsurance,$state) {
		var hic = this;
		hic.houseInsurance = new HouseInsurance();

		hic.goToCarInsurance = function(){
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