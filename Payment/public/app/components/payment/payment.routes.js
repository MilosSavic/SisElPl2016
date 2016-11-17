(function() {
	"use strict";

	angular
		.module('company-registry.payment')
		.config(config);

	config.$inject = ['$stateProvider'];
	function config($stateProvider) {
		$stateProvider
			.state('main.paymentForm', {
				url: '/paymentForm',
				views: {
					'content@': {

						templateUrl: 'app/components/payment/payment-form.html',
						controller: 'PaymentController',
						controllerAs: 'pay'
					}
				}
			});

	}
})();