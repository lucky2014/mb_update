define(function(require,exports,module){
    var $ = require("jquery");
    var Swiper = require("swiper");
    require("common.swiper/swiper.min.css");

    //var data = require("app_index/data");
    var Engine = require("engine");
    var box = Engine.init();

    require("common.activexShow/banner/index.css");


    //页面逻辑
    var app = {

        //banner滚动
        img_show: function(v){
            var img_showTpl = require("common.activexShow/banner/index.tpl");
            box.render($("#banner"), v.attrList, img_showTpl);
            
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