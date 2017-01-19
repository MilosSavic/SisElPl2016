(function() {
	"use strict";

	angular
		.module('merchant-admin-app.merchant')
		.config(config);

	config.$inject = ['$stateProvider'];
	function config($stateProvider) {
		$stateProvider
			.state('main.merchantForm', {
				url: '/header/add/merchantForm',
				views: {
					'content@': {
						resolve: {

						},
						templateUrl: 'app/components/merchant/merchant-form.html',
						controller: 'MerchantController',
						controllerAs: 'mc'
					}
				}
			})

	}
})();