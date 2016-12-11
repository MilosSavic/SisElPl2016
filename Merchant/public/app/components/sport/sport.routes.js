(function() {
	"use strict";

	angular
		.module('company-registry.sport')
		.config(config);

	config.$inject = ['$stateProvider'];
	function config($stateProvider) {
		$stateProvider
			.state('main.sportForm', {
				url: '/header/add/sportForm',
				views: {
					'content@': {
						resolve: {

						},
						templateUrl: 'app/components/sport/sport-form.html',
						controller: 'SportController',
						controllerAs: 'sc'
					}
				}
			})

	}
})();