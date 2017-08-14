define(function(require,exports,module){
    var $ = require("jquery");
    var Swiper = require("swiper");

    //var data = require("app_index/data");
    var Engine = require("engine");
    var box = Engine.init();

    require("common.activexShow/companyAbstract/index.css");
    //页面逻辑
    var app = {

        //banner滚动
        img_show: function(v){
            var img_showTpl = require("common.activexShow/companyAbstract/index.tpl");
            box.render($(".left"), v, img_showTpl, "0");
            $(".companyAbstract").attr("symbol",v.symbol);
            
            $.each(v.attrList, function(i,j){
                //console.log(JSON.stringify(v,null,2))
                if(j.attrSort == 1){
                    $(".companyAbstract .modelInputShow").html(j.attrTitle)
                }else if(j.attrSort == 2){
                    $(".companyAbstract .editTextShow").html(j.value.value);
                }else if(j.attrSort == 3){
                    $(".companyAbstract .conTop img").attr("src",j.value.value);
                }else if(j.attrSort == 4){
                    var thisValue = j.value;
                    var picTpl = require("common.activexShow/companyAbstract/pics.tpl");
                     box.render($(".companyAbstract .picShow ul"), thisValue, picTpl);
                }
            });
        },

    }
    return app;
});