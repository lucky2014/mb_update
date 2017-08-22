define(function(require,exports,module){
    var $ = require("jquery");
    var setup = require("setup");
    var Engine = require("engine");
    var box = Engine.init();

    require("common.linkAdress/index.css");
    var selectAdress = {
        init : function(){ 
            var isGetLink = 0;//判断是否调过内部链接接口
            //链接类型下拉框
            $(".linkStyle").delegate(".shclickLi,.shclickI","click",function(){ 
                var self = $(this);
                self.siblings(".linkChoose").toggle();
                self.parent("li").siblings("li").find(".linkChoose").hide();
            })
             //链接类型选择
            $(".linkStyle .linkChoose").delegate("li","click",function(){
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
                }
            })
            //内部链接下拉框
            $(".selectAddress").delegate(".shclickLi,.shclickI","click",function(){
                var self = $(this);
                self.siblings(".linkChoose").toggle();
                self.parent("li").siblings("li").find(".linkChoose").hide();
                if(isGetLink == 0){
                     setup.commonAjax("getCreatedUrlList.do", "", function(msg){
                        var linkTpl = require("common.linkAdress/linkSelect.tpl");
                        box.render($(".selectAddress .linkChoose"), msg, linkTpl);
                        $(".selectAddress .linkChoose").prepend('<li class="selectedLi" urlname="">无</li>');
                        //console.log(JSON.stringify(msg,null,2))
                        isGetLink = 1;
                        $(".selectAddress .linkChoose").delegate("li","click",function(){
                            var self = $(this);
                            var meInput = self.parents(".linkChoose").siblings(".shclickLi");
                            var urlname = self.attr("urlname");

                            meInput.attr("value",self.html())
                            meInput.attr("urlname",urlname)
                            self.parents(".linkChoose").hide();
                            self.addClass("selectedLi").siblings("li").removeClass("selectedLi");
                        })

                    })
                }
                
            });

            $(".linkAddress ").delegate(".shclickLi","keyup",function(){
                var self = $(this);
                self.attr("urlname",self.val());
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