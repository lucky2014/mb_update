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

		//计算字体大小
		var fontSize=$(v).css("font-size").replace(/px/g,"");
		var newFontSize=(fontSize*$(window).width()/308).toFixed(2)
		$(v).css("font-size",newFontSize+"px");
	});

	//body的高度
	var bdh = $("body").css("height");
		bdh = bdh.replace(/px/g,"");
		bdh = bdh/308*$(window).width().toFixed(2)+ "px";

	$("body").css({"height": bdh});

});


