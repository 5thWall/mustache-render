/*
 * grunt-mustache-render
 * https://github.com/5thWall/mustache-render
 *
 * Copyright (c) 2013 Andy Arminio
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var URL_BASE = 'https://raw.githubusercontent.com/5thWall/mustache-render/master/';

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
      json_data_url: {
        files: [
          {data: URL_BASE + 'test/fixtures/objects/hello_world.json',
           template: URL_BASE + 'test/fixtures/templates/hello_world.html.mustache',
           dest: 'tmp/hello_json_url.html'}
        ]
      },
      yaml_data: {
        files: [
          {data: 'test/fixtures/objects/hello_world.yaml',
           template: 'test/fixtures/templates/hello_world.html.mustache',
           dest: 'tmp/hello_yaml.html'}
        ]
      },
      yaml_data_url: {
        files: [
          {data: URL_BASE + 'test/fixtures/objects/hello_world.yaml',
           template: URL_BASE + 'test/fixtures/templates/hello_world.html.mustache',
           dest: 'tmp/hello_yaml_url.html'}
        ]
      },
      yml_data: {
        files: [
          {data: 'test/fixtures/objects/hello_world.yml',
           template: 'test/fixtures/templates/hello_world.html.mustache',
           dest: 'tmp/hello_yml.html'}
        ]
      },
      yml_data_url: {
        files: [
          {data: URL_BASE + 'test/fixtures/objects/hello_world.yml',
           template: URL_BASE + 'test/fixtures/templates/hello_world.html.mustache',
           dest: 'tmp/hello_yml_url.html'}
        ]
      },
      arbitrary_data: {
        files: [
          {data: { greeting: "Hello", target: "world" },
           template: 'test/fixtures/templates/hello_world.html.mustache',
           dest: 'tmp/hello_arbitrary.html'}
        ]
      },
      js_data: {
         files: [
           {data: 'test/fixtures/objects/hello_world.js',
            template: 'test/fixtures/templates/hello_world.html.mustache',
            dest: 'tmp/hello_js.html'}
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
      partials_full: {
        options: {
          clear_cache: true
        },
        files: [
          {data: 'test/fixtures/objects/hello_world.json',
           template: 'test/fixtures/templates/hello_partial_full.mustache',
           dest: 'tmp/hello_partial_full.html'}
        ]
      },
      partials_prefix: {  // tests backward compatibility w/ 'prefix'
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
      },
      partials_prefix_dir: {  // tests backward compatibility w/ 'prefix'
        options: {
          directory: 'test/fixtures/partials/',
          prefix: 'sub-',
          clear_cache: true
        },
        files: [
          {data: 'test/fixtures/objects/hello_world.json',
           template: 'test/fixtures/templates/hello_partial_dir.mustache',
           dest: 'tmp/hello_partial_prefix_dir.html'}
        ]
      },
      partials_fprefix: {  // like partials_prefix, but using new options
        options: {
          directory: 'test/fixtures/partials/',
          prefix_file: 'pre_',
          clear_cache: true
        },
        files: [
          {data: 'test/fixtures/objects/hello_world.json',
           template: 'test/fixtures/templates/hello_partial.mustache',
           dest: 'tmp/hello_partial_fprefix.html'}
        ]
      },
      partials_dprefix: {  // like partials_prefix_dir, but using new options
        options: {
          directory: 'test/fixtures/partials/',
          prefix_dir: 'sub-',
          clear_cache: true
        },
        files: [
          {data: 'test/fixtures/objects/hello_world.json',
           template: 'test/fixtures/templates/hello_partial_dir.mustache',
           dest: 'tmp/hello_partial_dprefix.html'}
        ]
      },
      partials_dfprefixes: {  // new functionality combining both new prefixes
        options: {
          directory: 'test/fixtures/partials/',
          prefix_dir: 'sub-',
          prefix_file: 'pre_',
          clear_cache: true
        },
        files: [
          {data: 'test/fixtures/objects/hello_world.json',
           template: 'test/fixtures/templates/hello_partial_dir.mustache',
           dest: 'tmp/hello_partial_dfprefixes.html'}
        ]
      },
      partials_function: {
        options: {
          partial_finder: function(name) {
            return "Hello, I'm from a partial function with name: " + name + "\n";
          },
          clear_cache: true
        },
        files: [
          {data: 'test/fixtures/objects/hello_world.json',
           template: 'test/fixtures/templates/hello_partial.mustache',
           dest: 'tmp/hello_partial_function.html'}
        ]
      },
      partials_glob_df: { // glob expansion partial search (like partials_dfprefixes)
          options: {
            directory: 'test/fixtures/partials/',
            glob: 'sub-$1/pre_$2.mustache',
            clear_cache: true
          },
          files: [
            {data: 'test/fixtures/objects/hello_world.json',
             template: 'test/fixtures/templates/hello_partial_dir.mustache',
             dest: 'tmp/hello_partial_globdf.html'}
          ]
      },
      partials_glob: {
          options: {
            directory: 'test/fixtures/partials/',
            glob: '{sub-$1,.}/$2.!(ms)',
            clear_cache: true
          },
          files: [
            {data: 'test/fixtures/objects/hello_world.json',
             template: 'test/fixtures/templates/hello_partial_glob.mustache',
             dest: 'tmp/hello_partial_glob.html'}
          ]
      },
      batch_single_template_multiple_json_via_map: {
        options: {
          template: 'test/fixtures/templates/hello_world.html.mustache'
        },
        files: {
          'tmp/batch-a1/de.html': 'test/fixtures/objects/batch-a/de.json',
          'tmp/batch-a1/es.html': 'test/fixtures/objects/batch-a/es.json',
          'tmp/batch-a1/pt.html': 'test/fixtures/objects/batch-a/pt.json'
        }
      },
      batch_single_template_multiple_json_via_expand: {
        files: [
          {expand: true,
           flatten: true,
           src: 'test/fixtures/objects/batch-a/*.json',
           template: 'test/fixtures/templates/hello_world.html.mustache',
           dest: 'tmp/batch-a2',
           ext: '.html',
           extDot: 'last'}
        ]
      },
      batch_multiple_template_single_json_via_map: {
        options: {
          data: 'test/fixtures/objects/hello_world.json'
        },
        files: {
          'tmp/batch-b1/markdown.md': 'test/fixtures/templates/batch-b/markdown.md.mustache',
          'tmp/batch-b1/plain.txt': 'test/fixtures/templates/batch-b/plain.txt.mustache',
          'tmp/batch-b1/spreadsheet.csv': 'test/fixtures/templates/batch-b/spreadsheet.csv.mustache'
        }
      },
      batch_multiple_template_single_json_via_expand: {
        files: [
          {expand: true,
           flatten: true,
           src: 'test/fixtures/templates/batch-b/*.mustache',
           data: 'test/fixtures/objects/hello_world.json',
           dest: 'tmp/batch-b2',
           rename: function (dest, filename) {
             return dest + '/' + filename.replace(/\.mustache$/, '');
           }}
        ]
      },
      unescaped: {
        options: {
          escape: false,
        },
        files: [
          {data: { greeting: "<em>Hello</em>", target: "<strong>world</strong>" },
           template: 'test/fixtures/templates/hello_world.html.mustache',
           dest: 'tmp/hello_unescaped.html'}
        ]
      },
      escaped: {
        files: [
          {data: { greeting: "Hello & welcome", target: "world :>" },
           template: 'test/fixtures/templates/hello_world.html.mustache',
           dest: 'tmp/hello_escaped.html'}
        ]
      },
      escaped_custom: {
        options: {
          escape: function (text) { return '*' + text.toUpperCase() + '*'; }
        },
        files: [
          {data: { greeting: "Hello", target: "world" },
           template: 'test/fixtures/templates/hello_world.html.mustache',
           dest: 'tmp/hello_escaped_custom.html'}
        ]
      },
      mustache_unchanged: {  // must be last; tests leakage of mustache.escape
        options: {
          escape: false,
        },
        files: [
          {data: { greeting: 'dummy', target: 'dummy' },
           template: 'test/fixtures/templates/hello_world.html.mustache',
           dest: 'tmp/hello_dummy.html'}
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
