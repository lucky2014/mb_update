define(function(require,exports,module){
    var $ = require("jquery");
    var setup = require("setup");
    var Engine = require("engine");
    var box = Engine.init();

    require("common.linkAdress/index.css");
    var errorTip = require("common.errorTip/index.js");
    var siteId = setup.getQueryString("siteId") || "";
    function IsURL (str_url) { 
        var strRegex = '^((https|http|ftp|rtsp|mms)?://)'
        + '?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?' //ftp的user@ 
        + '(([0-9]{1,3}.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184 
        + '|' // 允许IP和DOMAIN（域名） 
        + '([0-9a-z_!~*\'()-]+.)*' // 域名- www. 
        + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' // 二级域名 
        + '[a-z]{2,6})' // first level domain- .com or .museum 
        + '(:[0-9]{1,4})?' // 端口- :80 
        + '((/?)|' // a slash isn't required if there is no file name 
        + '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$'; 
        var re=new RegExp(strRegex,"ig"); 
        //re.test() 
        if (re.test(str_url)) { 
        return (true); 
        } else { 
        return (false); 
        } 
    }
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
                    $(app.dragTarget).removeAttr("pvUrl").removeAttr("pblUrl");
                    $(app.dragTarget).attr("linkName","");
                    $(".linkAddress .shclickLi").val("");
                }else if(sign == 2){
                    $(".linkAddress,.backAddress").hide();
                    $(".selectAddress").show();
                    $(app.dragTarget).removeAttr("pvUrl").removeAttr("pblUrl");
                    $(app.dragTarget).attr("linkName","");
                    $(".selectAddress .shclickLi").val("");
                }else if(sign == 3){
                    $(".linkAddress,.selectAddress").hide();
                    $(".backAddress").show();
                    $(app.dragTarget).attr("pvUrl",'history.back()').attr("pblUrl",'history.back()');
                }
                self.parents(".linkStyle").attr("sign",sign);

            })
            var removeTimer = null;
            $("body").delegate(".right .linkAddress .shclickLi","blur",function(){
                if(!IsURL($(this).val())){
                    errorTip.init(this,"仅支持http,https,ftp格式的链接,并确保填写的外部的链接可以在浏览器中打开。");
                    var self = this;
                    $(this).css("border-color","#f00");
                    clearTimeout(removeTimer);
                    removeTimer = setTimeout(function(){
                        $(self).css("border-color","#c4c4c4");
                        errorTip.removeFn(self);
                    },2000)
                }
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
                    if(thVal=="" || thVal=="无"){
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