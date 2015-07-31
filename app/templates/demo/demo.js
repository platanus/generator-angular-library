(function() {
  'use strict';

  angular
  .module('DemoApp', [
    '<%= moduleName %>'
  ]);

})();

<% if(componentType == 'service') { %>
(function() {
  'use strict';

  angular
    .module('DemoApp')
    .controller('DemoController', DemoController);

  function DemoController($scope, service) {
    $scope.message = service.myFunction();
  }

})();
<% } %>
