/*=======================
textTpl: 组件名称
callback：单击点中组件名称（第一栏）回调函数
callback2： 编辑的时候，点击（点击left里的组件）
callback3：
componentTpl： 中间栏组件
setting：最右栏配置信息

=======================*/

define(function(require,exports,module){
	var $ = require("jquery");
	var Engine = require("engine");
    var box = Engine.init();

    var popUp = require("common.PopUp/index");
	var setting = {
		base:{
			textTpl:{
				callback:function(me,e,componentClass,componentTpl,editTpl){
					
				},
				callback2:function(me,e,self){
					 
					 me.stopBubble(e)
	                 me.choseAll(self)
				},
				componentTpl:function(){
					return require("component/index/tpl/text.tpl")
				},
				setting:function(){
					return require("component/index/tpl/settingText.js")
				},
			},
			pictureTpl:{
				callback:function(me,e,componentClass,componentTpl,editTpl){
					var userPicDialog = require("component/index/tpl/userPicDialog.tpl");
					box.render($("#userPicDialog"), "", userPicDialog);

					var commonZujian = require("componentsSpecial/commonZujian");
					commonZujian.getData("#userPicList");
    				me.selectFn(function(){
			    		if($("#userPicList .select").length==0){
			                popUp({
                                "content":"<div class='deleText'><b></b>请选择一张图片!</div>",
                                showCancelButton: false,
                                showConfirmButton: false,
                                timer: 1000
                            });
			                return false;
			            }
			            var url = $(".pic_thumb.select").attr("data-url");
			            $(me.dragTarget).find("img")[0]&&$(me.dragTarget).find("img").attr("src",url);
			            $("#show_pic_url").attr("src",url);//右边编辑区图片
			            $("#userPicDialog").fadeOut(300);
			    	})
				},
				callback2:function(me,e,componentClass,componentTpl,editTpl){
					me.stopBubble(e)
					var userPicDialog = require("component/index/tpl/userPicDialog.tpl");
					box.render($("#userPicDialog"), "", userPicDialog);
					var commonZujian = require("componentsSpecial/commonZujian");
					commonZujian.getData("#userPicList");
    				$("#userPicDialog").fadeIn(300);
    				me.selectFn(function(){
			    		if($("#userPicList .select").length==0){
			                popUp({
                               "content":"<div class='deleText'><b></b>请选择一张图片!</div>",
                               showCancelButton: false,
                               showConfirmButton: false,
                               timer: 1000
                           });
			                return false;
			            }
			            var url = $(".pic_thumb.select").attr("data-url");
			            $(me.dragTarget).find("img")[0]&&$(me.dragTarget).find("img").attr("src",url);
			            $("#show_pic_url").attr("src",url);//右边编辑区图片
			            $("#userPicDialog").fadeOut(300);
			    	})
				},
				componentTpl:function(){
					return require("component/index/tpl/image.tpl")
				},
				setting:function(){
					return require("component/index/tpl/settingImage.js")
				}
			},
			graphTpl:{
				callback:function(me,e,componentClass,componentTpl,editTpl){
					var svgPicDialog = require("component/index/tpl/svgPicDialog.tpl");
					box.render($("#userPicDialog"), "", svgPicDialog);
    				$("#userPicDialog").fadeIn(300);
		            me.selectFn(function(){
			    		if($("#userPicList .select").length==0){
			                popUp({
                                "content":"<div class='deleText'><b></b>请选择一张图片!</div>",
                                showCancelButton: false,
                                showConfirmButton: false,
                                timer: 1000
                            });
			                return false;
			            }
			            var url = $("#userPicDialog .select img").attr("src");
			            var type = $("#userPicDialog .select").attr("data-type");
			            var w = $("#userPicDialog .select img").width()-parseInt($("#userPicDialog .select img").css("margin-left"))-3;
			            var h = $("#userPicDialog .select img").height()-parseInt($("#userPicDialog .select img").css("margin-top"))-3;
			            $(me.dragTarget).parents(".drag").css({"width":w,"height":h});
			            var svgJs = require("common.svg/index.js");
			            $(me.dragTarget).html(svgJs[type]());
			            var newW = $(me.dragTarget).children().width();
			            var newH = $(me.dragTarget).children().height();
			            var r = Math.min(newW,newH)/2;
			            $(me.dragTarget).children().children().attr("data-type",type);
			            $("#userPicDialog").fadeOut(300);
			    	})
				},
				callback2:function(me,e,componentClass,componentTpl,editTpl){
					me.stopBubble(e)
					var svgPicDialog = require("component/index/tpl/svgPicDialog.tpl");
					box.render($("#userPicDialog"), "", svgPicDialog);
    				$("#userPicDialog").fadeIn(300);
    				me.selectFn(function(){
			    		if($("#userPicList .select").length==0){
			                 popUp({
                                "content":"<div class='deleText'><b></b>请选择一张图片!</div>",
                                showCancelButton: false,
                                showConfirmButton: false,
                                timer: 1000
                            });
			                return false;
			            }
			            var url = $("#userPicDialog .select img").attr("src");
			            var type = $("#userPicDialog .select").attr("data-type");
			            var w = $("#userPicDialog .select img").width()-parseInt($("#userPicDialog .select img").css("margin-left"))-3;
			            var h = $("#userPicDialog .select img").height()-parseInt($("#userPicDialog .select img").css("margin-top"))-3;
			            $(me.dragTarget).parents(".drag").css({"width":w,"height":h});
			            var svgJs = require("common.svg/index.js");
			            $(me.dragTarget).html(svgJs[type]());
			            var newW = $(me.dragTarget).children().width();
			            var newH = $(me.dragTarget).children().height();
			            var r = Math.min(newW,newH)/2;
			            $(me.dragTarget).children().children().attr("data-type",type);
			            $("#userPicDialog").fadeOut(300);
			    	})
				},
				componentTpl:function(){
					return require("component/index/tpl/image.tpl")
				},
				setting:function(){
					return require("component/index/tpl/settingSvg.js")
				}
			},
			phoneTpl:{
				callback:function(me,e,componentClass,componentTpl,editTpl){
					var settingPhoneDialog = require("componentsSpecial/phoneTpl/settingPhoneDialog.tpl");
					box.render($("#userPicDialog"), "", settingPhoneDialog);
    				$("#userPicDialog").fadeIn(300);
    				me.selectFn(function(){
			    		if($("#userPicList .select").length==0){
			                 popUp({
                                "content":"<div class='deleText'><b></b>请选择一张图片!</div>",
                                showCancelButton: false,
                                showConfirmButton: false,
                                timer: 1000
                            });
			                return false;
			            }
			            var url = $(".pic_thumb.select").attr("data-url");
			            var html = $(".pic_thumb.select").find("p").html();
			            $(me.dragTarget).html(html);
			            $("#userPicDialog").fadeOut(300);
			    	})
				},
				callback2:function(me,e,componentClass,componentTpl,editTpl){
					me.stopBubble(e)
					var settingPhoneDialog = require("componentsSpecial/phoneTpl/settingPhoneDialog.tpl");
					box.render($("#userPicDialog"), "", settingPhoneDialog);
    				$("#userPicDialog").fadeIn(300);
    				me.selectFn(function(){
			    		if($("#userPicList .select").length==0){
			                 popUp({
                                "content":"<div class='deleText'><b></b>请选择一张图片!</div>",
                                showCancelButton: false,
                                showConfirmButton: false,
                                timer: 1000
                            });
			                return false;
			            }
			            var url = $(".pic_thumb.select").attr("data-url");
			            var html = $(".pic_thumb.select").find("p").html();
			            $(me.dragTarget).html(html);
			            $("#userPicDialog").fadeOut(300);
			    	})
				},
				componentTpl:function(){
					return require("componentsSpecial/phoneTpl/phone.tpl")
				},
				setting:function(){
					return require("componentsSpecial/phoneTpl/settingPhone.js")
				}
			},
			picText1Tpl: { //图文集
					callback:function(me,e,componentClass,componentTpl,editTpl){
						$(".drag").css("width","308px")
					},
					callback2:function(me,e,componentClass,componentTpl,editTpl){
						
					},
					componentTpl:function(){
						return require("componentsSpecial/picText1/picText1Show/index.tpl");
					},
					setting:function(){
						return require("componentsSpecial/picText1/picText1Set/index.js")
					},
					callback3:function(){
						var app = require("componentsSpecial/picText1/picText1Set/index.js");
						app.init();
					}
			},
			picText2Tpl: {
					callback:function(me,e,componentClass,componentTpl,editTpl){
						$(".drag").css("width","308px")
					},
					callback2:function(me,e,componentClass,componentTpl,editTpl){
						
					},
					componentTpl:function(){
						return require("componentsSpecial/picText2/picText2Show/index.tpl");
					},
					setting:function(){
						return require("componentsSpecial/picText2/picText2Set/index.js")
					},
					callback3:function(){
						var app = require("componentsSpecial/picText2/picText2Set/index.js");
						app.init();
					}
			},
			picText3Tpl: {
					callback:function(me,e,componentClass,componentTpl,editTpl){
						$(".drag").css("width","308px")
					},
					callback2:function(me,e,componentClass,componentTpl,editTpl){
						
					},
					componentTpl:function(){
						return require("componentsSpecial/picText3/picText3Show/index.tpl");
					},
					setting:function(){
						return require("componentsSpecial/picText3/picText3Set/index.js")
					},
					callback3:function(){
						var app = require("componentsSpecial/picText3/picText3Set/index.js");
						app.init();
					}
			},
			picText4Tpl: {
					callback:function(me,e,componentClass,componentTpl,editTpl){
						$(".drag").css("width","308px")
					},
					callback2:function(me,e,componentClass,componentTpl,editTpl){
						
					},
					componentTpl:function(){
						return require("componentsSpecial/picText4/picText4Show/index.tpl");
					},
					setting:function(){
						return require("componentsSpecial/picText4/picText4Set/index.js")
					},
					callback3:function(){
						var app = require("componentsSpecial/picText4/picText4Set/index.js");
						app.init();
					}
			},
			picText5Tpl: {
					callback:function(me,e,componentClass,componentTpl,editTpl){
						$(".drag").css("width","308px")
					},
					callback2:function(me,e,componentClass,componentTpl,editTpl){
						
					},
					componentTpl:function(){
						return require("componentsSpecial/picText5/picText5Show/index.tpl");
					},
					setting:function(){
						return require("componentsSpecial/picText5/picText5Set/index.js")
					},
					callback3:function(){
						var app = require("componentsSpecial/picText5/picText5Set/index.js");
						app.init();
					}
			},
			waterfallTpl: { //瀑布流
					callback:function(me,e,componentClass,componentTpl,editTpl){
						$(".drag").css("width","308px")
					},
					callback2:function(me,e,componentClass,componentTpl,editTpl){
						
					},
					componentTpl:function(){
						return require("componentsSpecial/waterfall/waterfallShow/index.tpl");
					},
					setting:function(){
						return require("componentsSpecial/waterfall/waterfallSet/index.js")
					},
					callback3:function(){
						var app = require("componentsSpecial/waterfall/waterfallSet/index.js");
						app.init();
					}
			},
			cuttingLineTpl: { //分割线
					callback:function(me,e,componentClass,componentTpl,editTpl){
					},
					callback2:function(me,e,componentClass,componentTpl,editTpl){
						
					},
					componentTpl:function(){
						return require("componentsSpecial/cuttingLine/cuttingLineShow/index.tpl");
					},
					setting:function(){
						return require("componentsSpecial/cuttingLine/cuttingLineSet/index.js")
					},
					callback3:function(){
						var app = require("componentsSpecial/cuttingLine/cuttingLineSet/index.js");
						app.init();
					}
			},
			baiduMapTpl: {
				callback:function(me,e,componentClass,componentTpl,editTpl){
					$(".drag").css("width","308px")
				},
				callback2:function(me,e,componentClass,componentTpl,editTpl){
					
				},
				componentTpl:function(){
					return require("componentsSpecial/baiduMap/baiduMapShow/index.tpl");
				},
				setting:function(){
					return require("componentsSpecial/baiduMap/baiduMapSet/index.js")
				}
			},
			buttonTpl: {
				callback:function(me,e,componentClass,componentTpl,editTpl){
					var settingButtonDialog = require("componentsSpecial/buttonEdit/settingButtonDialog.tpl");
					var url = "../src/component/imgs/btnIconsList.png";
			
					box.render($("#userPicDialog"), "", settingButtonDialog);
					var commonZujian = require("componentsSpecial/commonZujian");
					commonZujian.getData(".myPics #userPicList");
    				me.selectFn(function(){
			    		if($("#userPicList .select").length==0){
			                 popUp({
                                "content":"<div class='deleText'><b></b>请选择一张图片!</div>",
                                showCancelButton: false,
                                showConfirmButton: false,
                                timer: 1000
                            });
			                return false;
			            }
			            var url = $(".pic_thumb.select img").attr("src");
			            //var pos = $(".pic_thumb.select i").attr("pos");
			            $(me.dragTarget).find("input")[0]&&$(me.dragTarget).find(".picBut").css("background-image","url("+url+")");
				        $("#userPicDialog").fadeOut(300);
			    	})
				},
				callback2:function(me,e,componentClass,componentTpl,editTpl){
					if($("#inpBtn span").eq(2).hasClass("active")){
						var settingButtonDialog = require("componentsSpecial/buttonEdit/settingButtonDialog.tpl");
						var url = "../src/component/imgs/btnIconsList.png";
						
						box.render($("#userPicDialog"), "", settingButtonDialog);
						var commonZujian = require("componentsSpecial/commonZujian");
						commonZujian.getData(".myPics #userPicList");
	    				$("#userPicDialog").fadeIn(300);
	    				me.selectFn(function(){
				    		if($("#userPicList .select").length==0){
				                 popUp({
                                "content":"<div class='deleText'><b></b>请选择一张图片!</div>",
                                showCancelButton: false,
                                showConfirmButton: false,
                                timer: 1000
                            });
				                return false;
				            }
				            var url = $(".pic_thumb.select img").attr("src");
				            $(me.dragTarget).find("input")[0]&&$(me.dragTarget).find(".picBut").css("background-image","url("+url+")");
				            $("#userPicDialog").fadeOut(300);
				    	})
					}
				},
				componentTpl:function(){
					return require("componentsSpecial/buttonEdit/index.tpl");
				},
				setting:function(){
					return require("componentsSpecial/buttonEdit/index.js")
				}
			}
		}
	}
	return setting;
})