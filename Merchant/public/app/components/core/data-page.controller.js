(function() {
	"use strict";
	
	angular
		.module('merchant-app.core')
		.controller('DataPageController', DataPageController);

	DataPageController.$inject = ['$location','SideBar','$scope','$state','InsuranceData','Region','Insurance','Amount','UserRules','TotalRules','HouseInsuranceRules','CarInsuranceRules'];
	function DataPageController($location,SideBar,$scope,$state,InsuranceData,Region,Insurance,Amount,UserRules,TotalRules,HouseInsuranceRules,CarInsuranceRules) {
		var dpc = this;
		
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
	 	nextUserPrice(insurance.users[0],0);

	 	function nextUserPrice(user,index){
	 		var userRule = new UserRules(user);
	 		userRule.$save(function(result){
	 		console.log(result);
	     	totalPrice+=result.value;
	     	index++;
	     	if(insurance.users[index])
	        	nextUserPrice(insurance.users[index],index);
	      	else formHouseInsurancePrice();
	 		})
	  }
	  function formHouseInsurancePrice(){

	  	if(insurance.houseInsurance){
	  	if(insurance.houseInsurance._id)
	    delete insurance.houseInsurance._id;
	  	var houseInsuranceRule = new HouseInsuranceRules(insurance.houseInsurance);
	  	houseInsuranceRule.$save(function(result)
	  	{
	  		console.log(result);
	  		totalPrice+=result.value;
	  		formCarInsurancePrice();
	  	})
	  	}
	  	else {
	  		formCarInsurancePrice();
	  	}
	  }

	  function formCarInsurancePrice(){

	  	if(insurance.carInsurance){
	  		if(insurance.carInsurance._id)
	  			delete insurance.carInsurance._id;
	  		var carInsuranceRule = new CarInsuranceRules(insurance.carInsurance);
	  		carInsuranceRule.$save(function(result)
	  		{
	  			console.log(result);
	  			totalPrice+=result.value;
	  			formTotalPrice();
	  		})
	  	}
	  	else {
	  		formTotalPrice();
	  	}
	  }

	    //calculate total price
	  function formTotalPrice(){
	  	insurance.totalPrice = totalPrice;
	  	var totalRule = new TotalRules(insurance);

	  	totalRule.$save(function(result){
	  		 console.log(result);
	      dpc.price = result.value;
	      InsuranceData.getInsuranceData().price = result.value;
	  	})
	  }

		dpc.cancelHouseInsurance = function(){
			insurance.houseInsurance = undefined;
			InsuranceData.setHouseInsuranceChosen(false);
			dpc.houseInsuranceChosen = false;
			//reculcalate price
			totalPrice = 0;
			nextUserPrice(insurance.users[0],0);
		}

		dpc.cancelCarInsurance = function(){
			insurance.carInsurance = undefined;
			InsuranceData.setCarInsuranceChosen(false);
			dpc.carInsuranceChosen = false;
			//reculcalate price
			totalPrice = 0;
			nextUserPrice(insurance.users[0],0);
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
			nextUserPrice(insurance.users[0],0);
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
			console.log(JSON.stringify(InsuranceData.getInsuranceData()));
			InsuranceData.getInsuranceData().$save(success);
		}

		function success() {
			console.log("Insurance added...")
			console.log(JSON.stringify(InsuranceData.getInsuranceData()));
			Region.get({regionId: InsuranceData.getInsuranceData().region},function(response){
			InsuranceData.getInsuranceData().region = response;
		});
		}
		
	}
})();