/*jshint node:true */
'use strict';

module.exports = function (grunt) {
    // Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        dirs: {
            actual: 'test/actual',
            fixtures: 'test/fixtures'
        },

        clean: {
            tmp: '<%= dirs.actual %>'
        },

        jshint: {
            all: ['Gruntfile.js', 'tasks/**/*.js']
        },

        nodeunit: {
            all: ['test/**/test.*.js']
        },

        hbt: {
            options: {
                data: grunt.file.readJSON('test/fixtures/data.json')
            },

            optionsAsStrings: {
                options: {
                    helpers: '<%= dirs.fixtures %>/helpers/**/*.js',
                    partials: '<%= dirs.fixtures %>/partials/**/*.hbt',
                },

                files: {
                    '<%= dirs.actual %>/optionsAsStrings.html': '<%= dirs.fixtures %>/foo.hbt'
                }
            },

            optionsAsObjects: {
                options: {
                    helpers: {
                        uppercase: function (value) {
                            return String(value).toUpperCase();
                        }
                    },
                    partials: {
                        list: '{{#items}}\n    {{.}}\n{{/items}}',
                    }
                },

                files: {
                    '<%= dirs.actual %>/optionsAsObjects.html': '<%= dirs.fixtures %>/foo.hbt'
                }
            },

            optionsAsMappings: {
                options: {
                    helpers: [{
                        expand: true,
                        cwd: '<%= dirs.fixtures %>/helpers',
                        src: '**/*.js'
                    }],
                    partials: [{
                        expand: true,
                        cwd: '<%= dirs.fixtures %>/partials',
                        src: '**/*.hbt'
                    }]
                },
                files: [{
                    expand: true,
                    cwd: '<%= dirs.fixtures %>',
                    src: [
                        '**/*.hbt',
                        '!**/partials/**'
                    ],
                    dest: '<%= dirs.actual %>',
                    ext: '.html'
                }]
            }
        }
    });

    // Plugins
    grunt.loadTasks('tasks');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Tasks
    grunt.registerTask('test', ['jshint', 'hbt', 'nodeunit', 'clean']);
    grunt.registerTask('default', ['test']);
};
