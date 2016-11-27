(function() {
	"use strict";

	angular
		.module('company-registry.users')
		.config(config);

	config.$inject = ['$stateProvider'];
	function config($stateProvider) {
		$stateProvider
			.state('main.usersInsuranceForm', {
				url: '/usersInsuranceForm',
				views: {
					'content@': {
						resolve: {
							//regions: getRegions,
							//payments: getPayments
						},
						templateUrl: 'app/components/users/users-insurance-form.html',
						controller: 'UsersController',
						controllerAs: 'uc'
					}
				}
			})

	}
})();