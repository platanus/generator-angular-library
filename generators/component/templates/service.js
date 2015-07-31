(function(){
  'use strict';

  angular
    .module('<%= moduleName %>')
    .service('<%= componentName %>', service);

  function service() {
    this.myFunction = myFunction;

    function myFunction() {
      console.log('Service started!');
      return 'This is a message from the service';
    }
  }

})();
