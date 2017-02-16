(function() {
	"use strict";

	angular
		.module('payment-app.payment')
		.factory('Payment', Payment);

	Payment.$inject = ['$resource'];
	function Payment($resource) {
		var paymentsDB = [];
		var collectionName = "payments";
		var paymentService = $resource("https://localhost:8000/api/:collectionName/:id",
			{id: "@_id", collectionName: collectionName},
			{ update: { method: 'PUT' } });

		angular.extend(paymentService.prototype, {
			$saveOrUpdate: function(successCallback) {
				if(!this._id) {
					this.$save(successCallback);
				} else {
					this.$update(successCallback);
				}
			}
		});

		angular.extend(paymentService, {

			savePaymentDB: savePaymentDB,
			getPaymentsDB: getPaymentsDB,
		});

		function savePaymentDB(payment) {
			if(payment._id) {
				return payment.$update().then(function(data) {
					paymentsDB.push(data);
				});
			} else {
				return payment.$save().then(function(data) {
					paymentsDB.push(data);
				});
			}
		}

		function getPaymentsDB() {
			return paymentService.get().$promise.then(function(data) {
				paymentsDB = data.results;
				return paymentsDB;
			});
		}
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
		var collectionName = "authorize";
		return $resource("http://localhost:8443/payment/:collectionName/:id",
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