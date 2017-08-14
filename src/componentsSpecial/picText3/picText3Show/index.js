define(function(require,exports,module){
    var $ = require("jquery");
    var Swiper = require("swiper");

    var Engine = require("engine");
    var box = Engine.init();

    require("componentsSpecial/picText3/picText3Show/index.css");
    var data = require("componentsSpecial/picText3/data");

    //页面逻辑
    var app = {

        //产品展示
        img_show: function(v){
            var v = data.returnObject.components[0];
            var attrList = v.attrList;
            var productTpl = require("componentsSpecial/picText3/picText3Show/index.tpl");
            box.render($(".left"), v, productTpl, "0");
            $("#picText3").attr("symbol",v.symbol);

            //console.log(JSON.stringify(v,null,2))
            $.each(v.attrList, function(i,j){
                if(j.tagId == "model_name_prduct_2"){
                    $(".picText3 .titleEchelon").html(j.attrTitle);//产品展示
                    $(".picText3 .recoTitle").css("background-image", "url("+j.value.value+")");
                }else if(j.tagId == "product_1"){
                     var picsTpl = require("componentsSpecial/picText3/picText3Show/pics.tpl");
                     box.render($(".recoType ul"), j.value, picsTpl);
                }
            });
        },

    }
    return app;
});