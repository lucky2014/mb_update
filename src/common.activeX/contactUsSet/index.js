define(function(require,exports,module){
    var $ = require("jquery");
    var Swiper = require("swiper");

    //var data = require("app_index/data");
    var Engine = require("engine");
    var box = Engine.init();

    require("common.activeX/contactUsSet/index.css");
    var ajaxFileUpload = require("common.ajaxfileupload/index");
    //页面逻辑
    var app = {

        //banner滚动
        img_edit: function(v){
            var attrList = v.attrList;

            var img_showTpl = require("common.activeX/contactUsSet/index.tpl");
            box.render($(".right"), v, img_showTpl);

           $.each(attrList, function(i,j){
               if(j.tagName == "logo_img"){
                  $(".contactUsSet .logoImg .addPicture").attr("src",j.value.value);
               }else if(j.tagName == "erweima_img"){
                  $(".contactUsSet .erweima .addPicture").attr("src",j.value.value);
                  $(".contactUsSet .erweima dt p").html(j.value.description);
               }else if(j.tagName == "text_input"){
                   var inforTpl = require("common.activeX/contactUsSet/infor.tpl");
                   box.render($(".contact"), j.value, inforTpl);
               }
              
           });
            //关注说明监控
            $(".rightDiv .erweima").delegate(".companyText","keyup",function(){
                var _this = $(this)
                $(".contactUs .scan p").html(_this.html());
                pubsub.publish('dataChange',"contactUs");
            })
            //联系方式监控
            $(".contact .commonStyle").delegate("input","keyup",function(){
                var _this = $(this)
                var ind = _this.parent("p").index();
                $(".contactUs .con").eq(ind).find("i").html(_this.val());
                pubsub.publish('dataChange',"contactUs");
            })

            $(".rightDiv").delegate("input[name=myfiles]", "change", function() {
                var meInput = $(this);
                var id = meInput.attr("id");

                ajaxFileUpload(id, "uploadImg.do", function(msg){
                    var idd = meInput.attr("fileElementId"); 
                    $("#" + idd ).siblings(".addPicture").attr("src",msg[0]);

                    $(".contactUs ."+id).attr("src",msg[0]);
                    pubsub.publish('dataChange',"contactUs");
                });
            });
             
        },

    }
    return app;
});