define(function(require,exports,module){
	var $ = require("jquery");
	
	function popShow(config,callback,cb2){
		if(config){
			if(config.title){
				if(config.width){
					$(".popUp_box").css({"width": config.width + "px", "margin-left": "-"+ config.width/2 + "px"});
				}else{
					$(".popUp_box").css({"width":"420px", "margin-left": "-210px"});
				}
				
				$(".pop_title").html(config.title).css({border: "1px solid #d3dce6", "padding": "10px 32px"});
			}else{
				$(".popUp_box").css({"width":"250px","margin-left": "-125px"});
				$(".pop_title").html("").css({border: "none", "padding":0});
			}
			
			$(".pop_content").html(config.content);


			if(config.confirmText){
				$(".pop_confirm").html(config.confirmText)
			}


			if(config.cancelText){
				$(".pop_cancel").html(config.cancelText)
			}
			$(".popUp").show();


			if(config.showButton){
				$(".pop_confirm").html(config.showButton);
			}

			if(config.cancelButton){
				$(".pop_cancel").html(config.cancelButton);
			}

			if(config.showCancelButton == "" || config.showConfirmButton == ""){
				$(".pop_foot").hide();
			}else{
				$(".pop_foot").show();
			}

			if(config.timer){
				setTimeout(function(){
					$(".popUp").hide();
				}, config.timer);
			}

			var w = $(".popUp_box").width(),h = $(".popUp_box").height();
			$(".popUp_box").css("top",(window.innerHeight-h)/2-20);
		}
		$(".pop_confirm").unbind();
		$(".pop_confirm").click(function(){
			callback&&callback();
		});

		$("#pop").delegate(".cut","click", function(){
			$(".popUp").hide();
		});

		$("#pop").delegate(".pop_cancel,.cancel","click",function(){
			$(".pop_title").html("");
			$(".pop_confirm").html("确定");
			$(".pop_cancel").html("取消");
			$(".pop_content").html("");
			$(".popUp").hide();
			cb2 && cb2();
		});
	}
	return popShow;
});