(function() {
	"use strict";

	angular
		.module('company-registry.amount')
		.config(config);

	config.$inject = ['$stateProvider'];
	function config($stateProvider) {
		$stateProvider
			.state('main.amountForm', {
				url: '/amountForm',
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