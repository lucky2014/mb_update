define(function(require,exports,module){
    var $ = require("jquery");
    var Swiper = require("swiper");

    //var data = require("app_index/data");
    var Engine = require("engine");
    var box = Engine.init();

    require("componentsSpecial/cuttingLine/cuttingLineShow/index.css");
    var data = require("componentsSpecial/cuttingLine/data");

    var color16Torgb = require("componentsSpecial/cuttingLine/color16Torgb");
    //页面逻辑
    var app = {

        //分割线
        img_show: function(){
            var v = data.returnObject.components[0];
            var mienTpl = require("componentsSpecial/cuttingLine/cuttingLineShow/content.tpl");
                box.render($(".cuttingLine.leftDiv"), v.attrList[0], mienTpl, "0");
                $(".cuttingLine").attr("symbol",v.symbol);   

                var vvalue = v.attrList[0].value;
                var col = vvalue.color;   
                /*var sRgbColor = color16Torgb.colorRgb(sHex);//转为RGB颜色值的方法 
                var col = sRgbColor.split("(")[1].split(")")[0];*/
                var par = vvalue.transparency;

                $(".line").attr({
                    "col":col,
                    "par":par,
                    "wwith":vvalue.borderWidth,
                    "sstyle":vvalue.borderStyle,
                });
                $(".line").css("border-bottom-color","rgba("+col+","+par+")");//初始化线条颜色和透明度
        }


    }
    return app;
});