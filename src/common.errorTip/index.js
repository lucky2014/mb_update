define(function(require,exports,module){
    var $ = require("jquery");
    var setup = require("setup");
    var Engine = require("engine");
    var box = Engine.init();

    require("common.errorTip/index.css");
    var errorTip = require("common.errorTip/errorTip.tpl");
    var errorApp = {
        init:function(currEle,tip){
            var lf = $(currEle).offset().left;
            $("#errorTip").remove();
            $("body").append(errorTip);
            console.log(tip)
            $("#errorTip p").html(tip)
            var tp = $(currEle).offset().top+$(currEle)[0].offsetHeight+8;
            $("#errorTip").css({"left":lf+"px","top":tp+"px"});
            $(currEle).parents("li").css("height",128+"px");
        },
        removeFn:function(currEle){
            $("#errorTip").remove();
            $(currEle).parents("li").css("height","auto");
        }
    }
    return errorApp;
})