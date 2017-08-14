define(function(require,exports,module){
	var $ = require("jquery");
    var ajaxFileUpload = require("common.ajaxfileupload/index");
	var app = {
	    init:function(){
	    	$("#userPicDialog").delegate("input[name=myfiles]", "change", function() { //上传图片
    			var meInput = $(this);
    			var id = meInput.attr("id");

	    	    ajaxFileUpload(id, "uploadImg.do", function(msg){
	    	    	var idd = meInput.attr("fileElementId"); 
	    	    	$("#" + idd ).siblings(".addPicture").attr("src",msg[0]);
	    	        $("#" + idd ).parents("#userpic_file_upload").after('<div id="" class="pic_thumb firstly" style="background-image:url('+msg[0]+');" data-url="'+msg[0]+'"><span class="pic_select"></span></div>')
	    	    	$(".pic_thumb.firstly").addClass("select").siblings(".pic_thumb").removeClass("select");
	    	    	$(".pic_thumb").removeClass("firstly");
	    	    }); 
	    	});
	    },
	    tpl:function(){
	    	return require("component/index/tpl/settingImage.tpl")
	    }
	}
	return app;
})