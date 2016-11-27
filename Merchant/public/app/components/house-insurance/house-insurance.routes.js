(function() {
	"use strict";

	angular
		.module('company-registry.house-insurance')
		.config(config);

	config.$inject = ['$stateProvider'];
	function config($stateProvider) {
		$stateProvider
			.state('main.houseInsuranceForm', {
				url: '/houseInsuranceForm',
				views: {
					'content@': {
						resolve: {
							//regions: getRegions,
							//payments: getPayments
						},
						templateUrl: 'app/components/house-insurance/house-insurance-form.html',
						controller: 'HouseInsuranceController',
						controllerAs: 'hic'
					}
				}
			})

	}
})();