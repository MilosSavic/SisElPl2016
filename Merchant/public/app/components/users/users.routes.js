(function() {
	"use strict";

	angular
		.module('merchant-app.users')
		.config(config);

	config.$inject = ['$stateProvider'];
	function config($stateProvider) {
		$stateProvider
			.state('main.usersInsuranceForm', {
				url: '/add/usersInsuranceForm/:userIndex',
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