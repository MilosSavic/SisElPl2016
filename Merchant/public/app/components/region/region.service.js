(function() {
	"use strict";

	angular
		.module('company-registry.region')
		.factory('Region', Region);

	Region.$inject = ['$resource'];
	function Region($resource) {
		var collectionName = "regions";
		return $resource("http://localhost:3000/api/:collectionName/:id",
			{ id: "@_id", collectionName: collectionName},
			{ update: { method: 'PUT' } });
	}
})();