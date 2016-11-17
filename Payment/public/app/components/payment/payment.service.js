(function() {
	"use strict";

	angular
		.module('company-registry.payment')
		.factory('Payment', Payment);

	Payment.$inject = ['$resource'];
	function Payment($resource) {
		var collectionName = "payments";
		var paymentService = $resource("http://localhost:8000/api/:collectionName/:id",
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