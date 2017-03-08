/**
 * Add stylesheet(style or link tag) to DOM
 * @namespace
 * @name util.style
 * @requires lib.jQuery
 */
onavo.define('util.style', 'lib.jQuery', function(require){
    var $ = require('jQuery');
    return {
        /** @lends util.style */
        /**
         * Add style tag to DOM
         * @param {String} name Style name
         * @param {String} cssText Style to be add
         * @param {Object} [opts] More options(none at this moment)
         */
        add: function(name, cssText, opts){
            $('<style name="' + name + '">' + cssText + '</style>').appendTo('head');
        },

        /**
         * Load remote CSS file with link tag
         * @param {String} name Style name
         * @param {String} url CSS file's url
         * @param {Object} [opts] More options(none at this moment)
         */
        load: function(name, url, opts){
            $('<link name="' + name + '" rel="stylesheet" href="' + url + '" />').appendTo('head');
        },

        /**
         * Remove a style
         * @param {String} name Style name
         */
        remove: function(name){
            $('style[name=' + name + '], link[name=' + name + ']').remove();
        }
    }
});