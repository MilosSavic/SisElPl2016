(function() {
	"use strict";

	angular
		.module('merchant-app.amount')
		.controller('AmountController', AmountController);

	AmountController.$inject = ['$location','Amount','$state'];
	function AmountController($location,Amount,$state) {
		var ac = this;
		ac.amount = new Amount();

		Amount.get(function(response){ac.listOfAmounts = response.amounts;});

		ac.submitAmount = function(){
			ac.amount.$save(success);
		}
		function success() {
			console.log("Amount added...")
			Amount.get(function(response){ac.listOfAmounts = response.amounts;});
			ac.amount = new Amount();
		}
	}
})();