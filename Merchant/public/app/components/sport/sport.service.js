(function() {
	"use strict";

	angular
		.module('company-registry.sport')
		.factory('Sport', Sport);

	Sport.$inject = ['$resource'];
	function Sport($resource) {
		var collectionName = "sports";
		return $resource("http://localhost:3000/api/:collectionName/:sportId",
			{ sportId: "@_id", collectionName: collectionName},
			{ update: { method: 'PUT' } });
	}
})();