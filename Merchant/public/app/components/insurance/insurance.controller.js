(function() {
	"use strict";

	angular
		.module('company-registry.insurance')
		.controller('InsuranceController', InsuranceController);

	InsuranceController.$inject = ['$location','Insurance','Region','Test'];
	function InsuranceController($location,Insurance,Region,Test) {
		var ic = this;
		Region.get(function(response){ic.regions = response.regions;});
		Test.get(function(response){console.log(response.payments);});
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