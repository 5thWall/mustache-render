/*
 * grunt-mustache-render
 * https://github.com/5thWall/mustache-render
 *
 * Copyright (c) 2013 Andy Arminio
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function gruntTask(grunt) {
  var mustache = require("mustache"),
  path = require('path'),

  DEFAULT_OPTIONS = {
    directory : "",
    extension : ".mustache",
    prefix : "",
    clear_cache : false
  };

  function GMR(options) {
    this.options = options(DEFAULT_OPTIONS);
  }

  GMR.prototype.render = function render(data, template, dest) {
    var renderFn = this._compileTemplate(template);
    data = this._getData(data);

    grunt.file.write(dest, renderFn(data, this._getPartial.bind(this)));
  };

  GMR.prototype._getData = function getData(data) {
    var datatype = typeof data;

    if (datatype === "undefined" || data == null) {
      grunt.fail.fatal("Data can not be undefined or null.");
    } else if (datatype === "string") {
      return this._getDataFromFile(data);
    } else if (datatype !== "object") {
      grunt.log.warn("Recieved data of type '" + datatype +
        "'. Expected 'object' or 'string'. Use at your own risk!");
    }

    return data;
  };

  GMR.prototype._getDataFromFile = function getDataFromFile(dataPath) {
    if (/\.json/i.test(dataPath)) {
      return grunt.file.readJSON(dataPath);
    } else if (/\.ya?ml/i.test(dataPath)) {
      return grunt.file.readYAML(dataPath);
    }

    grunt.fail.warn("Data file must be JSON or YAML. Given: " + dataPath);
  };

  GMR.prototype._compileTemplate = function compileTemplate(file) {
    return mustache.compile(grunt.file.read(file));
  };

  GMR.prototype._getPartial = function getPartial(name) {
    var fileName = this.options.prefix + name + this.options.extension;
    var filePath = path.join(this.options.directory, fileName);

    if (grunt.file.exists(filePath)) {
      return grunt.file.read(filePath);
    }

    return "";
  };

  grunt.registerMultiTask('mustache_render', 'Render mustache templates',
    function registerTask() {
      var renderer = new GMR(this.options);

      if (renderer.options.clear_cache) { mustache.clearCache(); }

      this.files.forEach(function renderFile(fileData) {
        renderer.render(fileData.data, fileData.template, fileData.dest);
      });
  });
};
