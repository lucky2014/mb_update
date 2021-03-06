define(function(require,exports,module){
    require("component/index/index.css");
    require("image.dialog/index/index");
    
    var $ = require("jquery");

    //导航js
    var nav = require("component/index/nav");
    nav.nav_init();

    //左边基础组件点击
    $("#VAct_navbar").delegate(".ext-items","click",function(e){
        var normal = require("common.editAll/editBased/normal");
        var type = $(this).attr("data-status");
        var tplObj = normal["base"][type+"Tpl"];
        var settingJs = tplObj.setting();
        app.rightEditComponent(e,type,tplObj.componentTpl(),settingJs.tpl(),function(e,self,componentClass,componentTpl,editTpl){
            tplObj.callback(app,e,componentClass,componentTpl,editTpl)
            var w = $(app.dragTarget).children().width();
            pubsub.publish('dataChange');
        },function(e,self){
            tplObj.callback2(app,e,self)
        },function(e,self){
            if(tplObj.callback3){
                tplObj.callback3(app,e,self)
            }
        });
        if(!settingJs.isRender){
            settingJs.init(app);
            settingJs.isRender = true;
        }
    }); 


    $(".mobile-container").css({"overflow":"hidden","overflow-y":"scroll","padding-top":"20px"});
                
    //中间编辑区域的高度
    var h = $(window).height()-70;
    var h3 = $(window).height()-130;
    $(".mobile-container").css({"height": h+"px"});
    $(".left").css({"min-height": h3+"px"});
    //右边区域的高度
    var h2 = $(window).height()-54;
    $(".right").css({"height": h2+"px"});

    //中间编辑区域的宽度
    var w = $(window).width();
    var w1 = w-782;
    var w2 = (w1-310)/2+310;
    $(".mobile-container").css({width: w1+"px"});
    $(".dragLine").css({left: w2+"px"});
    $("#showHeight").css({left: (w2-30)+"px"}).html(h3+50);

});