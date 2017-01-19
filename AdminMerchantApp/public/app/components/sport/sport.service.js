(function() {
	"use strict";

	angular
		.module('merchant-admin-app.sport')
		.factory('Sport', Sport);

	Sport.$inject = ['$resource'];
	function Sport($resource) {
		var collectionName = "sports";
		return $resource("https://localhost:7000/api/:collectionName/:sportId",
			{ sportId: "@_id", collectionName: collectionName},
			{ update: { method: 'PUT' } });
	}
})();