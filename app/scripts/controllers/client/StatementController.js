(function(module) {
  mifosX.controllers = _.extend(module, {
	  StatementController: function(scope,webStorage, routeParams, location, resourceFactory,dateFilter) {
		
		  
		    scope.start = {};
		    var clientData = webStorage.get('clientData');
	        scope.displayName=clientData.displayName;
	        scope.statusActive=clientData.statusActive;
	        scope.accountNo=clientData.accountNo;
	        scope.officeName=clientData.officeName;
	        scope.balanceAmount=clientData.balanceAmount;
	        scope.currency=clientData.currency;
	        scope.imagePresent=clientData.imagePresent;
	        scope.categoryType=clientData.categoryType;
	        scope.email=clientData.email;
	        scope.phone=clientData.phone;
	        scope.start.date = new Date();
		  resourceFactory.clientResource.get({clientId: routeParams.id} , function(data) {
			  scope.formData = {};
			  scope.clientId=routeParams.id;
        });
		  
		 scope.cancel = function() {
              location.path('/viewclient/' +routeParams.id);   
              webStorage.add("callingTab", {someString: "Statements" });
          }
        
         scope.submit = function() {
        	 
        	    this.formData.locale = 'en';
	        	var reqDate = dateFilter(scope.start.date,'dd MMMM yyyy');
	            this.formData.dateFormat = 'dd MMMM yyyy';
	            this.formData.dueDate=reqDate;
             resourceFactory.statementResource.save({'clientId': routeParams.id},this.formData,function(data) {
             location.path('/billmaster/' +routeParams.id);
          });
             webStorage.add("callingTab", {someString: "Statements" });
        };
    }
  });
  mifosX.ng.application.controller('StatementController', ['$scope','webStorage', '$routeParams',  '$location', 'ResourceFactory', 'dateFilter', mifosX.controllers.StatementController]).run(function($log) {
    $log.info("StatementController initialized");
  });
}(mifosX.controllers || {}));