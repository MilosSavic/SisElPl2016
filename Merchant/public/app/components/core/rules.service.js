(function() {
	"use strict";

	angular
		.module('merchant-app.core')
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
		.module('merchant-app.core')
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

(function() {
	"use strict";

	angular
		.module('merchant-app.core')
		.factory('HouseInsuranceRules', HouseInsuranceRules);

		//ma daj, mora da ovo moze lepse da se napise
	HouseInsuranceRules.$inject = ['$resource'];
	function HouseInsuranceRules($resource) {
		var collectionName = "houseInsuranceRules";
		return $resource("http://localhost:3000/api/:collectionName/:id",
			{id: "@_id", collectionName: collectionName},
			{ update: { method: 'PUT' } });
	}

})();

(function() {
	"use strict";

	angular
		.module('merchant-app.core')
		.factory('CarInsuranceRules', CarInsuranceRules);

		//ma daj, mora da ovo moze lepse da se napise
	CarInsuranceRules.$inject = ['$resource'];
	function CarInsuranceRules($resource) {
		var collectionName = "carInsuranceRules";
		return $resource("http://localhost:3000/api/:collectionName/:id",
			{id: "@_id", collectionName: collectionName},
			{ update: { method: 'PUT' } });
	}

})();

(function() {
	"use strict";

	angular
		.module('merchant-app.core')
		.factory('AllRules', AllRules);

		//ma daj, mora da ovo moze lepse da se napise
	AllRules.$inject = ['$resource'];
	function AllRules($resource) {
		var collectionName = "allRules";
		return $resource("http://localhost:3000/api/:collectionName/:id",
			{id: "@_id", collectionName: collectionName},
			{ update: { method: 'PUT' } });
	}

})();