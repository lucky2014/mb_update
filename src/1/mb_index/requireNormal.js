define(function(require,exports,module){
	var $ = require("jquery");

    var app={
        //右边编辑区添加一个
        addImg : { 
            bannerSet : require("common.activeX/addBannerImg.tpl"),
            companyInformationSet : require("common.activeX/addInforImg.tpl"),
            footernav : require("common.activeX/addFooterImg.tpl"),
        },
        //左边显示模块
        leftShow : {
          show0 : require("common.activexShow/sky/index"),
          img_show : require("common.activexShow/swiperBanner/index"),
          about : require("common.activexShow/companyAbstract/index"),
          information : require("common.activexShow/companyInformation/index"),
          product_show : require("common.activexShow/swiperProduct/index"), 
          corp_img : require("common.activexShow/companyMien/index"),
          footerNav : require("common.activexShow/footernav/index"),

          img_comp: require("common.activexShow/advertise/index"), //广告
          product_show2: require("common.activexShow/hotRecommend/index"), //跟product_show标题样式不一样
          list_comp: require("common.activexShow/hotCategory/index"), //分类列表
          img_new: require("common.activexShow/newProduct/index"), //新品推荐
          hot_recommend: require("common.activexShow/hotProduct/index"), //热销推荐
          aboutInfo: require("common.activexShow/about/index"), //关于我们页面
          contactUs: require("common.activexShow/contactUs/index"), //联系我们页面

          picText1 : require("componentsSpecial/picText1/picText1Show/index"),
          picText2 : require("componentsSpecial/picText2/picText2Show/index"),
          picText3 : require("componentsSpecial/picText3/picText3Show/index"),
          picText4 : require("componentsSpecial/picText4/picText4Show/index"),
          picText5 : require("componentsSpecial/picText5/picText5Show/index"),
          waterfall : require("componentsSpecial/waterfall/waterfallShow/index"),
          baiduMap : require("componentsSpecial/baiduMap/baiduMapShow/index"),

          componentEdit: require("save/index"),
       },
       //右边编辑模块
       rightSet :{
          ri0 : require("common.activeX/skySet/index"),
          img_show : require("common.activeX/bannerSet/index"),
          about : require("common.activeX/companyAbstractSet/index"),
          information : require("common.activeX/companyInformationSet/index"),
          product_show : require("common.activeX/companyProductSet/index"),
          corp_img : require("common.activeX/companyMienSet/index"),
          footerNav : require("common.activeX/footernavSet/index"),

          img_comp: require("common.activeX/advertiseSet/index"), //广告
          product_show2 : require("common.activeX/companyProductSet/index1"),
          list_comp: require("common.activeX/bannerSet/index1"), //分类列表
          img_new : require("common.activeX/newProductSet/index"), //新品推荐
          hot_recommend : require("common.activeX/newProductSet/index1"), //热销推荐
          aboutInfo : require("common.activeX/aboutSet/index"), //关于我们页面
          contactUs : require("common.activeX/contactUsSet/index"), //联系我们页面

          picText1 : require("componentsSpecial/picText1/picText1Set/index"),
          picText2 : require("componentsSpecial/picText2/picText2Set/index"),
          picText3 : require("componentsSpecial/picText3/picText3Set/index"),
          picText4 : require("componentsSpecial/picText4/picText4Set/index"),
          picText5 : require("componentsSpecial/picText5/picText5Set/index"),
          waterfall : require("componentsSpecial/waterfall/waterfallSet/index"),
          baiduMap : require("componentsSpecial/baiduMap/baiduMapSet/index"),
      },
    }
  return app;	

})