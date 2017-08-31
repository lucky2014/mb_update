define(function(require,exports,module){
    var $ = require("jquery");

    //var data = require("app_index/data");
    var Engine = require("engine");
    var box = Engine.init();

    require("componentsSpecial/skySet/index.css");
    require("componentsSpecial/skySet/skyShow.css");
    require("common.colorpicker/jquery.colorpicker");

    $("body").click(function(){
        if(isShow==1){
            $(".sp-active").click();
            $(".sp-container").addClass("sp-hidden");
            isShow=0;
        }
    });
    //页面逻辑
    var isShow = 0;
    var app = {
        //sky
        img_edit: function(v){
            var me = this;
            var backcolorSet = "#f0f0fa"; //初始化背景颜色
            var img_showTpl = require("componentsSpecial/skySet/index.tpl");
            if(v){
               box.render($(".right"), v, img_showTpl);
               $(".sky h1").html(v.pageName);
               var lenInitial = $("#storeName").val().length;
               $(".skySet .mustInput .inNumber b").html(lenInitial);

               var cp = JSON.parse(v.data).components[0];

               var backgroundColor = cp && cp.backgroundColor;
               $("#sky,#cp3").attr("color",backgroundColor);
               $("#cp3").css("background",backgroundColor);
               //页面名称change监控
               $(".skySet").delegate(".navInput","keyup",function(){
                   var self = $(this);
                   var len = self.val().length;
                   if(len<=16){
                      $(".skySet .mustInput .inNumber b").html(len);
                   }else{
                      $(".skySet .mustInput .inNumber b").html("16");
                   }
                   
                   $(".sky h1").html($("#storeName").val());

                   if( $(".itemsDraw li.activePage").attr("ishomepage") == 1){
                      $(".itemsDraw li.activePage a").html('<i class="homeIcon"></i>'+$("#storeName").val())
                   }else{
                      $(".itemsDraw li.activePage a").html($("#storeName").val())
                   }
               }) 
           }else{
                box.render($(".right"), "", img_showTpl);
           }
           

            //sky背景颜色选择
            $("#cp3").spectrum({
                color:backcolorSet,
                showInput: true,
                showPalette: true,
                showSelectionPalette: true,
                preferredFormat: "hex",
                localStorageKey: "spectrum.demo",
                move: function (color) {
                    hex = color.toHex();
                    $("#cp3").css("background",color);
                    $("#sky,#cp3").attr("color",color);
                    pubsub.publish('dataChange',"sky");
                },
                show:function(){
                  isShow=1;
                },
                hide: function (colpkr) {
                    isShow=0;
                    hex = colpkr.toHex();
                    $("#cp3").css("background",colpkr);
                    $("#sky,#cp3").attr("color",colpkr);
                    pubsub.publish('dataChange',"sky");
                },
                palette: [
                    ["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)", 
                    "rgb(204, 204, 204)", "rgb(217, 217, 217)",  "rgb(255, 255, 255)"],
                    ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)",
                    "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"],
                    ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)",
                    "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)",
                    "rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)",
                    "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)",
                    "rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)",
                    "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)",
                    "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)",
                    "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)",
                    "rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)",
                    "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]
                ]
            });
            /*$("#cp3").colorpicker({
                fillcolor:true,
                success:function(o,color){
                    $("#cp3").css("background",color);
                    $("#sky,#cp3").attr("color",color);
                    pubsub.publish('dataChange',"sky");
                }
            });*/
            //重置背景颜色
            $(".backColor button").click(function(){
                $("#cp3").spectrum("set", backcolorSet);
                $(this).siblings("i").css("background",backcolorSet);
                $("#sky,#cp3").attr("color",backcolorSet);
                pubsub.publish('dataChange',"sky");
            });
            
        },

    }
    return app;
});