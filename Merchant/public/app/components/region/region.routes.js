(function() {
	"use strict";

	angular
		.module('company-registry.region')
		.config(config);

	config.$inject = ['$stateProvider'];
	function config($stateProvider) {
		$stateProvider
			.state('main.regionForm', {
				url: '/regionForm',
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