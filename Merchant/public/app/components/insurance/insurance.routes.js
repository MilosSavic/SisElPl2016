(function() {
	"use strict";

	angular
		.module('company-registry.insurance')
		.config(config);

	config.$inject = ['$stateProvider'];
	function config($stateProvider) {
		$stateProvider
			.state('main.insuranceForm', {
				url: '/insuranceForm',
				views: {
					'content@': {
						resolve: {
							regions: getRegions	
						},
						templateUrl: 'app/components/insurance/insurance-form.html',
						controller: 'InsuranceController',
						controllerAs: 'ic'
					}
				}
			});	

		getRegions.$inject = ['Region'];
		function getRegions(Region) {
			var returnValue = Region.get().$promise;
			console.log(returnValue);
			return returnValue;
		}

	}
})();