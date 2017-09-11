define(function(require,exports,module){
	var $ = require("jquery");
	var setup = require("setup");

	var Engine = require("engine");
	var box = Engine.init();
	require("componentsSpecial/cuttingLine/cuttingLine.css")

	var app = {
	    init:function(){
	    	var me = this;
	    },
	    tpl:function(){
	    	return require("componentsSpecial/cuttingLine/settingCuttingLine.tpl")
	    },
	}
	return app;
})