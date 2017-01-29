(function() {
	"use strict";

	angular
		.module('payment-app.payment')
		.factory('Payment', Payment);

	Payment.$inject = ['$resource'];
	function Payment($resource) {
		var collectionName = "payments";
		var paymentService = $resource("https://localhost:8000/api/:collectionName/:id",
			{id: "@_id", collectionName: collectionName},
			{ update: { method: 'PUT' } });

		//Mogli smo da ekstendujemo paymentService, pa da onda u kontroleru koristimo Payment.$saveOrUpdate(pay.payment, successCallback)
		//Kada extendujemo prototip onda kažemo da će ovu metodu imati svaka instanca paymentService-a.
		angular.extend(paymentService.prototype, {
			$saveOrUpdate: function(successCallback) {
				if(!this._id) {
					this.$save(successCallback);
				} else {
					this.$update(successCallback);
				}
			}
		});
		return paymentService;
	}
})();

(function() {
	"use strict";

	angular
		.module('payment-app.payment')
		.factory('CodeValidity', CodeValidity);


	CodeValidity.$inject = ['$resource'];
	function CodeValidity($resource) {
		var collectionName = "checkCodeValidity";
		return $resource("https://localhost:8000/api/:collectionName/:id",
			{id: "@_id", collectionName: collectionName},
			{ update: { method: 'PUT' } });
	}

})();

(function() {
	"use strict";

	angular
		.module('payment-app.payment')
		.factory('TransactionAuthorization', TransactionAuthorization);


	TransactionAuthorization.$inject = ['$resource'];
	function TransactionAuthorization($resource) {
		var collectionName = "auth";
		return $resource("http://localhost:8443/:collectionName/:id",
			{id: "@_id", collectionName: collectionName},
			{ update: { method: 'PUT' } });
	}

})();

(function() {
	"use strict";

	angular
		.module('payment-app.payment')
		.factory('MerchantCommunication', MerchantCommunication);


	MerchantCommunication.$inject = ['$resource'];
	function MerchantCommunication($resource) {
		var collectionName = "getURL";
		return $resource("https://localhost:3000/api/:collectionName/:id",
			{id: "@_id", collectionName: collectionName},
			{ update: { method: 'PUT' } });
	}

})();