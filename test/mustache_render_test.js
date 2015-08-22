'use strict';

var grunt = require('grunt');
var mustache = require('mustache');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.mustache_render = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },

  json_data: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/hello_json.html');
    var expected = grunt.file.read('test/expected/hello_world.html');
    test.equal(actual, expected, 'should render when given json data.');

    test.done();
  },

  json_data_url: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/hello_json_url.html');
    var expected = grunt.file.read('test/expected/hello_world.html');
    test.equal(actual, expected, 'should render when given json data via web.');

    test.done();
  },

  yaml_data: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/hello_yaml.html');
    var expected = grunt.file.read('test/expected/hello_world.html');
    test.equal(actual, expected, 'should render when given yaml data.');

    test.done();
  },

  yaml_data_url: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/hello_yaml_url.html');
    var expected = grunt.file.read('test/expected/hello_world.html');
    test.equal(actual, expected, 'should render when given yaml data via web.');

    test.done();
  },

  yml_data: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/hello_yml.html');
    var expected = grunt.file.read('test/expected/hello_world.html');
    test.equal(actual, expected, 'should render when given yml data.');

    test.done();
  },

  yml_data_url: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/hello_yml_url.html');
    var expected = grunt.file.read('test/expected/hello_world.html');
    test.equal(actual, expected, 'should render when given yml data via web.');

    test.done();
  },

  arbitrary_data: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/hello_arbitrary.html');
    var expected = grunt.file.read('test/expected/hello_world.html');

    test.equal(actual, expected, 'should render when given arbitrary data.');

    test.done();
  },

  js_data: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/hello_js.html');
    var expected = grunt.file.read('test/expected/hello_world.html');

    test.equal(actual, expected, 'should render when given a JavaScript module.');

    test.done();
  },

  partials_directory: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/hello_partial.html');
    var expected = grunt.file.read('test/expected/hello_partial.html');
    test.equal(actual, expected, 'should find named partials by directory.');

    test.done();
  },

  partials_extension: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/hello_partial_extension.html');
    var expected = grunt.file.read('test/expected/hello_altpartial.html');
    test.equal(actual, expected, 'should find named partials with different extension.');

    test.done();
  },

  partials_directory_full: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/hello_partial_full.html');
    var expected = grunt.file.read('test/expected/hello_partial.html');
    test.equal(actual, expected, 'should find named partials by full path.');

    test.done();
  },

  partials_prefix: function(test) {  // 'prefix' using a bare filename
    test.expect(1);

    var actual = grunt.file.read('tmp/hello_partial_prefix.html');
    var expected = grunt.file.read('test/expected/hello_prefix.html');
    test.equal(actual, expected, 'should find partials w/ old-style prefix.');

    test.done();
  },

  partials_prefix_dir: function(test) {  // 'prefix' using a path w/ directory
    test.expect(1);

    var actual = grunt.file.read('tmp/hello_partial_prefix_dir.html');
    var expected = grunt.file.read('test/expected/hello_prefix_dir.html');
    test.equal(actual, expected, 'should find partials w/ old-style prefix ' +
      'using legacy behavior when combined with a subdirectory');

    test.done();
  },

  partials_fprefix: function(test) {  // replaces partials_prefix
    test.expect(1);

    var actual = grunt.file.read('tmp/hello_partial_fprefix.html');
    var expected = grunt.file.read('test/expected/hello_prefix.html');
    test.equal(actual, expected, 'should find partials w/ prefix_file.');

    test.done();
  },

  partials_dprefix: function(test) {  // replaces partials_prefix_dir
    test.expect(1);

    var actual = grunt.file.read('tmp/hello_partial_dprefix.html');
    var expected = grunt.file.read('test/expected/hello_prefix_dir.html');
    test.equal(actual, expected, 'should find partials w/ prefix_dir.');

    test.done();
  },

  partials_dfprefixes: function(test) {  // combines previous prefix concepts
    test.expect(1);

    var actual = grunt.file.read('tmp/hello_partial_dfprefixes.html');
    var expected = grunt.file.read('test/expected/hello_dfprefixes.html');
    test.equal(actual, expected, 'should find partials w/ both ' +
      'prefix_dir and prefix_file together.');

    test.done();
  },

  partials_function: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/hello_partial_function.html');
    var expected = grunt.file.read('test/expected/hello_partial_function.html');
    test.equal(actual, expected, 'should use given function to find partials');

    test.done();
  },

  partials_glob_df: function(test) {  // glob expansion partial search (like dfprefixes)
    test.expect(1);

    var actual = grunt.file.read('tmp/hello_partial_globdf.html');
    var expected = grunt.file.read('test/expected/hello_dfprefixes.html');
    test.equal(actual, expected, 'should find partials w/ glob ' +
      '"sub-$1/pre_$2.mustache".');

    test.done();
  },

  partials_glob: function(test) {  // glob expansion partial search
    test.expect(1);

    var actual = grunt.file.read('tmp/hello_partial_glob.html');
    var expected = grunt.file.read('test/expected/hello_glob.html');
    test.equal(actual, expected, 'should find partials w/ glob ' +
      '"?(+sub-$1)/$2.*".');

    test.done();
  },

  batch_single_template_multiple_json_via_map: function(test) {
    test.expect(3);

    ['de', 'es', 'pt'].forEach(function(lang) {
      var actual = grunt.file.read('tmp/batch-a1/' + lang + '.html');
      var expected = grunt.file.read('test/expected/batch-a/' + lang + '.html');
      test.equal(actual, expected, 'should correctly process multiple JSON ' +
        'files into a single template via a map for ' + lang);
    });

    test.done();
  },

  batch_single_template_multiple_json_via_expand: function(test) {
    test.expect(3);

    ['de', 'es', 'pt'].forEach(function(lang) {
      var actual = grunt.file.read('tmp/batch-a2/' + lang + '.html');
      var expected = grunt.file.read('test/expected/batch-a/' + lang + '.html');
      test.equal(actual, expected, 'should correctly process multiple JSON ' +
        'files into a single template via an expansion for ' + lang);
    });

    test.done();
  },

  batch_multiple_template_single_json_via_map: function(test) {
    test.expect(3);

    ['markdown.md', 'plain.txt', 'spreadsheet.csv'].forEach(function(filename) {
      var actual = grunt.file.read('tmp/batch-b1/' + filename);
      var expected = grunt.file.read('test/expected/batch-b/' + filename);
      test.equal(actual, expected, 'should correctly process multiple ' +
        'template files using a single data source via a map for ' + filename);
    });

    test.done();
  },

  batch_multiple_template_single_json_via_expand: function(test) {
    test.expect(3);

    ['markdown.md', 'plain.txt', 'spreadsheet.csv'].forEach(function(filename) {
      var actual = grunt.file.read('tmp/batch-b2/' + filename);
      var expected = grunt.file.read('test/expected/batch-b/' + filename);
      test.equal(actual, expected, 'should correctly process multiple ' +
        'templates using a single data source via an expansion ' + filename);
    });

    test.done();
  },

  unescaped: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/hello_unescaped.html');
    var expected = grunt.file.read('test/expected/hello_unescaped.html');
    test.equal(actual, expected, 'should allow escaping to be disabled.');

    test.done();
  },

  escaped: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/hello_escaped.html');
    var expected = grunt.file.read('test/expected/hello_escaped.html');
    test.equal(actual, expected, 'should correctly escape HTML entities.');

    test.done();
  },

  escaped_custom: function(test) {
    test.expect(1);

    var actual = grunt.file.read('tmp/hello_escaped_custom.html');
    var expected = grunt.file.read('test/expected/hello_escaped_custom.html');
    test.equal(actual, expected, 'should allow user-defined escape functions.');

    test.done();
  },

  mustache_unchanged: function(test) {
    test.expect(1);

    var actual = mustache.render('{{input}}', {input: 'input &<>'});
    var expected = 'input &amp;&lt;&gt;';
    test.equal(actual, expected, 'should not leave mustache escape changed.');

    test.done();
  },
};
