(function() {
	"use strict";

	angular
		.module('company-registry.insurance')
		.factory('Insurance', Insurance);

	Insurance.$inject = ['$resource'];
	function Insurance($resource) {
		var collectionName = "insurances";
		return $resource("http://localhost:3000/api/:collectionName/:id",
			{id: "@_id", collectionName: collectionName},
			{ update: { method: 'PUT' } });
	}
})();