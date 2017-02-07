(function() {
	"use strict";

	
		angular
		.module('payment-app.core')
		.factory('SideBar', SideBar);

	SideBar.$inject = ['$rootScope']
	function SideBar($rootScope){

		var urlData = {};



		var getURLData = function(){
			return urlData;
		}


		var setURLData = function(data){
			urlData = data;
			$rootScope.$broadcast('ud',urlData);
		}

	  return {
	   
	    getURLData : getURLData,
	    setURLData : setURLData
	  };
	}
})();