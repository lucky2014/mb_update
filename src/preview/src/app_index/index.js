define(function(require,exports,module){
    var $ = require("jquery");
    var setup = require("setup");

    //var data = require("app_index/data");
    var Engine = require("engine");
    var box = Engine.init();
    var run = require("common.editAll/editBased/running");

    //页面逻辑
    var app = {
        Wwidth: $(window).width(),
        userId: setup.getQueryString("userId") || 49,
        pageId: setup.getQueryString("pageId") || 121,
        siteId: setup.getQueryString("siteId"),
        type: setup.getQueryString("type"),
        init: function(){ 
            var me = this;
            var params = {};
            //判断是单页预览还是整站预览
            if(me.type == "site"){
                params = {
                    id: me.siteId, 
                    type: "site"
                }
            }else{
                params = {
                    id: me.pageId, 
                    type: "page"
                }
            }
            
            setup.commonAjax("showPage.do", params, function(msg){  
                console.log(JSON.stringify(msg,null,2)); 
                $("body").attr("style","background-color: "+msg.components[0].backgroundColor);
                $("title").html(msg.components[0].templateName);

                run.loadFn(msg,"",1); //有第二个参数是预览效果，
            });
        },
    }
    //执行页面逻辑
    app.init();
});