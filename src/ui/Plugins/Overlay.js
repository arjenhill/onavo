/**
 * ui.Plugins.Overlay
 * To change this template use File | Settings | File Templates.
 */
onavo.define('ui.Plugins.Overlay', 'lang.each,lang.extend,lang.proxy,lang.methodInjection,ui.Plugins.Plugin', function(require){
    var each = require('each'),
        extend = require('extend'),
        proxy = require('proxy'),
        methodInjection = require('methodInjection'),
        NodeOverlay = require('Overlay'),
        Plugin = require('Plugin');

    return Plugin.extend({
        initialize: function(node, opts){
            var opts = this.opts = extend({}, this.constructor.settings, opts);
            this.node = node;
            opts.container = opts.container || node.$el;

            this.render();
            this.initEvents();
            this.methodInjections();

            this.trigger('onLoad', [this]);
        },

        render: function(){
            var opts = this.opts,
                $el = this.$el = this.$(opts.overlayTemplate),
                container = this.container = this.$(opts.container).append(this.$el);

            $el.css({
                position: 'absolute',
                zIndex: opts.zIndex || 2147483647,
                width: container.outerWidth(),
                height: container.outerHeight()
            });

            container.css('position') === 'static' && container.css('position', 'relative');
        },

        methodInjections: function(){
            var overlay = this,
                node = this.node,
                methods = ['show', 'hide'];
            each(methods, function(){
                methodInjection.before(node, this, proxy(overlay[this], overlay));
            });
        },

        show: function(){
            this.$el.show();
        },

        hide: function(){
            this.$el.hide();
        },

        unplug: function(){
            this.$el.remove();
            this.trigger('onUnload', [this]);
        }
    }, {
        ns: 'Overlay',

        settings: {
            overlayTemplate: [
                '<div class="ui-plugin-overlay"></div>'
            ].join('')
        }
    });
});