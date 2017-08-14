define(function(require,exports,module){
    var $ = require("jquery");
    var Swiper = require("swiper");

    //var data = require("app_index/data");
    var Engine = require("engine");
    var box = Engine.init();

    require("common.activexShow/newProduct/index.css");

    //页面逻辑
    var app = {

        //产品展示
        img_show: function(v){
            var attrList = v.attrList;
            var productTpl = require("common.activexShow/newProduct/index.tpl");
            box.render($(".left"), v, productTpl,1);
            $("#img_new").attr("symbol",v.symbol);

            //console.log(JSON.stringify(v,null,2))
            $.each(v.attrList, function(i,j){
                if(j.tagName == "input"){
                    $(".newProduct[symbol=img_new] .title").html(j.attrTitle);//产品展示
                    $(".newProduct[symbol=img_new] .titlebg").css("background-image", "url("+j.value.value+")");
                    j.text = 1; //用以区分
                }else if(j.tagName == "img"){
                     var picsTpl = require("common.activexShow/newProduct/pics.tpl");
                     box.render($(".newProduct[symbol=img_new] ul"), v.attrList, picsTpl);
                }
            });
        },

    }
    return app;
});