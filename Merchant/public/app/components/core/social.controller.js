(function() {
    "use strict";

    angular
        .module('merchant-app.core')
        .controller('SocialController', SocialController);

    SocialController.$inject = ['$location','$state','$window','$stateParams','$scope'];
    function SocialController($location,$state,$window,$stateParams,$scope) {
        var sc = this;

        $scope.current_title = 'Test';
        $scope.current_description = 'Test description';
    }

})();