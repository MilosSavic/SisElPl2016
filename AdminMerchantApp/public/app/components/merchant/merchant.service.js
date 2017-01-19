(function() {
	"use strict";

	angular
		.module('merchant-admin-app.merchant')
		.factory('Merchant', Merchant);

	Merchant.$inject = ['$resource'];
	function Merchant($resource) {
		var collectionName = "merchants";
		return $resource("https://localhost:7000/api/:collectionName/:merchantId",
			{ merchantId: "@_id", collectionName: collectionName},
			{ update: { method: 'PUT' } });
	}
})();