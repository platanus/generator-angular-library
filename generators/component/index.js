'use strict';
var yeoman = require('yeoman-generator');
var fs = require('fs');

var findModuleName = function() {
  try {
    var indexFile = fs.readFileSync('./src/index.js', 'utf-8');
    var pattern = /module\(\'(.+)\'/gm;
    var match = pattern.exec(indexFile);
    return match[1];
  }
  catch(err) {
    return false;
  }
};

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    if ( !this.options.moduleName ) {
      var moduleNameGuess = findModuleName();
      if ( moduleNameGuess ) {
        this.options.moduleName = moduleNameGuess;
      }
    }
  },

  prompting: function () {
    var done = this.async();

    var prompts = [];
    var options = this.options;

    if ( !this.options.moduleName ) {
      prompts.push({
        type: 'input',
        name: 'moduleName',
        message: 'Enter the name of the module where this component belongs.',
        default: 'moduleName'
      });
    }

    if ( !this.options.componentType ) {
      prompts.push({
        type: 'list',
        name: 'componentType',
        message: 'Choose the type of this new component.',
        choices: ['service', 'directive', 'filter'],
        default: 'service'
      });
    }

    if ( !this.options.componentName ) {
      prompts.push({
        type: 'input',
        name: 'componentName',
        message: function(answers) {
          var componentType = answers.componentType || options.componentType;
          return 'Enter the name of your new ' + componentType;
        },
        default: function(answers) {
          var componentType = answers.componentType || options.componentType;
          return componentType;
        }
      });
    }

    this.prompt(prompts, function (answers) {
      if ( answers.componentType ) this.options.componentType = answers.componentType;
      if ( answers.componentName ) this.options.componentName = answers.componentName;
      if ( answers.moduleName ) this.options.moduleName = answers.moduleName;
      done();
    }.bind(this));
  },

  writing: function () {
    var options = this.options;
    this.fs.copyTpl(
      this.templatePath(this.options.componentType + '.js'),
      this.destinationPath('./src/'+ this.options.componentType +'s/' + options.componentName + '.js'),
      options
    );
  }
});
