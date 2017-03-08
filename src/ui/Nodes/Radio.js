/**
 * ui.Nodes.Radio
 */
onavo.define('ui.Nodes.Radio', 'lang.extend,lang.inArray,lang.typeEnhance,lang.proxy,lang.browser,util.style,ui.Nodes.Node', function(require){
    var extend = require('extend'),
        inArray = require('inArray'),
        proxy = require('proxy'),
        typeEnhance = require('typeEnhance'),
        browser = require('browser'),
        style = require('style'),
        Node = require('Node');

    var Radio = Node.extend({
        initialize: function(opts){
            this.opts = opts = extend({}, this.constructor.settings, opts);
            this.template = this.template(opts.template);
            this.render();
            this.initEvents();
            this.initElements();
        },

        render: function(){
            var opts = this.opts,
                $ = this.$,
                $el, wrap, label;
            if(opts.selector){
                $el = $(opts.selector || opts.elem);
                $el.addClass('onavo-ui-nodes-radio');
                opts.label && (this.label = $(opts.label).addClass('onavo-ui-nodes-radio-label'));
            } else {
                wrap = this.wrap = this.$(this.template(opts));
                $el = wrap.find('.onavo-ui-nodes-radio');
                $(opts.container).append(wrap);
            }

            // checked property
            typeof opts.checked !== 'undefined' && $el.prop(opts.checked);

            // disabled property
            opts.disabled && $el.prop('disabled', 'disabled');

            // error event
            $el.change(proxy(function(e){
                var validation = this.validate(e);
                if(validation){
                    this.error();
                    this.trigger('error', [e, validation]);
                } else {
                    this.clearError();
                }
            }, this));

            this.$el = $el;
            return this;
        },

        validate: function(e){
            // pass validation when returns undefined
            if(typeEnhance.isFunction(this.opts.validate)){
                return this.opts.validate.call(this, e, !!this.prop('checked'));
            }

            return;
        },

        flash: function(){
            var count = 6,
                classes = ['onavo-ui-nodes-radio-flash-on', 'onavo-ui-nodes-radio-flash-off'],
                timer = setInterval(proxy(function(){
                    if(count--){
                        this.addClass(classes[count%2]).removeClass(classes[(count + 1)%2]);
                        return;
                    }

                    this.removeClass(classes[0]).removeClass(classes[1]);
                    timer && clearInterval(timer);
                }, this), 150);
            return this;
        },

        error: function(){
            this.addClass('onavo-ui-nodes-radio-error');
            return this;
        },

        clearError: function(){
            this.removeClass('onavo-ui-nodes-radio-error');
            return this;
        },

        remove: function(){
            Node.prototype.remove.apply(this, arguments);
            this.label && this.label.remove();
            return this;
        }
    },  {
        /**
         *
         * @param selector [optional]input selector
         * @param opts options for initialization
         * @return {Array} Array of textareas
         */
        renderAll: function(selector, opts){
            var SELECTOR = 'input[type=radio]';

            var nodes = [],
                Class = this,
                $ = this.prototype.$;
            if(typeof selector === 'string'){
                opts = opts || {};
            } else {
                opts = selector || {};
                selector = SELECTOR;
            }

            opts._SELECTOR = opts.selector;

            $(selector).each(function(){
                if(!$(this).is(SELECTOR)){
                    return;
                }
                opts.selector = this;
                nodes.push(new Class(opts));
            });

            opts.selector = opts._SELECTOR;
            opts._SELECTOR = null;

            return nodes;
        },

        settings: {
            template: '<label class="onavo-ui-nodes-radio-wrap"><input name="<%=name%>" type="radio" class="onavo-ui-nodes-radio ' + ((!browser.msie || parseInt(browser.version) > 9) ? 'onavo-ui-nodes-radio-enhanced' : '') + '" hidefocus="true"><strong class="onavo-ui-nodes-radio-label"><%=label%></strong></label>',

            name: 'onavo-ui-nodes-radio',

            value: false,

            readonly: false,

            validate: function(){},

            events: {
                error: function(){
                    this.error();
                }
            }
        },

        cssText: [
            '.onavo-ui-nodes-radio-wrap { position: relative; display: inline-block; width: 100%;}',
            '.onavo-ui-nodes-radio-label { display:block; margin: 0 0 0 23px; font-weight: normal; line-height: 17px; font:13px arial,helvetica,sans-serif; color:#222; cursor:pointer;',
                '-webkit-user-select:none',
                'user-select: none;',
            '}',
            '.onavo-ui-nodes-radio { position:relative; float:left; width: 13px; height: 13px; margin:1px 0 0; background: white; vertical-align: bottom; cursor: pointer;}',
            '.onavo-ui-nodes-radio-enhanced { border: 1px solid gainsboro;',
                '-webkit-appearance: none;',
                'appearance: none;',
                '-webkit-border-radius: 1px;',
                '-moz-border-radius: 1px;',
                'border-radius: 1px;',
                '-webkit-box-sizing: border-box;',
                '-moz-box-sizing: border-box;',
                'box-sizing: border-box;',
            '}',
            '.onavo-ui-nodes-radio:hover { border-color: #c6c6c6;',
                '-webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.1);',
                '-moz-box-shadow: inset 0 1px 1px rgba(0,0,0,0.1);',
                'box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.1);',
            '}',
            '.onavo-ui-nodes-radio:active { border-color: #c6c6c6; background: #ebebeb;}',
            '.onavo-ui-nodes-radio:checked { background:white;}',
            '.onavo-ui-nodes-radio:checked::after { position: absolute; top: -6px; left: -5px; display: block;',
                'content: url(https://ssl.gstatic.com/ui/v1/menu/checkmark.png);',
            '}',
            '.onavo-ui-nodes-radio-error,',
            '.onavo-ui-nodes-radio-error:hover,',
            '.onavo-ui-nodes-radio-error:focus { border-color:#dd4b39;}',
            '.onavo-ui-nodes-radio-flash-on,',
            '.onavo-ui-nodes-radio-flash-on:hover,',
            '.onavo-ui-nodes-radio-flash-on:focus { border-color:#4d90fe;}',
            '.onavo-ui-nodes-radio-flash-off,',
            '.onavo-ui-nodes-radio-flash-off:hover,',
            '.onavo-ui-nodes-radio-flash-off { border-color:#b9b9b9; border-top-color:#a0a0a0;}'
        ].join(' ')
    });

    style.add('onavo-ui-nodes-radio', Radio.cssText);
    return Radio;
});