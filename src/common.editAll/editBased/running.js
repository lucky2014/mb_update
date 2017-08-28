define(function(require,exports,module){
	var colorPicker = require("common.colorpicker/indexbk");
	var $ = require("jquery");
	var Engine = require("engine");
    var box = Engine.init();
    var setup = require("setup");
    var settingText = require("componentsSpecial/text/settingText.tpl");
    var settingImage = require("componentsSpecial/picture/settingImage.tpl");
	//加载拖拽对象
	var positionSetting = require("component/index/tpl/positionSetting.js");
	//加载拖拽对象
	var redoOrUndo = require("redoOrUndo/index.js");
	//加载拖拽组件功能js
    var dragObject = require("common.editAll/drag/drag.js");
    //加载旋转功能js
    var rotateObject = require("common.editAll/rotate/rotate.js");
    //加载拖拽换位功能js
    var dragMoveObj = require("common.editAll/dragMove/dragMove.js");
    //加载设置文本样式js
    var editTextObj = require("common.editAll/editText/editText.js");
    //加载创建组件节点js
    var createElementNodeObj = require("common.editAll/createElementNode/index.js");
    //加载依赖变量，依赖方法名 js文件
    var editBased = require("common.editAll/editBased/index.js");
    //加载右侧组件编辑功能
    var rightEdit = require("common.editAll/rightEdit/index.js");
    //保存与读取数据
    var save = require("save/index.js");
    //引入模板编辑的功能
    require("common.editAll/dialog/bootstrap-popover-x.min.css");
    //超链接编辑弹框
    var dialogTpl = require("common.editAll/dialog/index.tpl");

    var linkAdressTpl = require("common.linkAdress/linkAdress.tpl");
    
    box.render($("#dialog"), "", dialogTpl);
    function cloneObj(oldObj) { //复制对象方法
        if (typeof(oldObj) != 'object') return oldObj;
        if (oldObj == null) return oldObj;
        var newObj = new Object();
        for (var i in oldObj)
        newObj[i] = cloneObj(oldObj[i]);
        return newObj;
    };
    function extendObj() { //扩展对象
        var args = arguments;
        if (args.length < 2) return;
        var temp = cloneObj(args[0]); //调用复制对象方法
        for (var n = 1; n < args.length; n++) {
        for (var i in args[n]) {
        temp[i] = args[n][i];
        }
        }
        return temp;
    }
	var app = {
		running:function(msg){
            var me = this;
            var basedArr = me.basedArr;
            
            for(var key in basedArr){
            	if(basedArr[key]){
            		if(typeof basedArr[key] == "string"){
	                    var funcName = basedArr[key];
	                    if(funcName!="loadFn"){
	                    	me[funcName] && me[funcName](msg);
	                    }
	                }
            	}  
            }

            //以下是可以在渲染下面做的事情
            $("body").delegate("input","focus",function(e){
            	return false;
            })
            $("body").delegate("select","click",function(e){
            	return false;
            });
		    
        },
        selectFn:function(callback){
            var me = this;
            $(".btn-cancel").click(function(e){
                me.stopBubble(e)
                $("#userPicDialog").fadeOut(300);
            })
            $(".picBtn").click(function(e){
                me.stopBubble(e)
                callback&&callback()
            })
            $("body").delegate(".pic_thumb","click",function(e){
                me.stopBubble(e)
                $(".pic_thumb").removeClass("select");
                $(this).addClass("select");
            })
            $(".pic_thumb").bind("dblclick",function(e){
                me.stopBubble(e)
                $(".pic_thumb").removeClass("select");
                $(this).addClass("select");
                callback&&callback()
            })
            $(".closeBtn").click(function(e){
               $(this).parents("#userPicDialog").hide();
            })
        }  
	}
	var appExtend = $.extend(app,dragObject,editTextObj,createElementNodeObj,
                          editBased,colorPicker,rightEdit,save,rotateObject,dragMoveObj,redoOrUndo);
	



	function dragBoxFn(self,me){
        me.isEdit = true;
        me.dragStatus = false;
        $(self).select();
        var bgColor = $(me.dragTarget).css("background-color");
        var brColor = $(me.dragTarget).css("border-color");
        var brStyle = $(me.dragTarget).css("border-style");
        var opacity = $(me.dragTarget).css("opacity");
        var radius = $(me.dragTarget).css("radius");
        var brWidth = $(me.dragTarget).css("border-width");
        me.renderRightEdit(me.dragTarget,bgColor,brColor,brStyle,opacity,radius,brWidth)
    }
	appExtend.rightEditComponent = function(e,clkClass,componentTpl,editTpl,callback,callback2,callback3,targetObj){
        var me = this;
        if(targetObj){
            var componentClass = $(targetObj).attr("id");
        }else{
            var componentClass = clkClass+new Date().getTime();
            me.createElementNode(".left",componentClass,componentTpl);
        }
        box.render($(".right"), "", editTpl);
        box.render($(".linkDemo"), "", linkAdressTpl);
        $(".line").width(window.innerWidth-860);
        $(".skin-colorSelector-border,.skin-colorSelector-bg").unbind();
        $("#settingId").css({"margin-bottom":"0","height":"50px"})
        $(".setting-panel-title,.setting-panel-content").show();
        me.dragTarget = $("."+componentClass+" .dragBox")[0];
        var id = $(me.dragTarget).parents(".drag").parent().attr("id");
        if($(".setting-panel").attr("data-id")!=id){
        	callback&&callback(e,self,componentClass,componentTpl,editTpl);
        	positionSetting.init($(me.dragTarget).parents(".drag"),$(me.dragTarget).parents(".drag"),me);
        	$(".setting-panel").attr("data-id",id);
        	me.colorPicker(".skin-colorSelector-border");
            me.colorPicker(".skin-colorSelector-bg");
            me.colorPicker(".skin-colorSelector-font");
        }
        $("body").delegate("."+componentClass+" .dragBox","click",function(e){
            me.stopBubble(e)
            if($(".setting-panel").attr("data-id")!=id){
            	callback3&&callback3(e,self);
            	dragBoxFn(this,appExtend)
                box.render($(".right"), "", editTpl);
                box.render($(".linkDemo"), "", linkAdressTpl);
                $(".line").width(window.innerWidth-860);
                $(".skin-colorSelector-border,.skin-colorSelector-bg").unbind();
                me.colorPicker(".skin-colorSelector-border");
                me.colorPicker(".skin-colorSelector-bg");
                me.colorPicker(".skin-colorSelector-font");
            }
            me.changeCursor();
            positionSetting.init($(me.dragTarget).parents(".drag"),"#groupSkin-content",me);
        });
        $("body").delegate("."+componentClass+" .dragBox","contextmenu dblclick",function(e){
        	var self = this;
            callback2&&callback2(e,self)
            return false;
        });
        me.changeCursor();
    };


    appExtend.rightEditComponentInit = function(e,me,targetObj){//第一个参数是event,第二个参数是当前选中对象,第三个参数是判断是否已经有这些对象
        var normal = require("common.editAll/editBased/normal");
        if(typeof me =="string"){
            var type = me;
        }else{
            var type = $(me).attr("data-status");
        }
        var tplObj = normal["base"][type+"Tpl"];
        var settingJs = tplObj.setting();
        e=e?e:undefined;
        this.rightEditComponent(e,type,tplObj.componentTpl(),settingJs.tpl(),function(e,self,componentClass,componentTpl,editTpl){
            tplObj.callback(app,e,componentClass,componentTpl,editTpl)
            var w = $(app.dragTarget).children().width();
            pubsub.publish('dataChange');
        },function(e,self){
            tplObj.callback2(app,e,self)
        },function(e,self){
            if(tplObj.callback3){
                tplObj.callback3(app,e,self)
            }
        },targetObj);
        settingJs.init(app);
        settingJs.isRender = true;

    }
    function trimNumber(str){ 
        return str.replace(/\d+/g,''); 
    }
    appExtend.rightEditComponentInitAll = function(e){
        var dragParent = $(".drag").parent();
        for(var i = 0;i<dragParent.length;i++){
            var str = dragParent.eq(i).attr("id");
            this.rightEditComponentInit(e,trimNumber(str),dragParent.eq(i))
        }
    }
    var linkAdress = require("common.linkAdress/index");
    linkAdress.init(appExtend);
    //点击head右上角的保存
    $("body").delegate(".site_save", "click", function(e){
        appExtend.pageSave();
    });
    //点击head右上角的预览
    $("body").delegate(".site_preview", "click", function(e){
        appExtend.pagePreview();
    });
    //点击head右上角的发布
    $("body").delegate(".site_publish", "click", function(e){
        appExtend.pagePublish();
    });
	return appExtend;
})