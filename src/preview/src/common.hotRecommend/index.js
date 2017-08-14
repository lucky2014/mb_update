define(function(require,exports,module){
    var $ = require("jquery");
    var Swiper = require("swiper");

    //var data = require("app_index/data");
    var Engine = require("engine");
    var box = Engine.init();

    //页面逻辑
    var app = {

        //产品展示
        img_show: function(v){
            var attrList = v.attrList;
            var productTpl = require("preview/src/common.hotRecommend/index.tpl");
            //console.log(JSON.stringify(v,null,2));
            box.render($(".left"), v, productTpl,1);

            $.each(v.attrList, function(i,j){
                if(j.tagName == "input"){
                    $(".newProduct[symbol="+v.symbol+"] .title").html(j.attrTitle);//产品展示
                    $(".newProduct[symbol="+v.symbol+"] .titlebg").css("background-image", "url("+j.value.value+")");
                    j.text = 1; //用以区分
                }else if(j.tagName == "img"){
                    var picsTpl = require("preview/src/common.hotRecommend/pics.tpl");
                    box.render($(".newProduct[symbol="+v.symbol+"] ul"), v.attrList, picsTpl);
                }
            });
        },
    }
    return app;
});