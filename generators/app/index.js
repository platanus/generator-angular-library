'use strict';

var fs = require('fs-extra')
var inflection = require('inflection');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var shelljs = require('shelljs');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    console.log('\n------------');
    console.log(chalk.bgYellow.black(' The Platanus Angular Library Generator '));
    console.log('-------------\n');

    this.options = {};

    var prompts = [{
      type: 'input',
      name: 'namespace',
      message: 'What is the namespace of the Angular module. (Input N/A to disable)',
      default: 'platanus'
    }, {
      type: 'input',
      name: 'moduleName',
      message: 'What is the name of the Angular module?',
      default: 'myLibrary',
      validate: function(input) {
        var valid = (/^[a-z]+([A-Z]+[A-Za-z0-9]+)*$/).test(input);
        var camelCasedName = inflection.camelize(input.replace(/-/g,'_'), true);
        return valid || 'Module name should be camelCase, try '+camelCasedName;
      }
    }, {
      type: 'input',
      name: 'libraryName',
      message: 'What is the name of your library? (angular-<libraryName>)',
      default: function(answers) {
        return inflection.transform(answers.moduleName, ['underscore', 'dasherize']);
      }
    }, {
      type: 'list',
      name: 'componentType',
      message: 'Choose the type of the first component of your library.',
      choices: ['service', 'directive', 'filter'],
      default: 'service'
    }, {
      type: 'confirm',
      name: 'demoFolder',
      message: 'Include demo app?',
      default: false
    }];

    this.prompt(prompts, function (answers) {
      this.options = answers;
      done();
    }.bind(this));
  },

  writing: {
    copyTemplateFiles: function() {
      var moduleName = this.options.moduleName,
          namespace = this.options.namespace,
          demo = this.options.demoFolder;

      var templateOptions = {
        libraryName: 'angular-'+this.options.libraryName,
        moduleName: getNameSpacedModule(namespace, moduleName),
        namespace: namespace,
        year: new Date().getFullYear(),
        componentType: this.options.componentType
      };

      console.log('Copying template files...');

      this.fs.copyTpl(
        this.templatePath('./base'),
        this.destinationPath('.'),templateOptions);

      templateOptions.componentName = templateOptions.componentType;
      this.composeWith('platanus-angular-library:component', { options: templateOptions });

      if(demo) {
        console.log('Copying demo files...');
        this.fs.copyTpl(
          this.templatePath('./demo'),
          this.destinationPath('./demo'),templateOptions);
      }

      function getNameSpacedModule(namespace, modulename) {
        var nameSpacedModule = '';
        if(namespace !== 'N/A') {
          nameSpacedModule += namespace+'.';
        }
        nameSpacedModule += modulename;
        return nameSpacedModule;
      }
    },

    renameUnderscores: function() {
      console.log('Renaming dotfiles...')

      var context = this;
      var filesToRename = ['gitignore', 'jshintrc'];

      filesToRename.forEach(function(file){
        var dotfile = '.' + file;
        var underfile = '_' + file;

        context.fs.move(
          context.destinationPath(underfile),
          context.destinationPath(dotfile)
        );
      });
    }
  },

  install: function(){
    this.installDependencies();
  },

  end: function() {
    shelljs.exec('gulp build');
  }
});
