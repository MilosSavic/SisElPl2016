(function() {
	"use strict";

	angular
		.module('company-registry.house-insurance-category')
		.controller('HouseInsuranceCategoryController', HouseInsuranceCategoryController);

	HouseInsuranceCategoryController.$inject = ['$location','HouseInsuranceCategory','$state'];
	function HouseInsuranceCategoryController($location,HouseInsuranceCategory,$state) {
		var hicc = this;
		hicc.houseInsuranceCategory = new HouseInsuranceCategory();

		HouseInsuranceCategory.get(function(response){hicc.listOfHouseInsuranceCategories = response.houseInsuranceCategories;});

		hicc.submit = function(){
			hicc.houseInsuranceCategory.$save(success);
		}
		function success() {
			console.log("HouseInsuranceCategory added...")
			HouseInsuranceCategory.get(function(response){hicc.listOfHouseInsuranceCategories = response.houseInsuranceCategories;});
			hicc.houseInsuranceCategory = new HouseInsuranceCategory();
		}
	}
})();