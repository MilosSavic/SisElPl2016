(function() {
	"use strict";

	angular
		.module('merchant-admin-app.house-insurance-category')
		.factory('HouseInsuranceCategory', HouseInsuranceCategory);

	HouseInsuranceCategory.$inject = ['$resource'];
	function HouseInsuranceCategory($resource) {
		var collectionName = "houseInsuranceCategories";
		return $resource("https://localhost:7000/api/:collectionName/:houseInsuranceCategoryId",
			{ houseInsuranceCategoryId: "@_id", collectionName: collectionName},
			{ update: { method: 'PUT' } });
	}
})();