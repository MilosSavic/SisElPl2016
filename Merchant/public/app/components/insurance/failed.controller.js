(function() {
	"use strict";

	angular
		.module('merchant-app.insurance')
		.controller('FailedController', FailedController);


	FailedController.$inject = ['$location','$state','$rootScope','$stateParams','Insurance','Transaction','User','EmailService','crTranslator', 'crTranslations'];
	function FailedController($location,$state,$rootScope,$stateParams,Insurance,Transaction,User,EmailService,crTranslator, crTranslations) {
		var fc = this;
		alert($stateParams.failedOrderId);

		var lang=$stateParams.language;
		var jezik;

		if(lang=='Sr'){
			jezik='sr-latn';
		}else{
			jezik='en';
		}



            crTranslator.setLanguage(jezik);
            fc.currentLanguage = crTranslations[jezik].LANGUAGE;
         

        if(jezik=='en'){
			var emailData = {

					transactionId: $stateParams.failedOrderId,
					emailText: "Insurance purchase failed.",
					emailSubject: "Insurance purchase"
			}
					
		}else{
			var emailData = {

				transactionId: $stateParams.failedOrderId,
				emailText: "Kupovina osiguranja nije uspela.",
				emailSubject: "Kupovina osiguranja"
			}
		}

		var emailService = new EmailService(emailData);
				emailService.$save(function(result){
					alert(JSON.stringify(result));
		})
	
		
	}
})();


			