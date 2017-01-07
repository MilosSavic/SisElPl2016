(function() {
	"use strict";

	angular
		.module('merchant-app.core')
		.factory('Acquirer', Acquirer);

		//ma daj, mora da ovo moze lepse da se napise
	Acquirer.$inject = ['$resource'];
	function Acquirer($resource) {
		var collectionName = "getURLandID";
		return $resource("https://localhost:8000/api/:collectionName/:id",
			{id: "@_id", collectionName: collectionName},
			{ update: { method: 'PUT' } });
	}

})();

(function() {
	"use strict";

	angular
		.module('merchant-app.core')
		.factory('Transaction', Transaction);

		//ma daj, mora da ovo moze lepse da se napise
	Transaction.$inject = ['$resource'];
	function Transaction($resource) {
		var collectionName = "transactions";
		return $resource("https://localhost:3000/api/:collectionName/:id",
			{id: "@_id", collectionName: collectionName},
			{ update: { method: 'PUT' } });
	}

})();