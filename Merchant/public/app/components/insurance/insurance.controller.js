(function() {
	"use strict";

	angular
		.module('company-registry.insurance')
		.controller('InsuranceController', InsuranceController);

	InsuranceController.$inject = ['$location','regions','Insurance','payments'];
	function InsuranceController($location, regions, Insurance,payments) {
		var ic = this;
		ic.regions = regions.regions;
		ic.insurance = new Insurance();
		console.log(regions.regions);
		console.log(payments.payments);
			
		
		ic.addInsurance = function() {	
				ic.insurance.$save(success);
						
		};

		function success() {
			console.log("Insurance added...")
			$location.path('/employee');
		}
	}
})();