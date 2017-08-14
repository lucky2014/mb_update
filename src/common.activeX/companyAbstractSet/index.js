define(function(require,exports,module){
    var $ = require("jquery");
    var Swiper = require("swiper");

    //var data = require("app_index/data");
    var Engine = require("engine");
    var box = Engine.init();

    require("common.activeX/companyAbstractSet/index.css");
    var ajaxFileUpload = require("common.ajaxfileupload/index");
    var addOne = require("common.activeX/companyAbstractSet/addOne.tpl")

    //页面逻辑
    var app = {

        //banner滚动
        img_edit: function(v){
            var img_showTpl = require("common.activeX/companyAbstractSet/index.tpl");
            box.render($(".right"), v, img_showTpl);
            $.each(v.attrList, function(i,j){
                if(j.attrSort == 1){
                    $(".companyAbstractSet .modelInput").val(j.attrTitle)
                    $(".companyAbstractSet .commonAddress input").val(j.value.linkUrl)
                }else if(j.attrSort == 2){
                    $(".editText").html(j.value.value);
                }
                else if(j.attrSort == 3){
                    $(".companyPics .bigPic").attr("src",j.value.value);
                }else if(j.attrSort == 4){
                    var thisValue = j.value;
                    var picTpl = require("common.activeX/companyAbstractSet/pics.tpl");
                     box.render($(".companyAbstractSet .piculCommon"), thisValue, picTpl);
                }
            });
            
            var hasPic = $(".hasPics").length;
            $(".nodataPics input[name=myfiles]").attr("id","companyAbstract"+hasPic);
            
            $(".rightDiv ").delegate(".editText","keyup",function(){ //修改右边简介回显到左边
                var self = $(this);
                $(".companyAbstract .editTextShow").html(self.html());
                pubsub.publish('dataChange',"about");
            });

            $(".rightDiv").delegate("input[name=myfiles]", "change", function() { //上传图片
                var meInput = $(this);
                var id = meInput.attr("id");

                ajaxFileUpload(id, "uploadImg.do", function(msg){
                    var idd = meInput.attr("fileElementId"); 
                     $("#" + idd ).siblings(".addPicture").attr("src",msg[0]);
                    
                    if($("#" + idd ).parents("li").hasClass("nodataPics")){
                           var liL = $('.companyAbstract .picShow ul li').length;
                           $(".companyAbstract .picShow ul").append("<li><img src="+msg[0]+" class='companyAbstract"+liL+"'/></li>")
                           $("#" + idd ).siblings("span,.delectCha").removeClass("dn");
                           $("#" + idd ).parents("li").addClass("hasPics").removeClass("nodataPics");
                           box.render($("#" + idd ).parents(".piculCommon"), "", addOne, "0");

                           $(".nodataPics input[name=myfiles]").attr("id","companyAbstract"+(liL+1));
                            $(".companyAbstract").addClass("active").find(".selectB").css("height",$(".companyAbstract").height()-4);
                    }else{
                        $(".companyAbstract ."+id).attr("src",msg[0])
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
                   $(".companyAbstract").find(".picShow").find("li").eq(_index).remove();
               }

               var liL = $(".picShow ul li").length;
               $.each($(".picShow ul li"), function(i){ //删除图片后更新id和class
                   $(".picShow ul li").eq(i).find("img").attr("class","companyAbstract"+i);
                   $(".piculCommon li.hasPics").eq(i).find("input[name=myfiles]").attr("id","companyAbstract"+i);
                   $(".piculCommon li.nodataPics input[name=myfiles]").attr("id","companyAbstract"+liL);
               });
               $(".companyAbstract").addClass("active").find(".selectB").css("height",$(".companyAbstract").height()-4);
               pubsub.publish('dataChange',"about");
            });


        },

    }
    return app;
});