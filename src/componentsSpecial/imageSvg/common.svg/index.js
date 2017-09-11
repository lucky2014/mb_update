define(function(require,exports,module){
	var svgTpl = {
		rect:function(){
			return require("componentsSpecial/imageSvg/common.svg/rect.tpl");
		},
		circle:function(){
			return require("componentsSpecial/imageSvg/common.svg/circle.tpl");
		},
		triangle:function(){
			return require("componentsSpecial/imageSvg/common.svg/triangle.tpl");
		},
		tixing:function(){
			return require("componentsSpecial/imageSvg/common.svg/tixing.tpl");
		},
		plus:function(){
			return require("componentsSpecial/imageSvg/common.svg/plus.tpl");
		},
		roundRect:function(){
			return require("componentsSpecial/imageSvg/common.svg/roundRect.tpl");
		},
		rhomb:function(){
			return require("componentsSpecial/imageSvg/common.svg/rhomb.tpl");
		},
		roundSquare:function(){
			return require("componentsSpecial/imageSvg/common.svg/roundSquare.tpl");
		},
		cross:function(){
			return require("componentsSpecial/imageSvg/common.svg/cross.tpl");
		},
	}
	return svgTpl;
})