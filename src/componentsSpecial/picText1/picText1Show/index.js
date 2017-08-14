define(function(require,exports,module){
    var $ = require("jquery");
    var Swiper = require("swiper");

    //var data = require("app_index/data");
    var Engine = require("engine");
    var box = Engine.init();

    require("componentsSpecial/picText1/picText1Show/index.css");
    var data = require("componentsSpecial/picText1/data");
    //页面逻辑
    var app = {

        //banner滚动
        img_show: function(){
            var v = data.returnObject.components[0];
            var img_showTpl = require("componentsSpecial/picText1/picText1Show/index.tpl");
            box.render($(".left"), v, img_showTpl, "0");
            $(".picText1").attr("symbol",v.symbol);
            $.each(v.attrList, function(i,j){
                //console.log(JSON.stringify(v,null,2))
                if(j.attrSort == 1){
                    $(".picText1 .editTextShow").html(j.value.value);
                }else if(j.attrSort == 2){
                    $(".picText1 .conTop img").attr("src",j.value.value);
                }else if(j.attrSort == 3){
                    var thisValue = j.value;
                    var picTpl = require("componentsSpecial/picText1/picText1Show/pics.tpl");
                     box.render($(".picText1 .picShow ul"), thisValue, picTpl);
                }
            });
        },

    }
    return app;
});