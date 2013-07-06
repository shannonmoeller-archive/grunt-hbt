/*jshint node:true*/
'use strict';

module.exports = function (handlebars) {
    handlebars.registerHelper('uppercase', function (value) {
        return String(value).toUpperCase();
    });
};
