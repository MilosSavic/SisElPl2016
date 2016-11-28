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
							//regions: getRegions,
							//payments: getPayments
						},
						templateUrl: 'app/components/car-insurance/car-insurance-form.html',
						controller: 'CarInsuranceController',
						controllerAs: 'cic'
					}
				}
			})

	}
})();