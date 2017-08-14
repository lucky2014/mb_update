define(function(require,exports,module){
    var $ = require("jquery");
    var setup = require("setup");

    //var data = require("app_index/data");
    var Engine = require("engine");
    var box = Engine.init();

    var leftShow = {
        product_show : require("preview/src/common.productSwiper/index"), //产品
        img_show : require("preview/src/common.bannerSwiper/index"), //banner
        information : require("preview/src/common.news/index"), //资讯中心
        about : require("preview/src/common.about/index"), // 首页关于我们
        corp_img : require("preview/src/common.honor/index"), //产品页banner下面那张图片
        footerNav : require("preview/src/common.footernav/index"), //底部导航
        img_comp: require("preview/src/common.advertise/index"), //广告
        list_comp: require("preview/src/common.hotCategory/index"), //分类列表
        img_new: require("preview/src/common.newProduct/index"), //新品推荐
        product_show2: require("preview/src/common.hotRecommend/index"), //精品推荐
        hot_recommend: require("preview/src/common.hotRecommend/index"), //热销推荐
        aboutInfo: require("preview/src/common.aboutInfo/index"), //关于我们页面
        contactUs: require("preview/src/common.contactUs/index"), //联系我们页面
        componentEdit:require("save/index"), //组件
        picText1: require("componentsSpecial/picText1/picText1Show/index"), //快速组件picText1
        picText2: require("componentsSpecial/picText2/picText2Show/index"), //快速组件picText2
        picText3: require("componentsSpecial/picText3/picText3Show/index"), //快速组件picText3
        picText4: require("componentsSpecial/picText4/picText4Show/index"), //快速组件picText4
        picText5: require("componentsSpecial/picText5/picText5Show/index"), //快速组件picText5
        baiduMap: require("componentsSpecial/baiduMap/baiduMapShow/index"), //快速组件地图
        waterfall: require("componentsSpecial/waterfall/waterfallShow/index"), //快速组件瀑布流
    }
    //页面逻辑
    var app = {
        Wwidth: $(window).width(),
        userId: setup.getQueryString("userId") || 49,
        pageId: setup.getQueryString("pageId") || 121,
        siteId: setup.getQueryString("siteId"),
        type: setup.getQueryString("type") || "site",
        init: function(){ 
            var me = this;
            var params = {};
            //判断是单页预览还是整站预览
            if(type == "site"){
                params = {
                    userId: me.userId, 
                    id: me.siteId, 
                    type: "site"
                }
            }else{
                params = {
                    userId: me.userId, 
                    id: me.pageId, 
                    type: "page"
                }
            }
            setup.commonAjax("showPage.do", params, function(msg){   
                var componentsRet = msg.components;
                $("body").attr("style","background-color: "+msg.backgroundColor);
                $("title").html(msg.templateName);
                $.each(componentsRet, function(i,v){
                    var symbol = v.symbol;
                    if(!symbol){

                    }else if(symbol=="baseComponents"){
                        leftShow.componentEdit.loadFn(v);
                    }else{
                        leftShow[symbol].img_show(v, me.Wwidth); 
                    }
                });
            });
        },
    }
    var newApp = $.extend(app)
    //执行页面逻辑
    newApp.init();
});