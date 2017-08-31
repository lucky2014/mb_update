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
                meInput.val(self.html())
                self.parents(".linkChoose").hide();
                self.addClass("selectedLi").siblings("li").removeClass("selectedLi");

                $(app.dragTarget).attr("sign",sign);

                if(sign == 1){
                    $(".linkAddress").show();
                    $(".selectAddress,.backAddress").hide();
                }else if(sign == 2){
                    $(".linkAddress,.backAddress").hide();
                    $(".selectAddress").show();
                }else if(sign == 3){
                    $(".linkAddress,.selectAddress").hide();
                    $(".backAddress").show();
                    $(app.dragTarget).attr("pvUrl",'history.back()').attr("pblUrl",'history.back()');
                }
                self.parents(".linkStyle").attr("sign",sign);

            })
            //内部链接下拉框
            $("body").delegate(".selectAddress .shclickLi,.selectAddress .shclickI","click",function(){
                var self = $(this);
                var thVal= self.val();

                $(app.dragTarget).attr("sign","2");
                self.siblings(".linkChoose").toggle();
                self.parent("li").siblings("li").find(".linkChoose").hide();
                 setup.commonAjax("getCreatedUrlList.do", {siteId:siteId}, function(msg){
                    var linkTpl = require("common.linkAdress/linkSelect.tpl");
                    box.render($(".selectAddress .linkChoose"), msg, linkTpl);
                    $(".selectAddress .linkChoose").prepend('<li urlname="">无</li>');
                    //console.log(JSON.stringify(msg,null,2))
                    if(thVal==""){
                        $(".selectAddress .linkChoose li:first-child").addClass("selectedLi");
                    }else{
                        $(".selectAddress .linkChoose li[name="+thVal+"]").addClass("selectedLi");
                    }
                })
                
            });
            $("body").delegate(".selectAddress .linkChoose li","click",function(){
                var self = $(this);
                var meInput = self.parents(".linkChoose").siblings(".shclickLi");
                var urlname = self.attr("urlname");
                var url = self.attr("url");

                meInput.attr("value",self.html())
                meInput.val(self.html())
                meInput.attr("urlname",urlname)
                self.parents(".linkChoose").hide();
                self.addClass("selectedLi").siblings("li").removeClass("selectedLi");
                if(urlname == "" || urlname == "无"){
                    $(app.dragTarget).removeAttr("pvUrl").removeAttr("pblUrl");
                }else{
                    $(app.dragTarget).attr("pvUrl",'location.href="http://'+location.host+'/mb_update2/preview/index.html?pageId='+urlname+'"').attr("pblUrl",'location.href="'+url+'"');
                }
                
                $(app.dragTarget).attr("linkName",self.html());
            })
            $("body").delegate(".linkAddress .shclickLi","keyup",function(){
                var self = $(this);
                self.attr("urlname",self.val());
                var urlname = self.val();
            
                if(urlname == "" || urlname == "无"){
                    $(app.dragTarget).removeAttr("pvUrl").removeAttr("pblUrl");
                }else{
                    $(app.dragTarget).attr("pvUrl",'location.href="'+urlname+'"').attr("pblUrl",'location.href="'+urlname+'"');
                }
                $(app.dragTarget).attr("linkName",self.val());
            });
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