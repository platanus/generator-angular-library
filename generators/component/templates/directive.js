(function() {
  'use strict';

  angular
    .module('<%= moduleName %>')
    .directive('<%= componentName %>', directive);

  function directive() {
    var directive = {
        template: 'This is a directive\'s template',
        link: linkFunc
    };

    return directive;

    function linkFunc(scope, el, attr, ctrl) {
      console.log('Directive linked!');
    }
  }

})();
