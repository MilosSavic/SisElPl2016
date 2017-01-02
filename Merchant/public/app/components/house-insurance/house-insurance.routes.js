(function() {
	"use strict";

	angular
		.module('merchant-app.house-insurance')
		.config(config);

	config.$inject = ['$stateProvider'];
	function config($stateProvider) {
		$stateProvider
			.state('main.houseInsuranceForm', {
				url: '/add/houseInsuranceForm',
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
			.state('main.houseInsuranceCheckboxes', {
				url: '/add/houseInsuranceCheckboxes',
				views: {
					'content@': {
						resolve: {
							//regions: getRegions,
							//payments: getPayments
						},
						templateUrl: 'app/components/house-insurance/house-insurance-checkboxes.html',
						controller: 'HouseInsuranceController',
						controllerAs: 'hic'
					}
				}
			})

	}
})();