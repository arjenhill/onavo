/**
 * ui.Plugins.Plugin
 * To change this template use File | Settings | File Templates.
 */
onavo.define('ui.Plugins.Plugin', 'lang.each,lang.Class,lib.jQuery', function(require){
    var each = require('each'),
        Class = require('Class'),
        $ = require('jQuery');

    return Class.extend({
        $: $,

        initialize: function(node){
            this.node = node;
            this.initEvents();
            this.initElements();
        },

        initEvents: function(){
            var plugin = this;

            plugin.eventsHost = this.$('<div></div>');

            each(this.opts.events || {}, function(eventName){
                plugin.bind(eventName, this);
            });
        },

        initElements: function(){
            var plugin = this;
            each(this.opts.elements || {}, function(name, selector){
                plugin[name] = plugin.find(selector);
            });
        },

        bind: function(){
            this.eventsHost.bind.apply(this.eventsHost, arguments);
            return this;
        },

        unbind: function(){
            this.eventsHost.unbind.apply(this.eventsHost, arguments);
            return this;
        },

        trigger: function(){
            this.eventsHost.trigger.apply(this.eventsHost, arguments);
            return this;
        },

        remove: function(){
            this.node.unplug(this.constructor.ns);
        },

        unplug: function(){
            this.trigger('onUnload', [this]);
        }
    },{
        ns: 'Plugin'
    });
});