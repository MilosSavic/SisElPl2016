(function() {
	"use strict";

	angular
		.module('company-registry.insurance')
		.controller('InsuranceController', InsuranceController);

	InsuranceController.$inject = ['$location','regions','Insurance'];
	function InsuranceController($location, regions, Insurance) {
		var ic = this;
		ic.regions = regions.regions;
		ic.insurance = new Insurance();
		
		ic.addInsurance = function() {	
				ic.insurance.$save(success);
				
		};

		function success() {
			console.log("Insurance added...")
			$location.path('/employee');
		}
	}
})();