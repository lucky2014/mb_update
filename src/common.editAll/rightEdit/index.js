define(function(require,exports,module){
    var $ = require("jquery");
    var Engine = require("engine");
    var box = Engine.init();
    var setup = require("setup");
    var settingText = require("component/index/tpl/settingText.tpl");
    var settingImage = require("component/index/tpl/settingImage.tpl");
    var text = require("component/index/tpl/text.tpl");
    //文本编辑器
    var app = {
        stopBubble:function(e){
          //一般用在鼠标或键盘事件上
          if(e && e.stopPropagation){
          //W3C取消冒泡事件
          e.stopPropagation();
          }else{
          //IE取消冒泡事件
          window.event.cancelBubble = true;
          }
        },
        rightEditEvt:function(clkClass,componentClass,componentTpl,editTpl){
            var me = this;
            me.colorPicker(".color");
            $(".setting-panel-switch").click(function(){
                $(".setting-panel-title,.setting-panel-content").toggle();
            });

            /*$("body").delegate(".vAct_modexBox_pictureId .dragBox","dblclick",function(e){
                me.stopBubble(e)
                $("#userPicDialog").fadeIn(300);
            });*/
            
            $("body").delegate("#file_upload","click",function(e){
                e&&me.stopBubble(e)
                $("#userPicDialog").fadeIn(300);
            })
            $("body").delegate(".dragBox","blur",function(e){
                e&&me.stopBubble(e)
                $(this).removeAttr("contenteditable");
                me.isEdit = false;
                $(this).select();
                $(".setting-panel-title,.setting-panel-content").hide();
            })
            $("body").delegate("#border_width_select","change",function(e){
                e&&me.stopBubble(e)
                var value = $(this).find("option:selected").val();
                if($(".drag_selected").find("svg")[0]){
                    $(".drag_selected").find("svg").children().css("stroke-width",value);
                }else{
                    $(".drag_selected").children().css("border-width",value);
                }
            })
            $("body").delegate("#border_type_select","change",function(e){
                e&&me.stopBubble(e)
                var value = $(this).find("option:selected").val();
                if($(".drag_selected").find("svg")[0]){
                    $(".drag_selected").find("svg").children().css("stroke-style",value);
                }else{
                    $(".drag_selected").children().css("border-style",value);
                }
            })
        },
        renderRightEdit:function(target,bgColor,brColor,brStyle,opacity,radius,brWidth){
            $(".skin-colorSelector-border").css("background-color",(brColor||"#000"));
            $(".skin-colorSelector-bg").css("background-color",(bgColor||"#000"));
            $("#border_width_select option[selected],#border_width_select option[selected]").removeAttr("selected");
            $("#border_type_select option[value="+(brStyle||"solid")+"]").prop("selected",true);
            $("#border_width_select option[value="+(parseInt(brWidth)||"1")+"]").prop("selected",true);
        }
    }
    return app;
})