define(function(require,exports,module){
    var $ = require("jquery");
    var Swiper = require("swiper");

    //var data = require("app_index/data");
    var Engine = require("engine");
    var box = Engine.init();

    require("common.activexShow/sky/index.css");


    //页面逻辑
    var app = {

        //sky
        img_show: function(v){
            
            //console.log(JSON.stringify(v,null,2));
            var img_showTpl = require("common.activexShow/sky/index.tpl");
            box.render($(".sky"), v, img_showTpl);
            
            
        },

    }
    return app;
});