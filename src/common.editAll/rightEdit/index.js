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
            $("body").delegate(".selectCommon>input,.selectCommon>i","click",function(e){ //ul下拉框显示or隐藏
                $(".selectCommon ul,.textInput ul").hide();
                e&&me.stopBubble(e);
                var self = $(this)
                
                if(self.hasClass("textInput")){
                  self.siblings("div.textType").toggle();
                }else{
                  self.siblings("ul").toggle();
                }
            })
            $("body").delegate(".selectCommon .textType>button,.selectCommon .textType>b","click",function(e){ //ul字体大小下拉框显示or隐藏
                $(".selectCommon ul,.textInput ul").hide();
                e&&me.stopBubble(e);
                var self = $(this);
                
                self.siblings("ul").toggle();
            })
             $(document).on('mousedown',function(e){ //点击其它区域隐藏下拉框
                if(!$(e.target).is($(".selectCommon .textType>button,.selectCommon .textType>b"))&& !$(e.target).is($(".selectCommon .textType ul")) && $(e.target).parent(".selectCommon .textType ul").length === 0){
                    $(".selectCommon .textType ul").css('display','none');
                }
            });
              $(document).on('mousedown',function(e){ //点击其它区域隐藏下拉框
                 if(!$(e.target).is($(".selectCommon input,.selectCommon i"))&& !$(e.target).is($(".selectUl")) && $(e.target).parent(".selectUl").length === 0){
                     $(".selectUl").css('display','none');
                 }
             });
               $(document).on('mousedown',function(e){ //点击其它区域隐藏下拉框
                 if(!$(e.target).is($(".selectCommon input,div.textType i,div.textType i img,.selectCommon i,.textType ul li"))&& !$(e.target).is($("div.textType")) && $(e.target).parent("div.textType").length === 0){
                     $("div.textType").css('display','none');
                 }
             });
             $("body").delegate(".selectCommon .selectUl li","click",function(e){//选择下拉框选项
                e&&me.stopBubble(e)
                var self = $(this);
                var value = self.html();

                self.parent().siblings("input").val(value);
                self.addClass("selected").siblings("li").removeClass("selected");
                self.parent().hide();
                if(self.parent().hasClass("borWUi")){
                    $(me.dragTarget).children().css("border-width",value+"px");//改变显示区线宽
                }else if(self.parent().hasClass("borSUi")){
                     var valHtml = self.attr("value");
                     if($(me.dragTarget).find("svg")[0]){
                         $(me.dragTarget).find("svg").children().css("stroke-style",valHtml);
                     }else{
                         $(me.dragTarget).children().css("border-style",valHtml);
                     }
                }
                
             });
             $("body").delegate(".selectCommon .textType ul li","click",function(e){//选择字体大小
                e&&me.stopBubble(e)
                var self = $(this);
                var value = self.html();

                self.parent().siblings("button").html(value);
                self.addClass("selected").siblings("li").removeClass("selected");
                self.parent().hide();

                $(me.dragTarget).find("input").css("font-size",value);//改变显示区线宽
             });
             //鼠标上移显示进度条百分比
             $(".right").delegate(".progress-circle","mouseover",function(){ 
               var self = $(this);
               self.addClass("hover");
               self.siblings(".percent").html(self.parents("p").attr("value"));
               self.siblings("span").show();

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