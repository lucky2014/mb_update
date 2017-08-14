define(function(require,exports,module){
    var $ = require("jquery");
    var Swiper = require("swiper");

    //var data = require("app_index/data");
    var Engine = require("engine");
    var box = Engine.init();

    require("common.activexShow/hotRecommend/index.css");
    //页面逻辑
    var app = {
        productPics:null,
        //产品展示
        img_show: function(v){
            var me = this;
            var attrList = v.attrList;
            var productTpl = require("common.activexShow/hotRecommend/index.tpl");
            box.render($(".left"), v, productTpl, "0")
            $(".hotRecommend").attr("symbol",v.symbol);
            $.each(v.attrList, function(i,j){
                //console.log(j.tagName)
                if(j.tagName == "input"){
                    $(".hotRecommend .titleEchelon").html(j.attrTitle);//产品展示
                    $(".hotRecommend .recoTitle").css("background-image", "url("+j.value.value+")");
                    j.text = 1; //用以区分
                }else if(j.tagName == "img"){
                     me.productPics = require("common.activexShow/hotRecommend/pics.tpl");
                     box.render($("#swiper3 .swiper-wrapper"), v.attrList, me.productPics);
                }
            });

            
            if(me.productPics){
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
        },

    }
    return app;
});