(function() {
	"use strict";
	
	angular
		.module('merchant-app.core')
		.controller('SideBarController', SideBarController);

	SideBarController.$inject = ['$location','SideBar','$scope','$state'];
	function SideBarController($location,SideBar,$scope,$state) {
		var sbc = this;

		console.log($location.path());

		$scope.$on('ua',function(response){
			sbc.usersActive = true;
		});
		$scope.$on('ha',function(response){
			sbc.houseActive = true;
		});

		$scope.$on('ca',function(response){
			sbc.carActive = true;
		});

		$scope.$on('da',function(response){
			sbc.dataActive = true;
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

