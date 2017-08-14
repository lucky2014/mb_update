define(function(require,exports,module){
    var $ = require("jquery");
    var setup = require("setup");
    
    require("componentsSpecial/waterfall/waterfallShow/bootstrap-waterfall");
    require("componentsSpecial/waterfall/waterfallShow/index.css");

    var Engine = require("engine");
    var box = Engine.init();
    
    //var formatImg = require("common.formatImg/index");
    
    var data = require("componentsSpecial/waterfall/data");

    var app = {
        img_show:function(params,url){
            var v = data.returnObject.components[0];
            var attrList = v.attrList[0];
            var dvalue = attrList.value;
            //将内容渲染到DOM
            var waterfallTpl = require("componentsSpecial/waterfall/waterfallShow/index.tpl");
            box.render($(".left"), dvalue, waterfallTpl,"0");
            $("#waterfall").attr("symbol",v.symbol)

            $("#container").waterfall({
                itemClass: ".item",
                minColCount: 2,
                spacingHeight: 10,
                resizeable: true,
                ajaxCallback: function(success,end) {
                    
                }
            });
        }
    };
    return app;
});