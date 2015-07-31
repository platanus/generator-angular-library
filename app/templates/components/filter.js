(function() {
  'use strict';

  angular
    .module('<%= moduleName %>')
    .filter('filter', filter);

  function filter() {
    return myFunction;

    function myFunction(params) {
      console.log('Filter called!');
      return 'This text has been filtered';
    }
  }

})();
