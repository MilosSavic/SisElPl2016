(function() {
	"use strict";

	angular
		.module('merchant-admin-app.region')
		.factory('Region', Region);

	Region.$inject = ['$resource'];
	function Region($resource) {
		var collectionName = "regions";
		return $resource("https://localhost:7000/api/:collectionName/:regionId",
			{ regionId: "@_id", collectionName: collectionName},
			{ update: { method: 'PUT' } });
	}
})();