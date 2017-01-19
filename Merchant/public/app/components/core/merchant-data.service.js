(function() {
	"use strict";

	angular
		.module('merchant-app.core')
		.factory('MerchantData', MerchantData);

	MerchantData.$inject = ['$resource'];
	function MerchantData($resource) {
		var collectionName = "merchants";
		return $resource("https://localhost:3000/api/:collectionName/:id",
			{id: "@_id", collectionName: collectionName},
			{ update: { method: 'PUT' } });
	}

})();
