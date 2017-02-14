(function() {
	"use strict";

	angular
		.module('merchant-app.house-insurance')
		.controller('HouseInsuranceController', HouseInsuranceController);

	HouseInsuranceController.$inject = ['$scope','$location','HouseInsuranceCategory','$state','CarInsurance','InsuranceData','SideBar','crTranslator', 'crTranslations','$stateParams'];
	function HouseInsuranceController($scope,$location,HouseInsuranceCategory,$state,CarInsurance,InsuranceData,SideBar,crTranslator,crTranslations,$stateParams) {
		if(!SideBar.isHouseActive())
		{
			$state.go('main.insuranceForm');
			return;
		}
		var skipped = false;
		$scope.$watch('hic.houseInsuranceForm.$invalid', function(form) {
		  if(form) {
			  console.log("SKIPPED invalid:" + skipped);
			  if(!skipped)
			  {
				  InsuranceData.setHouseInsuranceChosen(false);
			  
			  }
		  }
		});
		
		var hic = this;
		hic.houseInsurance = InsuranceData.getInsuranceData().houseInsurance;

		hic.currentLanguage = crTranslations[crTranslator.getLanguage()].LANGUAGE;
        hic.setLanguage = setLanguage;

        hic.isOptionsRequired = function(){
		  return !hic.insuranceData.some(function(options){
			if(!options.selected && !skipped)
			{
				InsuranceData.setHouseInsuranceChosen(false);
			}
		    return options.selected;
		  });
		}

        function setLanguage(language) {
            crTranslator.setLanguage(language);
            hic.currentLanguage = crTranslations[language].LANGUAGE;
        }

		hic.goToCarInsurance = function(){
			skipped = true;
			if(!InsuranceData.getInsuranceData().carInsurance)
				InsuranceData.addCarInsurance();
			SideBar.setCarActive(true);		
			console.log("CAR ACTIVE" + SideBar.isCarActive());
			$state.go('main.carInsuranceForm');
		}

		hic.addHouseInsurance = function() {
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
				hic.insuranceSelection.push(InsuranceData.getInsuranceData().houseInsurance.coveredByInsurance[i]._id);
				else hic.insuranceSelection.push(InsuranceData.getInsuranceData().houseInsurance.coveredByInsurance[i]);
			}
		//	else hic.houseInsurance.coveredByInsurance = []; 
		//console.log(JSON.stringify(hic.houseInsurance.coveredByInsurance));
		
		console.log(JSON.stringify(hic.insuranceSelection));

		hic.insuranceData = [];
		HouseInsuranceCategory.get(function(response){
			for(var i=0; i<response.houseInsuranceCategories.length;i++)
			{
				var obj = {id: response.houseInsuranceCategories[i]._id,
							label: response.houseInsuranceCategories[i].name,
							labelSer: response.houseInsuranceCategories[i].nameSer,
							selected: false};
				if(hic.insuranceSelection.indexOf(obj.id)>-1)
				{
					obj.selected = true;
				}
				if(obj.label || obj.labelSer)
				hic.insuranceData.push(obj);
			}

			
		}, function(err){$state.go('main.error',{errorOrderId: 1})});


		hic.updateHouseInsurance = function(){
			hic.insuranceSelection = [];
			for(var i=0; i<hic.insuranceData.length; i++)
			{
				if(hic.insuranceData[i].selected)
					hic.insuranceSelection.push(hic.insuranceData[i].id);
			}
			hic.houseInsurance.coveredByInsurance = [];
			for(var i=0; i<hic.insuranceSelection.length; i++){
			
			hic.houseInsurance.coveredByInsurance.push({_id: hic.insuranceSelection[i]});
		}
			console.log(JSON.stringify(hic.houseInsurance));
			InsuranceData.getInsuranceData().houseInsurance.coveredByInsurance = hic.houseInsurance.coveredByInsurance;

		}

		var i, tabcontent, tablinks;
		tablinks = document.getElementsByClassName("tablinks");
		var tabId = "Part1";
		document.getElementById(tabId).style.display = "block";
		tablinks[0].className+=' active';



		hic.openTab= function(tabName) {
      // Declare all variables
	  tabcontent = document.getElementsByClassName("tabcontent");
		// Get all elements with class="tabcontent" and hide them
	   
	   for (i = 0; i < tabcontent.length; i++) {
			tabcontent[i].style.display = "none";
	   }

		// Get all elements with class="tablinks" and remove the class "active"
	   
		for (i = 0; i < tablinks.length; i++) {

			while(tablinks[i].className.includes(" active"))
			 tablinks[i].className = tablinks[i].className.replace(" active", "");
		}

		// Show the current tab, and add an "active" class to the link that opened the tab
		document.getElementById(tabName).style.display = "block";
		for(i=0; i<tablinks.length; i++)
		{
			if(tabName=='Part2')
				tablinks[1].className +=" active";
			if(tabName=='Part1')
				tablinks[0].className +=" active";
		}
		//evt.currentTarget.className += " active";
	}
		
	}
})();