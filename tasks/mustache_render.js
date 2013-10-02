/*
 * grunt-mustache-render
 * https://github.com/5thWall/mustache-render
 *
 * Copyright (c) 2013 Andy Arminio
 * Licensed under the MIT license.
 */

'use strict';

// var _ = require('lodash');
var mustache = require("mustache");

module.exports = function(grunt) {

  function compileTemplate(templatePath) {
    return mustache.compile(grunt.file.read(templatePath));
  }

  function doMustacheRender(files) {
    var data = grunt.file.readJSON(files.data);
    var render = compileTemplate(files.template);
    grunt.file.write(files.dest,render(data));
  }

  grunt.registerMultiTask('mustache_render', 'Render mustache templates', function() {
    this.files.forEach(doMustacheRender);
  });
};
