(function(module) {
  mifosX.controllers = _.extend(module, {
    RoleController: function(scope, resourceFactory,location) {
      scope.roles = [];
      resourceFactory.roleResource.getAllRoles({}, function(data) {
        scope.roles = data;
      });
      scope.routeTo = function(id){
          location.path('/admin/viewrole/'+ id);
        };
    }
  });
  mifosX.ng.application.controller('RoleController', ['$scope', 'ResourceFactory','$location', mifosX.controllers.RoleController]).run(function($log) {
    $log.info("RoleController initialized"); 
  });
}(mifosX.controllers || {}));
