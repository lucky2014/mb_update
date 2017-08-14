define(function(require,exports,module){
    var $ = require("jquery");
    var Swiper = require("swiper");

    //var data = require("app_index/data");
    var Engine = require("engine");
    var box = Engine.init();
    require("common.activeX/companyMienSet/index.css");

    var ajaxFileUpload = require("common.ajaxfileupload/index");
    var addOne = require("common.activeX/companyMienSet/addOne.tpl");

    //页面逻辑
    var app = {

        //banner滚动
        img_edit: function(v){
            var img_showTpl = require("common.activeX/companyMienSet/index.tpl");
            box.render($(".right"), v, img_showTpl);

            $.each(v.attrList, function(i,j){
                if(j.attrSort == 1){
                    $(".companyMienSet .modelInput").val(j.attrTitle)
                }else if(j.attrSort == 2){
                    $(".companyMienSet .editText").html(j.value.value);
                }else{
                    var picsTpl = require("common.activeX/companyMienSet/pics.tpl");
                    box.render($(".companyMienSet .piculCommon"), j.value, picsTpl);
                }
            });
            var hasPic = $(".hasPics").length;
            $(".nodataPics input[name=myfiles]").attr("id","companyMien"+hasPic);
            
            $(".rightDiv ").delegate(".mienText .editText","keyup",function(){ //修改右边简介回显到左边
                var self = $(this);
                $(".companyMien .editTextShow").html(self.html());
                pubsub.publish('dataChange',"about");
            });

            $(".rightDiv").delegate("input[name=myfiles]", "change", function() { //上传图片
                var meInput = $(this);
                var id = meInput.attr("id");

                ajaxFileUpload(id, "uploadImg.do", function(msg){
                    var idd = meInput.attr("fileElementId"); 
                     $("#" + idd ).siblings(".addPicture").attr("src",msg[0]);
                    
                    if($("#" + idd ).parents("li").hasClass("nodataPics")){
                           var liL = $('.companyMien .picShow ul li').length;
                           $(".companyMien .picShow ul").append("<li><img src="+msg[0]+" class='companyMien"+liL+"'/></li>")
                           $("#" + idd ).siblings("span,.delectCha").removeClass("dn");
                           $("#" + idd ).parents("li").addClass("hasPics").removeClass("nodataPics");
                           box.render($("#" + idd ).parents(".piculCommon"), "", addOne, "0");

                           $(".nodataPics input[name=myfiles]").attr("id","companyMien"+(liL+1));
                            $(".companyMien").addClass("active").find(".selectB").css("height",$(".companyMien").height()-4);
                    }else{
                        $(".companyMien ."+id).attr("src",msg[0])
                    }
                    pubsub.publish('dataChange',"about");
                }); 
            });

            $(".rightDiv").delegate(".delectCha","click",function(){ //删除图片
                var self = $(this);
                var _index = self.parent("li").index();
                var thisModel = self.parents(".piculCommon").find(".hasPics");
                if(thisModel.length>1){
                   self.parent("li").remove();
                   $(".companyMien").find(".picShow").find("li").eq(_index).remove();
               }

               var liL = $(".companyMien .picShow ul li").length;
               $.each($(".companyMien .picShow ul li"), function(i){ //删除图片后更新id和class
                   $(".companyMien .picShow ul li").eq(i).find("img").attr("class","companyMien"+i);
                   $(".companyMien .piculCommon li.hasPics").eq(i).find("input[name=myfiles]").attr("id","companyMien"+i);
                   $(".companyMien .piculCommon li.nodataPics input[name=myfiles]").attr("id","companyMien"+liL);
               });
               $(".companyMien").addClass("active").find(".selectB").css("height",$(".companyMien").height()-4);
               pubsub.publish('dataChange',"about");
            });
            
        },

    }
    return app;
});