define(function(require,exports,module){
    var $ = require("jquery");
    var Swiper = require("swiper");

    //var data = require("app_index/data");
    var Engine = require("engine");
    var box = Engine.init();

    require("componentsSpecial/picText4/picText4Set/index.css");

    var ajaxFileUpload = require("common.ajaxfileupload/index");
    var data = require("componentsSpecial/picText4/data");
    var save = require("componentsSpecial/picText4/save");
    var picText1Show = require("componentsSpecial/picText4/picText4Show/index");
    //页面逻辑
    var app = {

        /*tpl:function(){
            return require("componentsSpecial/picText4/picText4Set/index.tpl");
        },*/
        img_edit: function(){
            /*picText1Show.img_show();*/

            var v = data.returnObject.components[0];
            var attrList = v.attrList;

            var img_showTpl = require("componentsSpecial/picText4/picText4Set/index.tpl");
            box.render($(".right"), v, img_showTpl);

           $.each(attrList, function(i,j){
               if(j.tagId == "text1"){
                   $(".companyText1 p").html(j.value.value);
               }else if(j.tagId == "imgs"){
                   var aboutTpl = require("componentsSpecial/picText4/picText4Set/pics.tpl");
                   box.render($(".companyPics .piculCommon"), j.value, aboutTpl);
               }else if(j.tagId == "text2"){
                   $(".companyText2 p").html(j.value.value);
               }else if(j.tagId == "big_img"){
                   $(".companyPics .bigPic img").attr("src",j.value.value);
               }else if(j.tagId == "text3"){
                   $(".companyText3 p").html(j.value.value);
               }                
              
           });
            
            //文本内容监控
            $(".picText4Set .divCommon").delegate(".editText","keyup",function(){
                 var me=$(this);
                 var ind = me.parent(".divCommon").index()+1;
                 $(".picText4 .companyInfor p[indexs="+ind+"]").html(me.html());
            });

            $(".rightDiv").delegate("input[name=myfiles]", "change", function() { //上传图片
                var meInput = $(this);
                var id = meInput.attr("id");

                ajaxFileUpload(id, "uploadImg.do", function(msg){
                    var idd = meInput.attr("fileElementId"); 
                    $("#" + idd ).siblings(".addPicture").attr("src",msg[0]);
                    $("."+id).attr("src",msg[0])
                }); 
            });
        },

    }
    return app;
});