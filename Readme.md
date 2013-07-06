# grunt-hbt [![Build Status](https://travis-ci.org/shannonmoeller/grunt-hbt.png?branch=master)](https://travis-ci.org/shannonmoeller/grunt-hbt)

> A sane Grunt plugin for compiling Handlebars templates to HTML files. Inspired by [grunt-contrib-handlebars](https://github.com/gruntjs/grunt-contrib-handlebars). These two grunt plugins may be used together to compile both static HTML and JST files from the same set of Handlebars templates.

## Getting Started

This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-hbt --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-hbt');
```
## Handlebars task

_Run this task with the `grunt hbt` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Options

#### data
Type ```Object```
Default: ```{}```

This option allows you to specify the data that will be used to render templates.

```js
options: {
  data: grunt.file.readJSON('data.json')
}
````

#### helpers
Type: ```String```
Type: ```Array```
Type: ```Object```

TODO: document this

```js
options: {
  helpers: ''
}
````

#### partials
Type: ```String```
Type: ```Array```
Type: ```Object```

TODO: document this

```js
options: {
  helpers: ''
}
````

#### processPartialName
Type: ```function```

This option accepts a function which takes one argument (the partial filepath) and returns a string which will be used as the key for the precompiled partial object when it is registered in Handlebars.partials. The example below stores all partials using only the actual filename instead of the full path.

```js
options: {
  processPartialName: function(filePath) { // input:  templates/_header.hbs
    var pieces = filePath.split("/");
    return pieces[pieces.length - 1]; // output: _header.hbs
  }
}
````

Note: If processPartialName is not provided as an option the default assumes that partials will be stored by stripping trailing underscore characters and filename extensions. For example, the path *templates/_header.hbs* will become *header* and can be referenced in other templates as *{{> header}}*.

#### compilerOptions
Type `Object`
Default: `{}`

This option allows you to specify a hash of options which will be passed directly to the Handlebars compiler.

``` javascript
options: {
  compilerOptions: {
    knownHelpers: {
      "my-helper": true,
      "another-helper": true
    },
    knownHelpersOnly: true
  }
}
```

## Contributing

Make sure you've installed [Node.js](http://nodejs.org), which ships with [npm](http://npmjs.org).

```sh
# Install Grunt globally
$ npm install -g grunt-cli

# Clone the repository
$ git clone git://github.com/shannonmoeller/grunt-hbt
$ cd grunt-hbt

# Install the dependencies
$ npm install

# And grunt
$ grunt
```

## Testing

```sh
$ grunt test
```

## License

MIT

