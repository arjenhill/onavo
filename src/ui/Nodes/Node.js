/**
 * ui.Nodes
 * To change this template use File | Settings | File Templates.
 */
onavo.define('ui.Nodes.Node', 'lang.each,lang.extend,lang.proxy,util.template,lib.jQuery,lang.Class', function(require){
    var each = require('each'),
        extend = require('extend'),
        proxy = require('proxy'),
        template = require('template'),
        $ = require('jQuery'),
        Class = require('Class');

    var PLUGINS = '_PLUGINS';

    var copyMethodNames = 'find width height outerWidth outerHeight css animate show hide toggle append prepend appendTo insertBefore insertAfter html text addClass removeClass attr prop is offset bind unbind trigger delegate one click mouseover mouseout mousemove val',
        methods = {};
    each(copyMethodNames.split(' '), function(i, methodName){
        methods[methodName] = function(){
            return this.$el[methodName].apply(this.$el, arguments);
        }
    });

    return Class.extend(extend({}, methods, {
        $: $,

        template: template,

        initialize: function(selector){
            this.$el = this.$(selector);
            this.trigger('onLoad', [this]);
        },

        initEvents: function(delegate){
            var node = this,
                delegate = delegate || node;
            each(this.opts.events || {}, function(eventName){
                node.bind(eventName, proxy(this, delegate));
            });
        },

        initElements: function(){
            var node = this;
            each(this.opts.elements || {}, function(name, selector){
                node[name] = node.find(selector);
            });
        },

        plug: function(Plugin, opts){
            var plugin = new Plugin(this, opts);
            !this[PLUGINS] && (this[PLUGINS] = {});
            this[PLUGINS][Plugin.ns] = plugin;
        },

        unplug: function(ns){
            this[PLUGINS][ns].unplug();
            this[PLUGINS][ns] = null;
        },

        remove: function(){
            this.$el.remove();

            var plugins = this[PLUGINS];
            if(plugins){
                each(plugins, function(){
                    this.unplug();
                });
            }

            this.trigger('onUnload', [this]);
        }
    }));
});