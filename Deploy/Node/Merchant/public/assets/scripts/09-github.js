angular.module("ngSocial").directive('ngSocialGithub', function () {
 
  'use strict';

  var options = {
    counter: {
      url: '//api.github.com/repos/MilosSavic/SisElPl2016?callback=JSON_CALLBACK',
      getNumber: function (data) {
        return data.data.watchers_count;
      }
    },
    clickUrl: 'https://github.com/MilosSavic/SisElPl2016/'
  };
  return {
    restrict: 'C',
    require: '^?ngSocialButtons',
    scope: true,
    replace: true,
    transclude: true,
    template: '<li> \
                    <a ng-href="{{ctrl.link(options)}}" target="_blank" class="ng-social-button"> \
                        <span class="ng-social-icon"></span> \
                        <span class="ng-social-text" ng-transclude></span> \
                    </a> \
                    <span ng-show="count" class="ng-social-counter">{{ count }}</span> \
                   </li>',
    link: function (scope, element, attrs, ctrl) {
      element.addClass('ng-social-github');
      if (!ctrl) {
        return;
      }
      options.urlOptions = {
        'user': attrs.user,
        'repository': attrs.repository
      };
      scope.options = options;
      scope.ctrl = ctrl;
      ctrl.init(scope, element, options);
    }
  }
});
