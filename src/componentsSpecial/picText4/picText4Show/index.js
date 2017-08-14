define(function(require,exports,module){
    var $ = require("jquery");
    var Swiper = require("swiper");

    //var data = require("app_index/data");
    var Engine = require("engine");
    var box = Engine.init();

    require("componentsSpecial/picText4/picText4Show/index.css");
    var data = require("componentsSpecial/picText4/data");

    //页面逻辑
    var app = {

        //联系我们
        img_show: function(v){
            var v = data.returnObject.components[0];
            var attrList = v.attrList;
            var aboutTpl = require("componentsSpecial/picText4/picText4Show/index.tpl");
                box.render($(".left"), v, aboutTpl,"0");
                $("#picText4").attr("symbol",v.symbol);
            $.each(v.attrList, function(i,j){
                if(j.tagId == "text1"){
                    $(".description1").html(j.value.value);
                }else if(j.tagId == "imgs"){
                    var aboutTpl = require("componentsSpecial/picText4/picText4Show/pics.tpl");
                    box.render($(".companyInfor .picShow ul"), j.value, aboutTpl);
                }else if(j.tagId == "text2"){
                    $(".description2").html(j.value.value);
                }else if(j.tagId == "big_img"){
                    $(".description3 img").attr("src",j.value.value);
                }else if(j.tagId == "text3"){
                    $(".description4").html(j.value.value);
                }                
            });
        },
    };
    return app;
    
});