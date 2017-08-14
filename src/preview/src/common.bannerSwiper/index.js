define(function(require,exports,module){
    var $ = require("jquery");
    var Swiper = require("swiper");

    //var data = require("app_index/data");
    var Engine = require("engine");
    var box = Engine.init();

    var formatImg = require("preview/src/common.formatImg/index");

    //页面逻辑
    var app = {

        //banner滚动
        img_show: function(v,w){
            
            var attrList = v.attrList;
            $.each(v.attrList, function(i,vv){
                vv.value.value = formatImg.init(vv.value.value, vv.width, vv.height);
            });
            //console.log(JSON.stringify(v,null,2));
            var img_showTpl = require("preview/src/common.bannerSwiper/banner.tpl");
            var h = attrList[0].height/attrList[0].width*w;
            
            box.render($(".left"), attrList, img_showTpl,"0");
            $("#swiper1 .swiper-wrapper,#swiper1 img, #swiper1").css({"height":h});
            
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