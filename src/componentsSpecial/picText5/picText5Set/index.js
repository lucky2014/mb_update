define(function(require,exports,module){
    var $ = require("jquery");
    var Swiper = require("swiper");

    //var data = require("app_index/data");
    var Engine = require("engine");
    var box = Engine.init();

    require("componentsSpecial/picText5/picText5Set/index.css");

    var ajaxFileUpload = require("common.ajaxfileupload/index");
    var data = require("componentsSpecial/picText5/data");
    var save = require("componentsSpecial/picText5/save");
    var picText1Show = require("componentsSpecial/picText5/picText5Show/index");
    //页面逻辑
    var app = {
        /*tpl: function(){
            return require("componentsSpecial/picText5/picText5Set/index.tpl");
        },*/
        img_edit: function(){
            /*picText1Show.img_show();*/

            var v = data.returnObject.components[0];
            var attrList = v.attrList;

            var img_showTpl = require("componentsSpecial/picText5/picText5Set/index.tpl");
            box.render($(".right"), v, img_showTpl);

           $.each(attrList, function(i,j){
               if(j.tagName == "logo_img"){
                  $(".picText5Set .logoImg .addPicture").attr("src",j.value.value);
               }else if(j.tagName == "erweima_img"){
                  $(".picText5Set .erweima .addPicture").attr("src",j.value.value);
                  $(".picText5Set .erweima dt p").html(j.value.description);
               }else if(j.tagName == "text_input"){
                   var inforTpl = require("componentsSpecial/picText5/picText5Set/infor.tpl");
                   box.render($(".contact"), j.value, inforTpl);
               }
              
           });
            

          //页面名称change监控
            $(".picText5Set .contact .commonStyle").delegate("input","keyup",function(){
                var _this = $(this)
                var ind = _this.parent("p").index();
                $(".picText5 .con").eq(ind).find("i").html(_this.val());
            });
            //关注说明监控
            $(".picText5Set .erweima").delegate(".companyText","keyup",function(){
                  var _this = $(this)
                $(".picText5 .scan p").html(_this.html());
            });

            $(".rightDiv").delegate("input[name=myfiles]", "change", function() {
                var meInput = $(this);
                var id = meInput.attr("id");

                ajaxFileUpload(id, "uploadImg.do", function(msg){
                    var idd = meInput.attr("fileElementId"); 
                    $("#" + idd ).siblings(".addPicture").attr("src",msg[0]);
                    $("."+id).attr("src",msg[0]);
                }); 
            });
        },

    }
    return app;
});