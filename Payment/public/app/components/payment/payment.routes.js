(function() {
	"use strict";

	angular
		.module('payment-app.payment')
		.config(config);

	config.$inject = ['$stateProvider'];
	function config($stateProvider) {
		$stateProvider
			.state('main.paymentForm', {
				url: '/add/paymentForm',
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