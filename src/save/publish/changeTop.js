$(function(){
	var obj = $(".drag");
	$.each(obj, function(i,v){
		var top = $(v).attr("top").replace(/px/g,"");
		var t = top/308*$(window).width().toFixed(2)+ "px";

		//转换高度
		var height = $(v).attr("height") ? $(v).attr("height").replace(/px/g,"") : "";
		var h = height/308*$(window).width().toFixed(2)+ "px";
		if(height==0){
			$(v).css({"top": t});
		}else{
			$(v).css({"top": t, "height": h});
		}
		//$(v).find("img").css({"height": h});
	});
});


