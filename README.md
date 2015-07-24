# Platanus Angular Library Generator

This generator provides a basic template to create Angular libraries that use Platanus code conventions and utilities. It also helps you adhere to package naming and file structure conventions and get up and running in no time!

## What it does
- Creates a new empty library with an initial component of your choosing (`service`, `directive` or `filter`)
- Includes commonplace development files such as `.gitignore` and `.jshintrc` that adhere to good practices
- Includes `bower.json` and `package.json` files that are filled with your library's information for easy package publishing
- Includes a set of Gulp tasks to help you even further with bumping versions, pushing tags and npm releases

## Install

- Make sure you have installed Yeoman with `npm install -g yo`
- Install our generator with `npm install -g generator-platanus-angular-library`
- Done!

## Starting a project

Easy as 1, 2, 3:

```
$ mkdir my-library
$ cd my-library
$ yo platanus-angular-library
```

You will be prompted to enter the following information about your library to help you name your files and prepare your `package.json` and `bower.json`:

- Namespace *(platanus)*
- Module Name *(myLibrary)*
- Library Name *(angular-my-library)*
- Component Type (service, directive or filter)

After you enter all the required information, the generator will create the necessary files and run `npm install && bower install` to download the required dependencies. Once everything is in place, you can start your happy development process.

## Usage

Here's how to use all the goodies that come with our generator.

### Building 

- `gulp lint` checks your JavaScript code for errors and warnings.
- `gulp build` runs the `lint` task and annotates Angular dependencies in your code (using ngInclude), minifies and concatenates it in a single file named according to your previously set library name (`angular-my-library.min.js`), and places it in the `dist` folder.

### Publishing

- `gulp bump` increases the version number on the `package.json` and `bower.json` files.
- `gulp publish-git` runs the `bump` task, creates a commit with the modified version and pushes a new tag that corresponds with it.
- `gulp publish-npm` runs both aforementioned tasks and publishes the new version into the `npm` registry.

### Testing

Included in your newly created library, comes a `tests` folder with an example file that uses Karma and Jasmine. There's also a `karma.conf.js` that is configured to work with `angular-mocks`. 

If you have installed the Karma CLI (`npm install -g karma-cli`), you may run `karma start` in the project's folder to run your tests.

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## Credits

Thank you [contributors](https://github.com/platanus/<%= libraryName %>/graphs/contributors)!

<img src="http://platan.us/gravatar_with_text.png" alt="Platanus" width="250"/>

generator-platanus-angular-library is maintained by [platanus](http://platan.us).

## License

generator-platanus-angular-library is © 2015 platanus, spa. It is free software and may be redistributed under the terms specified in the LICENSE file.