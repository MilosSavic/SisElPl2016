(function() {
	"use strict";

	angular
		.module('company-registry.car-insurance')
		.config(config);

	config.$inject = ['$stateProvider'];
	function config($stateProvider) {
		$stateProvider
			.state('main.carInsuranceForm', {
				url: '/carInsuranceForm',
				views: {
					'content@': {
						resolve: {
							services: getServices,
							//payments: getPayments
						},
						templateUrl: 'app/components/car-insurance/car-insurance-form.html',
						controller: 'CarInsuranceController',
						controllerAs: 'cic'
					}
				}
			})
			getServices.$inject = ['CarInsuranceService'];
			function getServices(CarInsuranceService) {
				return CarInsuranceService.get().$promise;
		}
	}

	

})();