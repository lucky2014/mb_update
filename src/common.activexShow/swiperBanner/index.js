define(function(require,exports,module){
    var $ = require("jquery");
    var Swiper = require("swiper");
    require("common.swiper/swiper.min.css");
    require("common.activexShow/swiperBanner/index.css");

    //var data = require("app_index/data");
    var Engine = require("engine");
    var box = Engine.init();


    //页面逻辑
    var app = {

        //banner滚动
        img_show: function(v){
            //console.log(JSON.stringify(v,null,2));
            var img_showTpl = require("common.activexShow/swiperBanner/banner.tpl");
            box.render($(".left"), v.attrList, img_showTpl, "0");
            $(".banner").attr("symbol",v.symbol);
            
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
        },

    }
    return app;
});