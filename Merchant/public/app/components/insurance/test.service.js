(function() {
	"use strict";

	angular
		.module('merchant-app.insurance')
		.factory('Test', Test);

	Test.$inject = ['$resource'];
	function Test($resource) {
		var collectionName = "payments";
		return $resource("http://localhost:8000/api/:collectionName/:id",
			{id: "@_id", collectionName: collectionName},
			{ update: { method: 'PUT' } });
	}
})();