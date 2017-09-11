define(function(require,exports,module){
	var $ = require("jquery");
	var setup = require("setup");

	var Engine = require("engine");
	var box = Engine.init();
	require("componentsSpecial/footernav/footernav.css")

	var app = {
	    init:function(){
	    	var me = this;
	    },
	    tpl:function(){
	    	return require("componentsSpecial/footernav/settingFooternav.tpl")
	    },
	}
	return app;
})