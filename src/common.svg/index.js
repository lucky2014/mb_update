define(function(require,exports,module){
	var svgTpl = {
		rect:function(){
			return require("common.svg/rect.tpl");
		},
		circle:function(){
			return require("common.svg/circle.tpl");
		},
		triangle:function(){
			return require("common.svg/triangle.tpl");
		},
		tixing:function(){
			return require("common.svg/tixing.tpl");
		},
		plus:function(){
			return require("common.svg/plus.tpl");
		}
	}
	return svgTpl;
})