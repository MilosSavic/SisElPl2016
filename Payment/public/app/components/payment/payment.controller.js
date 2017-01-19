(function() {
	"use strict";

	angular
		.module('payment-app.payment')
		.controller('PaymentController', PaymentController);

	PaymentController.$inject = ['$location','Payment','$stateParams','$state','CodeValidity'];
	function PaymentController($location, Payment,$stateParams,$state,CodeValidity) {
		var pay = this;
		var codeValidity = new CodeValidity();
		codeValidity.code = $stateParams.code;
		codeValidity.id = $stateParams.paymentID;
		var codeValid = false;
		codeValidity.$save(function(response){
			if(!response.valid)
			{
				$state.go('main.home');
				return;
			}
		});
		

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