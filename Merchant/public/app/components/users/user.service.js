(function() {
	"use strict";

	angular
		.module('company-registry.users')
		.factory('User', User);

	User.$inject = ['$resource'];
	function User($resource) {
		var collectionName = "users";
		return $resource("http://localhost:3000/api/:collectionName/:userId",
			{userId: "@_id", collectionName: collectionName},
			{ update: { method: 'PUT' } });
	}
})();