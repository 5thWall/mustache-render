# grunt-mustache-render v1.2.3

[![Build Status](https://travis-ci.org/5thWall/mustache-render.png?branch=master)](https://travis-ci.org/5thWall/mustache-render)
[![NPM version](https://badge.fury.io/js/grunt-mustache-render.png)](http://badge.fury.io/js/grunt-mustache-render)

This is a grunt plugin to render [mustache](http://mustache.github.io/) templates. It takes data in `JSON`, `YAML`, or `POJO` (Plain Ol' JavaScript Object) format. It allows you to specify a folder for partials, instead of needing to list them individually.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-mustache-render --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-mustache-render');
```

## The "mustache_render" task

### Overview
In your project's Gruntfile, add a section named `mustache_render` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  mustache_render: {
    options: {
      // Task global options go here
    },
    your_target: {
      options: {
        // Target specific options go here
      },
      files : [
        {
          data: // Path to JSON or YAML file, or POJO
          template: // Path to template file
          dest: // Path to output destination here
        }
      ]
    },
  },
})
```
**Note:** The `files` parameter _must_ be an array, and _must_ conform to the format specified above. Each object in the file array represents _one_ rendered template. Data files can be in either `JSON` or `YAML` format or as a `POJO` (Plain Ol' JavaScript Object).

#### Examples:

```js
files: [
  {data: "path/to/data/file.json",
   template: "path/to/template.mustache",
   dest: "file/to/output.html"}
]
```

```js
files: [
  {data: { greeting: "Hello", target: "world" },
   template: "path/to/template.mustache",
   dest: "file/to/output.html"}
]
```

### Options

#### options.directory
Type: `String`  
Default value: `""`

Path to the directory in which partials can be found. Partials are looked up by name in this directory.

#### options.extension
Type: `String`  
Default value: `".mustache"`

`mustache-render` will use this extension when looking up partials.

#### options.prefix
Type: `String`  
Default value: `""`

`mustache-render` will use this as a common prefix when looking up partials. So given the prefix: `part_` for a partial named `hello` it will search for a file named `part_hello.mustache`.

#### options.clear_cache
Type: `Boolean`  
Default value: `false`

Clears the mustache cache before running the target. Mustache will cache partials by name when running multiple tasks, so this option is usefull if `options.extension`, `options.directory`, or `options.prefix` have been changed between tasks.

### Usage Examples

For this Grunt config:

```js
grunt.initConfig({
  mustache_render: {
    all: {
      files: [{
        data: "data/hello_world.json",
        template: "templates/hello_world.mustache",
        dest: "public/hello_world.html"
      }]
    }
  }
})
```

And this `json`:

```js
{
  "greeting" : "Hello",
  "target" : "World"
}
```

This template:

```html
<html>
<head>
  <meta charset="UTF-8">
  <title>A greeting</title>
</head>
<body>
  <h1>{{greeting}}, {{target}}!</h1>
</body>
</html>
```

Will produce this output:

```html
<html>
<head>
  <meta charset="UTF-8">
  <title>A greeting</title>
</head>
<body>
  <h1>Hello, World!</h1>
</body>
</html>
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

__1.2.3__

 * Accept `YAML` files with either `.yaml` or `.yml` extensions.

__1.2.2__

 * Major code refactor
 * Remove `lodash` dependency

__1.2.1__

 * Code Cleanup

__1.2.0__

 * Allow arbitrary JavaScript objects to be passed as data

__1.1.0__

 * Option for common prefix on partials
 * Option to clear mustache cache before running task

__1.0.0__

 * Created website
 * API now considered stable

__0.3.0__

 * Unverbosify options

__0.2.1__

 * Bugfix: dependencies

__0.2.0__

 * `YAML` data file support

__0.1.0__

 * Initial Release
