/**
 * ui.Plugins.DragDrop
 * To change this template use File | Settings | File Templates.
 */
onavo.define('ui.Plugins.DragDrop', 'lang.extend,ui.Plugins.Drag', function(require){
    var extend = require('extend'),
        Drag = require('Drag');

    var DragDrop = Drag.extend({
        initialize: function(node, opts){
            Drag.prototype.initialize.apply(this, arguments);

            this.opts.dropArea && this.setDropArea(this.opts.dropArea);

            this.bindDropUI();
        },

        bindDropUI: function(){
            var top0, left0, dropArea, $el;
            this.bind('beforeStartDrag', function(e, dd){
                top0 = dd.$el.css('top');
                left0 = dd.$el.css('left');
                $el = dd.$el;
                dropArea = dd.dropArea;
            });

            this.bind('onDrop', function(e, dd, top, left){
                if(!dropArea){
                    return;
                }

                if(top < dropArea.top || top + $el.outerHeight() > dropArea.bottom ||
                    left < dropArea.left || left + $el.outerWidth() > dropArea.right){
                    $el.css({
                        top: top0,
                        left: left0
                    });
                }
            });
        },

        setDropArea: function(area){
            if(area && !area.top){
                area = this.$(area);
                var offset = this.$(area).offset();
                area = {
                    top: offset.top,
                    left: offset.left,
                    bottom: offset.top + area.outerHeight(),
                    right: offset.left + area.outerWidth()
                };
            }

            this.dropArea = area;
        }
    }, {
        ns: 'DragDrop',

        settings: extend({}, Drag.settings)
    });

    return DragDrop;
});