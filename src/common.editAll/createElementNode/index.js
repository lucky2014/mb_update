define(function(require,exports,module){
		var $ = require("jquery");
		var Engine = require("engine");
    	var box = Engine.init();
    	//加载拖拽对象
		var positionSetting = require("component/index/tpl/positionSetting.js");
		var app = {
			newArr:{},
			sizeControlChange:function(){
				var sizeControlArr = ["ne-resize","n-resize","ne-resize","e-resize","e-resize","ne-resize","n-resize","nw-resize"];
				if(Math.sin(this._radian)>Math.sin(Math.PI/4)&&Math.cos(this._radian)>0){
					sizeControlArr = ["tr","tr","br","tm","bm","tl"]
				}
			},
			createSizeControl:function(){
					var me = this;
	                var str = '<div class="sizeControl tl"></div>'+
	                      '<div class="sizeControl tm"></div>'+
	                      '<div class="sizeControl tr"></div>'+
	                      '<div class="sizeControl ml"></div>'+
	                      '<div class="sizeControl mr"></div>'+
	                      '<div class="sizeControl bl"></div>'+
	                      '<div class="sizeControl bm"></div>'+
	                      '<div class="sizeControl br"></div>'+
	                      '<div class="rotateControl-point ui-draggable" title="旋转"></div>';
	                      if(me.dragTarget){
	                      		positionSetting.load(me);
	                      }
	                return str;
			},
			changeCursor:function(){
				var me = this;
				var drag = $(me.dragTarget).parents(".drag");
				if(!drag[0]){
					return;
				}
				var tlPoint = {left:drag.offset().left+drag[0].offsetWidth/2,top:drag.offset().top+drag[0].offsetHeight/2};
				for(var i = 0;i<$(".sizeControl").length;i++){
					var control = $(".sizeControl").eq(i);
					var offsetLeft = control.offset().left+control.width()/2;
					var offsetTop = control.offset().top+control.height()/2;
					var style = "";
					var pos = "";
					if(Math.abs(offsetLeft-(tlPoint.left))>10&&Math.abs(offsetTop-tlPoint.top)>10&&offsetLeft<tlPoint.left&&offsetTop<tlPoint.top){//左上角
						style="nw-resize";
						pos = "br"
					}else if(Math.abs(offsetLeft-(tlPoint.left))>10&&Math.abs(offsetTop-tlPoint.top)>10&&offsetLeft>tlPoint.left&&offsetTop<tlPoint.top){//右上角
						style="ne-resize";
						pos = "bl";
					}else if(Math.abs(offsetLeft-(tlPoint.left))>10&&Math.abs(offsetTop-tlPoint.top)>10&&offsetLeft<tlPoint.left&&offsetTop>tlPoint.top){//左下角
						style="ne-resize";
						pos = "tr";
					}else if(Math.abs(offsetLeft-(tlPoint.left))>10&&Math.abs(offsetTop-tlPoint.top)>10&&offsetLeft>tlPoint.left&&offsetTop>tlPoint.top){//右下角
						style="nw-resize";
						pos = "tl";
					}else if(Math.abs(offsetLeft-(tlPoint.left))<10){//左右
						style="n-resize";
						if(offsetTop<tlPoint.top){
							pos = "bm"
						}else{
							pos = "tm"
						}
					}else if(Math.abs(offsetTop-tlPoint.top)<10){//上下
						style="e-resize";
						if(offsetLeft<tlPoint.left){
							pos = "mr"
						}else{
							pos = "ml"
						}
					}
					if($(".sizeControl").eq(i).hasClass("tm")){
						if(Math.abs(offsetLeft-(tlPoint.left))>10&&Math.abs(offsetTop-tlPoint.top)>10&&offsetTop<tlPoint.top){
							pos = "bm"
						}else if(Math.abs(offsetTop-tlPoint.top)<10){
							pos = "bm"
						}else if(Math.abs(offsetLeft-(tlPoint.left))>10&&Math.abs(offsetTop-tlPoint.top)>10&&offsetTop>tlPoint.top){
							pos = "tm"
						}
					}
					if($(".sizeControl").eq(i).hasClass("bm")){
						if(Math.abs(offsetLeft-(tlPoint.left))>10&&Math.abs(offsetTop-tlPoint.top)>10&&offsetTop>tlPoint.top){
							pos = "tm"
						}else if(Math.abs(offsetTop-tlPoint.top)<10){
							pos = "tm"
						}else if(Math.abs(offsetLeft-(tlPoint.left))>10&&Math.abs(offsetTop-tlPoint.top)>10&&offsetTop<tlPoint.top){
							pos = "bm"
						}
					}
					if($(".sizeControl").eq(i).hasClass("mr")){
						if(Math.abs(offsetLeft-(tlPoint.left))>10&&Math.abs(offsetTop-tlPoint.top)>10&&offsetLeft>tlPoint.left){
							pos = "ml"
						}else if(Math.abs(offsetLeft-(tlPoint.left))<10){
							pos = "ml"
						}else if(Math.abs(offsetLeft-(tlPoint.left))>10&&Math.abs(offsetTop-tlPoint.top)>10&&offsetLeft<tlPoint.left){
							pos = "mr"
						}
					}
					if($(".sizeControl").eq(i).hasClass("ml")){
						if(Math.abs(offsetLeft-(tlPoint.left))>10&&Math.abs(offsetTop-tlPoint.top)>10&&offsetLeft<tlPoint.left){
							pos = "mr"
						}else if(Math.abs(offsetLeft-(tlPoint.left))<10){
							pos = "mr"
						}else if(Math.abs(offsetLeft-(tlPoint.left))>10&&Math.abs(offsetTop-tlPoint.top)>10&&offsetLeft>tlPoint.left){
							pos = "ml"
						}
					}
					$(".sizeControl").eq(i).css("cursor",style).attr("pos",pos);
				}
			},
			createElementNode:function(currEle,className,tpl){
				var me = this;
	            var oFlag = document.createDocumentFragment();
	            var dragStyle = "position: absolute;width: 180px;text-align: center;left:0;top:60px;";
	            var dragBoxStyle = "height: 100%;width: 100%;";
	            var id = "vAct_modexBox_"+new Date().getTime();
	            var vAct_modexBox_paragraph = document.createElement("div");
                vAct_modexBox_paragraph.id = className;
                vAct_modexBox_paragraph.className = className;
                vAct_modexBox_paragraph.style.border = "1px solid #ccc";
	            if(!$(".sizeControl_parent")[0]){
	            	var str = me.createSizeControl();
		            vAct_modexBox_paragraph.innerHTML = "<div style='"+dragStyle+"' class='drag' name='drag'><div class='dragBox_parent' name='dragBox_parent' style='height:100%'><div class='dragBox' name='dragBox' style='"+dragBoxStyle+"'>"+tpl+"</div><div class='sizeControl_parent'>"+str+"</div></div></div>";
	            }
	            for(var key in this.styleSheet){
	                vAct_modexBox_paragraph.style[key] = this.styleSheet[key];
	            }
	            oFlag.appendChild(vAct_modexBox_paragraph);
	            this.elements[vAct_modexBox_paragraph.id] = {};
	            this.getStyle(vAct_modexBox_paragraph,vAct_modexBox_paragraph.id)
	            $(currEle)[0].appendChild(oFlag)
	        }
		}
		return app;
})