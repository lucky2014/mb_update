define(function(require,exports,module){
    var $ = require("jquery");
    require("../changePageHeight/changePageHeight.js");
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
    var dragObject = {
        dragTargetWidth:0,
        dragTargetHeight:0,
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
        rectForPos: {
            
        },
        dragProgress:function(){
            var me = this;
            var rect = {};
            var target = null;
            $("body").delegate(".progress-circle","mousedown",function(e){
                me.dragProgressStatus = true;
                rect.x = e.clientX;
                rect.y = e.clientY;
                e.preventDefault();
                rect.w = $(this).parent().width();
                target = $(this).parent()[0];
            })
            $(window).mousemove(function(e){
                // e.preventDefault();
                if(me.dragProgressStatus){
                    var deltaX = e.clientX - rect.x;
                    var w = (rect.w+deltaX)>=($(target).parent().width())?($(target).parent().width()):(rect.w+deltaX);
                    w = w<$(target).children().width()/2?$(target).children().width()/2:w;
                    $(target).width(w)
                    var maxValue = $(target).parent().attr("maxValue");
                    $(target).parent().attr("value",parseInt(($(target).width()-$(target).children().width()/2)/($(target).parent().width()-10)*maxValue));

                    if($(target).hasClass("opacity")){
                        $(target).find(".percent").html($(target).parent().attr("value"));
                            $(me.dragTarget).children().css("opacity",$(target).parent().attr("value")/100)
                            $(me.dragTarget).css("opacity",$(target).parent().attr("value")/100)
                        
                    }else{
                        $(target).find(".percent").html($(target).parent().attr("value"));
                        $(me.dragTarget).css("border-radius",$(target).parent().attr("value")+"px")
                        $(me.dragTarget).children().css("border-radius",$(target).parent().attr("value")+"px")
                    }
                }
            })
            $(document).mouseup(function(e){
                me.dragProgressStatus = false;
            })
            $(".right").delegate(".progress-circle","mouseover",function(){ 
               var self = $(this);
               self.addClass("hover");
               self.siblings(".percent").html(self.parents("p").attr("value"));
               self.siblings("span").show();

             })
            $(".right").delegate(".progress-circle","mouseout",function(){ 
               var self = $(this);
               self.removeClass("hover");
               self.siblings("span").hide();

             })
        },
        dragHeight:function(){
            var oldObj = {};
            var dragStatus = false;
            var target = null;
            var mobileMinHeight = 0;
            for(var i = 0;i<$(".leftDiv").length;i++){
                mobileMinHeight+=$(".leftDiv").eq(i).height();
            }

            $(".VACT_main .leftOuter>.left").css("height", mobileMinHeight);
            $(".leftOuter>span").html($(".mobile-container").height());
            // $("body").delegate(".dragLine","mousedown",function(e){
            //         dragStatus = true;
            //         oldObj.height = $(this).parent().height();
            //         target = $(this).parent();
            //         oldObj.y = e.pageY;
            // })
            // $(window).mousemove(function(e){
            //     if(dragStatus){
            //         var deltaY = e.pageY-oldObj.y;
            //         $(target).css("height",oldObj.height+deltaY);
            //         $(".leftOuter>span").html(oldObj.height+deltaY)
            //     }
            // })
            // $(window).mouseup(function(e){
            //     dragStatus = false;
            //     var h = $(target).height();
            //     if(h<=mobileMinHeight){
            //         $(target).height(mobileMinHeight);
            //         $(".leftOuter>span").html(mobileMinHeight)
            //     }
            // })
        },
        dragging:function(target,changeDiv,beforeMove,callback,afterMove){
            var me = this;
            var old = {};
            $(".mobile-container").delegate(target,"mousedown",function(e){
                me.scrollDeltaH = 0;
                me.dragTarget = this;
                if(me.edit==true){
                    return;
                }
                if($(this).attr("contenteditable")){
                    return;
                }
                e.preventDefault();
                me.dragStatus = true;
                $(this).addClass("drag_selected");
                old.lf = parseInt($(this).parents(".drag").css("left"));
                old.tp = parseInt($(this).parents(".drag").css("top"));
                old.x = e.clientX;
                old.y = e.clientY;
                $(this).parents(".drag").css("transform-origin","center center");
                beforeMove&&beforeMove(e);
            })
            $(window).mousemove(function(e){
                if(me.edit==true){
                    return;
                }
                if(me.dragStatus){
                    callback&&callback(e,target,$(me.dragTarget).parents(".drag"),old)
                }
            })
            $(".mobile-container").delegate(target,"click",function(e){
                // me.stopBubble(e)
                $(this).css("cursor","move");
                if(!$(".sizeControl_parent")[0]){
                    var str = me.createSizeControl();
                    $(this).parent().append("<div class='sizeControl_parent'>"+str+"</div>")
                }
            })
            $(document).mouseup(function(e){
                me.dragStatus = false;
                if($(e.target).parents(".setting-panel-title,.setting-panel-content")[0]){
                    $(me.dragTarget).addClass("drag_selected");
                }else{
                    if(!$(e.target).hasClass("sizeControl")){
                        $(".sizeControl_parent").remove();
                        if($(e.target).parents(".dragBox")[0]){
                            pubsub.publish('dataChange');
                        }
                        afterMove&&afterMove(e);
                        $(me.dragTarget).removeClass("drag_selected");
                    }
                }
            })
        },
        scrollH:0,
        scrollDeltaH:0,
        movePos:function(e,target,changeDiv,old){
            var me = this;
            var lf = old.lf;
            var tp = old.tp;
            var deltaX = e.clientX-old.x;
            var deltaY = e.clientY - old.y;
            var offsetLeft = $(".VACT_main_page_index_box").offset().left;
            var offsetTop = parseInt($(".mobile-container").css("top"))+$(".sky").height();
            var w = $(changeDiv).width()/2;
            var h = $(changeDiv).height()/2;
            var scrollTop = parseInt($(".mCSB_dragger").css("top"));
            // if(e.clientY>=(window.innerHeight-$(changeDiv).height())){
            //     if(($(".mobile-container")[0].clientHeight+me.scrollH)>=$(".mCSB_container>.left").height()){
            //         var height = $(".mCSB_container>.left").height();
            //         $(".mCSB_container>.left").height(height+2);
            //     }
            //     me.scrollH+=2;
            //     me.scrollDeltaH+=2;
            //     //$(".VACT_main_page_index_box").mCustomScrollbar("scrollTo",me.scrollH);
            // }else if(e.clientY<=scrollTop){
            //     me.scrollH-=2;
            //     me.scrollDeltaH-=2;
            //     //$(".VACT_main_page_index_box").mCustomScrollbar("scrollTo",me.scrollH);
            // }
            if(me.dragStatus){
                $(changeDiv).css({"left":lf+deltaX,"top":tp+deltaY+me.scrollDeltaH});
            }else{
                $(changeDiv).css({"left":lf+deltaX,"top":tp+deltaY});
            }
        },
        getRect:function(e,target,w,h,posEle){
            var rect = {"x":e.pageX,"y":e.pageY,"lf":parseFloat($(target).offset().left),"tp":parseFloat($(target).offset().top),"w":w,"h":h};
            rect.offsetLeft = $(posEle).offset().left;
            rect.offsetTop = $(posEle).offset().top;
            return rect;
        },
        dragMouseMove:function(e,posEle,posDrag){
            var me = this;
            var deltaX = (e.pageX-me.oldObj.x);
            var deltaY = (e.pageY-me.oldObj.y);
            var w = me.oldObj.w;
            var h = me.oldObj.h;
            var dataPos = $(posDrag).attr("pos");
            if(dataPos.indexOf("r")!="-1"){
                deltaX = -deltaX;
                var newW = w+deltaX;
                var newH = newW*h/w;
                if(dataPos!="mr"){
                    $(me.dragTarget).parents(".drag").css({"width":newW,"height":newH});
                }else{
                    var newW = w+deltaX;
                    if($(posDrag).css("cursor")=="n-resize"){
                        if(Math.sin(me._radian)<0){
                            var newW = w+deltaY;
                        }else{
                            var newW = w-deltaY;
                        }
                    }
                    $(me.dragTarget).parents(".drag").css({"width":newW});
                }
                
            }else if(dataPos.indexOf("l")!="-1"){
                var newW = w+deltaX;
                var newH = newW*h/w;
                if(dataPos!="ml"){
                    $(me.dragTarget).parents(".drag").css({"width":newW,"height":newH});
                }else{
                    var newW = w+deltaX;
                    if($(posDrag).css("cursor")=="n-resize"){
                        if(Math.sin(me._radian)<0){
                            var newW = w-deltaY;
                        }else{
                            var newW = w+deltaY;
                        }
                    }
                    $(me.dragTarget).parents(".drag").css({"width":newW});
                }
            }else if(dataPos.indexOf("bm")!="-1"){
                var newH = h-deltaY;
                if($(posDrag).css("cursor")=="e-resize"){
                    if(Math.sin(me._radian)<0){
                        var newH = h-deltaX;
                    }else{
                        var newH = h+deltaX;
                    }
                }else{
                   var newH = h-deltaY;
                }
                $(me.dragTarget).parents(".drag").css({"height":newH});
            }else if(dataPos.indexOf("tm")!="-1"){
                if($(posDrag).css("cursor")=="e-resize"){
                    if(Math.sin(me._radian)<0){
                        var newH = h+deltaX;
                    }else{
                        var newH = h-deltaX;
                    }
                }else{
                   var newH = h+deltaY;
                }
                $(me.dragTarget).parents(".drag").css({"height":newH});
            }
            var newLf = me.getRect(e,$(me.dragTarget).parents(".drag"),newW,newH,$(posEle)).offsetLeft;
            var newTp = me.getRect(e,$(me.dragTarget).parents(".drag"),newW,newH,$(posEle)).offsetTop;
            var offsetLeft = me.oldObj.offsetLeft-newLf;
            var offsetTop = me.oldObj.offsetTop-newTp;
            var lf = me.oldObj.lf+offsetLeft;
            var tp = me.oldObj.tp+offsetTop;
            $(me.dragTarget).parents(".drag").css({"left":lf,"top":tp});
            var checkOffsetLeft = me.getRect(e,$(me.dragTarget).parents(".drag"),newW,newH,$(posEle)).offsetLeft;
            var checkOffsetTop = me.getRect(e,$(me.dragTarget).parents(".drag"),newW,newH,$(posEle)).offsetTop;
            $(me.dragTarget).parents(".drag").css({"left":parseInt(lf+me.oldObj.offsetLeft-(checkOffsetLeft)),"top":parseInt(tp+me.oldObj.offsetTop-(checkOffsetTop))});
        },
        checkPostionByIcon:function(dragTarget,posEle,deltaX,deltaY){
            if(posEle.indexOf("r")!="-1"){
                deltaX = -deltaX;
                if(posEle!=".mr"){
                    $(dragTarget).parents(".drag").css({"width":newW,"height":newH});
                }else{
                    $(dragTarget).parents(".drag").css({"width":newW});
                }
                
            }else if(posEle.indexOf("l")!="-1"){
                if(posEle!=".ml"){
                    $(dragTarget).parents(".drag").css({"width":newW,"height":newH});
                }else{
                    $(dragTarget).parents(".drag").css({"width":newW});
                }
            }
        },
        drag_br:function(callback,callback2){
            var me = this;
            $("body").delegate(".br","mousedown",function(e){
                me.brDragStatus = true;
                me.dragStatus = false;
                e.preventDefault();
                var w = $(me.dragTarget).parents(".drag")[0].offsetWidth;
                var h = $(me.dragTarget).parents(".drag")[0].offsetHeight;
                me.oldObj = me.getRect(e,$(me.dragTarget).parents(".drag"),w,h,$(".tl"));
                $("#cke_vAct_modexBox_paragraph_content").hide();
            })
            $(window).mousemove(function(e){
                // e.preventDefault();
                if(me.brDragStatus){
                    me.thisObj = {x:e.pageX,y:e.pageY};
                    me.dragMouseMove(e,".tl",".br");
                    callback&&callback();
                }
            })
            $(document).mouseup(function(e){
                me.brDragStatus = false;
                if(!$(e.target).hasClass("sizeControl")){
                    $(".sizeControl_parent").remove();
                    var vAct_modexBox_paragraphId = $(me.dragTarget).parents(".vAct_modexBox_paragraphId,.vAct_modexBox_pictureId");
                    if(vAct_modexBox_paragraphId.attr("id")){
                        me.getStyle(vAct_modexBox_paragraphId,vAct_modexBox_paragraphId.attr("id"))
                        if($(e.target).parents(".dragBox")[0]){
                            callback2&&callback2(e)
                        }
                    }
                }
            })
        },
        drag_bl:function(callback,callback2){
            var me = this;
            $("body").delegate(".bl","mousedown",function(e){
                me.blDragStatus = true;
                me.dragStatus = false;
                var rect = $(".drag")[0].getBoundingClientRect();
                $("#cke_vAct_modexBox_paragraph_content").hide();
                e.preventDefault();
                var w = $(me.dragTarget).parents(".drag")[0].offsetWidth;
                var h = $(me.dragTarget).parents(".drag")[0].offsetHeight;
                me.oldObj = me.getRect(e,$(me.dragTarget).parents(".drag"),w,h,$(".tr"));
            })
            $(window).mousemove(function(e){
                // e.preventDefault();
                if(me.blDragStatus){
                    me.thisObj = {x:e.pageX,y:e.pageY};
                    me.dragMouseMove(e,".tr",".bl");
                    callback&&callback();
                }
            })
            $(document).mouseup(function(e){
                me.blDragStatus = false;
                if(!$(e.target).hasClass("sizeControl")){
                    $(".sizeControl_parent").remove();
                    var vAct_modexBox_paragraphId = $(me.dragTarget).parents(".vAct_modexBox_paragraphId,.vAct_modexBox_pictureId");
                    if(vAct_modexBox_paragraphId.attr("id")){
                        me.getStyle(vAct_modexBox_paragraphId,vAct_modexBox_paragraphId.attr("id"))
                        if($(e.target).parents(".dragBox")[0]){
                            callback2&&callback2(e)
                        }
                    }
                }
            })
        },
        drag_tl:function(callback,callback2){
            var me = this;
            $("body").delegate(".tl","mousedown",function(e){
                me.tlDragStatus = true;
                me.dragStatus = false;
                var rect = $(".drag")[0].getBoundingClientRect();
                $("#cke_vAct_modexBox_paragraph_content").hide();
                e.preventDefault();
                var w = $(me.dragTarget).parents(".drag")[0].offsetWidth;
                var h = $(me.dragTarget).parents(".drag")[0].offsetHeight;
                me.oldObj = me.getRect(e,$(me.dragTarget).parents(".drag"),w,h,$(".br"));
            })
            $(window).mousemove(function(e){
                // e.preventDefault();
                if(me.tlDragStatus){
                    me.thisObj = {x:e.pageX,y:e.pageY};
                    me.dragMouseMove(e,".br",".tl");
                    callback&&callback();
                }
            })
            $(document).mouseup(function(e){
                me.tlDragStatus = false;
                if(!$(e.target).hasClass("sizeControl")){
                    $(".sizeControl_parent").remove();
                    var vAct_modexBox_paragraphId = $(me.dragTarget).parents(".vAct_modexBox_paragraphId,.vAct_modexBox_pictureId");
                    if(vAct_modexBox_paragraphId.attr("id")){
                        me.getStyle(vAct_modexBox_paragraphId,vAct_modexBox_paragraphId.attr("id"))
                    }
                }
            })
        },
        drag_tr:function(callback){
            var me = this;
            $("body").delegate(".tr","mousedown",function(e){
                me.trDragStatus = true;
                me.dragStatus = false;
                var rect = $(".drag")[0].getBoundingClientRect();
                $("#cke_vAct_modexBox_paragraph_content").hide();
                e.preventDefault();
                var w = $(me.dragTarget).parents(".drag")[0].offsetWidth;
                var h = $(me.dragTarget).parents(".drag")[0].offsetHeight;
                me.oldObj = me.getRect(e,$(me.dragTarget).parents(".drag"),w,h,$(".bl"));
            })
            $(window).mousemove(function(e){
                // e.preventDefault();
                if(me.trDragStatus){
                    me.thisObj = {x:e.pageX,y:e.pageY};
                    me.dragMouseMove(e,".bl",".tr");
                    callback&&callback();
                }
            })
            $(window).mouseup(function(e){
                me.trDragStatus = false;
                if(!$(e.target).hasClass("sizeControl")){
                    $(".sizeControl_parent").remove();
                    var vAct_modexBox_paragraphId = $(me.dragTarget).parents(".vAct_modexBox_paragraphId,.vAct_modexBox_pictureId");
                    //console.log(vAct_modexBox_paragraphId.attr("id"))
                    if(vAct_modexBox_paragraphId.attr("id")){
                        me.getStyle(vAct_modexBox_paragraphId,vAct_modexBox_paragraphId.attr("id"))
                        if($(e.target).parents(".dragBox")[0]){
                            callback2&&callback2(e)
                        }
                    }
                }
            })
        },
        drag_bm:function(callback,callback2){
            var me = this;
            $("body").delegate(".bm","mousedown",function(e){
                me.bmDragStatus = true;
                me.dragStatus = false;
                var rect = $(".drag")[0].getBoundingClientRect();
                $("#cke_vAct_modexBox_paragraph_content").hide();
                e.preventDefault();
                var w = $(me.dragTarget).parents(".drag")[0].offsetWidth;
                var h = $(me.dragTarget).parents(".drag")[0].offsetHeight;
                me.oldObj = me.getRect(e,$(me.dragTarget).parents(".drag"),w,h,$(".tm"));
            })
            $(window).mousemove(function(e){
                // e.preventDefault();
                if(me.bmDragStatus){
                    me.thisObj = {x:e.pageX,y:e.pageY};
                    me.dragMouseMove(e,".tm",".bm");
                    callback&&callback();
                }
            })
            $(document).mouseup(function(e){
                me.bmDragStatus = false;
                if(!$(e.target).hasClass("sizeControl")){
                    $(".sizeControl_parent").remove();
                    var vAct_modexBox_paragraphId = $(me.dragTarget).parents(".vAct_modexBox_paragraphId,.vAct_modexBox_pictureId");
                    if(vAct_modexBox_paragraphId.attr("id")){
                        me.getStyle(vAct_modexBox_paragraphId,vAct_modexBox_paragraphId.attr("id"))
                        if($(e.target).parents(".dragBox")[0]){
                            callback2&&callback2(e)
                        }
                    }
                }
            })
        },
        drag_tm:function(callback,callback2){
            var me = this;
            $("body").delegate(".tm","mousedown",function(e){
                me.tmDragStatus = true;
                me.dragStatus = false;
                var rect = $(".drag")[0].getBoundingClientRect();
                $("#cke_vAct_modexBox_paragraph_content").hide();
                e.preventDefault();
                var w = $(me.dragTarget).parents(".drag")[0].offsetWidth;
                var h = $(me.dragTarget).parents(".drag")[0].offsetHeight;
                me.oldObj = me.getRect(e,$(me.dragTarget).parents(".drag"),w,h,$(".bm"));
            })
            $(window).mousemove(function(e){
                // e.preventDefault();
                if(me.tmDragStatus){
                    me.thisObj = {x:e.pageX,y:e.pageY};
                    me.dragMouseMove(e,".bm",".tm");
                    callback&&callback();
                }
            })
            $(document).mouseup(function(e){
                me.tmDragStatus = false;
                if(!$(e.target).hasClass("sizeControl")){
                    $(".sizeControl_parent").remove();
                    var vAct_modexBox_paragraphId = $(me.dragTarget).parents(".vAct_modexBox_paragraphId,.vAct_modexBox_pictureId");
                    if(vAct_modexBox_paragraphId.attr("id")){
                        me.getStyle(vAct_modexBox_paragraphId,vAct_modexBox_paragraphId.attr("id"))
                        if($(e.target).parents(".dragBox")[0]){
                            callback2&&callback2(e)
                        }
                    }
                }
            })
        },
        drag_ml:function(callback,callback2){
            var me = this;
            $("body").delegate(".ml","mousedown",function(e){
                me.mlDragStatus = true;
                me.dragStatus = false;
                var rect = $(".drag")[0].getBoundingClientRect();
                $("#cke_vAct_modexBox_paragraph_content").hide();
                e.preventDefault();
                var w = $(me.dragTarget).parents(".drag")[0].offsetWidth;
                var h = $(me.dragTarget).parents(".drag")[0].offsetHeight;
                me.oldObj = me.getRect(e,$(me.dragTarget).parents(".drag"),w,h,$(".mr"));
            })
            $(window).mousemove(function(e){
                // e.preventDefault();
                if(me.mlDragStatus){
                    me.thisObj = {x:e.pageX,y:e.pageY};
                    me.dragMouseMove(e,".mr",".ml");
                    callback&&callback();
                }
            })
            $(document).mouseup(function(e){
                me.mlDragStatus = false;
                if(!$(e.target).hasClass("sizeControl")){
                    $(".sizeControl_parent").remove();
                    var vAct_modexBox_paragraphId = $(me.dragTarget).parents(".vAct_modexBox_paragraphId,.vAct_modexBox_pictureId");
                    if(vAct_modexBox_paragraphId.attr("id")){
                        me.getStyle(vAct_modexBox_paragraphId,vAct_modexBox_paragraphId.attr("id"))
                        if($(e.target).parents(".dragBox")[0]){
                            callback2&&callback2(e)
                        }
                    }
                }
            })
        },
        drag_mr:function(callback,callback2){
            var me = this;
            $("body").delegate(".mr","mousedown",function(e){
                me.mrDragStatus = true;
                me.dragStatus = false;
                var rect = $(".drag")[0].getBoundingClientRect();
                $("#cke_vAct_modexBox_paragraph_content").hide();
                e.preventDefault();
                var w = $(me.dragTarget).parents(".drag")[0].offsetWidth;
                var h = $(me.dragTarget).parents(".drag")[0].offsetHeight;
                me.oldObj = me.getRect(e,$(me.dragTarget).parents(".drag"),w,h,$(".ml"));
            })
            $(window).mousemove(function(e){
                // e.preventDefault();
                if(me.mrDragStatus){
                    me.thisObj = {x:e.pageX,y:e.pageY};
                    me.dragMouseMove(e,".ml",".mr");
                    callback&&callback();
                }
            })
            $(document).mouseup(function(e){
                me.mrDragStatus = false;
                if(!$(e.target).hasClass("sizeControl")){
                    $(".sizeControl_parent").remove();
                    var vAct_modexBox_paragraphId = $(me.dragTarget).parents(".vAct_modexBox_paragraphId,.vAct_modexBox_pictureId");
                    if(vAct_modexBox_paragraphId.attr("id")){
                        me.getStyle(vAct_modexBox_paragraphId,vAct_modexBox_paragraphId.attr("id"))
                        if($(e.target).parents(".dragBox")[0]){
                            callback2&&callback2(e)
                        }
                    }
                }
            })
        },
        dragAll:function(callback,callback2){
            this.drag_br(callback,callback2);
            this.drag_bl(callback,callback2);
            this.drag_tl(callback,callback2);
            this.drag_tr(callback,callback2);
            this.drag_bm(callback,callback2);
            this.drag_tm(callback,callback2);
            this.drag_ml(callback,callback2);
            this.drag_mr(callback,callback2);
        },
        checkWOrH:function(type,currEle,w,h){
            if(type=="circle"){
                var r = Math.min(w,h)/2;
                $(currEle).attr("cx",r).attr("cy",r).attr("r",r);
            }
        },
        dragInit:function(){
            var me = this;
            this.dragging(".dragBox",$(".dragBox").parent().parent(),function(){},function(e,target,changeDiv,old){
                me.movePos(e,target,changeDiv,old);
                var id = $(me.dragTarget).parents(".drag").parent().attr("id");

                me.rectForPos[id] = {
                    left: parseFloat($(me.dragTarget).parents(".drag")[0].offsetLeft)||"auto",
                    top: parseFloat($(me.dragTarget).parents(".drag")[0].offsetTop)||"auto"
                }
                var theData={
                    eleHeight:$("input[name='module_height']").val()*1.0,//移动的元素的高度
                    parentsDivHeight:$(".left").height(),//最外层父元素的高度
                    scrollDivHeight:$(".mobile-container").height()+20,//可视区域的高度
                    scrollTop:$(".mobile-container").scrollTop(),//滚动的距离
                }
                if(me.rectForPos[id].top+theData.eleHeight>theData.parentsDivHeight){
                    $(".left").height(me.rectForPos[id].top+theData.eleHeight);
                    $(".mobile-container").scrollTop(me.rectForPos[id].top+theData.eleHeight)
                }else{
                    if(theData.scrollTop-75>me.rectForPos[id].top){
                        $(".mobile-container").scrollTop(me.rectForPos[id].top+75)
                    }else if(theData.scrollDivHeight-75+theData.scrollTop-theData.eleHeight<me.rectForPos[id].top){
                        $(".mobile-container").scrollTop(me.rectForPos[id].top+theData.eleHeight+75-theData.scrollDivHeight)
                    }
                }
                //console.log($(".mobile-container").scrollTop()+","+me.rectForPos[id].top+","+($(".mobile-container").scrollTop()-75>me.rectForPos[id].top))
                $("input[name='module_pos_left']").val(me.rectForPos[id].left);
                $("input[name='module_pos_top']").val(me.rectForPos[id].top);
                //$("input[name='module_width']").val(me.rectForPos[id].width);
                //$("input[name='module_height']").val(me.rectForPos[id].height);
            });
            this.dragAll(function(){
                var w = $(me.dragTarget).find("svg").width();
                var h = $(me.dragTarget).find("svg").height();
                var type = $(me.dragTarget).find("svg").children().attr("data-type");
                me.checkWOrH(type,$(me.dragTarget).find("svg").children(),w,h)
                var r = Math.min(w,h)/2;
                $(me.dragTarget).find("svg").children().width(w).height(h).attr("cx",r).attr("cy",r).attr("r",r);
                var id = $(me.dragTarget).parents(".drag").parent().attr("id");

                me.rectForPos[id] = {
                    left: parseInt($(me.dragTarget).parents(".drag")[0].offsetLeft)||"auto",
                    top: parseInt($(me.dragTarget).parents(".drag")[0].offsetTop)||"auto",
                    width: $(me.dragTarget).parents(".drag")[0].offsetWidth,
                    height: $(me.dragTarget).parents(".drag")[0].offsetHeight
                }


                $("input[name='module_pos_left']").val(me.rectForPos[id].left);
                $("input[name='module_pos_top']").val(me.rectForPos[id].top);
                $("input[name='module_width']").val(me.rectForPos[id].width);
                $("input[name='module_height']").val(me.rectForPos[id].height);
            },function(){
                pubsub.publish('dataChange');
            })
        }
    }
    // $.fn.dragInit = function(){
    //     this.dragging(".dragBox",$(".dragBox").parent().parent(),function(){},function(e,target,changeDiv,old){
    //         me.movePos(e,target,changeDiv,old);
    //     });
    //     this.drag_br();
    //     this.drag_bl();
    //     this.drag_tl();
    //     this.drag_tr();
    //     this.drag_bm();
    //     this.drag_tm();
    //     this.drag_ml();
    //     this.drag_mr();
    // }
    return dragObject;
})