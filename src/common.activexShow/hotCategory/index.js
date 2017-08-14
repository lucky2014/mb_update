define(function(require,exports,module){
    var $ = require("jquery");
    var Swiper = require("swiper");

    var Engine = require("engine");
    var box = Engine.init();

    require("common.activexShow/hotCategory/index.css");

    //页面逻辑
    var app = {

        //产品展示
        img_show: function(v){
            var attrList = v.attrList;
            var productTpl = require("common.activexShow/hotCategory/index.tpl");
            box.render($(".left"), v, productTpl, 1);
            $("#hotCategory").attr("symbol",v.symbol);

            //console.log(JSON.stringify(v,null,2))
            $.each(v.attrList, function(i,j){
                if(j.tagId == "model_name_prduct_2"){
                    $(".hotCategory .titleEchelon").html(j.attrTitle);//产品展示
                    $(".hotCategory .recoTitle").css("background-image", "url("+j.value.value+")");
                }else if(j.tagId == "product_1"){
                     var picsTpl = require("common.activexShow/hotCategory/pics.tpl");
                     box.render($(".recoType ul"), j.value, picsTpl);
                }
            });
        },

    }
    return app;
});