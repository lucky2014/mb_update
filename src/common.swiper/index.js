define(function(require,exports,module){
	var $ = require("jquery");
    require("common.swiper/swiper.css");
    require("common.swiper/swiper.min.js");
    var theSwiper;
    var swiperApp={
        swiperElement:function(element,obj){
            var swiper = new Swiper(element.find(".swiper-container"),{
                autoplay: 3000,//可选选项，自动滑动
                simulateTouch: false,//鼠标拖动无效
            });
            theSwiper=swiper;
        },
        stopSwiper:function(){
            theSwiper.stopAutoplay();
        }
    }
    return swiperApp;
});