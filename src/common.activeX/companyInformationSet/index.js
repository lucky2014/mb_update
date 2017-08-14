define(function(require,exports,module){
    var $ = require("jquery");
    var Swiper = require("swiper");

    //var data = require("app_index/data");
    var Engine = require("engine");
    var box = Engine.init();


    //页面逻辑
    var app = {

        //banner滚动
        img_edit: function(v){
            var img_showTpl = require("common.activeX/companyInformationSet/index.tpl");
            box.render($(".right"), v, img_showTpl);

            $.each(v.attrList, function(i,j){
                if(j.attrSort == 1){
                    $(".companyInformationSet .modelInput").val(j.attrTitle);
                }else if(j.attrSort == 2){
                     $(".companyInformationSet .news1").val(j.value.linkUrl);
                }
                else if(j.attrSort == 3){
                    $(".companyInformationSet .news2").val(j.value.linkUrl);
                }else if(j.attrSort == 4){
                    var thisValue = j.value;
                    var picTpl = require("common.activeX/companyInformationSet/pics.tpl");
                     box.render($(".companyInformationSet .addDl"), thisValue, picTpl);
                }
            });
            
            
        },

    }
    return app;
});