define(function(require,exports,module){
    var $ = require("jquery");
    var Swiper = require("swiper");

    var Engine = require("engine");
    var box = Engine.init();

     require("componentsSpecial/picText3/picText3Set/index.css");

    var ajaxFileUpload = require("common.ajaxfileupload/index");
    var data = require("componentsSpecial/picText3/data");
    var save = require("componentsSpecial/picText3/save");
    var picText1Show = require("componentsSpecial/picText3/picText3Show/index");
    var addOne = require("componentsSpecial/picText3/picText3Set/addOne.tpl");
    //页面逻辑
    var app = {

        /*tpl: function(){
            return require("componentsSpecial/picText3/picText3Set/index.tpl");
        },*/
        img_edit: function(){
            /*picText1Show.img_show();*/

            var v = data.returnObject.components[0];
            var attrList = v.attrList;
            $.each(v.attrList, function(i,j){
                if(j.tagName == "img"){
                    var img_showTpl = require("componentsSpecial/picText3/picText3Set/index.tpl");
                    box.render($(".right"), j.value, img_showTpl);
                }
            });
            
            $(".picText3Set dt ul li").delegate("input","keyup",function(){ //标题内容监控
                 var me=$(this);
                 var ind = me.parents("dl").index();
                 $(".picText3 .picShow li").eq(ind-1).find("i").html(me.val());
            });

            $(".rightDiv").delegate("input[name=myfiles]", "change", function() {
                var meInput = $(this);
                var id = meInput.attr("id");

                ajaxFileUpload(id, "uploadImg.do", function(msg){
                    var idd = meInput.attr("fileElementId"); 
                    $("#" + idd ).siblings(".addPicture").attr("src",msg[0]);
                    
                    if($("#" + idd ).parents("dl").hasClass("nodataPics")){
                        var liL = $('.picText3 .picShow li').length;
                        $(".picText3 .picShow").append("<li style=background-image:url("+msg[0]+") no-repeat class='picText3"+liL+"'><i></i></li>")
                        $("#" + idd ).parents("dl").addClass("hasPics").removeClass("nodataPics");
                    }else{
                        $("."+id).css('backgroundImage','url('+msg[0]+')');
                    }
                    //热门产品分类
                     $(".picText3Set dt ul li").delegate("input","keyup",function(){ //标题内容监控
                          var me=$(this);
                          var ind = me.parents("dl").index();
                          $(".picText3 .picShow li").eq(ind-1).find("i").html(me.val());
                     });
                }); 
            });

            $(".addBanBtn").click(function(){ //再添加一个
                var self = $(this);
                var dlL = self.siblings(".addDl").find("dl").length;

                box.render(self.siblings(".picText3Set .addDl"), "", addOne, "0");
                self.siblings(".addDl").find("dl:last-child").find("input[name=myfiles]").attr("id","picText3"+dlL);
            });

            $(".rightDiv").delegate(".delectCha","click",function(){  //删除图片
                var self = $(this);
                var thisModel = self.parents(".addDl").find("dl");
                var _index = self.parents("dl").index();
                if(thisModel.length>1){
                    self.parents("dl").remove();
                    $(".picText3").find(".picShow").find("li").eq(_index-1).remove();
                }

                var liL = $(".picShow li").length;
                $.each($(".picShow li"), function(i){ //删除图片后更新id和class
                    $(".picShow li").eq(i).attr("class","picText3"+i);
                    $(".addDl dl.hasPics").eq(i).find("input[name=myfiles]").attr("id","picText3"+i);
                    $(".addDl dl.nodataPics input[name=myfiles]").attr("id","picText3"+liL);
                });
            });
        },

    }
    return app;
});