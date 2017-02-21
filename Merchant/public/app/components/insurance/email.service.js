(function() {
	"use strict";

	angular
		.module('merchant-app.insurance')
		.factory('EmailService', EmailService);

	EmailService.$inject = ['$resource'];
	function EmailService($resource) {
		var collectionName = "sendEmail";
		return $resource("https://localhost:3000/api/:collectionName/:id",
			{id: "@_id", collectionName: collectionName},
			{ update: { method: 'PUT' } });
	}

})();