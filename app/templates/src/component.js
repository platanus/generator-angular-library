(function(){
  'use strict';

  angular
    .module('<%= moduleName %>')
    .<%= componentType %>('<%= componentType %>', <%= componentType %>);

  /* ngInject */
  function <%= componentType %>() {

  }

})();
