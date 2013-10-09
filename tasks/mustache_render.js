/*
 * grunt-mustache-render
 * https://github.com/5thWall/mustache-render
 *
 * Copyright (c) 2013 Andy Arminio
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');
var mustache = require("mustache");
var path = require('path');

var DEFAULT_OPTIONS = {
  directory : "",
  extension : ".mustache"
};

module.exports = function(grunt) {

  var compileTemplate = _.compose(mustache.compile, grunt.file.read),

  partials = _.curry(function(prefix, extension, name) {
    var fileName = path.join(prefix, name + extension);
    if (grunt.file.exists(fileName)) {
      return grunt.file.read(fileName);
    }
    return "";
  }),

  getData = function(dataPath) {
    if (/\.json/i.test(dataPath)) {
      return grunt.file.readJSON(dataPath);
    } else if (/\.yaml/i.test(dataPath)) {
      return grunt.file.readYAML(dataPath);
    } else {
      grunt.log.error("Data file must be JSON or YAML. Given: " + dataPath);
    }
  },

  doMustacheRender = _.curry(function(options, files) {
    var data = getData(files.data),
      render = compileTemplate(files.template),
      getPartial = partials(options.directory, options.extension);

    grunt.file.write(files.dest, render(data, getPartial));
  });

  grunt.registerMultiTask('mustache_render', 'Render mustache templates', function() {
    var options = this.options(DEFAULT_OPTIONS);
    this.files.forEach(doMustacheRender(options));

    mustache.clearCache(); // Clear out cache at end of job.
  });
};
