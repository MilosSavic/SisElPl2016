(function() {
	"use strict";

	angular
		.module('company-registry.amount')
		.factory('Amount', Amount);

	Amount.$inject = ['$resource'];
	function Amount($resource) {
		var collectionName = "amounts";
		return $resource("http://localhost:3000/api/:collectionName/:amountId",
			{ amountId: "@_id", collectionName: collectionName},
			{ update: { method: 'PUT' } });
	}
})();