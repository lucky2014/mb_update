define(function(require,exports,module){
    var $ = require("jquery");
    var Swiper = require("swiper");

    //var data = require("app_index/data");
    var Engine = require("engine");
    var box = Engine.init();

    require("../common.aboutInfo/index.css");
    //页面逻辑
    var app = {

        //联系我们
        img_show: function(v){
            var attrList = v.attrList;
            var aboutTpl = require("../common.aboutInfo/index.tpl");
                box.render($(".left"), v, aboutTpl,"0");
                $("#aboutInfo").attr("symbol",v.symbol);
            $.each(v.attrList, function(i,j){
                if(j.tagId == "model_name"){
                    $(".head .p1").attr("style","background-image:url("+j.value.value+")");
                    $(".descrip").html(j.attrTitle);
                }else if(j.tagId == "text1"){
                    $(".description1").html(j.value.value);
                }else if(j.tagId == "imgs"){
                    var aboutTpl = require("../common.aboutInfo/pics.tpl");
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