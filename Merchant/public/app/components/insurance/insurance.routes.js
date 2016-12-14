(function() {
	"use strict";

	angular
		.module('merchant-app.insurance')
		.config(config);

	config.$inject = ['$stateProvider'];
	function config($stateProvider) {
		$stateProvider
			.state('main.insuranceForm', {
				url: '/add/insuranceForm',
				views: {
					'content@': {
						resolve: {
							//regions: getRegions,
							//payments: getPayments
						},
						templateUrl: 'app/components/insurance/insurance-form.html',
						controller: 'InsuranceController',
						controllerAs: 'ic'
					}
				}
			})
			/*.state('main.carInsuranceForm', {
				url: '/carInsuranceForm',
				views: {
					'content@': {
						resolve: {
							//regions: getRegions,
							//payments: getPayments
						},
						templateUrl: 'app/components/insurance/car-insurance-form.html',
						controller: 'InsuranceController',
						controllerAs: 'ic'
					}
				}
			})*/

		/*
		getRegions.$inject = ['Region'];
		function getRegions(Region) {

			var returnValue = Region.get().$promise;
			return returnValue;
		}

		getPayments.$inject = ['Test'];
		function getPayments(Test) {
			var returnValue = Test.get().$promise;
			return returnValue;
		}
		*/
	}
})();