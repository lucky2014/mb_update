define(function(require,exports,module){
    var $ = require("jquery");
    var Swiper = require("swiper");

    //var data = require("app_index/data");
    var Engine = require("engine");
    var box = Engine.init();

    require("common.activeX/skySet/index.css");
    require("common.colorpicker/jquery.colorpicker");


    //页面逻辑
    var app = {

        //sky
        img_edit: function(v){
            var me = this;
            var backcolorSet = "#f0f0fa"; //初始化背景颜色
            var img_showTpl = require("common.activeX/skySet/index.tpl");
            box.render($(".right"), v, img_showTpl);

            $(".sky h1").html(v.templateName);
            //页面名称change监控
            $(".skySet").delegate(".navInput","keyup",function(){
                $(".sky h1").html($("#storeName").val());
            })

            //sky背景颜色选择
            $("#cp3").colorpicker({
                fillcolor:true,
                success:function(o,color){
                    $("#cp3").css("background",color);
                    $("#cp3").attr("color",color);
                    pubsub.publish('dataChange',"sky");
                }
            });
            //重置背景颜色
            $(".backColor button").click(function(){
                $(this).siblings("i").css("background",backcolorSet);
                pubsub.publish('dataChange',"sky");
            });
            
        },

    }
    return app;
});