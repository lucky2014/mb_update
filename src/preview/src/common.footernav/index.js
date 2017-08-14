define(function(require,exports,module){
    var $ = require("jquery");
    var Swiper = require("swiper");
    require("preview/src/common.footernav/index.css");

    //var data = require("app_index/data");
    var Engine = require("engine");
    var box = Engine.init();

    //页面逻辑
    var app = {

        //banner滚动
        img_show: function(v){
            //console.log(JSON.stringify(v.attrList,null,2));
             $.each(v.attrList, function(i,j){
                if(j.tagId == "img_img"){
                    var img_showTpl = require("preview/src/common.footernav/index.tpl");
                    box.render($(".left"), j.value, img_showTpl,"0");
                }
            }); 
            
            var len = v.attrList[0].value.length;
            $(".footernav ul li").css("width", 100/len+"%");
        },

    }
    return app;
});