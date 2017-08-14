define(function(require,exports,module){
    var $ = require("jquery");
    var Swiper = require("swiper");

    //var data = require("app_index/data");
    var Engine = require("engine");
    var box = Engine.init();

    var formatImg = require("preview/src/common.formatImg/index");

    //页面逻辑
    var app = {

        //产品展示
        img_show: function(v,w){
            var productTpl = require("preview/src/common.productSwiper/product.tpl");
            var attrList = v.attrList;
            box.render($(".left"), "", productTpl,"0");


            $.each(v.attrList, function(i,vv){
                if(vv.tagName == "a" || vv.tagName == "input"){
                    vv.text = 1; //用以区分
                    if(vv.tagId == "model_name_prduct"){
                        $("#product .comContent").html(vv.attrTitle);//产品展示文字
                        // $("#product .arrowR").attr("href",vv.value.linkUrl);
                    }
                }else{
                    //console.log(JSON.stringify(vv.value,null,2))
                    vv.value.value = formatImg.init(vv.value.value, vv.width, vv.height);
                }
            });

            //console.log(JSON.stringify(v.attrList,null,2));
            //var h = attrList[1].height/attrList[1].width*w*0.92*0.58;
            var picsTpl = require("preview/src/common.productSwiper/pics.tpl");
            box.render($("#swiper3 .swiper-wrapper"), v.attrList, picsTpl);
            
            //$("#swiper3 .swiper-wrapper, #swiper3 .swiper-slide").css({"height":h});
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
        },

    }
    return app;
});