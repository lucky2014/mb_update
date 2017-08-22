$(function(){
	var obj = $(".drag");
	$.each(obj, function(i,v){
		var top = $(v).attr("top").replace(/px/g,"");
		var t = top/308*$(window).width().toFixed(2)+ "px";
		$(v).css({"top": t});
	});
});


