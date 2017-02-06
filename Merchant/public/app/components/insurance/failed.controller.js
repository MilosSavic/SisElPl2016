(function() {
	"use strict";

	angular
		.module('merchant-app.insurance')
		.controller('FailedController', FailedController);


	FailedController.$inject = ['$location','$state','$rootScope','$stateParams','Insurance','Transaction','User'];
	function FailedController($location,$state,$rootScope,$stateParams,Insurance,Transaction,User) {
		var fc = this;
		alert($stateParams.failedOrderId);
		

		fc.idTransakcije = [];
		fc.brojKorisnika = [];


		Transaction.get(function(response){
			for(var i=0; i<response.transactions.length;i++)
			{

			if($stateParams.failedOrderId == response.transactions[i].idNumber){

				fc.idTransakcije.push(response.transactions[i]._id);
				break;
			}
			}

			
		});

		Insurance.query(function(response){
			for(var i=0; i<response.length;i++)
			{

			if(response[i].transaction==fc.idTransakcije[0]){
				
				for(var j=0; j<response[i].users.length;j++){
					
					fc.brojKorisnika.push(response[i].users[j]);
				}
					
				break;
			}
			}
			
			
		});

		User.get(function(response){

			for(var i=0; i<response.users.length;i++)
			{
				
				for(var j=0; j<fc.brojKorisnika.length;j++){
					if(response.users[i]._id == fc.brojKorisnika[j]){
						console.log("Email "+response.users[i].email);

						$.get("https://localhost:3000/failed",{send:response.users[i].email});
							
					}

				}
			
			}

			
		});
	
		
	}
})();

