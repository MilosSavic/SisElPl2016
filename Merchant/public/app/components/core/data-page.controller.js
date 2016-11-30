(function() {
	"use strict";
	
	angular
		.module('company-registry.core')
		.controller('DataPageController', DataPageController);

	DataPageController.$inject = ['$location','SideBar','$scope','$state','InsuranceData','Region','Insurance'];
	function DataPageController($location,SideBar,$scope,$state,InsuranceData,Region,Insurance) {
		var dpc = this;
		
		var insurance = JSON.parse(JSON.stringify(InsuranceData.getInsuranceData()));
		var startDate = new Date(insurance.startDate);
		startDate.setHours(startDate.getHours()+1);
		var endDate = new Date(insurance.endDate);
		endDate.setHours(endDate.getHours()+1);
		dpc.startDate = startDate.toDateString();
		dpc.endDate = endDate.toDateString();
		dpc.value = insurance.value;
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

		dpc.cancelHouseInsurance = function(){
			insurance.houseInsurance = undefined;
			InsuranceData.setHouseInsuranceChosen(false);
			dpc.houseInsuranceChosen = false;
		}

		dpc.cancelCarInsurance = function(){
			insurance.carInsurance = undefined;
			InsuranceData.setCarInsuranceChosen(false);
			dpc.carInsuranceChosen = false;
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
			dpc.sure=0;
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