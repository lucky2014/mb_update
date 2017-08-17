define(function(require,exports,module){
    var $ = require("jquery");
    var Swiper = require("swiper");

    //var data = require("app_index/data");
    var Engine = require("engine");
    var box = Engine.init();
    var ajaxFileUpload = require("common.ajaxfileupload/index");
    require("common.activeX/newProductSet/index.css");
    var addOne = require("common.activeX/companyProductSet/addOne.tpl")

    //页面逻辑
    var app = {

        //banner滚动
        img_edit: function(v){
            var img_showTpl = require("common.activeX/newProductSet/index.tpl");
            box.render($(".right"), v, img_showTpl);

            $.each(v.attrList, function(i,j){
                if(j.tagName == "input"){
                    $(".newProductSet .modelInput").val(j.attrTitle)
                    j.text = 1; //用以区分
                }else if(j.tagName == "img"){
                    var picsTpl = require("common.activeX/newProductSet/pics.tpl");
                     box.render($(".newProductSet .productsPics ul"), v.attrList, picsTpl);
                }
            });
            
            var hasPic = $(".hasPics").length+1;
            $(".nodataPics input[name=myfiles]").attr("id","newProduct"+hasPic);

             //模块名称
            $(".modelName").delegate(".modelInput","keyup",function(){
                 var me=$(this);
                 $("#img_new").find(".title").html(me.val());
                 pubsub.publish('dataChange',"img_new");
            })

            $(".rightDiv").delegate("input[name=myfiles]", "change", function() { //上传图片
                var meInput = $(this);
                var id = meInput.attr("id");

                ajaxFileUpload(id, "uploadImg.do", function(msg){
                    var idd = meInput.attr("fileElementId"); 
                    $("#" + idd ).siblings(".addPicture").attr("src",msg[0]);
                    
                    var _index = $("#" + idd ).parents("li").index();
                    if($("#" + idd ).parents("li").hasClass("nodataPics")){
                          $("#img_new .picShow").append("<li><img src="+msg[0]+" /></li>")
                          $("#" + idd ).siblings("span,.delectCha").removeClass("dn");
                          $("#" + idd ).parents("li").addClass("hasPics").removeClass("nodataPics");
                          box.render($("#" + idd ).parents(".piculCommon"), "", addOne, "0");

                          var hasPic = $(".hasPics").length+1;
                          $(".nodataPics input[name=myfiles]").attr("id","newProduct"+hasPic);
                          $(".newProduct").addClass("active").find(".selectB").css("height",$(".newProduct").height()-4);
                      
                    }else{
                           $("#img_new .picShow").find("li").eq(_index).find("img").attr("src",msg[0]);
                    }
                    pubsub.publish('dataChange',"img_new");
                }); 
            });

            $(".rightDiv").delegate(".delectCha","click",function(){ //删除图片
                var me=$(this);
                var _index = me.parent("li").index();
                var thisModel = me.parents(".piculCommon").find(".hasPics");
                
                if(thisModel.length>1){
                    me.parent("li").remove();
                    $("#img_new").find(".picShow").find("li").eq(_index).remove();
                }

                var liL = $("#img_new .picShow li").length;
                $.each($("#img_new .picShow li"), function(i){ //删除图片后更新id和class
                    $(".newProductSet .piculCommon li.hasPics").eq(i).find("input[name=myfiles]").attr("id","newProduct"+i);
                    $(".newProductSet .piculCommon li.nodataPics input[name=myfiles]").attr("id","newProduct"+liL);
                });

                $(".newProduct").addClass("active").find(".selectB").css("height",$(".newProduct").height()-4);
                pubsub.publish('dataChange',"img_new");
            });
            
           /* $(".newProductSet .modelInput").focus(function(){  //输入框聚焦样式
              $(".newProductSet .modelName").css("border","1px solid #1d8ce0");
              pubsub.publish('dataChange',"img_new");
            });*/
        },

    }
    return app;
});