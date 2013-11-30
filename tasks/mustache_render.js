/**
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

  /**
   * Public: Create Object for rendering templates
   *
   * options - The Object options used to configure the renderer
   *   directory - The String base directory to look for partials (default: "")
   *   extension - The String extension for partials templates (default: ".mustache")
   *   prefix    - The String common prefix for partials (default: "")
   */
  function GMR(options) {
    this.options = options(DEFAULT_OPTIONS);
  }

  /**
   * Public: Render a template with the given data to the given destination
   *
   * template - The String path to the template to be rendered
   * data     - The String path to a JSON or YAML file
   *            The data Object
   * dest     - The String path to write the rendered template
   */
  GMR.prototype.render = function render(data, template, dest) {
    var renderFn = this._compileTemplate(template);
    data = this._getData(data);

    grunt.file.write(dest, renderFn(data, this._getPartial.bind(this)));
  };

  // Internal: Ensure data is the proper format.
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

  // Internal: Read JSON or YAML data from file.
  GMR.prototype._getDataFromFile = function getDataFromFile(dataPath) {
    if (/\.json/i.test(dataPath)) {
      return grunt.file.readJSON(dataPath);
    } else if (/\.ya?ml/i.test(dataPath)) {
      return grunt.file.readYAML(dataPath);
    }

    grunt.fail.warn("Data file must be JSON or YAML. Given: " + dataPath);
  };

  // Internal: Compile template to render function.
  GMR.prototype._compileTemplate = function compileTemplate(file) {
    return mustache.compile(grunt.file.read(file));
  };

  // Internal: Retrieve String partial by name.
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
