(function() {
	"use strict";

	angular
		.module('company-registry.house-insurance-category')
		.config(config);

	config.$inject = ['$stateProvider'];
	function config($stateProvider) {
		$stateProvider
			.state('main.houseInsuranceCategoryForm', {
				url: '/header/add/houseInsuranceCategoryForm',
				views: {
					'content@': {
						resolve: {

						},
						templateUrl: 'app/components/house-insurance-category/house-insurance-category-form.html',
						controller: 'HouseInsuranceCategoryController',
						controllerAs: 'hicc'
					}
				}
			})

	}
})();