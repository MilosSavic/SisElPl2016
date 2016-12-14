(function() {
	"use strict";

	angular
		.module('payment-app.payment')
		.controller('PaymentController', PaymentController);

	PaymentController.$inject = ['$location','Payment'];
	function PaymentController($location, Payment) {
		var pay = this;

		pay.datepicker = {
			minDate: new Date(),
			maxDate: new Date(2222,11,30),
			format: 'mediumDate',
			opened: false
		};

		pay.payment = new Payment();

		pay.addPayment = function() {
			 console.log('savee');
				pay.payment.$saveOrUpdate(success);

		};



		function success() {
			console.log("Payment added...")
			$location.path('/payment');
		}
	}
})();