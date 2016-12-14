(function() {
	"use strict";

	angular
		.module('merchant-app.core')
		.config(config);

	config.$inject = ['$stateProvider', '$urlRouterProvider'];
	function config($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/home');

		$stateProvider
			.state('main', {
				abstract: true,
				views: {
					'side-bar': {
						templateUrl: 'app/components/core/side-bar.html',
						controller: 'SideBarController',
						controllerAs: 'sbc'
					},
					'header': {
						templateUrl: 'app/components/core/header.html',
						controller: 'HeaderController',
						controllerAs: 'hc'
					}
				}
			})
			.state('main.home', {
				url: '/home',
				views: {
					'content@': {
						templateUrl: 'app/components/core/home.html'
					}
				}
			})
			.state('main.about', {
				url: '/about',
				views: {
					'content@': {
						templateUrl: 'app/components/core/about.html'
					}
				}
			})
			.state('main.dataPage', {
				url: '/add/data',
				views: {
					'content@': {
						templateUrl: 'app/components/core/data-page.html',
						controller: 'DataPageController',
						controllerAs: 'dpc'
					}
				}
			});
	}
})();