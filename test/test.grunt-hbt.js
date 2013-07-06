/*jshint node:true */
'use strict';

var grunt = require('grunt');

exports.hbt = {
    optionsAsStrings: function (test) {
        test.expect(1);

        var actual = grunt.file.read('test/actual/optionsAsStrings.html');
        var expected = grunt.file.read('test/expected/optionsAsStrings.html');
        test.equal(actual, expected, 'should compile helpers and partials referenced by glob string');

        test.done();
    },

    optionsAsObjects: function (test) {
        test.expect(1);

        var actual = grunt.file.read('test/actual/optionsAsObjects.html');
        var expected = grunt.file.read('test/expected/optionsAsObjects.html');
        test.equal(actual, expected, 'should compile helpers and partials written directly in the gruntfile');

        test.done();
    },

    optionsAsMappings: function (test) {
        test.expect(2);

        var actualFoo = grunt.file.read('test/actual/foo.html');
        var expectedFoo = grunt.file.read('test/expected/foo.html');
        var actualBar = grunt.file.read('test/actual/bar.html');
        var expectedBar = grunt.file.read('test/expected/bar.html');

        test.equal(actualFoo, expectedFoo, 'should compile helpers, partials, and files using mapping objects as foo');
        test.equal(actualBar, expectedBar, 'should compile helpers, partials, and files using mapping objects as bar');

        test.done();
    }
};
