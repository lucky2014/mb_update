define(function(require,exports,module){
	var $ = require("jquery");
	var setup = require("setup");

	var Engine = require("engine");
	var box = Engine.init();

    var linkAdress = require("common.linkAdress/index");
	var app = {
	    init:function(){
	    	var me = this;
	    	linkAdress.init();
	    },
	    tpl:function(){
	    	return require("component/index/tpl/settingImage.tpl")
	    },
	}
	return app;
})