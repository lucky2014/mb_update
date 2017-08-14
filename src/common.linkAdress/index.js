define(function(require,exports,module){
    var $ = require("jquery");
    var setup = require("setup");
    var Engine = require("engine");
    var box = Engine.init();

    require("common.linkAdress/index.css");
    var selectAdress = {
        init : function(){
            var me = this;
            setup.commonAjax("getCreatedUrlList.do", {userId:112}, function(msg){
                var linkTpl = require("common.linkAdress/linkSelect.tpl");
                box.render($(".linkChoose"), msg, linkTpl, "0");
                //console.log(JSON.stringify(msg,null,2))
                me.clickSel();
                me.clickSelLi();

            })
            me.cssFn();
        },
        clickSel : function(){
            $(".rightDiv").delegate(".shclickLi,.shclickI","click",function(){
                var self = $(this);
                self.siblings(".linkChoose").toggle();
            })
        },
        clickSelLi : function(){
            $(".linkChoose").delegate("li","click",function(){
                var self = $(this);
                var meInput = self.parents(".linkChoose").siblings(".shclickLi");
                meInput.attr("selUrl",self.attr("urlname"));
                meInput.attr("value",self.html())
                $(".linkChoose").hide();
                self.addClass("selectedLi").siblings("li").removeClass("selectedLi");
                if(self.html() == "请选择"){
                    meInput.css("color","#99a9bf");
                }else{
                    meInput.css("color","#324057");
                }
            })
        },
        cssFn : function(){
            $(".shclickLi[value='请选择']").css("color","#99a9bf");
        }
    }
    return selectAdress;
})