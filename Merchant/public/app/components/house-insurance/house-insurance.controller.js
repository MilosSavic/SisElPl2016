(function() {
	"use strict";

	angular
		.module('company-registry.house-insurance')
		.controller('HouseInsuranceController', HouseInsuranceController);

	HouseInsuranceController.$inject = ['$location','HouseInsuranceCategory','$state','CarInsurance','InsuranceData','SideBar'];
	function HouseInsuranceController($location,HouseInsuranceCategory,$state,CarInsurance,InsuranceData,SideBar) {
		var hic = this;
		hic.houseInsurance = InsuranceData.getInsuranceData().houseInsurance;

		hic.goToCarInsurance = function(){
			if(!InsuranceData.getInsuranceData().carInsurance)
				InsuranceData.addCarInsurance();
			SideBar.setCarActive(true);
			$state.go('main.carInsuranceForm');
		}

		hic.addHouseInsurance = function() {
			console.log('savee');
			hic.houseInsurance.$save(success);
			InsuranceData.setHouseInsuranceChosen(true);
			hic.goToCarInsurance();
		};

		function success() {
			console.log("House Insurance added...")
		}

		//hic.houseInsurance.coveredByInsurance = [];

		hic.insuranceSelection = [];
		if(InsuranceData.getInsuranceData().houseInsurance.coveredByInsurance)

			for(var i=0; i<InsuranceData.getInsuranceData().houseInsurance.coveredByInsurance.length;i++)
			{
				if(InsuranceData.getInsuranceData().houseInsurance.coveredByInsurance[i]._id)
				hic.insuranceSelection.push({id: InsuranceData.getInsuranceData().houseInsurance.coveredByInsurance[i]._id});
				else hic.insuranceSelection.push({id: InsuranceData.getInsuranceData().houseInsurance.coveredByInsurance[i]});
			}
		//	else hic.houseInsurance.coveredByInsurance = []; 
		//console.log(JSON.stringify(hic.houseInsurance.coveredByInsurance));
		
		console.log(JSON.stringify(hic.insuranceSelection));

		hic.insuranceData = [];
		HouseInsuranceCategory.get(function(response){
			for(var i=0; i<response.houseInsuranceCategories.length;i++)
			{
				var obj = {id: response.houseInsuranceCategories[i]._id,
							label: response.houseInsuranceCategories[i].name};
				if(obj.label)
				hic.insuranceData.push(obj);
			}

			
		});

		hic.selectionEvent = {onItemSelect: itemSelected,
								onItemDeselect: itemDeselected,
								onSelectAll: allItemsSelected,
								onDeselectAll: allItemsDeselected}
		function itemSelected(){
			updateHouseInsurance();
			console.log("selected");
		}

		function itemDeselected(){
			updateHouseInsurance();
			console.log("deselected");
		}

		function allItemsSelected(){
			updateHouseInsurance();
			console.log(" all selected");
		}

		function allItemsDeselected(){
			updateHouseInsurance();
			console.log("all deselected");
		}

		function updateHouseInsurance(){
			hic.houseInsurance.coveredByInsurance = [];
			for(var i=0; i<hic.insuranceSelection.length; i++){
			
			hic.houseInsurance.coveredByInsurance.push({_id: hic.insuranceSelection[i].id});
		}
			console.log(JSON.stringify(hic.houseInsurance));
			InsuranceData.getInsuranceData().houseInsurance.coveredByInsurance = hic.houseInsurance.coveredByInsurance;

		}
		
	}
})();