(function() {
	"use strict";

	angular
		.module('merchant-admin-app.amount')
		.config(config);

	config.$inject = ['$stateProvider'];
	function config($stateProvider) {
		$stateProvider
			.state('main.amountForm', {
				url: '/header/add/amountForm',
				views: {
					'content@': {
						resolve: {

						},
						templateUrl: 'app/components/amount/amount-form.html',
						controller: 'AmountController',
						controllerAs: 'ac'
					}
				}
			})

	}
})();