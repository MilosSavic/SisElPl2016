(function() {
	"use strict";
	
	angular
		.module('company-registry.core')
		.controller('SideBarController', SideBarController);

	SideBarController.$inject = ['$location','$rootScope'];
	function SideBarController($location,$rootScope) {
		var sbc = this;
		$rootScope.$watch('usersIndices',function(){
			sbc.usersIndices = $rootScope.usersIndices;
		}) //da li je ovo dobra praksa?

		sbc.isActive = function(path) {
			return $location.path().indexOf(path) != -1;
		};
	}
})();

