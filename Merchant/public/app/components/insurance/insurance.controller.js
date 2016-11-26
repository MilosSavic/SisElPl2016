(function() {
	"use strict";

	angular
		.module('company-registry.insurance')
		.controller('InsuranceController', InsuranceController);

	InsuranceController.$inject = ['$location','Insurance','Region','Test','$state'];
	function InsuranceController($location,Insurance,Region,Test,$state) {
		var ic = this;

		ic.insurance = new Insurance();


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
		Test.get(function(response){console.log(response.payments);});
		
			
		
		ic.addInsurance = function() {	
				ic.insurance.$save(success);
						
		};

		ic.goToHouseInsurance = function(){
			$state.go('main.houseInsuranceForm');
		}

		ic.goToCarInsurance = function(){
			$state.go('main.carInsuranceForm');
		}

		function success() {
			console.log("Insurance added...")
			$location.path('/employee');
		}
	}
})();