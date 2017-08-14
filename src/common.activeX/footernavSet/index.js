define(function(require,exports,module){
    var $ = require("jquery");
    var Swiper = require("swiper");

    //var data = require("app_index/data");
    var Engine = require("engine");
    var box = Engine.init();

    require("common.activeX/footernavSet/index.css");
    var ajaxFileUpload = require("common.ajaxfileupload/index");
    var addOne = require("common.activeX/footernavSet/addOne.tpl");
    //页面逻辑
    var app = {

        //banner滚动
        img_edit: function(v){
            
            var attrList = v.attrList;
            var img_showTpl = require("common.activeX/footernavSet/index.tpl");
            box.render($(".right"), v, img_showTpl);

            $.each(v.attrList, function(i,j){
                if(j.attrSort == 2){
                    
                }else if(j.attrSort == 1){
                    var picsTpl = require("common.activeX/footernavSet/pics.tpl");
                    box.render($(".footernavSet .addDl"), j.value, picsTpl, "0");
                }
            });
            var len = v.attrList[0].value.length;
            $(".footernav ul li").css("width", 100/len+"%");

            //导航内容监控
            $(".footernavSet").delegate(".bannerName","keyup",function(){
                var self=$(this);
                var thisind = self.parents("dl").index();
                $(".footernav ul li").eq(thisind).find("span").html(self.val());
                pubsub.publish('dataChange',"footerNav");
            })

            $(".addBanBtn").click(function(){ //再添加一个
                 var self = $(this);
                 var parId = self.parents(".rightDiv").attr("id");
                 var dlL = self.siblings(".addDl").find("dl").length;
                 box.render($(".footernavSet .addDl"), "", addOne, "0");
                 
                 $(".footernavSet .addDl").find("dl:last-child").find("input[name=myfiles]").attr("id","footernav"+dlL);
                 $(".footernav ul").append('<li class="selectedHtml"><i><img src="../src/1/images/addPicture2.png"></i><span>标题</span></li>')
                 var lilen = $(".footernav ul li").length;
                 $(".footernav ul li").css("width",100/lilen+"%");
                 if(lilen > 4){
                     $(".footernavSet .addBanBtn").hide();
                 }
                 pubsub.publish('dataChange',"footerNav");
            });

            $(".rightDiv").delegate(".delectCha","click",function(){ //删除
                var me = $(this);
                var thisModel = me.parents(".addDl").find("dl");
                var _index = me.parents("dl").index();
                if(thisModel.length>1){
                    me.parents("dl").remove();
                    $(".footernav ul li").eq(_index).remove();
                    $(".footernavSet .addBanBtn").show();

                    $.each($(".footernavSet .addDl dl"), function(i){ //删除图片后更新id和class
                        $(this).find("input[name=myfiles]").attr("id","footernav"+i);
                    });

                    var lilen = $(".footernav ul li").length;
                    $(".footernav ul li").css("width",100/lilen+"%");
                    pubsub.publish('dataChange',"footerNav");
                }
            });
            
            $(".rightDiv").delegate("input[name=myfiles]", "change", function() {
                var meInput = $(this);
                var id = meInput.attr("id");
                ajaxFileUpload(id, "uploadImg.do", function(msg){
                    var idd = meInput.attr("fileElementId"); 
                    $("#" + idd ).siblings(".addPicture").attr("src",msg[0]);

                    var thisind = $("#" + idd ).parents("dl").index();
                    $(".footernav ul li").eq(thisind).find("img").attr("src",msg[0]);
                    pubsub.publish('dataChange',"footerNav");
                }); 
            });
            
        },

    }
    return app;
});