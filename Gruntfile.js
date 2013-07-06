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

        hbt: {
            options: {
                data: grunt.file.readJSON('test/data.json')
            },

            optionsAsStrings: {
                options: {
                    helpers: '<%= dirs.fixtures %>/helpers/**/*.js',
                    partials: '<%= dirs.fixtures %>/partials/**/*.hbt',
                },

                files: {
                    '<%= dirs.actual %>/optionsAsStrings.html': '<%= dirs.fixtures %>/index.hbt'
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
                        list: '{{#items}}{{.}} {{/items}}',
                    }
                },

                files: {
                    '<%= dirs.actual %>/optionsAsObjects.html': '<%= dirs.fixtures %>/index.hbt'
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
                    src: 'index.hbt',
                    ext: '.html',
                    dest: '<%= dirs.actual %>'
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
    grunt.registerTask('test', ['jshint', 'clean', 'hbt']);
    grunt.registerTask('default', ['test']);
};
