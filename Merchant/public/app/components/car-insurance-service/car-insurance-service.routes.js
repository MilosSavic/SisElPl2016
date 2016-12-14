(function() {
	"use strict";

	angular
		.module('merchant-app.car-insurance-service')
		.config(config);

	config.$inject = ['$stateProvider'];
	function config($stateProvider) {
		$stateProvider
			.state('main.carInsuranceServiceForm', {
				url: '/header/add/carInsuranceServiceForm',
				views: {
					'content@': {
						resolve: {

						},
						templateUrl: 'app/components/car-insurance-service/car-insurance-service-form.html',
						controller: 'CarInsuranceServiceController',
						controllerAs: 'cisc'
					}
				}
			})

	}
})();