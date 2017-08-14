define(function(require,exports,module){
    var $ = require("jquery");
    var Swiper = require("swiper");

    //var data = require("app_index/data");
    var Engine = require("engine");
    var box = Engine.init();

    require("common.activeX/bannerSet/index1.css");

    var ajaxFileUpload = require("common.ajaxfileupload/index");
    var addOne = require("common.activeX/bannerSet/addOne.tpl");
    //页面逻辑
    var app = {

        //banner滚动
        img_edit: function(v){
            
            var attrList = v.attrList;
            $.each(v.attrList, function(i,j){
                if(j.tagName == "img"){
                    var img_showTpl = require("common.activeX/bannerSet/index1.tpl");
                    box.render($(".right"), j.value, img_showTpl);
                }

                $(".addBanBtn").click(function(){ //再添加一个
                    var dlL = $(".addDl dl").length;
                    box.render($(".addDl"), "", addOne, "0");
                    $(".addDl").find("dl:last-child").find("input[name=myfiles]").attr("id","hotCategory"+dlL);
                });

                $(".rightDiv").delegate(".delectCha","click",function(){ //删除
                    var me = $(this);

                    var thisModel = me.parents(".addDl").find("dl");
                    var _index = me.parents("dl").index();
                    if(thisModel.length>1){
                       me.parents("dl").remove();
                       $("#hotCategory").find(".picShow").find("li").eq(_index).remove();
                       $("#hotCategory").find(".selectB").css("height",$("#hotCategory").height()-4); 
                        
                        $.each($(".hotCategorySet .addDl dl"), function(i){ //删除图片后更新id和class
                            $(this).find("input[name=myfiles]").attr("id","hotCategory"+i);
                        });
                    }
                });
                
            });
            
            $(".hotCategorySet dt ul li").delegate("input","keyup",function(){
                 var me=$(this);
                 var ind = me.parents("dl").index();
                 $("#hotCategory .picShow li").eq(ind).find("i").html(me.val());
            })

            $(".rightDiv").delegate("input[name=myfiles]", "change", function() {
                var meInput = $(this);
                var id = meInput.attr("id");

                ajaxFileUpload(id, "uploadImg.do", function(msg){
                    var idd = meInput.attr("fileElementId"); 

                    $("#" + idd ).siblings(".addPicture").attr("src",msg[0]);
                    var _index = $("#" + idd ).parents("dl").index();
                    if($("#" + idd ).parents("dl").hasClass("nodataPics")){
                        $("#hotCategory .picShow").append("<li style=background-image:url("+msg[0]+") no-repeat><i></i></li>")
                        $("#" + idd ).parents("dl").addClass("hasPics").removeClass("nodataPics");
                    }else{
                        $("#hotCategory .picShow").find("li").eq(_index).css('backgroundImage','url('+msg[0]+')');
                    }
                    //热门产品分类
                     $(".hotCategorySet dt ul li").delegate("input","keyup",function(){
                          var me=$(this);
                          var ind = me.parents("dl").index();
                          $("#hotCategory .picShow li").eq(ind).find("i").html(me.val());
                     })
                }); 
            });
            
        },

    }
    return app;
});