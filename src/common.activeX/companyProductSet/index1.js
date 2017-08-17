define(function(require,exports,module){
    var $ = require("jquery");
    var Swiper = require("swiper");

    //var data = require("app_index/data");
    var Engine = require("engine");
    var box = Engine.init();
    require("common.activeX/companyProductSet/index1.css");

    var ajaxFileUpload = require("common.ajaxfileupload/index");
    var addOne = require("common.activeX/companyProductSet/addOne.tpl");

    //页面逻辑
    var app = {

        //banner滚动
        img_edit: function(v){
            var imgArr = [];

            var img_showTpl = require("common.activeX/companyProductSet/index1.tpl");
            box.render($(".right"), v, img_showTpl);

            $.each(v.attrList, function(i,j){
                if(j.tagName == "input"){
                    $(".hotRecommendSet .modelInput").val(j.attrTitle)
                    j.text = 1; //用以区分
                }else if(j.tagName == "img"){
                    var picsTpl = require("common.activeX/companyProductSet/pics.tpl");
                     box.render($(".hotRecommendSet .productsPics ul"), v.attrList, picsTpl);
                }
            });
            
            var hasPic = $(".hasPics").length+1;
            $(".nodataPics input[name=myfiles]").attr("id","hotRecommend"+hasPic);
        
            for(var i=0;i<$(".hotRecommendSet .piculCommon .hasPics").length;i++){ //获取轮播图片
                imgArr.push($(".hotRecommendSet .piculCommon .hasPics").eq(i).find(".addPicture").attr("src"))
            }

             //模块名称
            $(".modelName").delegate(".modelInput","keyup",function(){
                 var me=$(this);
                 $(".hotRecommend").find(".titleEchelon").html(me.val());
                 pubsub.publish('dataChange',"product_show");
            })
             //上传图片
             $(".rightDiv").delegate("input[name=myfiles]", "change", function() {
                 var meInput = $(this);
                 var id = meInput.attr("id");

                 ajaxFileUpload(id, "uploadImg.do", function(msg){
                     var idd = meInput.attr("fileElementId"); 
                     $("#" + idd ).siblings(".addPicture").attr("src",msg[0]);

                     var _index = $("#" + idd ).parents("li").index();
                     if($("#" + idd ).parents("li").hasClass("nodataPics")){
                            $("#" + idd ).siblings("span,.delectCha").removeClass("dn");
                            $("#" + idd ).parents("li").addClass("hasPics").removeClass("nodataPics");
                            box.render($(".piculCommon"),"", addOne, "0");
                               var hasPic = $(".hasPics").length+1;
                               $(".nodataPics input[name=myfiles]").attr("id","hotRecommend"+hasPic);
                               imgArr.push(msg[0]);
                               lunbo();
                     }else{
                            var len = $(".hotRecommend .swiper-wrapper").find(".swiper-slide").length/3;
                            $(".hotRecommend .swiper-wrapper").find(".swiper-slide").eq(_index+len).css('backgroundImage','url('+msg[0]+')');
                            imgArr.splice(_index,1,msg[0]);
                            lunbo();
                     }
                     pubsub.publish('dataChange',"product_show");
                 }); 
             });

            $(".rightDiv").delegate(".delectCha","click",function(){ //删除
                var me = $(this);
                var thisModel = me.parents(".piculCommon").find("li.hasPics");
                var _index = me.parents("li").index();
                if(thisModel.length>1){
                    me.parents("li").remove();
                    imgArr.splice(_index, 1);

                    lunbo();
                }
                $.each($(".piculCommon li"), function(i){ //删除图片后更新id和class
                    $(this).find("input[name=myfiles]").attr("id","hotRecommend"+i);
                });
                 $(".hotRecommend").find(".selectB").css("height",$(".hotRecommend").height()-4);
                 pubsub.publish('dataChange',"product_show");
            });

            function lunbo(){
                var _html='<div class="swiper-wrapper">';
                for(var i=0;i<imgArr.length;i++){
                    _html+='<div class="swiper-slide" index="1" style="background-image:url('+imgArr[i]+')"></div>'
                }
                   _html+='</div>';
                $("#swiper3").html(_html);

                var swiper3 = new Swiper('#swiper3', {
                    pagination: '',
                    effect: 'coverflow',
                    grabCursor: true,
                    centeredSlides: true,
                    slidesPerView: 'auto',
                    coverflow: {
                        rotate: 30,
                        stretch: 0,
                        depth: 120,
                        modifier: 2,
                        slideShadows : true
                    },
                    loop: 1,
                    nextButton: '.swiper-button-next',
                    prevButton: '.swiper-button-prev',
                }); 
            }    
           /* $(".hotRecommendSet .modelInput").focus(function(){ //输入框聚焦样式
                $(".hotRecommendSet .modelName").css("border","1px solid #1d8ce0");
            });*/
        },

    }
    return app;
});