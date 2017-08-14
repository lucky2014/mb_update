define(function(require,exports,module){
    var $ = require("jquery");
    var Swiper = require("swiper");

    //var data = require("app_index/data");
    var Engine = require("engine");
    var box = Engine.init();

    require("componentsSpecial/baiduMap/baiduMapShow/index.css");
    //页面逻辑
    var app = {

        //banner滚动
        img_show: function(){
            var img_showTpl = require("componentsSpecial/baiduMap/baiduMapShow/index.tpl");
            box.render($(".left"), "", img_showTpl, "0");
            $(".baiduMap").attr("symbol","baiduMap");
        },

    }
    return app;
});