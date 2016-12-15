(function() {
	"use strict";

	angular
		.module('merchant-app.region')
		.config(config);

	config.$inject = ['$stateProvider'];
	function config($stateProvider) {
		$stateProvider
			.state('main.regionForm', {
				url: '/header/add/regionForm',
				views: {
					'content@': {
						resolve: {
							//regions: getRegions,
							//payments: getPayments
						},
						templateUrl: 'app/components/region/region-form.html',
						controller: 'RegionController',
						controllerAs: 'rc'
					}
				}
			})

	}
})();