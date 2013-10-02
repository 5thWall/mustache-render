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

module.exports = function(grunt) {

  var compileTemplate = _.compose(mustache.compile, grunt.file.read);

  function getData(dataPath) {
    if (/\.json/i.test(dataPath)) {
      return grunt.file.readJSON(dataPath);
    } else if (/\.yaml/i.test(dataPath)) {
      return grunt.file.readYAML(dataPath);
    } else {
      grunt.log.error("Data file must be JSON or YAML. Given: " + dataPath);
    }
  }

  function doMustacheRender(files) {
    var data = getData(files.data);
    var render = compileTemplate(files.template);
    grunt.file.write(files.dest,render(data));
  }

  grunt.registerMultiTask('mustache_render', 'Render mustache templates', function() {
    this.files.forEach(doMustacheRender);
  });
};
