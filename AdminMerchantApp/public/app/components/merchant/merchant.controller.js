(function() {
	"use strict";

	angular
		.module('merchant-admin-app.merchant')
		.controller('MerchantController', MerchantController);

	MerchantController.$inject = ['$location','Merchant','$state','$window'];
	function MerchantController($location,Merchant,$state,$window) {
		var mc = this;
		mc.merchant = new Merchant();

		Merchant.get(function(response){mc.listOfMerchants = [response]});

		mc.submitMerchant = function(){
			$state.reload();
			mc.merchant.$save(success);
		}
		function success() {
			console.log("Merchant added...")
			Merchant.get(function(response){mc.listOfMerchants = response.merchants;});
			mc.merchants = new Merchant();
		}
	}
})();