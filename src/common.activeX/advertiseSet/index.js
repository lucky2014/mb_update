define(function(require,exports,module){
    var $ = require("jquery");
    var Swiper = require("swiper");
    require("common.swiper/swiper.min.css");

    //var data = require("app_index/data");
    var Engine = require("engine");
    var box = Engine.init();

    require("common.activeX/advertiseSet/index.css");

    var ajaxFileUpload = require("common.ajaxfileupload/index");


    //页面逻辑
    var app = {

        //banner滚动
        img_edit: function(v){
            var img_showTpl = require("common.activeX/advertiseSet/index.tpl");
            box.render($(".right"),v.attrList[0].value, img_showTpl);

            $(".rightDiv").delegate("input[name=myfiles]", "change", function() { //上传图片
                var meInput = $(this);
                var id = meInput.attr("id");

                ajaxFileUpload(id, "uploadImg.do", function(msg){
                    var idd = meInput.attr("fileElementId"); 
                    $("#" + idd ).siblings(".addPicture").attr("src",msg[0]);
                    $("#img_comp .advantage ul li img").attr("src",msg[0])
                }); 
            });
        },

    }
    return app;
});