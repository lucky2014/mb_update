define(function(require,exports,module){
    require("component/index/index.css");
    require("image.dialog/index/index");
    
    var $ = require("jquery");
    var app = require("common.editAll/editBased/running");
    app.running();
    
    //导航js
    var nav = require("component/index/nav");
    nav.nav_init();
    //右键功能
    require("common.contextmenu/index.js");

    //左边基础组件点击
    $("#VAct_navbar").delegate(".ext-items","click",function(e){
        app.rightEditComponentInit(e,this);
    });
    $(".mobile-container").css({"overflow":"hidden","overflow-y":"scroll","padding-top":"20px"});
    //中间编辑区域的高度
    var h = $(window).height()-70;
    var h3 = $(window).height()-130;
    if(h3>500){
        h3=500;
    }
    $(".mobile-container,.left").css({"height": h+"px"});
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

    //左边页面的高度
    var hlUl = $(window).height()-120;
    
    var len = $(".site-page-navi-list ul li").length;
    if(len>11){
        $(".navi-btn-dropdown ul").css({
        "height": hlUl+"px", 
        "overflow": hidden,
        "overflow-y":scroll
        });
    }else{
        $(".navi-btn-dropdown ul").css({height: hlUl+"px"});
    }
    
});