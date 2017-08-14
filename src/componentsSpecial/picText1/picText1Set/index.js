define(function(require,exports,module){
    var $ = require("jquery");
    var Swiper = require("swiper");

    //var data = require("app_index/data");
    var Engine = require("engine");
    var box = Engine.init();
    require("componentsSpecial/picText1/picText1Set/index.css");

    var ajaxFileUpload = require("common.ajaxfileupload/index");
    var data = require("componentsSpecial/picText1/data");
    var save = require("componentsSpecial/picText1/save");
    var picText1Show = require("componentsSpecial/picText1/picText1Show/index");
    var addOne = require("componentsSpecial/picText1/picText1Set/addOne.tpl");

    //页面逻辑
    var app = {

        //banner滚动
       /* tpl: function(){
           return require("componentsSpecial/picText1/picText1Set/index.tpl");
        },*/
        img_edit: function(){
            /*picText1Show.img_show();*/

            var v = data.returnObject.components[0];
            //console.log(JSON.stringify(v.attrList,null,2))
            var img_showTpl = require("componentsSpecial/picText1/picText1Set/index.tpl");
            box.render($(".right"), v, img_showTpl);
            $.each(v.attrList, function(i,j){
                if(j.attrSort == 1){
                    $(".editText").html(j.value.value);
                }
                else if(j.attrSort == 2){
                    $(".companyPics .bigPic").attr("src",j.value.value);
                }else if(j.attrSort == 3){
                    var thisValue = j.value;
                    var picTpl = require("componentsSpecial/picText1/picText1Set/pics.tpl");
                     box.render($(".picText1Set .piculCommon"), thisValue, picTpl);
                }
            });
            
            var hasPic = $(".hasPics").length;
            $(".nodataPics input[name=myfiles]").attr("id","picText1"+hasPic);

            $(".rightDiv ").delegate(".editText","keyup",function(){ //修改右边简介回显到左边
                var self = $(this);
                $(".picText1 .editTextShow").html(self.html());
            });

            $(".rightDiv").delegate("input[name=myfiles]", "change", function() { //上传图片
                var meInput = $(this);
                var id = meInput.attr("id");

                ajaxFileUpload(id, "uploadImg.do", function(msg){
                    var idd = meInput.attr("fileElementId"); 
                     $("#" + idd ).siblings(".addPicture").attr("src",msg[0]);
                    
                    if($("#" + idd ).parents("li").hasClass("nodataPics")){
                           var liL = $('.picText1 .picShow ul li').length;
                           $(".picText1 .picShow ul").append("<li><img src="+msg[0]+" class='picText1"+liL+"'/></li>")
                           $("#" + idd ).siblings("span,.delectCha").removeClass("dn");
                           $("#" + idd ).parents("li").addClass("hasPics").removeClass("nodataPics");
                           box.render($("#" + idd ).parents(".piculCommon"), "", addOne, "0");

                           $(".nodataPics input[name=myfiles]").attr("id","picText1"+(liL+1));
                            /*data.returnObject.components[0] = save.picText1();*/
                    }else{
                        $(".picText1 ."+id).attr("src",msg[0])
                    }

                }); 
            });

            $(".rightDiv").delegate(".delectCha","click",function(){ //删除图片
                var self = $(this);
                var _index = self.parent("li").index();
                var thisModel = self.parents(".piculCommon").find(".hasPics");
                if(thisModel.length>1){
                   self.parent("li").remove();
                   $(".picText1").find(".picShow").find("li").eq(_index).remove();
               }

               var liL = $(".picShow ul li").length;
               $.each($(".picShow ul li"), function(i){ //删除图片后更新id和class
                   $(".picShow ul li").eq(i).find("img").attr("class","picText1"+i);
                   $(".piculCommon li.hasPics").eq(i).find("input[name=myfiles]").attr("id","picText1"+i);
                   $(".piculCommon li.nodataPics input[name=myfiles]").attr("id","picText1"+liL);
               });
            });
        },

    }
    return app;
});