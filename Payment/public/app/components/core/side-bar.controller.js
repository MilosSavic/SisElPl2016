(function() {
	"use strict";
	
	angular
		.module('payment-app.core')
		.controller('SideBarController', SideBarController);

	SideBarController.$inject = ['$location','SideBar','$scope'];
	function SideBarController($location,SideBar,$scope) {
		var sbc = this;
		sbc.isActive = function(path) {
			return $location.path().indexOf(path) != -1;
		};

		sbc.ud = SideBar.getURLData();
		$scope.$on('ud',function(event,obj){
			sbc.ud = obj;
		});
	}
})();