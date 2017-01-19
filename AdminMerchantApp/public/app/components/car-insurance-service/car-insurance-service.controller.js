(function() {
	"use strict";

	angular
		.module('merchant-admin-app.car-insurance-service')
		.controller('CarInsuranceServiceController', CarInsuranceServiceController);

	CarInsuranceServiceController.$inject = ['$location','CarInsuranceService','$state','$window'];
	function CarInsuranceServiceController($location,CarInsuranceService,$state,$window) {
		var cisc = this;
		cisc.carInsuranceService = new CarInsuranceService();

		CarInsuranceService.get(function(response){cisc.listOfCarInsuranceServices = response.carInsuranceServices;});

		cisc.submit = function(){
			 $window.location.reload();
			cisc.carInsuranceService.$save(success);
		}
		function success() {
			console.log("CarInsuranceService added...")
			CarInsuranceService.get(function(response){cisc.listOfCarInsuranceServices = response.carInsuranceServices;});
			cisc.carInsuranceService = new CarInsuranceService();
		}
	}
})();