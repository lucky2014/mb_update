define(function(require,exports,module){
    var $ = require("jquery");
    var Engine = require("engine");
    var box = Engine.init();
    var setup = require("setup");
    var settingText = require("component/index/tpl/settingText.tpl");
    var settingImage = require("component/index/tpl/settingImage.tpl");
    var text = require("component/index/tpl/text.tpl");
    var ajaxFileUpload = require("common.ajaxfileupload/index");
    var popUp = require("common.PopUp/index");
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
             //上传图片
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
        getData: function(className){//获取历史上传图片
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
        delFn : function(){ //删除图片
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