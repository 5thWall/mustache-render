# grunt-mustache-render v1.9.0

[![Build Status](https://travis-ci.org/5thWall/mustache-render.png?branch=master)](https://travis-ci.org/5thWall/mustache-render)
[![NPM version](https://badge.fury.io/js/grunt-mustache-render.png)](http://badge.fury.io/js/grunt-mustache-render)

This is a grunt plugin to render [mustache](http://mustache.github.io/) templates. It takes data in static `JSON`, static `YAML`, `JS` module, or a `POJO` (Plain Ol' JavaScript Object) format. It allows you to specify a folder for partials, instead of needing to list them individually.

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
          data: // Path to JS module, path or URL to JSON or YAML, or POJO
          template: // Path or URL to template file
          dest: // Path to output destination here
        }
      ]
    },
  },
})
```
**Note:** The `files` parameter _must_ be an array, and _must_ conform to the format specified above. Each object in the file array represents _one_ rendered template. Data files can be in either `JSON`, `YAML` format, or as either an external `JS` file via `module.exports` or a `POJO` (Plain Ol' JavaScript Object).

#### Building Long File Lists

If you want to build out a long list for the `files` array, perhaps dynamically as described by [building the files object dynamically](http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically), you may use either `data` *or* `template` as the source (`src`) value as long as you specify the other one by its normal name. See below for some examples.

#### Examples:

```js
files: [
  {data: "path/to/data/file.json",
   template: "path/to/template.mustache",
   dest: "file/to/output.html"},
  {data: "http://api.example.com/file.json",
   template: "http://docs.example.com/report.mustache",
   dest: "file/to/output.html"}
]
```

```js
files: [
  {data: { greeting: "Hello", target: "world" },
   template: "path/to/template.mustache",
   dest: "file/to/output.html"},
  {data: { greeting: "Hola", target: "mundo" },
   template: "http://docs.example.com/report.mustache",
   dest: "file/to/output.html"}
]
```

```js
options: {template: 'common-template.mustache'},
files: {
  'file/to/output-1.html': 'data/to/read-1.json',
  'file/to/output-2.html': 'data/to/read-2.json',
  'file/to/output-3.html': 'data/to/read-3.json'
}
```

```js
files: [
  {expand: true,
   src: 'data/to/read-*.json',
   template: 'common-template.mustache',
   dest: 'dest/directory/'}
]
```

```js
options: {data: 'common-data.json'},
files: {
  'file/to/output-1.html': 'template/to/read-1.mustache',
  'file/to/output-2.html': 'template/to/read-2.mustache',
  'file/to/output-3.html': 'template/to/read-3.mustache'
}
```

```js
files: [
  {expand: true,
   src: 'template/to/read-*.mustache',
   data: 'common-data.js',
   dest: 'dest/directory/'}
]
```

### Options

#### options.directory
Type: `String`  
Default value: `"."` (i.e. relative to your `Gruntfile.js`)

Path to the directory in which partials can be found. Partials are looked up by name in this directory.

#### options.extension
Type: `String`  
Default value: `".mustache"`

`mustache-render` will use this extension when looking up partials.

#### options.prefix_file and options.prefix_dir
Type: `String`  
Default value: `""`

`mustache-render` will use these as common prefixes when looking up partials,
with `prefix_file` prepended onto the filename and `prefix_dir` prepended onto
the leading directory (if any). For example, given `prefix_file: 'part_'` and
`prefix_dir: 'sub_'`, a partial reference for `a/hello` would search for a
file named `sub_a/part_hello.mustache`.

*Note:* Versions 1.6 and earlier of the plug-in use an option called `prefix`,
which prepended onto the partial reference, regardless of whether it included
a directory or not. This option is still supported for backward compatibility
and maintains the same behavior.

#### options.glob
Type: `String`  
Default value: `""`

A glob pattern to use to search for partials. If this option is set, `options.prefix_file`, `options.prefix_dir`,
`options.prefix` and `options.extension` will be ignored. The glob pattern will be expanded using 
[`grunt.file.expand`](http://gruntjs.com/api/grunt.file#grunt.file.expand) and the first file found will be used.
If more than one file is found, a warning will be printed.

You can use this variables in the pattern:
 * `$0` The whole partial name
 * `$1` The partial name's directory part
 * `$2` The partial name's basename part

Examples:
 * `prefix_dir$1/prefix_file$2` does the same as using `options.prefix_file` and `options.prefix_dir`
 * `$0.*` allows any extension
 * `{images/$0.svg,partials/$0.mustache}` seaches for a partial either as `name.svg` in the `image` folder or as `name.mustache` in the `partials` folder.

#### options.clear_cache
Type: `Boolean`  
Default value: `false`

Clears the mustache cache before running the target. Mustache will cache partials by name when running multiple tasks, so this option is usefull if `options.extension`, `options.directory`, or `options.prefix` have been changed between tasks.

#### options.partial_finder
Type: `Function`  
Default value: `null`

Overrides the default function for finding partials. The function will be passed the name of the partial as a parameter, and must return the text of the partial.

```js
partial_finder: function(name) {
  return "Hello, I am a partial with name: " + name + "\n";
}
```

#### options.data and options.template
Type: anything normally accepted for a file  
Default value: `undefined`

These two slots can be used to fill in a default `data` or `template` value for any item in your `files` list that does not already have one specified.  This can be handy if you want to dynamically build the `files` list and apply the same `data` or `template` source to every item in the list.

### options.escape
Type: `Boolean` or `Function`  
Default value: `true`

By default (`true`), mustache will escape special HTML characters unless explicitly disabled in the template body (e.g. by using triple mustaches, `{{{var}}}`).

If set to `false` it disables default HTML escaping. That means that `{{var}}` will not be escaped. This is useful for templating files that are not HTML.

To implement custom escape handling specific to your needs, you may instead pass a function that accepts and returns a string.

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
