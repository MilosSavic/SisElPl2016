(function() {
	"use strict";

	angular
		.module('payment-app.payment')
		.controller('PaymentController', PaymentController);

	PaymentController.$inject = ['$location','Payment','$stateParams','$state','CodeValidity','TransactionAuthorization'];
	function PaymentController($location, Payment,$stateParams,$state,CodeValidity,TransactionAuthorization) {
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
			else{
				pay.payment._id = response.payment_id;
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
				pay.payment.$saveOrUpdate(function(result){

					var reqForAuthorization = {
						acquirerOrderId:result.acquirerId,
						acquirerTimestamp:result.acquirerTimestamp,
						pan:result.pan,
						securityCode:result.security_code,
						cardHolderName:result.card_holder_name,
						expirationDate:result.expiry_date,
						transactionAmount:result.transaction_amount
					}

					var authorization = new TransactionAuthorization(reqForAuthorization);
					authorization.$save(function(result){
						alert(JSON.stringify(result));
					});
				});

		};



		function success() {
			console.log("Payment added...")
			$location.path('/payment');
		}
	}
})();