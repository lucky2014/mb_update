define(function(require,exports,module){
		var $ = require("jquery");
		var app = {
			deleteFn:function(){
	            var me = this;
	            $("body").keydown(function(e){
	                var code = e.keyCode;
	                if(code=="46"){
	                    $(me.dragTarget).parents(".vAct_modexBox_pictureId,.vAct_modexBox_paragraphId").remove();
	                    var vAct_modexBox_paragraphId = $(me.dragTarget).parents(".vAct_modexBox_paragraphId");
	                    var vAct_modexBox_pictureId = $(me.dragTarget).parents(".vAct_modexBox_pictureId");
	                    if(vAct_modexBox_paragraphId.attr("id")){
	                        if(vAct_modexBox_paragraphId){
	                            delete me.elements[vAct_modexBox_paragraphId.attr("id")]
	                        }else{
	                            delete me.elements[vAct_modexBox_pictureId.attr("id")]
	                        }
	                    }
	                }
	            })
	        },
		}
		return app;
})