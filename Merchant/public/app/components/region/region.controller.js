(function() {
	"use strict";

	angular
		.module('merchant-app.region')
		.controller('RegionController', RegionController);

	RegionController.$inject = ['$location','Region','$state','$window','$scope'];
	function RegionController($location,Region,$state, $window,$scope) {
		var rc = this;
		rc.region = new Region();

		Region.get(function(response){rc.listOfRegions = response.regions;});

		rc.submitRegion = function(){
			console.log("reg");
			  $state.reload();
			rc.region.$save(success);
			
		}
		function success() {
			console.log("Region added...")
			Region.get(function(response){rc.listOfRegions = response.regions;});
			rc.region = new Region();
			//$state.go('main.regionForm');
		}

		rc.openCity= function(evt,cityName) {
    // Declare all variables

    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
   for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
   }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {

    	while(tablinks[i].className.includes(" active"))
       	 tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the link that opened the tab
    document.getElementById(cityName).style.display = "block";
    for(i=0; i<tablinks.length; i++)
    {
    	if(cityName=='Paris')
    		tablinks[1].className +=" active";
    	if(cityName=='London')
    		tablinks[0].className +=" active";
    	if(cityName=='Tokyo')
    		tablinks[2].className +=" active";
    }
    //evt.currentTarget.className += " active";
}

	}
})();