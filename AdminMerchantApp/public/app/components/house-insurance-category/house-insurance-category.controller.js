(function() {
	"use strict";

	angular
		.module('merchant-admin-app.house-insurance-category')
		.controller('HouseInsuranceCategoryController', HouseInsuranceCategoryController);

	HouseInsuranceCategoryController.$inject = ['$location','HouseInsuranceCategory','$state','$window'];
	function HouseInsuranceCategoryController($location,HouseInsuranceCategory,$state,$window) {
		var hicc = this;
		hicc.houseInsuranceCategory = new HouseInsuranceCategory();

		HouseInsuranceCategory.get(function(response){hicc.listOfHouseInsuranceCategories = response.houseInsuranceCategories;});

		hicc.submit = function(){
			$state.reload();
			hicc.houseInsuranceCategory.$save(success);
		}
		function success() {
			console.log("HouseInsuranceCategory added...")
			HouseInsuranceCategory.get(function(response){hicc.listOfHouseInsuranceCategories = response.houseInsuranceCategories;});
			hicc.houseInsuranceCategory = new HouseInsuranceCategory();
		}
	}
})();