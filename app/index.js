'use strict';

var fs = require('fs-extra')
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
    console.log(chalk.bgYellow.black(' The Platanus Angular Library Generator '))
    console.log('-------------\n');

    this.options = {};

    var prompts = [{
      type: 'input',
      name: 'libraryName',
      message: 'What is the name of your library?',
      default: 'angular-library'
    }, {
      type: 'input',
      name: 'moduleName',
      message: 'What is the name of the Angular module? (Will be prepended with "Pl.")',
      default: 'myLibrary'
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
      console.log('Copying template files...');

      this.fs.copyTpl(
        this.templatePath('.'),
        this.destinationPath('.'),
        { 
          libraryName: this.options.libraryName,
          moduleName: 'Pl.'+this.options.moduleName,
          componentType: this.options.componentType
        }
      );
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