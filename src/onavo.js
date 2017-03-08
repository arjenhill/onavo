/**
 * onavo v0.19.1 =>v0.1.1
 * (old => https://github.com/jiayi2/onavo)
 * @ 开发 halldwang
 * { JavaScript 工具库 }
 * email:email@ahthw.com
 */

(function(global, undefined) {
    // Fast exit
    if (global) {
        return;
    }
    /**
     * Global access, window.onavo
     * @namespace
     * @name global
     */
    global = window.onavo = {};
    // Modules' index tree
    var _ = {};
    // Cache loaded module
    var moduleCache = {};
    var moduleLoading = {};
    /**
     * Global Settings
     * @namespace
     * @name globalSettings
     * @class
     */
    var globalSettings = {
        /** @lends globalSettings */

        global: global,
        moduleCache: moduleCache,
        moduleLoading: moduleLoading,
        // onavo's version
        version: 0,
        // Source settings
        srcRoot: '://gtimg2.ahthw.com/',
        srcPath: '/onavo/',
        srcMap: {},
        // Combo settings
        useCombo: false,
        comboTag: '/c/=',
        comboDelimiter: ',',
        // Debug settings
        debug: false, // Debug switch
        grey: false, // Grey switch
        logURL: '://gtimg2.ahthw.com/onavo/logo.png'
    };
    /**
     * @name lang.trim
     * @function Trim blanks
     */
    var trim = function() {
        var trimReg = /(^[\s\xA0]+)|([\s\xA0]+$)/g;
        return String.prototype.trim ?
            function(text) {
                return text == null ?
                    '' :
                    String.prototype.trim.call(text);
            } :
            // Otherwise use our own trimming functionality
            function(text) {
                return text == null ?
                    '' :
                    text.toString().replace(trimReg
, '');
            }
    }();
    /**
     * @name lang.each
     * @function Foreach
     * @param {Object|Array} object Object to be traversed
     * @param {Function} callback Handler for each item
     * @param args Arguments attached for handler
     */
    var each = function(object, callback, args) {
        var name, i = 0,
            length = object.length,
            isObj = length === undefined || Object.prototype.toString(object) === '[object Function]';
        if (args) {
            if (isObj) {
                for (name in object) {
                    if (callback.apply(object[name], args) === false) {
                        break;
                    }
                }
            } else {
                for (; i < length;) {
                    if (callback.apply(object[i++], args) === false) {
                        break;
                    }
                }
            }
            // A special, fast, case for the most common use of each
        } else {
            if (isObj) {
                for (name in object) {
                    if (callback.call(object[name], name, object[name]) === false) {
                        break;
                    }
                }
            } else {
                for (; i < length;) {
                    if (callback.call(object[i], i, object[i++]) === false) {
                        break;
                    }
                }
            }
        }
        return object;
    };
    /**
     * Type Enhancement Tools
     * @namespace
     * @name lang.typeEnhance
     * @class
     * @requires lang.each
     */
    var typeEnhance = function() {
        var class2type = {};
        each('Boolean Number String Function Array Date RegExp Object'.split(' '), function(i, name) {
            class2type['[object ' + name + ']'] = name.toLowerCase();
        });

        var toString = Object.prototype.toString;

        return typeEnhance = {
            /** @lends lang.typeEnhance */

            /**
             * Parse data to string
             * @param data Data to be parsed
             * @return {String}
             */
            toString: function(data) {
                var isArray = typeEnhance.isArray;
                if (!isArray(data)) {
                    return data + '';
                }

                return function(data) {
                    var callee = arguments.callee,
                        arr = [];
                    each(data, function(i, datum) {
                        if (!isArray(datum)) {
                            arr.push(datum + '');
                            return;
                        }

                        arr.push('[' + callee(datum) + ']');
                    });

                    return arr.join(',');
                }(data);
            },

            /**
             * Get type of obj
             * @param obj
             * @return {String}
             */
            type: function(obj) {
                return obj == null ?
                    String(obj) :
                    class2type[toString.call(obj)] || "object";
            },

            isFunction: function(obj) {
                return typeEnhance.type(obj) === "function";
            },

            isArray: Array.isArray || function(obj) {
                return typeEnhance.type(obj) === "array";
            },

            isWindow: function(obj) {
                return obj != null && obj == obj.window;
            },

            isPlainObject: function(obj) {
                // Must be an Object.
                // Because of IE, we also have to check the presence of the constructor property.
                // Make sure that DOM nodes and window objects don't pass through, as well
                if (!obj || typeEnhance.type(obj) !== "object" || obj.nodeType || typeEnhance.isWindow(obj)) {
                    return false;
                }

                try {
                    var hasOwn = Object.prototype.hasOwnProperty;
                    // Not own constructor property must be Object
                    if (obj.constructor &&
                        !hasOwn.call(obj, "constructor") &&
                        !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                        return false;
                    }
                } catch (e) {
                    // IE8,9 Will throw exceptions on certain host objects #9897
                    return false;
                }

                // Own properties are enumerated firstly, so to speed up,
                // if last one is own, then all properties are own.

                var key;
                for (key in obj) {}

                return key === undefined || hasOwn.call(obj, key);
            },

            isString: function(obj) {
                return typeEnhance.type(obj) === "string";
            },

            isNumeric: function(obj) {
                return !isNaN(parseFloat(obj)) && isFinite(obj);
            }
        };
    }();
    /**
     * Serialize object with delimiter
     * @namespace
     * @name util.serialize
     * @param obj
     * @param {String} [delimiterInside="="]
     * @param {String} [delimiterBetween="&"]
     * @return {String}
     * @requires lang.each
     * @requires lang.typeEnhance
     */
    var serialize = function(obj, delimiterInside, delimiterBetween) {
        var toString = typeEnhance.toString,
            stack = [];
        delimiterInside = delimiterInside || '=';
        delimiterBetween = delimiterBetween || '&';

        each(obj, function(key, value) {
            stack.push(key + delimiterInside + toString(value || ''));
        });

        return stack.join(delimiterBetween);
    };
    /**
     * Report to a url
     * @namespace
     * @name util.report
     * @param {String} url
     */
    var report = function() {
        var logs = {};
        return function(url) {
            //send data
            var now = +new Date(),
                name = 'log_' + now,
                img = logs[name] = new Image();

            img.onload = img.onerror = function() {
                logs[name] = null;
            };

            url += (url.indexOf('?') > -1 ? '?' : '&') + now;

            img.src = url;
        }
    }();
    /**
     * Log information for debug or error collection
     * @namespace
     * @name util.log
     * @param {Object|String} opts Options for log
     * @param {String} [opts.url=LOG_URL] URL to be reported to
     * @param {Number} [opts.level=LOG_LOCAL] Log level
     * @param {String} [opts.info='Empty info!'] Information to be logged
     * @requires globalSettings
     * @requires lang.each
     * @requires lang.typeEnhance
     * @requires util.report
     */
    var log = function() {
        var LOG_ERROR = 0,
            LOG_INFO = 1,
            LOG_LOCAL = 2;

        var DEBUG = globalSettings.DEBUG,
            LOG_URL = globalSettings.LOG_URL;

        var type = typeEnhance;

        return DEBUG ?
            console ? function(opts) {
                var info = type.isString(opts) ? opts : opts.info;
                console.log(info);
            } : function() {} : function(opts) {
                var url = opts.url || LOG_URL,
                    level = opts.level || LOG_LOCAL,
                    info = (type.isString(opts) ? opts : opts.info) || 'Empty info!';

                if (level > LOG_INFO) {
                    return;
                }

                if (typeEnhance.isPlainObject(info)) {
                    info = serialize(info);
                }

                url += (url.indexOf('?') > -1 ? '?' : '&') + 'level' + level + ':' + info;

                report(url);
            };
    }();
    /**
     * Publish and subscribe, observation model
     * @namespace
     * @name util.pubSub
     * @class
     * @requires lang.each
     */
    var pubSub = function(){
        var callbacks = {};

        return {
            /** @lends util.pubSub */

            /**
             * Publish an event
             * @static
             * @param {String} eventName
             * @param args Arguments to be passed to callback function. No limit of arguments' length
             * @return {lang.pubSub}
             */
            pub: function(eventName, args){
                // Switch args to real array
                var args = Array.prototype.slice.call(arguments, 0);

                // Get event name
                var eventName = args.shift();

                var list = [],
                    layers = eventName.split('.');

                // Enable namespace, list up in propagation way
                for(var i= 0, len= layers.length; i<len; i++){
                    list = list.concat(callbacks[layers.join('.')] || []);
                    layers.pop();
                }

                // If list is empty, returns
                if(list.length === 0){
                    return this;
                }

                var self = this;
                each(list, function(i, callback){
                    callback.apply(self, args);
                });

                return this;
            },

            /**
             * Subscribe events
             * @static
             * @param eventNames Event names that to be subscribed
             * @param callback Callback to be invoked when the subscribed events are published
             * @return {util.pubSub}
             */
            sub: function(eventNames, callback){
                each(eventNames.split(' '), function(i, eventName){
                    if(eventName === ''){
                        return;
                    }
                    // Add callback to stack
                    // If callbacks[eventName] is not defined, create a new array
                    (callbacks[eventName] || (callbacks[eventName] = [])).push(callback);
                });

                return this;
            }
        };
    }();
    /**
     * Create function with paths for getting required modules
     * @param {String} requireString Required modules' paths
     * @return {Function} Function for getting required modules
     */
    var getRequireModules = function(requireString){
        // If require is string and is not empty, requires
        if(typeEnhance.isString(requireString) && requireString.length > 0) {
            // Split required modules' path
            requireString = requireString.split(',');

            // Required module collection
            var requireModuleByPath = {},
                requireModuleByModuleName = {};

            each(requireString, function(i, requiredModulePath){
                var path = trim(requiredModulePath),
                    moduleName = path.split('.').pop();
                // Find module in loaded module cache
                requireModuleByPath[path] = requireModuleByModuleName[moduleName] = moduleCache[path];
            });

            return function(index){
                return requireModuleByModuleName[index] || requireModuleByPath[index];
            };
        }

        return function(){
            return null;
        };
    };
    /**
     * Module-define function
     * @function
     * @param {String} path Module's namespace and module name
     * @param {String} require Modules required for this module
     * @param {Function} factory Module's factory function, returns the module
     */
    var define = function(path, require, factory){
        // Require is optional
        // When there're only 2 args, they should be path & factory
        if(!factory){
            factory = require;
            require = '';
        }

        // Trim path to avoid cache index error
        path = trim(path);

        var layers = path.split('.'), // Split namespace & module name
            moduleName = layers.pop(), // Get module name
            ns = _, // Cache modules' index tree
            nsName, module;

        // Find parent namespace
        while(layers.length > 0){
            // Handle namespace from top to bottom
            nsName = layers.shift();

            // If a layer of namespace is not defined, fill empty object
            ns[nsName] = ns[nsName] || {};

            // Type check of namespace for each layer
            // None-object is not allowed
            if(typeEnhance.isNumeric(ns[nsName]) || typeof ns[nsName] === 'boolean'){
                throw new TypeError('define: cannot attach stuffs to number or boolean!');
            }

            // Move to next layer
            ns = ns[nsName];
        }

        // Replace require variant with require function
        // For fast use: require('path') and require('module')
        require = getRequireModules(require);

        // Type check of factory
        // Only function(for module factory function) are allowed
        if(!typeEnhance.isFunction(factory)){
            throw new TypeError('define: factory should be function!');
        }

        // Run factory to create module
        module = factory(require);

        // Cache module for further use
//        moduleCache[path] = ns[moduleName] = !typeEnhance.isFunction(module) ?
//            // If module is no function, set it to module cache directly
//            module :
//
//            // If module is a function, use proxy in case of namespace dependence
//            function(){
//                return module.apply(ns, arguments);
//            };
        moduleCache[path] = ns[moduleName] = module;
    };
    define('globalSettings', function(){
        return globalSettings;
    });
    define('lang.each', function(){
        return each;
    });

    define('lang.trim', function(){
        return trim;
    });

    // Enhanced tools for type operation
    define('lang.typeEnhance', 'lang.each', function(){
        return typeEnhance;
    });

    define('util.serialize', 'lang.each,lang.typeEnhance', function(){
        return serialize;
    });

    define('util.report', function(){
        return report;
    });

    define('util.log', 'globalSettings,lang.each,lang.typeEnhance,util.report', function(){
        return log;
    });

    define('util.pubSub', 'lang.each', function(){
        return pubSub;
    });
    /**
     * Get script from remote
     * @namespace
     * @name util.getScript
     * @function
     * @param {String} url Script's url
     * @param {Function} [callback] Callback to be invoked when script's loaded
     */
    define('util.getScript', function(){
        return function(url, callback){
            var script = document.createElement('script'),
                parent = document.getElementsByTagName('head')[0];

            setTimeout(function() {
                if (!parent){
                    setTimeout(arguments.callee, 0);
                } else{
                    parent.insertBefore(script, parent.firstChild);
                }
            }, 1);

            script.onload = script.onreadystatechange = function(event){
                //Firefox got no readyState, readyState undefined means Firefox's onload event fires
                //IE has readyState, readyState would be loaded or complete when done
                if( !this.readyState || this.readyState === 'loaded' || this.readyState === 'complete'){
                    callback && callback(event || window.event, script);
                }
            };

            script.type = 'text/javascript';
            script.charset = 'utf-8';
            script.async = true;
            script.src = url;

            return script;
        }
    });
    /**
     * Combine resources with combo server
     * @namespace
     * @name util.combo
     * @param {String} root Root/domain of combo server
     * @param {Array} paths Paths of resources
     * @param {Function} callback Callback to be invoked when combined resources are loaded
     * @requires globalSettings
     * @requires util.getScript
     */
    define('util.combo', 'globalSettings,util.getScript', function(require){
        var globalSettings = require('globalSettings'),
            getScript = require('getScript');

        return function(root, paths, callback){
            var url = root + globalSettings.comboTag + paths.join(globalSettings.comboDelimiter) + '?v=' + globalSettings.version;
            getScript(url, callback);
        };
    });
    /**
     * Get require list, including indirectly required modules
     * @namespace
     * @name util.getRequireList
     * @param {String} directRequireList List of modules that are directly required
     * @returns {Array} Array of require modules' paths
     * @requires globalSettings
     */
    define('util.getRequireList', 'globalSettings', function(require){
        var globalSettings = require('globalSettings');

        var map = globalSettings.srcMap,
            moduleCache = globalSettings.moduleCache;

        return function(directRequireList){
            if(!directRequireList || directRequireList.split(',').length === 0){
                return '';
            }

            var list = [],
                listArray = directRequireList.split(','),
                i = 0,
                checkedList = {},
                path, requireList;

            while(path = listArray[i++]){
                if(typeof moduleCache[path] !== 'undefined' || checkedList[path]){
                    continue;
                }

                list.push(path);
                checkedList[path] = true;

                // dig deeper
                requireList = map[path];

                if(!requireList){
                    continue;
                }

                listArray = listArray.concat(requireList.split(','));
            }

            return list;
        }
    });
    /**
     * Require modules and invoke callback when all required modules are ready
     * @namespace
     * @name api.require
     * @requires globalSettings
     * @requires lang.each
     * @requires lang.trim
     * @requires lang.typeEnhance
     * @requires util.pubSub
     * @requires util.getScript
     * @requires util.combo
     * @requires util.getRequireList
     * @see global.require
     */
    define('api.require', 'globalSettings,lang.each,lang.trim,lang.typeEnhance,util.pubSub,util.getScript,util.combo,util.getRequireList', function(require){
        var globalSettings = require('globalSettings'),
            typeEnhance = require('typeEnhance'),
            each = require('each'),
            trim = require('trim'),
            pubSub = require('pubSub'),
            getScript = require('getScript'),
            combo = require('combo'),
            getRequireList = require('getRequireList');

        var global = globalSettings.global;

        /**
         * Require modules and invoke callback when all required modules are ready
         * @namespace
         * @name global.require
         * @function
         * @param {String} require Required modules' paths
         * @param {Function} callback Callback to be invoked when required modules are loaded
         * @returns {global}
         * @requires globalSettings
         * @requires lang.each
         * @requires lang.trim
         * @requires lang.typeEnhance
         * @requires util.pubSub
         * @requires util.getScript
         * @requires util.combo
         * @requires util.getRequireList
         */
        return global.require = function(require, callback){
            // Require is optional
            require = callback ? require : '';

            // Reformat require, trim blank
            var formatedPaths = [];
            each(require.split(','), function(i, path){
                formatedPaths.push(trim(path));
            });
            require = formatedPaths.join(',');

            // Require should be string
            if(!typeEnhance.isString(require)){
                throw new TypeError('api.require: require should be string!');
            }

            // Callback should be funtion
            if(!typeEnhance.isFunction(callback)){
                throw new TypeError('api.require: callback should be function!');
            }

            // Get require list, move out loaded ones
            var requireList = getRequireList(require);

            if(requireList.length === 0){
                // If no need of loading new module, run callback
                callback(getRequireModules(require));
            } else {
                // Load required modules
                var paths = [],
                    loadEvents = [];
                each(requireList, function(i, path){
                    // move out loding ones
                    if(!moduleLoading[path]){
                        paths.push(globalSettings.srcPath + path.split('.').join('/') + '.js');
                        moduleLoading[path] = true;
                    }

                    loadEvents.push('api.define.' + path);
                });

                pubSub.sub(loadEvents.join(' '), function(){
                    var count = 0,
                        readyList = '',
                        total = loadEvents.length;
                    return function(readyModulePath){
                        // Check if the module is reloaded
                        if(new RegExp('(?:^| )' + readyModulePath + '(?: |$)').test(readyList)){
                            return;
                        }

                        // Add to ready list
                        readyList += ' ' + readyModulePath;

                        // If not every required module has been loaded
                        if(++count < total){
                            return;
                        }

                        // All modules are ready, run callback
                        callback(getRequireModules(require));
                    }
                }());

                // Hard dependency on util.combo
                // Hard dependencies have been defined above
                if(paths.length > 0){
                    if(globalSettings.debug || !globalSettings.useCombo){
                        each(paths, function(){
                            getScript(globalSettings.srcRoot + this + '?v=' + globalSettings.version);
                        });
                    } else {
                        combo(globalSettings.srcRoot, paths);
                    }

                }
            }

            return global;
        };
    });
    /**
     * Define a module with required modules
     * @namespace
     * @name api.define
     * @requires globalSettings
     * @requires lang.typeEnhance
     * @requires api.require
     * @requires util.pubSub
     * @see global.define
     */
    define('api.define', 'globalSettings,lang.typeEnhance,api.require,util.pubSub', function(require){
        var globalSettings = require('globalSettings'),
            typeEnhance = require('typeEnhance'),
            globalRequire = require('api.require'),
            pubSub = require('util.pubSub');

        var global = globalSettings.global;

        /**
         * Define a module with required modules
         * @namespace
         * @name global.define
         * @function
         * @param {String} path The path of new module
         * @param {String} require Required Modules' path
         * @param {Function} factory New module's factory
         * @returns {global}
         * @requires globalSettings
         * @requires lang.typeEnhance
         * @requires api.require
         * @requires util.pubSub
         */
        return global.define = function(path, require, factory){
            if(!typeEnhance.isString(path)){
                throw new TypeError('api.define: path should be string!');
            }

            if(!factory){
                factory = require;
                require = '';
            }

            globalRequire(require, function(){
                define(path, require, factory);
                pubSub.pub('api.define.' + path, path);
            });

            return global;
        };
    });
    /**
     * Remove a module
     * @namespace
     * @name api.remove
     * @requires globalSettings
     * @see global.remove
     */
    define('api.remove', 'globalSettings', function(require){
        var globalSettings = require('globalSettings');

        var global = globalSettings.global;

        /**
         * Remove a module
         * @namespace
         * @name global.remove
         * @function
         * @param {String} path Path of module to be removed
         * @returns {global}
         * @requires globalSettings
         */
        return global.remove = function(path){
            moduleCache[path] = null;
            return global;
        };
    });
    /**
     * Set global settings
     * @namespace
     * @name api.set
     * @requires lang.each
     * @requires globalSettings
     * @see global.set
     */
    define('api.set', 'lang.each,globalSettings', function(require){
        var each = require('each'),
            globalSettings = require('globalSettings');

        var global = globalSettings.global;

        /**
         * Set global settings
         * @namespace
         * @name global.set
         * @function
         * @param {String} attr Attribute to be set
         * @param value New value
         * @returns {global}
         * @requires lang.each
         * @requires globalSettings
         */
        return global.set = function(attr, value){
            var opts = attr;
            if(typeof attr === 'string'){
                opts = {};
                opts[attr] = value;
            }

            each(opts, function(key, value){
                globalSettings[key] = value;
            });

            return global;
        };
    });
})(window.onavo);
