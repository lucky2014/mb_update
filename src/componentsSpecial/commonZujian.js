define(function(require,exports,module){
	var $ = require("jquery");
	var setup = require("setup");

	var Engine = require("engine");
	var box = Engine.init();

    var ajaxFileUpload = require("common.ajaxfileupload/index");
	var linkAdress = require("common.linkAdress/index");
    var popUp = require("common.PopUp/index");
	var app = {
	    init:function(){
	    	/*app.getData();*/
	    	linkAdress.init();
	    	$("#userPicDialog").delegate("input[name=myfiles]", "change", function() { //上传图片
    			var meInput = $(this);
    			var id = meInput.attr("id");

	    	    ajaxFileUpload(id, "uploadImg.do", function(msg){
	    	    	//console.log(JSON.stringify(msg,null,2))
	    	    	var idd = meInput.attr("fileElementId"); 
	    	        $("#" + idd ).parents("#userpic_file_upload").after('<div imgId = "'+msg[2]+'" class="pic_thumb firstly" data-url="'+msg[0]+'"><img src="'+msg[0]+'"><span class="pic_select"></span><i class="delPic" style="display:none;"></i></div>')
	    	    	$(".pic_thumb.firstly").addClass("select").siblings(".pic_thumb").removeClass("select");
	    	    	$(".pic_thumb").removeClass("firstly");
	    	    	app.delFn();
	    	    }); 
	    	});
	    	
	    },
	    getData: function(className){

	    	var params = {
	    		pageNum : 1,
	    		pageSize : 100,
	    	}
	    	setup.commonAjax("uploadImgRecord.do", params, function(msg){
	    		var msg = msg.data;
	    		//console.log(JSON.stringify(msg,null,2))
	    		var addTpl = require("component/index/tpl/addPictures.tpl")
	    		box.render($(className), msg, addTpl,"0");
	    		app.delFn();
	    	})
	    },
	    delFn : function(){
	    	$("#tipsDialog .pic_thumb").mouseover(function(){
	    		$(this).find(".delPic").show();
	    	}).mouseout(function(){
	    		$(this).find(".delPic").hide();
	    	})

	    	$("#tipsDialog .pic_thumb").delegate(".delPic","click",function(){
	    		var delSelf = $(this);
	    		var imgId = delSelf.parents(".pic_thumb").attr("imgId");
	    		popUp({
	    		    "title": '提示<a class="cut"></a>',
                	"content":"<div class='deleText'><b></b>此操作将永久删除该图片，是否继续？</div>",
	    		    showCancelButton: true,
	    		    showConfirmButton: true,
	    		}, function(){
	    		    setup.commonAjax("delImg.do", {imgId:imgId}, function(msg){  
	    		      popUp({
	    		          "content":"删除成功！",
	    		          showCancelButton: false,
	    		          showConfirmButton: false,
	    		          timer: 1000
	    		      });
	    		      delSelf.parents(".pic_thumb").remove();
	    		    });
	    		});
	    	})
	    }
	}
	return app;
})