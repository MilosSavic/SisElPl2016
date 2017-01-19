(function() {
	"use strict";

	angular
		.module('merchant-admin-app.amount')
		.factory('Amount', Amount);

	Amount.$inject = ['$resource'];
	function Amount($resource) {
		var collectionName = "amounts";
		return $resource("https://localhost:7000/api/:collectionName/:amountId",
			{ amountId: "@_id", collectionName: collectionName},
			{ update: { method: 'PUT' } });
	}
})();