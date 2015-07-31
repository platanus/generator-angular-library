'use strict';
var yeoman = require('yeoman-generator');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.argument('name', {
      required: false,
      type: String,
      desc: 'The name of the directive'
    });

    var options = {
      componentType: 'directive'
    };

    if ( this.name ) options.componentName = this.name;
    this.composeWith('platanus-angular-library:component', { options: options });
  }
});
