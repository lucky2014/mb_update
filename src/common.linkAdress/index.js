define(function(require,exports,module){
    var $ = require("jquery");
    var setup = require("setup");
    var Engine = require("engine");
    var box = Engine.init();

    require("common.linkAdress/index.css");
    var siteId = setup.getQueryString("siteId") || "";
    var selectAdress = {
        init : function(app){ 
            //链接类型下拉框
            $("body").delegate(".linkStyle .shclickLi,.linkStyle .shclickI","click",function(){ 
                var self = $(this);
                self.siblings(".linkChoose").toggle();
                self.parent("li").siblings("li").find(".linkChoose").hide();
            })
             //链接类型选择
            $("body").delegate(".linkStyle .linkChoose li","click",function(){
                var self = $(this);
                var sign = self.attr("sign");
                var meInput = self.parents(".linkChoose").siblings(".shclickLi");
                
                meInput.attr("value",self.html())
                self.parents(".linkChoose").hide();
                self.addClass("selectedLi").siblings("li").removeClass("selectedLi");

                if(sign == 1){
                    $(".linkAddress").show();
                    $(".selectAddress,.backAddress").hide();
                    /*$(".selectAddress .linkChoose").html("");*/
                }else if(sign == 2){
                    $(".linkAddress,.backAddress").hide();
                    $(".selectAddress").show();
                }else if(sign == 3){
                    $(".linkAddress,.selectAddress").hide();
                    $(".backAddress").show();
                     $(app.dragTarget).unbind();
                        $(app.dragTarget).bind("click",function(){
                            location.href = history.back();
                        })
                }
                self.parents(".linkStyle").attr("sign",sign);

            })
            //内部链接下拉框
            $("body").delegate(".selectAddress .shclickLi,.selectAddress .shclickI","click",function(){
                var self = $(this);
                self.siblings(".linkChoose").toggle();
                self.parent("li").siblings("li").find(".linkChoose").hide();
                 setup.commonAjax("getCreatedUrlList.do", {siteId:siteId}, function(msg){
                    var linkTpl = require("common.linkAdress/linkSelect.tpl");
                    box.render($(".selectAddress .linkChoose"), msg, linkTpl);
                    $(".selectAddress .linkChoose").prepend('<li class="selectedLi" urlname="">无</li>');
                    //console.log(JSON.stringify(msg,null,2))
                })
                
            });
            $("body").delegate(".selectAddress .linkChoose li","click",function(){
                var self = $(this);
                var meInput = self.parents(".linkChoose").siblings(".shclickLi");
                var urlname = self.attr("urlname");

                meInput.attr("value",self.html())
                meInput.attr("urlname",urlname)
                self.parents(".linkChoose").hide();
                self.addClass("selectedLi").siblings("li").removeClass("selectedLi");
                $(app.dragTarget).attr("data-click","location.href='"+urlname+"'");
            })
            $("body").delegate(".linkAddress .shclickLi","keyup",function(){
                var self = $(this);
                self.attr("urlname",self.val());
                var urlname = self.val();
                $(app.dragTarget).attr("data-click","location.href='"+urlname+"'");
            })
            //点击其它区域隐藏下拉框
             $(document).on('mousedown',function(e){
                if(!$(e.target).is($('.shclickLi,.shclickI')) && !$(e.target).is($('.linkChoose')) && $(e.target).parent('.linkChoose').length === 0){
                $('.linkChoose').css('display','none');
                }
            });
           
        },
    }
    return selectAdress;
})