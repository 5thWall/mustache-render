/*
 * grunt-mustache-render
 * https://github.com/5thWall/mustache-render
 *
 * Copyright (c) 2013 Andy Arminio
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    mustache_render: {
      json_data: {
        files: [
          {data: 'test/fixtures/objects/hello_world.json',
           template: 'test/fixtures/templates/hello_world.html.mustache',
           dest: 'tmp/hello_json.html'}
        ]
      },
      yaml_data: {
        files: [
          {data: 'test/fixtures/objects/hello_world.yaml',
           template: 'test/fixtures/templates/hello_world.html.mustache',
           dest: 'tmp/hello_yaml.html'}
        ]
      },
      yml_data: {
        files: [
          {data: 'test/fixtures/objects/hello_world.yml',
           template: 'test/fixtures/templates/hello_world.html.mustache',
           dest: 'tmp/hello_yml.html'}
        ]
      },
      arbitrary_data: {
        files: [
          {data: { greeting: "Hello", target: "world" },
           template: 'test/fixtures/templates/hello_world.html.mustache',
           dest: 'tmp/hello_arbitrary.html'}
        ]
      },
      partials_directory: {
        options: {
          directory: 'test/fixtures/partials/'
        },
        files: [
          {data: 'test/fixtures/objects/hello_world.json',
           template: 'test/fixtures/templates/hello_partial.mustache',
           dest: 'tmp/hello_partial.html'}
        ]
      },
      partials_extension: {
        options: {
          directory: 'test/fixtures/partials/',
          extension: '.ms',
          clear_cache: true
        },
        files: [
          {data: 'test/fixtures/objects/hello_world.json',
           template: 'test/fixtures/templates/hello_partial.mustache',
           dest: 'tmp/hello_partial_extension.html'}
        ]
      },
      partials_prefix: {
        options: {
          directory: 'test/fixtures/partials/',
          prefix: 'pre_',
          clear_cache: true
        },
        files: [
          {data: 'test/fixtures/objects/hello_world.json',
           template: 'test/fixtures/templates/hello_partial.mustache',
           dest: 'tmp/hello_partial_prefix.html'}
        ]
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'jshint', 'mustache_render', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['test']);

};
