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
    $scope.showMenu = function() {
      moduleScope.shown = moduleScope.shown ? false : true;
    }

    moduleScope.modules = getModules();

    function getModules() {
      var modules = [];

      function processChild(value, index) {

        if( (typeof($rootScope.currentIndex) === 'undefined') || ($location.path() === value.path)){
          $rootScope.currentIndex = index;
        }
        
        var color = (value.bgColor) ? '#' + value.bgColor.replace('#','') : '';
        structureService.getModule(value.path).then(function(module) {
          modules.push({
            text: module.name,
            icon: module.icon,
            url: '#' + value.path,
            backgroundImage: value.bgImage,
            backgroundColor: color
          });
        });
      }

      angular.forEach(moduleConfig.menuItems, processChild);

      return modules;
    }
  }

}());
