define(function(require,exports,module){
  var $ = require("jquery");
  require("componentsSpecial/swiperTpl/index.css");
  var swiperApp = require("common.swiper/index.js");
  var app = {
    init:function(me){
     swiperApp.swiperElement($(me.dragTarget));
    },
    tpl:function(){return require("componentsSpecial/swiperTpl/settingSwiper.tpl")}
  }
  return app;
})