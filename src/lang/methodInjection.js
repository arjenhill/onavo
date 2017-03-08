/**
 * Inject function before/after a method
 * @namespace
 * @name lang.methodInjection
 * @requires lang.each
 */
onavo.define('lang.methodInjection', 'lang.each', function(require) {
    var each = require('each');

    var BEFORE_INJECTIONS = '_BEFORE_INJECTIONS',
        AFTER_INJECTIONS = '_AFTER_INJECTIONS',
        ORIGINAL_FUNCTION = '_ORIGINAL_FUNCTION';

    var execute = function() {
        var args = arguments,
            scope = this,
            beforeBreak = false,
            result;

        each(this[BEFORE_INJECTIONS], function() {
            beforeBreak = this.apply(scope, args) === false;
            if (beforeBreak) {
                return false;
            }
        });

        if (beforeBreak) {
            return;
        }

        result = scope[ORIGINAL_FUNCTION].apply(scope, args);

        each(this[AFTER_INJECTIONS], function() {
            var afterResult = this.apply(scope, args);
            result = typeof afterResult === 'undefined' ? result : afterResult;
        });
    };

    /** @lends lang.methodInjection */
    return {
        /**
         * Inject function
         * @static
         * @param {String} type Inject before or after
         * @param {Object} scope Which scope(object) to be injected
         * @param {String} method Name of method which to be injected
         * @param {Function} injection The function to be injected before or after the original method
         * @returns {lang.methodInjection}
         */
        inject: function(type, scope, method, injection) {
            if (!scope[ORIGINAL_FUNCTION]) {
                scope[ORIGINAL_FUNCTION] = scope[method];
                scope[method] = execute;
            }

            !scope[type] && (scope[type] = []);
            scope[type].push(injection);

            return this;
        },

        /**
         * Restore a method, revert injections
         * @param {Object} scope Scope(object) injected
         * @param {String} method Name of method injected
         * @returns {lang.methodInjection}
         */
        restore: function(scope, method) {
            scope[method] = scope[ORIGINAL_FUNCTION] || scope[method];
            return this;
        },

        /**
         * Inject function before original method
         * @static
         * @param {Object} scope Which scope(object) to be injected
         * @param {String} method Name of method which to be injected
         * @param {Function} injection The function to be injected before or after the original method
         * @returns {lang.methodInjection}
         */
        before: function() {
            var args = [BEFORE_INJECTIONS].concat(Array.prototype.slice.call(arguments, 0));
            return this.inject.apply(this, args);
        },

        /**
         * Inject function after original method
         * @static
         * @param {Object} scope Which scope(object) to be injected
         * @param {String} method Name of method which to be injected
         * @param {Function} injection The function to be injected before or after the original method
         * @returns {lang.methodInjection}
         */
        after: function() {
            var args = [AFTER_INJECTIONS].concat(Array.prototype.slice.call(arguments, 0));
            return this.inject.apply(this, args);
        }
    }
});
