define(function(require,exports,module){
    var $ = require("jquery");
    var positionSetting = require("component/index/tpl/positionSetting.tpl");
    function watch(obj, attr, callback){
       if(typeof obj.defaultValues == 'undefined'){
          obj.defaultValues = {};
          for(var p in obj){
            if(typeof obj[p] !== 'object') 
                obj.defaultValues[p] = obj[p];
          }
       }
       if(typeof obj.setAttr == 'undefined'){
          obj.setAttr = function(attr, value){  
                  if(this[attr] != value){
                    this.defaultValues[attr] = this[attr];
                    this[attr] = value;
                    return callback(this);
                  }
                  return this;             
           };
       } 
    }
    var appExtendObj = null;
    var app = {
        getSetting:function(){
            var settings = {};
            
        },
        keydownFn:function(event,appExtend,id){
            if($(appExtend.dragTarget).attr("contenteditable")){
                return;
            }
            var id = $(appExtend.dragTarget).parents(".drag").parent().attr("id");
            if(event.keyCode==37){
                 appExtend.rectForPos[id].left--;
                 $(appExtend.dragTarget).parents(".drag").css(appExtend.rectForPos[id]);
                 $("input[name='module_pos_left']").val(appExtend.rectForPos[id].left);
            }else if(event.keyCode==38){
                 appExtend.rectForPos[id].top--;
                 $(appExtend.dragTarget).parents(".drag").css(appExtend.rectForPos[id]);
                 $("input[name='module_pos_top']").val(appExtend.rectForPos[id].top);
                 var scrollTop = parseInt($(".mCSB_dragger").css("top"));
                 var top = parseInt($(appExtend.dragTarget).parents(".drag").css("top"));
                 if(top<=scrollTop){
                    appExtend.scrollH-=2;
                    appExtend.scrollDeltaH-=2;
                    //$(".VACT_main_page_index_box").mCustomScrollbar("scrollTo",appExtend.scrollH);
                 }
            }else if(event.keyCode==39){
                 appExtend.rectForPos[id].left++;
                 $(appExtend.dragTarget).parents(".drag").css(appExtend.rectForPos[id]);
                 $("input[name='module_pos_left']").val(appExtend.rectForPos[id].left);
            }else if(event.keyCode==40){//下
                 appExtend.rectForPos[id].top+=2;
                 $(appExtend.dragTarget).parents(".drag").css(appExtend.rectForPos[id]);
                 $("input[name='module_pos_top']").val(appExtend.rectForPos[id].top);
                 var scrollTop = parseInt($(".mCSB_dragger").css("top"));
                 var offsetTop = parseInt($(".mobile-container").css("top"))+$(".sky").height();
                 var top = parseInt($(appExtend.dragTarget).parents(".drag").css("top"))+$(appExtend.dragTarget).height();
                 if(top>=(window.innerHeight-$(appExtend.dragTarget).parents(".drag").height())){
                    if(($(".mobile-container")[0].clientHeight+appExtend.scrollH)>=$(".mCSB_container>.left").height()){
                        var height = $(".mCSB_container>.left").height();
                        $(".mCSB_container>.left").height(height+2);
                    }
                    appExtend.scrollH+=2;
                    appExtend.scrollDeltaH+=2;
                    //$(".VACT_main_page_index_box").mCustomScrollbar("scrollTo",appExtend.scrollH);
                 }
            }
        },
        isKeyDown:false,
        init:function(target,indexBox,appExtend){
            var me = this;
            var id = $(appExtend.dragTarget).parents(".drag").parent().attr("id");
            if($(".setting-panel").attr("data-id")!=id){
                $(".setting-panel").attr("data-id",id);
                $("#groupSkin-content")[0]&&$("#groupSkin-content").remove();
                $(".right").append(positionSetting);
                $(".right").prepend('<div class="panelTitle"><p>组件设置</p></div>');
                var styleObj = $(appExtend.dragTarget)[0]["style"];
                $("input[name='module_pos_left']").bind("input propertychange",function(){
                    appExtend.rectForPos[id].left = parseInt($(this).val()||0);
                    me.checkPosition(appExtend.dragTarget,appExtend)
                })
                $("input[name='module_pos_top']").bind("input propertychange",function(){
                    appExtend.rectForPos[id].top = parseInt($(this).val()||0)
                    me.checkPosition(appExtend.dragTarget,appExtend)
                })
                $("input[name='module_width']").bind("input propertychange",function(){
                    appExtend.rectForPos[id].width = parseInt($(this).val()||0)
                    me.checkPosition(appExtend.dragTarget,appExtend)
                })
                $("input[name='module_height']").bind("input propertychange",function(){
                    appExtend.rectForPos[id].height = parseInt($(this).val()||0)
                    me.checkPosition(appExtend.dragTarget,appExtend)
                })
            }
            appExtend.rectForPos = me.load(appExtend);
            if(!me.isKeyDown){
              me.isKeyDown = true;
              $("body").keydown(function(event){
                    if(!$(".sizeControl_parent")[0]){
                        return;
                      }
                me.keydownFn(event,appExtend)
              })
            }
        },
        checkPosition:function(target,appExtend){
            var id = $(appExtend.dragTarget).parents(".drag").parent().attr("id");
            this.setRectInfo(appExtend.rectForPos[id],function(){
                $("input[name='module_pos_left']").val(appExtend.rectForPos[id].left);
                $("input[name='module_pos_top']").val(appExtend.rectForPos[id].top);
                $("input[name='module_width']").val(appExtend.rectForPos[id].width);
                $("input[name='module_height']").val(appExtend.rectForPos[id].height);
                $(appExtend.dragTarget).parents(".drag").css(appExtend.rectForPos[id]);
            })
        },
        setRectInfo:function(obj,callback){
            clearInterval(obj.timer);
            obj.timer = setInterval(function(){
                if($(obj).children()[0]&&$(obj).children()[0].readyState&&$(obj).children()[0].readyState==4){
                    clearInterval(obj.timer);
                    callback&&callback();
                }else{
                    clearInterval(obj.timer);
                    callback&&callback();
                }
            },30)
        }, 
        rightShow: function(appExtend){ //右边编辑数据渲染
          var imgUrl = $(appExtend.dragTarget).find("img").attr("src"); //图片
          $("#show_pic_box img").attr("src",imgUrl);

          var sign = $(appExtend.dragTarget).attr("sign"); //链接类型判断
         
          var linkName = $(appExtend.dragTarget).attr("linkName"); //链接名称
          if(sign == 1){
              $(".linkAddress").show();
              $(".selectAddress,.backAddress").hide();

              $(".linkStyle input").val("外部链接");
              $(".linkAddress input").val(linkName);
              /*$(".selectAddress .linkChoose").html("");*/
          }else if(sign == 2){
              $(".linkAddress,.backAddress").hide();
              $(".selectAddress").show();

              $(".linkStyle input").val("站内链接");
              $(".selectAddress input").val(linkName);
          }else if(sign == 3){
              $(".linkAddress,.selectAddress").hide();
              $(".backAddress").show();

              $(".linkStyle input").val("返回");
          }
          $(".linkChoose li").removeClass("selectedLi");
          $(".linkChoose li[sign="+sign+"]").addClass("selectedLi");

          var borWidth = parseInt($(appExtend.dragTarget).css("border-left-width")); //边框宽度
          
          $(".borderWidth input").val(borWidth); //边框宽度
          $(".borWUi li").removeClass("selected");
          $(".borWUi li").eq(borWidth).addClass("selected");

          var borColor = $(appExtend.dragTarget).css("border-left-color"); //边框颜色
          if(borColor=="rgba(0, 0, 0, 0)"){
            borColor="rgba(255, 255, 255)";
          }
          //$("#border_color .c-colorWrapper b").css("background-color",borColor); //边框颜色
          $(".skin-colorSelector-border").attr("theColor",borColor).siblings(".sp-replacer").find(".sp-preview-inner").css("background-color",borColor); //边框颜色

          var borStyle = $(appExtend.dragTarget).css("border-left-style"); //边框类型
              borVal = $(".borSUi li[value="+borStyle+"]").html();
          $(".borderStyle input").val(borVal); //边框类型
          $(".borSUi li").removeClass("selected");
          $(".borSUi li[value="+borStyle+"]").addClass("selected");

          var opacity = $(appExtend.dragTarget).css("opacity")*100; //不透明度
          $("#opacity .clearfix.progress p").attr("value",opacity); //不透明度
          $("#opacity .clearfix.progress p b").css("width",(opacity/100)*($(".clearfix.progress p").width())+10)
          
          var radius = parseInt($(appExtend.dragTarget).css("border-top-right-radius")); //圆角
          $("#border_radius .clearfix.progress p").attr("value",radius); //圆角
          $("#border_radius .clearfix.progress p b").css("width",(radius/24)*($(".clearfix.progress p").width())+10)
          var backColor =  $(appExtend.dragTarget).find("input").css("background-color"); //背景颜色
          
          $(".innerDialog .skin-colorSelector-bg").attr("theColor",backColor).siblings(".sp-replacer").find(".sp-preview-inner").css("background-color",backColor);

          var skyBackcolor = $("#sky").attr("color");
          $("#skySet .skin-colorSelector-bg").siblings(".sp-replacer").find(".sp-preview-inner").css("background-color",skyBackcolor);
          $("#sky").attr("color",skyBackcolor);

          var butName = $(appExtend.dragTarget).children().val();//按钮文字
          $("#button_text .form-control").val(butName);

          var textColor = $(appExtend.dragTarget).children().css("color");//字体颜色

          //$("#font_color b.skin-colorSelector-font").css("background-color",textColor);
          $(".skin-colorSelector-font").attr("theColor",textColor).siblings(".sp-replacer").find(".sp-preview-inner").css("background-color",textColor);

          //按钮背景渐变色
          var beginBg =  $(appExtend.dragTarget).find("input").attr("beginBg"); //背景颜色
          $(".skin-colorSelector-bgTp").attr("theColor",beginBg).attr("data-color",beginBg).siblings(".sp-replacer").find(".sp-preview-inner").css("background-color",beginBg);
          var endBg =  $(appExtend.dragTarget).find("input").attr("endBg"); //背景颜色
          $(".skin-colorSelector-bgBtm").attr("theColor",endBg).attr("data-color",endBg).siblings(".sp-replacer").find(".sp-preview-inner").css("background-color",endBg);

          var textSize = parseInt($(appExtend.dragTarget).parents(".drag").css("font-size")) || 14; //字体大小
          $("#fontConfig button").html(textSize);
          $("#fontConfig ul li").removeClass("selected");
          $("#fontConfig ul li[value="+textSize+"]").addClass("selected");

          if($("#dialog_paragraph")){
            $("#dialog_paragraph .fontSize select option").attr("selected",false);
            $("#dialog_paragraph .fontSize select option[value="+textSize+"]").attr("selected",true);
           }
          /*alert(textSize)*/

          var fontWeight = $(appExtend.dragTarget).children().css("font-weight"); //字体加粗
          if(fontWeight == "bold"){
            $("#fontConfig i[type=font-weight]").addClass("active");
          }

          var fontStyle = $(appExtend.dragTarget).children().css("font-style"); //字体倾斜
          if(fontStyle == "italic"){
            $("#fontConfig i[type=font-style]").addClass("active");
          }

        },
        load:function(appExtend){
            var me = this;
            var id = $(appExtend.dragTarget).parents(".drag").parent().attr("id");
            if(appExtend.rectForPos[id]==undefined){
                appExtend.rectForPos[id] = {};
            }
            this.setRectInfo(appExtend.rectForPos[id],function(){
                appExtend.rectForPos[id].left = parseFloat($(appExtend.dragTarget).parents(".drag")[0].offsetLeft);
                appExtend.rectForPos[id].top = parseFloat($(appExtend.dragTarget).parents(".drag")[0].offsetTop);
                appExtend.rectForPos[id].width = parseFloat($(appExtend.dragTarget).parents(".drag")[0].offsetWidth);
                appExtend.rectForPos[id].height = parseFloat($(appExtend.dragTarget).parents(".drag")[0].offsetHeight);
                $("input[name='module_pos_left']").val(parseInt(appExtend.rectForPos[id].left));
                $("input[name='module_pos_top']").val(parseInt(appExtend.rectForPos[id].top));
                $("input[name='module_width']").val(parseInt(appExtend.rectForPos[id].width));
                $("input[name='module_height']").val(parseInt(appExtend.rectForPos[id].height));
                me.rightShow(appExtend);
            })
            return appExtend.rectForPos;
        }
    }
    return app;   
})