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
    $scope.moduleConfig = $scope.bottommenu.modulescope;
    $scope.showMenu = function() {
      moduleScope.shown = moduleScope.shown ? false : true;
    }
    $rootScope.currentIndex = -1;
    moduleScope.modules = getModules();
    var modules;
    function getModules() {
      modules = [];
      function processChild(value, index) {
        var color = (value.bgColor) ? '#' + value.bgColor.replace('#','') : '';
        structureService.getModule(value.path).then(function(module) {
          if( $location.path() === value.path ){
            $rootScope.currentIndex = index;
          }
          modules.push({
            text: module.name,
            icon: module.icon,
            url: '#' + value.path,
            backgroundImage: value.bgImage,
            backgroundColor: color
          });
        });
      }

      angular.forEach($scope.moduleConfig.menuItems, processChild);

      return modules;
    }

    $scope.modulename = function(){
        var pathmodule = $location.$$path;
        var moduleName;

        for(var i = 0; i<modules.length; i++){
		      if(modules[i].url === "#" + pathmodule){
        	   moduleName = modules[i].text;
    	    }
	       }
	    return moduleName;
    }
  }

}());
