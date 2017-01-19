(function() {
	"use strict";

	angular
		.module('merchant-admin-app.car-insurance-service')
		.factory('CarInsuranceService', CarInsuranceService);

	CarInsuranceService.$inject = ['$resource'];
	function CarInsuranceService($resource) {
		var collectionName = "carInsuranceServices";
		return $resource("https://localhost:7000/api/:collectionName/:carInsuranceServiceId",
			{ carInsuranceServiceId: "@_id", collectionName: collectionName},
			{ update: { method: 'PUT' } });
	}
})();