define(function(require,exports,module){
    var $ = require("jquery");
    var Swiper = require("swiper");
    require("common.swiper/swiper.min.css");

    var Engine = require("engine");
    var box = Engine.init();

    require("common.activexShow/advertise/index.css");


    //页面逻辑
    var app = {
        img_show: function(v){
            var img_showTpl = require("common.activexShow/advertise/index.tpl");
            box.render($(".left"),v.attrList[0].value, img_showTpl,1);
            $("#img_comp").attr("symbol",v.symbol);
        },
    }
    return app;
});