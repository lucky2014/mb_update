define(function(require,exports,module){
	var $ = require("jquery");
    
   require("common.colorpicker/jquery.colorpicker");
   function colorpicker(className, callBack){
      //sky背景颜色选择
      className.colorpicker({
          fillcolor:true,
          success:function(o,color){
              callBack && callBack(color);
          }
      });
    };
    
    return colorpicker;
});