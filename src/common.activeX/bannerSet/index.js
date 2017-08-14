define(function(require,exports,module){
    var $ = require("jquery");
    var Swiper = require("swiper");

    //var data = require("app_index/data");
    var Engine = require("engine");
    var box = Engine.init();
    var ajaxFileUpload = require("common.ajaxfileupload/index");
    var addOne = require("common.activeX/bannerSet/addOne.tpl");

    require("common.activeX/bannerSet/index.css");
    
    //页面逻辑
    var app = {

        //banner滚动
        img_edit: function(v,components){
            var imgArr =[];
            var attrList = v.attrList;

            var img_showTpl = require("common.activeX/bannerSet/index.tpl");
            box.render($(".right"), attrList, img_showTpl);
            
            for(var i=0;i<$(".bannerSet .addDl dl").length;i++){ //获取轮播图片
                imgArr.push($(".bannerSet .addDl dl").eq(i).find(".addPicture").attr("src"))
            }

            $(".addBanBtn").click(function(){ //再添加一个
                var self = $(this);
                var dlL = $(".bannerSet .addDl dl").length;
                box.render($(".bannerSet .addDl"), "", addOne, "0");
                $(".bannerSet .addDl").find("dl:last-child").find("input[name=myfiles]").attr("id","banner"+dlL);
                
                imgArr.push("../src/1/images/addPicture.png");
                lunbo();
                pubsub.publish('dataChange',"img_show");
            });

            $(".rightDiv").delegate(".delectCha","click",function(){ //删除
                var me = $(this);
                var thisModel = me.parents(".addDl").find("dl");
                var _index = me.parents("dl").index();
                if(thisModel.length>1){
                    me.parents("dl").remove();
                    imgArr.splice(_index, 1);

                    lunbo();
                }
                $.each($(".bannerSet .addDl dl"), function(i){ //删除图片后更新id和class
                    $(this).find("input[name=myfiles]").attr("id","banner"+i);
                });
                 $(".banner").find(".selectB").css("height",$(".banner").height()-4);
                 pubsub.publish('dataChange',"img_show");
            });
            //console.log(JSON.stringify(v,null,2));
            $(".rightDiv").delegate("input[name=myfiles]", "change", function() { //上传图片
                var meInput = $(this);
                var id = meInput.attr("id");
                var _index = meInput.parents("dl").index();
                var ind = $(".leftDiv[id = banner]").attr("ind");

                ajaxFileUpload(id, "uploadImg.do", function(msg){
                    var idd = meInput.attr("fileElementId"); 
                    $("#" + idd ).siblings(".addPicture").attr("src",msg[0]);
                    imgArr.splice(_index,1,msg[0]);
                    lunbo();
                    pubsub.publish('dataChange',"img_show");
                }); 
            });
            
            function lunbo(){ //轮播
                var _html='<ul class="bannerList swiper-wrapper" style="width:'+imgArr.length*100+'%">'
                for(var i=0;i<imgArr.length;i++){
                    _html+='<li class="swiper-slide" style="width:'+100/imgArr.length+'%"><img src="'+imgArr[i]+'"></li>'
                }
                _html+='</ul><div class="swiper-pagination"></div>'
                
                $(".bannerListBox").html(_html);

                var mySwiper1 = new Swiper ('#swiper1', {
                    direction: 'horizontal',
                    loop: true,
                    // 如果需要分页器
                    pagination: '.swiper-pagination',
                    
                    // 如果需要前进后退按钮
                    nextButton: '',
                    prevButton: '',
                    autoplay: 2000
                });
            }
        },

    }
    return app;
});