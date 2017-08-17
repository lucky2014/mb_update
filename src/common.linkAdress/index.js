define(function(require,exports,module){
    var $ = require("jquery");
    var setup = require("setup");
    var Engine = require("engine");
    var box = Engine.init();

    require("common.linkAdress/index.css");
    var selectAdress = {
        init : function(){ 
            selectAdress.clickSel(".linkStyle");
            selectAdress.clickStyleLi();
        },
        clickSel : function(className){ //下拉框显示or隐藏
            $(className).delegate(".shclickLi","click",function(){
                var self = $(this);
                self.siblings(".linkChoose").toggle();
                self.parent("li").siblings("li").find(".linkChoose").hide();

            })
            $(document).on('mousedown',function(e){
               if(!$(e.target).is($('.shclickLi')) && !$(e.target).is($('.linkChoose')) && $(e.target).parent('.linkChoose').length === 0){
               $('.linkChoose').css('display','none');
               }
           });
        },
        clickStyleLi : function(){ //链接类型选择
            $(".linkStyle .linkChoose").delegate("li","click",function(){
                var self = $(this);
                var sign = self.attr("sign");
                var meInput = self.parents(".linkChoose").siblings(".shclickLi");
                
                /*meInput.attr("selUrl",self.attr("urlname"));*/
                meInput.attr("value",self.html())
                self.parents(".linkChoose").hide();
                self.addClass("selectedLi").siblings("li").removeClass("selectedLi");

                if(sign == 1){
                    $(".linkAddress,.selectAddress").hide();
                }else if(sign == 2){
                    $(".linkAddress").show();
                    $(".selectAddress").hide();
                    $(".selectAddress .linkChoose").html("");
                }else if(sign == 3){
                    $(".linkAddress").hide();
                    $(".selectAddress").show();
                    selectAdress.clickSel(".selectAddress");
                    setup.commonAjax("getCreatedUrlList.do", {userId:112}, function(msg){
                        var linkTpl = require("common.linkAdress/linkSelect.tpl");
                        box.render($(".selectAddress .linkChoose"), msg, linkTpl);
                        $(".selectAddress .linkChoose").prepend('<li class="selectedLi" urlname="">请选择</li>');
                        //console.log(JSON.stringify(msg,null,2))
                        
                        selectAdress.clickSelLi();

                    })
                }else if(sign == 4){
                    $(".linkAddress,.selectAddress").hide();
                }
            })
        },
        clickSelLi : function(){
            $(".selectAddress .linkChoose").delegate("li","click",function(){
                var self = $(this);
                var meInput = self.parents(".linkChoose").siblings(".shclickLi");

                meInput.attr("value",self.html())
                self.parents(".linkChoose").hide();
                self.addClass("selectedLi").siblings("li").removeClass("selectedLi");
            })
        },
    }
    return selectAdress;
})