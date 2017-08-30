define(function(require,exports,module){
	var $ = require("jquery");
    require("common.contextmenu/jquery.contextmenu.css");
    require("common.contextmenu/jquery.contextmenu.js");
	function rightClickMenu(element,app){//右键菜单绑定
		$(element).contextPopup({
			items: [{
				label:'上移一层',
				//icon:'icons/shopping-basket.png',
				action:function(){
					var zIndex = element.find(".drag").css("z-index")*1.0;
					if(!zIndex){
						zIndex=1;
					}
					zIndex++;
					element.find(".drag").css("z-index",zIndex)
				}
			},
			{
				label:'下移一层',
				//icon:'icons/shopping-basket.png',
				action:function(){
					var zIndex = element.find(".drag").css("z-index")*1.0;
					if(!zIndex){
						zIndex=1;
					}
					if(zIndex>1){
						zIndex--;
					}
					element.find(".drag").css("z-index",zIndex);
				}
			},
			{
				label:'删除',
				//icon:'icons/shopping-basket.png',
				action:function(){
					app.deleteEle();
				}
			},]
		});
	}
	return rightClickMenu;
});