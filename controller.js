(function() {
  'use strict';

  angular
    .module('bottommenu', [])
    .controller('BottomMenuController', BottomMenuController);

  BottomMenuController.$inject = ['$scope', '$rootScope', '$location', 'structureService'];

  function BottomMenuController($scope, $rootScope, $location, structureService) {
    // Register upper level modules
    structureService.registerModule($location, $scope, 'bottommenu');

    var moduleScope = $scope.bottommenu;
    var moduleConfig = $scope.bottommenu.modulescope;

    moduleScope.modules = getModules();

    function getModules() {
      var modules = [];
      var children = structureService.getChildren(moduleConfig.path);

      function processChild(child, childUrl) {
        structureService.getModule(childUrl).then(function(module) {
          if (module.showOn.menu) {
            var xxx = {
              text: child.name,
              icon: moduleConfig.showicons ? child.icon : '',
              url: '#' + childUrl,
              class: child.name.replace(/[\/\s]+/gi, '-')
            }
            modules.push(xxx);
          }
        });
      }

      angular.forEach(children, processChild);

      return modules;
    }
  }

}());
