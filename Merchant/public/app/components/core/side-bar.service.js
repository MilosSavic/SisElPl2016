(function() {
	"use strict";

	
		angular
		.module('merchant-app.core')
		.factory('SideBar', SideBar);

	SideBar.$inject = ['$rootScope']
	function SideBar($rootScope){

		var carActive;
		var houseActive;
		var dataActive;
		var usersActive;
		var userCount = 0;
		var userIndices = [];

		var setUserCount = function(n){
			userCount = n;
			if(userIndices.length>userCount)
			{
				for(var i=userIndices.length-1; i>=userCount; i--)
					userIndices.splice(i,1);
			}
			else{
				for(var i = userIndices.length; i<userCount; i++)
				{
					userIndices.push(i+1);
				}
			}
		}

		var getUserCount = function(){
			return userCount;
		}

		var getUserIndices = function(){
			return userIndices;
		}
		var isHouseActive = function(){
			return houseActive;
		}
		
		var isCarActive = function(){
			return carActive;
		}

		var isDataActive = function(){
			return dataActive;
		}

		var isUsersActive = function(){
			return usersActive;
		}

		var setDataActive = function(active){
			dataActive = active;
			$rootScope.$broadcast('da',dataActive);
		}

		var setHouseActive = function(active){
			houseActive = active;
			$rootScope.$broadcast('ha',houseActive);
		}

		var setCarActive = function(active){
			carActive=active;
			$rootScope.$broadcast('ca',carActive);
		}

		var setUsersActive = function(active){
			usersActive = active;
			$rootScope.$broadcast('ua',usersActive);
		}

		var emptyUserIndices = function(){
			userIndices = [];
		}
	  return {
	    setUserCount : setUserCount,
	    getUserCount : getUserCount,
	    getUserIndices : getUserIndices,
	   	emptyUserIndices : emptyUserIndices,
	    isHouseActive : isHouseActive,
	    isCarActive : isCarActive,
	    isDataActive : isDataActive,
	    isUsersActive : isUsersActive,
	    setHouseActive : setHouseActive,
	    setCarActive : setCarActive,
	    setDataActive : setDataActive,
	    setUsersActive : setUsersActive
	  };
	}
})();