define(function(require,exports,module){
    var $ = require("jquery");
    var setup = require("setup");

    //var data = require("app_index/data");
    var Engine = require("engine");
    var box = Engine.init();
    var indexTpl = require("common.contact/index.tpl");

    var formatImg = require("common.formatImg/index");
    var footer = require("common.footernav/index");

    //页面逻辑
    var app = {
        Wwidth: $(window).width(),
        userId: setup.getQueryString("userId") || 49,
        pageId: setup.getQueryString("pageId") || 144,
        init: function(){ 
            var me = this;
            setup.commonAjax("official/showPage.do", {userId: me.userId, pageId:me.pageId}, function(msg){      
                //console.log(JSON.stringify(msg,null,2));  
                //$("body").css("background", msg.backgroundColor);        
                var componentsRet = msg.components[0].attrList;
                $.each(componentsRet, function(i,v){
                    if(v.tagName == "logo_img"){
                        v.value.value = formatImg.init(v.value.value, v.width, v.height);
                        $("#logo").attr("src", v.value.value);
                    }else if(v.tagName == "erweima_img"){
                        v.value.value = formatImg.init(v.value.value, v.width, v.height);
                        $("#erweima_img").attr("src", v.value.value);
                    }else if(v.tagName == "text_input"){
                        box.render($(".contactWay"), v.value, indexTpl);
                    }
                });

                //底部导航
                footer.img_show(msg.components[1], me.Wwidth); //底部导航
                
            });
        },
    }

    //执行页面逻辑
    app.init();
});