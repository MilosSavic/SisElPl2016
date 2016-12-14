(function() {
	"use strict";

	angular
		.module('merchant-app.house-insurance-category')
		.factory('HouseInsuranceCategory', HouseInsuranceCategory);

	HouseInsuranceCategory.$inject = ['$resource'];
	function HouseInsuranceCategory($resource) {
		var collectionName = "houseInsuranceCategories";
		return $resource("http://localhost:3000/api/:collectionName/:houseInsuranceCategoryId",
			{ houseInsuranceCategoryId: "@_id", collectionName: collectionName},
			{ update: { method: 'PUT' } });
	}
})();