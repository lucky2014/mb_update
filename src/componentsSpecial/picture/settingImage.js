define(function(require,exports,module){
	var $ = require("jquery");
	var setup = require("setup");

	var Engine = require("engine");
	var box = Engine.init();
	var app = {
	    init:function(){
	    	var me = this;
	    },
	    tpl:function(){
	    	return require("componentsSpecial/picture/settingImage.tpl")
	    },
	}
	return app;
})