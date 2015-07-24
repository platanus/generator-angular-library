'use strict';

var fs = require('fs-extra')
var inflection = require('inflection');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var shelljs = require('shelljs/global');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

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
    }];

    this.prompt(prompts, function (answers) {
      this.options = answers;
      done();
    }.bind(this));
  },

  writing: {
    copyTemplateFiles: function() {
      var moduleName = this.options.moduleName,
          namespace = this.options.namespace;

      console.log('Copying template files...');

      this.fs.copyTpl(
        this.templatePath('.'),
        this.destinationPath('.'),
        {
          libraryName: 'angular-'+this.options.libraryName,
          moduleName: getNameSpacedModule(namespace, moduleName),
          namespace: namespace,
          year: new Date().getFullYear(),
          componentType: this.options.componentType
        }
      );

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
    },

    renameComponent: function() {
      console.log('Renaming initial component...');

      this.fs.move(
        this.destinationPath('src/component.js'),
        this.destinationPath('src/'+this.options.componentType+'.js')
      );
    }
  },

  install: function(){
    this.installDependencies();
  }
});
