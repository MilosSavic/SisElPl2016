(function() {
	"use strict";

	angular
		.module('company-registry.core')
		.factory('UserRules', UserRules);

		//ma daj, mora da ovo moze lepse da se napise
	UserRules.$inject = ['$resource'];
	function UserRules($resource) {
		var collectionName = "userRules";
		return $resource("http://localhost:3000/api/:collectionName/:id",
			{id: "@_id", collectionName: collectionName},
			{ update: { method: 'PUT' } });
	}

})();

(function() {
	"use strict";

	angular
		.module('company-registry.core')
		.factory('TotalRules', TotalRules);

		//ma daj, mora da ovo moze lepse da se napise
	TotalRules.$inject = ['$resource'];
	function TotalRules($resource) {
		var collectionName = "totalRules";
		return $resource("http://localhost:3000/api/:collectionName/:id",
			{id: "@_id", collectionName: collectionName},
			{ update: { method: 'PUT' } });
	}

})();