# grunt-mustache-render v1.2.0

> Render mustache templates

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
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```
File lists must be in the following format:

```js
files: [
  {data: "path/to/data/file.json",
   template: "path/to/template.mustache",
   dest: "file/to/output.html"}
]
```
Each object in the file array represents one rendered template. Data files can be in either `JSON` or `YAML` format. Data can also be passed in as an arbitrary JavaScritp object.

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

A folder path where partials can be found.

#### options.extension
Type: `String`  
Default value: `".mustache"`

The extension used by partials.

#### options.prefix
Type: `String`  
Default value: `""`

A common prefix for all partials. So given the prefix: `part_` for a partial named `hello` it will search for a file named `part_hello.mustache`.

#### options.clear_cache
Type: `Boolean`  
Default value: `false`

Clears the mustache cache before running the task. Usefull if `options.extension`, `options.directory`, or `options.prefix` have been changed between tasks.

### Usage Examples

For this Grunt config:

```js
grunt.initConfig({
  mustache_render: {
    files: [{
      data: "data/hello_world.json",
      template: "templates/hello_world.mustache",
      dest: "public/hello_world.html"
    }],
  },
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
