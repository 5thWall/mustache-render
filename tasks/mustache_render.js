/*
 * grunt-mustache-render
 * https://github.com/5thWall/mustache-render
 *
 * Copyright (c) 2013 Andy Arminio
 * Licensed under the MIT license.
 */

'use strict';

var _ = require("lodash");

module.exports = function(grunt) {
  var DEFAULT_OPTIONS = {};

  function filterFiles(files, error, process) {
    files.forEach(function(filepath) {
      if (!grunt.file.exists(filepath.src)) {
        return error(filepath);
      } else {
        return process(filepath);
      }
    });
  }

  function error(filepath) {
    grunt.log.warn("Source file " + filepath + " not found.");
    return false;
  }

  var processFile = _.curry(function(options, filepath) {
    grunt.log.error("Not ready for file: " + filepath + ".");
  });

  function task() {
    /*jshint validthis: true */
    var options = this.options(DEFAULT_OPTIONS);
    filterFiles(this.files, error, processFile(options));
  }

  grunt.registerMultiTask('mustache_render', 'Render mustache templates', task);
};
