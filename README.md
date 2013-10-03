# grunt-mustache-render

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
Each object in the file array represents one rendered template. Data files can be in either `JSON` or `YAML` format.

### Options
COMING SOON!

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

__0.2.1__

 * Bugfix: dependencies

__0.2.0__

 * `YAML` data file support

__0.1.0__

 * Initial Release
