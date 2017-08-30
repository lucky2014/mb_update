define(function(require,exports,module){
    var $ = require("jquery");

    //var data = require("app_index/data");
    var Engine = require("engine");
    var box = Engine.init();
    var colorpicker = require("common.colorpicker/index");
    require("componentsSpecial/cuttingLine/cuttingLineSet/index.css");

    var data = require("componentsSpecial/cuttingLine/data");
    var save = require("componentsSpecial/cuttingLine/save");
    var cuttingLineShow = require("componentsSpecial/cuttingLine/cuttingLineShow/index");
    var transPro = require("componentsSpecial/cuttingLine/transparency");

    var color16Torgb = require("componentsSpecial/cuttingLine/color16Torgb");
    //页面逻辑
    var app = {

        tpl: function(){
            return require("componentsSpecial/cuttingLine/cuttingLineSet/index.tpl");
        },
        init: function(){
            cuttingLineShow.img_show();
            
            var v = data.returnObject.components[0];
            var cuttingLineSet = require("componentsSpecial/cuttingLine/cuttingLineSet/content.tpl");
            box.render($(".cuttingLineSet"), v.attrList[0], cuttingLineSet);

            var value = v.attrList[0].value;

            $(function(){ //初始化
                var col = $(".line").attr("col");
                var par = $(".line").attr("par");
                $(".cuttingLineSet .borderColor p i,.progress_bar").css("background","rgb("+col+")");//初始化线条颜色和透明度
                $(".cuttingLineSet .borderStyle p i").css("border-bottom-color","rgb("+col+")");
                $(".cuttingLineSet .text").html(par*100+"%")
            })

            var leftPer = v.attrList[0].value.transparency;
            transPro.progress_bar(leftPer,function(left){
                var col = $(".line").attr("col");
                var par = (left/200).toFixed(2);
                $(".line").attr("par",par);
                $(".line").css("border-bottom-color","rgba("+col+","+par+")");//初始化线条颜色和透明度
            });//透明度进度条拖动

            colorpicker($(".borderColor p"),function(color){
                var par = $(".line").attr("par");
                var sRgbColor = color16Torgb.colorRgb(color);//转为RGB颜色值的方法 
                var col = sRgbColor.split("(")[1].split(")")[0];
                
                $(".line").attr("col",col);
                $(".borderColor p i,.progress_bar").css("background",color);
                $(".line,.borderStyle p i").css("border-bottom-color","rgba("+col+","+par+")");//初始化线条颜色和透明度
                $(".progress_btn").css("border-color","rgb("+col+")")
            });

            $(".borderWidth,.borderStyle").delegate("p","click",function(e){
                var self = $(this);
                self.siblings("ul").toggle();
                self.parents("li").siblings("li").find("ul").hide();

                $(document).click(function(){
                    $(".borderWidth ul, .borderStyle ul").hide();
                })
                e.stopPropagation();
            });
            $(".borderWidth").delegate("ul li","click",function(){
                var self = $(this);
                var _html = self.html();
                self.parent().siblings("p").find("i").html(_html);
                $(".line").attr("wwidth",_html).css("border-bottom-width",_html);
                self.parent().hide();
            })
            $(".borderStyle").delegate("ul li","click",function(){
                var self = $(this);
                var _name = self.attr("name");
                self.parent().siblings("p").find("i").css("border-bottom-style",_name);
                $(".line").attr("sstyle",_name).css("border-bottom-style",_name);
                self.parent().hide();
            })
        },

    }
    return app;
});