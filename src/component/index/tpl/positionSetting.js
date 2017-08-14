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
    var app = {
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
                $("body").keydown(function(event){
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
                            $(".VACT_main_page_index_box").mCustomScrollbar("scrollTo",appExtend.scrollH);
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
                            $(".VACT_main_page_index_box").mCustomScrollbar("scrollTo",appExtend.scrollH);
                         }
                    }
                })
            }
            appExtend.rectForPos = me.load(appExtend.dragTarget,appExtend);
        },
        checkPosition:function(target,appExtend){
            var id = $(appExtend.dragTarget).parents(".drag").parent().attr("id");
            $("input[name='module_pos_left']").val(appExtend.rectForPos[id].left);
            $("input[name='module_pos_top']").val(appExtend.rectForPos[id].top);
            $("input[name='module_width']").val(appExtend.rectForPos[id].width);
            $("input[name='module_height']").val(appExtend.rectForPos[id].height);
            $(appExtend.dragTarget).parents(".drag").css(appExtend.rectForPos[id]);
        },
        load:function(target,appExtend){
            var id = $(appExtend.dragTarget).parents(".drag").parent().attr("id");
            if(appExtend.rectForPos[id]==undefined){
                appExtend.rectForPos[id] = {};
            }
            appExtend.rectForPos[id].left = parseInt($(appExtend.dragTarget).parents(".drag")[0].offsetLeft);
            appExtend.rectForPos[id].top = parseInt($(appExtend.dragTarget).parents(".drag")[0].offsetTop);
            appExtend.rectForPos[id].width = parseInt($(appExtend.dragTarget).parents(".drag")[0].offsetWidth);
            appExtend.rectForPos[id].height = parseInt($(appExtend.dragTarget).parents(".drag")[0].offsetHeight);
            $("input[name='module_pos_left']").val(appExtend.rectForPos[id].left);
            $("input[name='module_pos_top']").val(appExtend.rectForPos[id].top);
            $("input[name='module_width']").val(appExtend.rectForPos[id].width);
            $("input[name='module_height']").val(appExtend.rectForPos[id].height);
            return appExtend.rectForPos;
        }
    }
    return app;   
})