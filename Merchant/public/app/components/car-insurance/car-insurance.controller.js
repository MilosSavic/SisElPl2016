(function() {
	"use strict";

	angular
		.module('company-registry.car-insurance')
		.controller('CarInsuranceController', CarInsuranceController);

	CarInsuranceController.$inject = ['$location','CarInsurance','$state','InsuranceData','SideBar','CarInsuranceService','services'];
	function CarInsuranceController($location,CarInsurance,$state,InsuranceData,SideBar,CarInsuranceService,services) {
		var cic = this;
		cic.carInsurance = InsuranceData.getInsuranceData().carInsurance;

		console.log("SERVISI: ");
		console.log(JSON.stringify(services));
		cic.goToCarInsurance = function(){
			$state.go('main.carInsuranceForm');
		}

		cic.addCarInsurance = function() {
			console.log('savee');
			cic.carInsurance.$save(success);
			InsuranceData.setCarInsuranceChosen(true);
			cic.goToFinalPage();
		}

		cic.goToFinalPage = function(){
			SideBar.setDataActive(true);
			$state.go('main.dataPage');
		}

		function success() {
			console.log("Car Insurance added...")
			//VAZNO: ovo (ili nesto slicno) uraditi svuda gde je neophodno
			//ovo se radi kako bi se omogucilo visestruko memorisanje bez resetovanja cele forme
			//obratiti paznju kasnije i na suvisne objekte u bazi
			delete cic.carInsurance._id;
			console.log(JSON.stringify(cic.carInsurance));
		}

		cic.serviceSelection = [];
		if(InsuranceData.getInsuranceData().carInsurance.services)

			for(var i=0; i<InsuranceData.getInsuranceData().carInsurance.services.length;i++)
			{
				if(InsuranceData.getInsuranceData().carInsurance.services[i]._id)
				cic.serviceSelection.push({id: InsuranceData.getInsuranceData().carInsurance.services[i]._id});
				else cic.serviceSelection.push({id: InsuranceData.getInsuranceData().carInsurance.services[i]});
			}
		//	else hic.houseInsurance.coveredByInsurance = []; 
		//console.log(JSON.stringify(hic.houseInsurance.coveredByInsurance));
		
		

		cic.serviceData = [];
		//CarInsuranceService.get(function(response){
		//	for(var i=0; i<response.carInsuranceServices.length;i++)
		//	{
		//		var obj = {id: response.carInsuranceServices[i]._id,
		//					label: response.carInsuranceServices[i].name,
		//					group: response.carInsuranceServices[i].serviceGroup.toString()};
		//		if(obj.label)
		//		cic.serviceData.push(obj);
		//	}

		//console.log(JSON.stringify(cic.serviceData));	
		//});

		for(var i=0; i<services.carInsuranceServices.length;i++)
			{
				var obj = {id: services.carInsuranceServices[i]._id,
							label: services.carInsuranceServices[i].name,
							group: services.carInsuranceServices[i].serviceGroup};
				if(obj.label)
				cic.serviceData.push(obj);
			}

		cic.selectionEvent = {onItemSelect: itemSelected,
								onItemDeselect: itemDeselected,
								onSelectAll: allItemsSelected,
								onDeselectAll: allItemsDeselected}
		function itemSelected(item){
			var group = 0;
			for(var i=0; i<cic.serviceData.length; i++)
			{
				if(cic.serviceData[i].id == item.id)
				{
					group = cic.serviceData[i].group;
					for(var j=0; j<cic.serviceData.length;j++)
					{
						if(cic.serviceData[j].group==group && cic.serviceData[j].id!=item.id)
						{
							for(var k=0; k<cic.serviceSelection.length;k++)
							{
								if(cic.serviceSelection[k].id == cic.serviceData[j].id)
									cic.serviceSelection.splice(k,1);
							}
						}
					}
				}
			}
			updateCarInsurance();
			console.log("selected: "+JSON.stringify(item));
		}

		function itemDeselected(){
			updateCarInsurance();
			console.log("deselected");
		}

		function allItemsSelected(){
			updateCarInsurance();
			console.log(" all selected");
		}

		function allItemsDeselected(){
			updateCarInsurance();
			console.log("all deselected");
		}

		function updateCarInsurance(){
			cic.carInsurance.services = [];
			for(var i=0; i<cic.serviceSelection.length; i++){
			
			cic.carInsurance.services.push({_id: cic.serviceSelection[i].id});
		}
			console.log(JSON.stringify(cic.carInsurance));
			InsuranceData.getInsuranceData().carInsurance.services = cic.carInsurance.services;

		}

	}
})();