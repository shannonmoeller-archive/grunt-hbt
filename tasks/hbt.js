/*jshint node:true */
'use strict';

var handlebars = require('handlebars');
var path = require('path');

var toString = Object.prototype.toString;

var processName = function (name) {
    return path.basename(name).replace(/\.[^\.]+$/, '');
};

var promoteSrc = function (value) {
    return value && value.src;
};

var typeOf = function (val) {
    return toString.call(val).slice(8, -1).toLowerCase();
};

var defaults = {
    data: {},
    helpers: {},
    partials: [],
    compilerOptions: {},
    processPartialName: processName
};

var HandlebarsTemplate = function (grunt, task) {
    this.grunt = grunt;
    this.files = task.files;
    this.options = task.options(defaults);
    this.handlebars = handlebars.create();

    this.registerHelpers(this.options.helpers)
        .registerPartials(this.options.partials)
        .writeFiles();
};

HandlebarsTemplate.prototype.registerHelpers = function (helpers) {
    switch (typeOf(helpers)) {
        case 'object':
            return this.registerHelpersObject(helpers);

        case 'array':
            return this.registerHelpersArray(helpers);

        case 'string':
            return this.registerHelperFiles(helpers);

        default:
            return this;
    }
};

HandlebarsTemplate.prototype.registerHelpersObject = function (helpers) {
    var i = null;

    if (helpers.expand === true) {
        helpers = this.grunt.file
                      .expandMapping(helpers.src, helpers.src, helpers)
                      .map(promoteSrc);

        this.registerHelpers(helpers);
    }
    else {
        for (i in helpers) {
            if (helpers.hasOwnProperty(i)) {
                this.handlebars.registerHelper(i, helpers[i]);
            }
        }
    }

    return this;
};

HandlebarsTemplate.prototype.registerHelpersArray = function (helpers) {
    var length = helpers.length;
    var i = 0;

    for (; i < length; i++) {
        this.registerHelpers(helpers[i]);
    }

    return this;
};

HandlebarsTemplate.prototype.registerHelperFiles = function (helpers) {
    helpers = this.grunt.file.expand(helpers);
    var length = helpers.length;
    var i = 0;

    for (; i < length; i++) {
        require(path.resolve(helpers[i]))(this.handlebars);
    }

    return this;
};

HandlebarsTemplate.prototype.registerPartials = function (partials) {
    switch (typeOf(partials)) {
        case 'object':
            return this.registerPartialsObject(partials);

        case 'array':
            return this.registerPartialsArray(partials);

        case 'string':
            return this.registerPartialFiles(partials);

        default:
            return this;
    }
};

HandlebarsTemplate.prototype.registerPartialsObject = function (partials) {
    var i = null;

    if (partials.expand === true) {
        partials = this.grunt.file
                       .expandMapping(partials.src, partials.src, partials)
                       .map(promoteSrc);

        this.registerPartials(partials, processName);
    }
    else {
        for (i in partials) {
            if (partials.hasOwnProperty(i)) {
                this.handlebars.registerPartial(i, partials[i]);
            }
        }
    }

    return this;
};

HandlebarsTemplate.prototype.registerPartialsArray = function (partials) {
    var length = partials.length;
    var i = 0;

    for (; i < length; i++) {
        this.registerPartials(partials[i], processName);
    }

    return this;
};

HandlebarsTemplate.prototype.registerPartialFiles = function (partials) {
    partials = this.grunt.file.expand(partials);
    var length = partials.length;
    var i = 0;

    for (; i < length; i++) {
        this.handlebars.registerPartial(
            this.options.processPartialName(partials[i]),
            this.grunt.file.read(partials[i])
        );
    }

    return this;
};

HandlebarsTemplate.prototype.writeFiles = function () {
    var grunt = this.grunt;
    var handlebars = this.handlebars;
    var options = this.options;
    var compilerOptions = options.compilerOptions;
    var data = options.data;

    this.files.forEach(function (file) {
        grunt.log.write('Creating "%s"...', file.dest);

        var cwd = file.orig.cwd || '';
        var src = file.src[0];
        var dirname = path.dirname(src);
        var basename = path.basename(src);
        var relative = path.relative(dirname, cwd) || '.';

        // Read and compile
        var contents = grunt.file.read(file.src);
        var renderer = handlebars.compile(contents, compilerOptions);

        // Extend data
        var locals = Object.create(data);

        // Expose file
        locals.file = {
            cwd: cwd,
            src: src,
            dirname: dirname,
            basename: basename,
            relativePath: relative
        };

        // Render and write
        grunt.file.write(file.dest, renderer(locals));

        // Log success
        grunt.log.ok();
    });

    return this;
};

module.exports = function (grunt) {
    grunt.registerMultiTask('hbt', 'Renders Handlebars templates to static HTML.', function () {
        new HandlebarsTemplate(grunt, this);
    });
};
