(function() {
	"use strict";

	angular
		.module('merchant-app.region')
		.factory('Region', Region);

	Region.$inject = ['$resource'];
	function Region($resource) {
		var collectionName = "regions";
		return $resource("https://localhost:3000/api/:collectionName/:regionId",
			{ regionId: "@_id", collectionName: collectionName},
			{ update: { method: 'PUT' } });
	}
})();