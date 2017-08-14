define(function(require,exports,module){
  var $ = require("jquery");
  var app = {
    init:function(me){
    	$("body").delegate(".phoneValue","input propertychange",function(){
    		$(me.dragTarget).find("a").attr("href","tel:"+$(this).val())
    	})
    },
    tpl:function(){return require("componentsSpecial/phoneTpl/settingPhone.tpl")}
  }
  return app;
})