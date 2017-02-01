(function() {
	"use strict";

	angular
		.module('payment-app.payment')
		.config(config);

	config.$inject = ['$stateProvider'];
	function config($stateProvider) {
		$stateProvider
			.state('main.paymentForm', {
				url: '/add/paymentForm/:code/:paymentID',
				views: {
					'content@': {

						templateUrl: 'app/components/payment/payment-form.html',
						controller: 'PaymentController',
						controllerAs: 'pay'
					}
				}
			})
			.state('main.successURL', {
				url: '/successURL',
				views: {
					'content@': {

						templateUrl: 'app/components/payment/success.html',
						controller: 'PaymentController',
						controllerAs: 'pay'
					}
				}
			})
			.state('main.failedURL', {
				url: '/failedURL',
				views: {
					'content@': {

						templateUrl: 'app/components/payment/failed.html',
						controller: 'PaymentController',
						controllerAs: 'pay'
					}
				}
			})
			.state('main.errorURL', {
				url: '/errorURL',
				views: {
					'content@': {

						templateUrl: 'app/components/payment/error.html',
						controller: 'PaymentController',
						controllerAs: 'pay'
					}
				}
			});

	}
})();