define(function(require,exports,module){
    var $ = require("jquery");
    var Swiper = require("swiper");

    //var data = require("app_index/data");
    var Engine = require("engine");
    var box = Engine.init();

    require("common.activeX/aboutSet/index.css");
    var ajaxFileUpload = require("common.ajaxfileupload/index");
    //页面逻辑
    var app = {

        //banner滚动
        img_edit: function(v){
            var attrList = v.attrList;

            var img_showTpl = require("common.activeX/aboutSet/index.tpl");
            box.render($(".right"), v, img_showTpl);

           $.each(attrList, function(i,j){
               if(j.tagId == "model_name"){
                   $(".companyPics .titlePic img").attr("src",j.value.value)
                   $(".mustInput input").val(j.attrTitle);
               }else if(j.tagId == "text1"){
                   $(".companyText1 p").html(j.value.value);
               }else if(j.tagId == "imgs"){
                   var aboutTpl = require("common.activeX/aboutSet/pics.tpl");
                   box.render($(".companyPics .piculCommon"), j.value, aboutTpl);
               }else if(j.tagId == "text2"){
                   $(".companyText2 p").html(j.value.value);
               }else if(j.tagId == "big_img"){
                   $(".companyPics .bigPic img").attr("src",j.value.value);
               }else if(j.tagId == "text3"){
                   $(".companyText3 p").html(j.value.value);
               }                
              
           });
            
            //模块名称
            $(".aboutSet .mustInput").delegate("input","keyup",function(){
                 var me=$(this);
                 $(".about .descrip").html(me.val());
            })

            //文本内容监控
            $(".divCommon").delegate(".editText","keyup",function(){
                 var me=$(this);
                 var ind = me.parent(".divCommon").index();
                 $(".companyInfor p[indexs="+ind+"]").html(me.html());
            })


            $(".rightDiv").delegate("input[name=myfiles]", "change", function() {
                var meInput = $(this);
                var id = meInput.attr("id");

                ajaxFileUpload(id, "uploadImg.do", function(msg){
                    var idd = meInput.attr("fileElementId"); 
                    $("#" + idd ).siblings(".addPicture").attr("src",msg[0]);

                    if($("#" + idd ).attr("id") == "titlePic"){
                      $("#aboutInfo .head .p1").attr("style","background-image:url("+msg[0]+")");
                    }else{
                      $("#aboutInfo ."+id).attr("src",msg[0]);
                    }
                }); 
            });
        },

    }
    return app;
});