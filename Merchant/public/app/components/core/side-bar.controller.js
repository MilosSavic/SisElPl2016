(function() {
	"use strict";
	
	angular
		.module('merchant-app.core')
		.controller('SideBarController', SideBarController);

	SideBarController.$inject = ['$location','SideBar','$scope','$state'];
	function SideBarController($location,SideBar,$scope,$state) {
		var sbc = this;

		$scope.$on('ua',function(event,obj){
			sbc.usersActive = obj;
		});
		$scope.$on('ha',function(event,obj){
			sbc.houseActive = obj;
		});

		$scope.$on('ca',function(event,obj){
			sbc.carActive = obj;
		});

		$scope.$on('da',function(event,obj){
			sbc.dataActive = obj;
		});
		sbc.usersIndices = SideBar.getUserIndices();
		sbc.usersActive = SideBar.isUsersActive();
		sbc.houseActive = SideBar.isHouseActive();
		sbc.carActive = SideBar.isCarActive();
		sbc.dataActive = SideBar.isDataActive();
		
		sbc.isActive = function(path) {
			return $location.path().indexOf(path) != -1;
		};
	}
})();

