(function() {
	"use strict";

	angular
		.module('merchant-app.amount')
		.factory('Amount', Amount);

	Amount.$inject = ['$resource'];
	function Amount($resource) {
		var collectionName = "amounts";
		return $resource("https://localhost:3000/api/:collectionName/:amountId",
			{ amountId: "@_id", collectionName: collectionName},
			{ update: { method: 'PUT' }, get: {timeout:10000 }});
	}
})();