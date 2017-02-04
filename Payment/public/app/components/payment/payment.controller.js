(function() {
	"use strict";

	angular
		.module('payment-app.payment')
		.controller('PaymentController', PaymentController);

	PaymentController.$inject = ['$location','Payment','$stateParams','$state','CodeValidity','TransactionAuthorization','MerchantCommunication','$window'];
	function PaymentController($location, Payment,$stateParams,$state,CodeValidity,TransactionAuthorization,MerchantCommunication,$window) {
		var pay = this;
		var codeValidity = new CodeValidity();
		var merchantOrderId;
		var errorUrl;
		codeValidity.code = $stateParams.code;
		codeValidity.id = $stateParams.paymentID;
		var codeValid = false;
		codeValidity.$save(function(response){
			if(!response.valid)
			{
				/*$state.go('main.errorURL');
				$.get("https://localhost:8000/errorURL");*/
				$state.go('main.home');
				return;
			}
			else{
				pay.payment._id = response.payment_id;
				merchantOrderId = response.merchantOrderId;
				errorUrl = response.errorURL;

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
					var message = "Something went wrong. Communication with Acquirer services failed."
					var acquirerOrderId = 0;
					var acquirerTimestamp = 0;
					var issuerOrderId = 0;
					var issuerTimestamp = 0;
					var httpStatus = "";

					var reqForAuthorization = {
						acquirerOrderId:result.acquirerId,
						acquirerTimestamp:result.acquirerTimestamp,
						pan:result.pan,
						securityCode:result.security_code,
						cardHolderName:result.card_holder_name,
						expirationDate:result.expiry_date,
						transactionAmount:result.transaction_amount
					}
					//NAPOMENA: trenutno ne radi jer smo mi na https-u a Vladimir na http-u. U stvari radi jer sam omogucio cross origin kod njega, ali ne treba tako da bude xD
					var authorization = new TransactionAuthorization(reqForAuthorization);
					authorization.$save(function(result){
							
						var acqDate = new Date(result.acquirerTimestamp);
						var issDate = new Date(result.issuerTimestamp);
						var reqForMerchant = {
						message: result.message,
						acquirerOrderId: result.acquirerOrderId,
						acquirerTimestamp: acqDate,
						issuerTimestamp: issDate,
						issuerOrderId: result.issuerOrderId,
						status: result.httpStatus,
						merchantOrderId: merchantOrderId
						}
						alert(JSON.stringify(result));
						var merchantCommunication = new MerchantCommunication(reqForMerchant);
						merchantCommunication.$save(function(result2){
							if(result2.url)
							{
								alert(result2.message + "," + result.message + ", redirecting to: " +result2.url);
							//	$.get("https://localhost:3000/#!/success");
								$window.location.href = result2.url+"/"+merchantOrderId;
								
								
								
							}
							else {
								$window.location.href = errorUrl+"/"+merchantOrderId;
							}
						})

					});
					

					


				});

				var getPay = Payment.getPaymentsDB();

		};



		function success() {
			console.log("Payment added...")
			$location.path('/payment');
		}
	}
})();