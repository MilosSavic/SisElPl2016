(function() {
	"use strict";

	angular
		.module('merchant-app.car-insurance-service')
		.factory('CarInsuranceService', CarInsuranceService);

	CarInsuranceService.$inject = ['$resource'];
	function CarInsuranceService($resource) {
		var collectionName = "carInsuranceServices";
		return $resource("https://localhost:3000/api/:collectionName/:carInsuranceServiceId",
			{ carInsuranceServiceId: "@_id", collectionName: collectionName},
			{ update: { method: 'PUT' } });
	}
})();