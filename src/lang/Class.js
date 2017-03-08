/**
 * 积类
 * Base Class
 * @namespace
 * @name lang.Class
 * @requires lang.extend
 */
onavo.define('lang.Class', 'lang.extend', function(require){
    var extend = require('extend');

    /**
     * Extend a sub Class
     * @memberOf lang.Class
     * @name extend
     * @static
     * @function
     * @param {Object} extended Prototype extension
     * @param {Object} included Static attributes extension
     * @return {Class} Sub Class
     */
    var extendClass = function(extended, included){
        var subClass = function(){
                this.constructor = subClass;
                this.initialize.apply(this, arguments);
            },
            emptyClass = function(){};

        emptyClass.prototype = this.prototype;
        subClass.prototype = new emptyClass();

        extend(subClass.prototype, extended || {});
        includeClass.call(subClass, {
            extend: extendClass,

            include: includeClass
        });

        includeClass.call(subClass, included);

        return subClass;
    };

    /**
     * Extend static attributes
     * @memberOf lang.Class
     * @name include
     * @static
     * @function
     * @param {Object} included Static attributes to be extended
     */
    var includeClass = function(included){
        extend(this, included || {});
    };

    return extendClass.call(Function, {
        initialize: function(){

        }
    });
});