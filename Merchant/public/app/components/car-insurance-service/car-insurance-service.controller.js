(function() {
	"use strict";

	angular
		.module('merchant-app.car-insurance-service')
		.controller('CarInsuranceServiceController', CarInsuranceServiceController);

	CarInsuranceServiceController.$inject = ['$location','CarInsuranceService','$state'];
	function CarInsuranceServiceController($location,CarInsuranceService,$state) {
		var cisc = this;
		cisc.carInsuranceService = new CarInsuranceService();

		CarInsuranceService.get(function(response){cisc.listOfCarInsuranceServices = response.carInsuranceServices;});

		cisc.submit = function(){
			cisc.carInsuranceService.$save(success);
		}
		function success() {
			console.log("CarInsuranceService added...")
			CarInsuranceService.get(function(response){cisc.listOfCarInsuranceServices = response.carInsuranceServices;});
			cisc.carInsuranceService = new CarInsuranceService();
		}
	}
})();