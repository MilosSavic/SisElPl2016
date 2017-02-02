(function() {
	"use strict";
	
	angular
		.module('merchant-app.core')
		.controller('DataPageController', DataPageController);

	DataPageController.$inject = ['$location','SideBar','$scope','$state','InsuranceData','Region','Insurance','Amount','UserRules','TotalRules','HouseInsuranceRules','CarInsuranceRules','AllRules','Acquirer','$window','Transaction','MerchantData','crTranslator', 'crTranslations'];
	function DataPageController($location,SideBar,$scope,$state,InsuranceData,Region,Insurance,Amount,UserRules,TotalRules,HouseInsuranceRules,CarInsuranceRules,AllRules,Acquirer,$window,Transaction,MerchantData,crTranslator,crTranslations) {
		
		if(!SideBar.isDataActive())
		{
			$state.go('main.insuranceForm');
			return;
		}
		var dpc = this;

		dpc.currentLanguage = crTranslations[crTranslator.getLanguage()].LANGUAGE;
		
		var insurance = JSON.parse(JSON.stringify(InsuranceData.getInsuranceData()));
		var startDate = new Date(insurance.startDate);
		startDate.setHours(startDate.getHours()+1);
		var endDate = new Date(insurance.endDate);
		endDate.setHours(endDate.getHours()+1);
		dpc.startDate = startDate.toDateString();
		dpc.endDate = endDate.toDateString();
		Amount.get({amountId: insurance.amount._id},function(response){
			dpc.amount = response.amount;
		})

		dpc.price = insurance.price;
		Region.get({regionId: insurance.region._id},function(response){
			
			dpc.regionSer = response.nameSer;
			dpc.region = response.name;
		});
		dpc.users = insurance.users;


		for(var i=0; i<dpc.users.length; i++)
		{
			dpc.users[i].index = i+1;
		}

		if(!InsuranceData.getHouseInsuranceChosen())
		{
			insurance.houseInsurance = undefined;
		}

		if(!InsuranceData.getCarInsuranceChosen())
		{
			insurance.carInsurance = undefined;
		}

		if(insurance.houseInsurance)
		{
			dpc.houseInsuranceChosen = true;
		}
		else
		{
			dpc.houseInsuranceChosen = false;
		}

		if(insurance.carInsurance)
		{
			dpc.carInsuranceChosen = true;
		}
		else
		{
			dpc.carInsuranceChosen = false;
		}
		

		var totalPrice = 0;
	 	 //form price
		 useAllRules();
		function useAllRules(){
			var allRules = new AllRules(insurance);
			allRules.$save(function(result){
				totalPrice+=result.value;
				dpc.price = totalPrice.toFixed(2);
				console.log(JSON.stringify(result));
				dpc.basePrice = result.basePrice.toFixed(2);
				dpc.houseInsurancePrice = result.houseInsurancePrice.toFixed(2);
				dpc.carInsurancePrice = result.carInsurancePrice.toFixed(2);
			})
		}

		dpc.cancelHouseInsurance = function(){
			insurance.houseInsurance = undefined;
			InsuranceData.setHouseInsuranceChosen(false);
			dpc.houseInsuranceChosen = false;
			//reculcalate price
			totalPrice = 0;
			useAllRules();
		}

		dpc.cancelCarInsurance = function(){
			insurance.carInsurance = undefined;
			InsuranceData.setCarInsuranceChosen(false);
			dpc.carInsuranceChosen = false;
			//reculcalate price
			totalPrice = 0;
			useAllRules();
		}

		dpc.sure = 0;
		dpc.deleteUser = function(index){
			dpc.sure = index;

		}

		dpc.notSure = function()
		{
			dpc.sure = 0;
		}

		dpc.confirmDeleteUser = function(index){
			insurance.users.splice(index-1,1);
			InsuranceData.getInsuranceData().users.splice(index-1,1);
			SideBar.setUserCount(insurance.users.length);
			for(var i=0; i<dpc.users.length; i++)
			{
				dpc.users[i].index = i+1;
			}
			InsuranceData.getInsuranceData().numberOfUsers--;
			insurance.numberOfUsers--;
			dpc.sure=0;
			totalPrice = 0;
			//reculcalate price
			useAllRules();
		}

		dpc.saveAll = function(){

			if(!InsuranceData.getHouseInsuranceChosen())
		{
			InsuranceData.getInsuranceData().houseInsurance = undefined;
		}
		
		

		if(!InsuranceData.getCarInsuranceChosen())
		{
			InsuranceData.getInsuranceData().carInsurance = undefined;
		}
		
		
			InsuranceData.getInsuranceData().price = dpc.price;
			console.log(JSON.stringify(InsuranceData.getInsuranceData()));
			InsuranceData.getInsuranceData().$save(function(result,err){
				
			Insurance.get({id: InsuranceData.getInsuranceData()._id},function(response){						
			InsuranceData.setInsuranceData(response);
			getMerchantData();
				
			});
			
			
			//paymentData = Payment.getURLandID();
			//savePaymentID
			//go to payment url
		});
		}
		dpc.morePriceData = function(){
			dpc.displayMoreData = true;
		}
		
		dpc.lessPriceData = function(){
			dpc.displayMoreData = false;
			
		}
		
		var id;
		var pass;
		var errorURL;
		
		function getMerchantData(){
			MerchantData.get(function(response){
				id = response.merchantID;
				pass = response.merchantPassword;
				errorURL = response.errorURL;
				success();
			});
		}

		function success() {
			var transactionNumberId = 0;
			alert(id);
			alert(pass);
			alert(errorURL);
			Transaction.get({id: InsuranceData.getInsuranceData().transaction},function(response)
			{
				var paymentData = {merchantID:id,merchantPassword:pass,errorURL:errorURL,transactionID:response.idNumber,transactionAmount:response.amount,merchantTimestamp: response.timestamp};
				var acquirer = new Acquirer(paymentData);
				acquirer.$save(function(result){
					console.log(result);
					if(result.message)
					{
						//$window.location.href = error stranica u ovom slucaju
						
						alert('ERROR:'+result.message);
						$window.location.href = errorURL;

					}
					else
					{
						$window.location.href = result.url+'/'+result.paymentID;
					}
			})
				
			})

			console.log(JSON.stringify(InsuranceData.getInsuranceData()));
			//zasto sam ja ovo radio?!
			//Region.get({regionId: InsuranceData.getInsuranceData().region},function(response){
			//InsuranceData.getInsuranceData().region = response;
		//});
		}
		
	}
})();