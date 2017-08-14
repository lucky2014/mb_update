define(function(require,exports,module){
    var $ = require("jquery");
var dragObject = {
    dragStatus:false,
    dragTarget:null,
    blDragStatus:false,
    tlDragStatus:false,
    trDragStatus:false,
    bmDragStatus:false,
    tmDragStatus:false,
    mlDragStatus:false,
    mrDragStatus:false,
    oldObj:{},
    thisObj:{},
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
    dragging:function(target,changeDiv,beforeMove,callback,afterMove){
        var me = this;
        $(".mobile-container").delegate(target,"mousedown",function(e){
            if(me.edit==true){
                return;
            }
            if($(this).attr("contenteditable")){
                return;
            }
            e.preventDefault();
            me.dragStatus = true;
            me.dragTarget = this;
            $(this).addClass("drag_selected")
            beforeMove&&beforeMove(e);
        })
        $(".mobile-container").mousemove(function(e){
            if(me.edit==true){
                return;
            }
            if(me.dragStatus){
                callback&&callback(e,target,$(me.dragTarget).parent().parent(),this)
            }
        })
        $(".mobile-container").delegate(target,"click",function(e){
            // me.stopBubble(e)
            $(this).css("cursor","move");
            if(!$(".sizeControl_parent")[0]){
                var str = '<div class="sizeControl tl"></div>'+
                      '<div class="sizeControl tm"></div>'+
                      '<div class="sizeControl tr"></div>'+
                      '<div class="sizeControl ml"></div>'+
                      '<div class="sizeControl mr"></div>'+
                      '<div class="sizeControl bl"></div>'+
                      '<div class="sizeControl bm"></div>'+
                      '<div class="sizeControl br"></div>'+
                      '<div class="rotateControl-point ui-draggable" title="旋转"></div>'
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
                    afterMove&&afterMove(e);
                    $(me.dragTarget).removeClass("drag_selected");
                }
            }
        })
    },
    movePos:function(e,target,changeDiv){
        var me = this;
        var lf = parseInt($(changeDiv).css("left"));
        var tp = parseInt($(changeDiv).css("top"));
        var offsetLeft = $(".VACT_main_page_index_box").offset().left;
        var offsetTop = $(".VACT_main_page_index_box").offset().top;
        var w = $(changeDiv).width()/2;
        var h = $(changeDiv).height()/2;
        $(changeDiv).css({"left":e.pageX-offsetLeft-w,"top":e.pageY-offsetTop-h});
    },
    drag_br:function(){
        var me = this;
        $("body").delegate(".br","mousedown",function(e){
            me.brDragStatus = true;
            var rect = $(".drag")[0].getBoundingClientRect();
            var w = $(".drag")[0].offsetWidth;
            me.dragStatus = false;
            e.preventDefault();
            $("#cke_vAct_modexBox_paragraph_content").hide();
            $(me.dragTarget).parents(".drag").css({"transform-origin":"0 0"})
            var h = $(".drag")[0].offsetHeight;
            me.oldObj = {x:e.pageX,y:e.pageY,w:w,h:h}
        })
        $(window).mousemove(function(e){
            // e.preventDefault();
            if(me.brDragStatus){
                me.thisObj = {x:e.pageX,y:e.pageY};
                var deltaX = e.pageX-me.oldObj.x;
                var deltaY = e.pageY-me.oldObj.y;
                var w = me.oldObj.w;
                var h = me.oldObj.h;
                if(Math.cos(me._radian)>0){
                    var newW = ((w+deltaX)<60?60:(w+deltaX));
                    var newH = (newW*h/w)<16?"auto":(newW*h/w);
                }else{
                    var newW = ((w-deltaX)<60?60:(w-deltaX));
                    var newH = (newW*h/w)<16?"auto":(newW*h/w);
                }
                $(me.dragTarget).parents(".drag").css({"width":newW,"height":newH});
            }
        })
        $(document).mouseup(function(e){
            me.brDragStatus = false;
            if(!$(e.target).hasClass("sizeControl")){
                $(".sizeControl_parent").remove();
                var vAct_modexBox_paragraphId = $(me.dragTarget).parents(".vAct_modexBox_paragraphId");
                if(vAct_modexBox_paragraphId.attr("id")){
                    me.getStyle(vAct_modexBox_paragraphId,vAct_modexBox_paragraphId.attr("id"))
                }
            }
        })
    },
    drag_bl:function(){
        var me = this;
        $("body").delegate(".bl","mousedown",function(e){
            me.blDragStatus = true;
            me.dragStatus = false;
            var rect = $(".drag")[0].getBoundingClientRect();
            $("#cke_vAct_modexBox_paragraph_content").hide();
            var w = $(".drag")[0].offsetWidth;
            e.preventDefault();
            $(me.dragTarget).parents(".drag").css("transform-origin","right top")
            var h = $(".drag")[0].offsetHeight;
            me.oldObj = {x:e.pageX,y:e.pageY,w:w,h:h,lf:parseInt($(".drag").css("left")),tp:parseInt($(".drag").css("top"))}
        })
        $(window).mousemove(function(e){
            // e.preventDefault();
            if(me.blDragStatus){
                me.thisObj = {x:e.pageX,y:e.pageY};
                var deltaX = e.pageX-me.oldObj.x;
                var deltaY = e.pageY-me.oldObj.y;
                var w = me.oldObj.w;
                var h = me.oldObj.h;
                var newW = parseInt((w-deltaX)<60?60:(w-deltaX));
                var newH = parseInt((me.newW*h/w)<48?48:(newW*h/w));
                $(me.dragTarget).parents(".drag").css({"width":newW,"height":newH});
                me.newX = parseInt(newW-w);
                me.newY = (h*Math.cos(me._radian)+w*Math.sin(me._radian))-(newH*Math.cos(me._radian)+newW*Math.sin(me._radian));
                $(me.dragTarget).parents(".drag").css({"left":me.oldObj.lf-me.newX,"top":me.oldObj.tp})
            }
        })
        $(document).mouseup(function(e){
            me.blDragStatus = false;
            if(!$(e.target).hasClass("sizeControl")){
                $(".sizeControl_parent").remove();
                var vAct_modexBox_paragraphId = $(me.dragTarget).parents(".vAct_modexBox_paragraphId");
                if(vAct_modexBox_paragraphId.attr("id")){
                    me.getStyle(vAct_modexBox_paragraphId,vAct_modexBox_paragraphId.attr("id"))
                }
            }
        })
    },
    drag_tl:function(){
        var me = this;
        $("body").delegate(".tl","mousedown",function(e){
            me.tlDragStatus = true;
            me.dragStatus = false;
            var rect = $(".drag")[0].getBoundingClientRect();
            var w = $(".drag")[0].offsetWidth;
            e.preventDefault();
            $("#cke_vAct_modexBox_paragraph_content").hide();
            $(me.dragTarget).parents(".drag").css("transform-origin","right bottom")
            var h = $(".drag")[0].offsetHeight;
            me.oldObj = {x:e.pageX,y:e.pageY,w:w,h:h,lf:parseInt($(".drag").css("left")),tp:parseInt($(".drag").css("top"))}
        })
        $(window).mousemove(function(e){
            // e.preventDefault();
            if(me.tlDragStatus){
                me.thisObj = {x:e.pageX,y:e.pageY};
                var deltaX = e.pageX-me.oldObj.x;
                var deltaY = e.pageY-me.oldObj.y;
                var w = me.oldObj.w;
                var h = me.oldObj.h;
                var newW = parseInt((w-deltaX)<60?60:(w-deltaX));
                var newH = parseInt((me.newW*h/w)<48?48:(newW*h/w));
                $(me.dragTarget).parents(".drag").css({"width":newW,"height":newH});
                me.newX = parseInt(newW-w);
                me.newY = parseInt(newH-h);
                $(me.dragTarget).parents(".drag").css({"top":me.oldObj.tp-me.newY,"left":me.oldObj.lf-me.newX})
            }
        })
        $(document).mouseup(function(e){
            me.tlDragStatus = false;
            if(!$(e.target).hasClass("sizeControl")){
                $(".sizeControl_parent").remove();
                var vAct_modexBox_paragraphId = $(me.dragTarget).parents(".vAct_modexBox_paragraphId");
                if(vAct_modexBox_paragraphId.attr("id")){
                    me.getStyle(vAct_modexBox_paragraphId,vAct_modexBox_paragraphId.attr("id"))
                }
            }
        })
    },
    drag_tr:function(){
        var me = this;
        $("body").delegate(".tr","mousedown",function(e){
            me.trDragStatus = true;
            me.dragStatus = false;
            var rect = $(".drag")[0].getBoundingClientRect();
            var w = $(".drag")[0].offsetWidth;
            e.preventDefault();
            $("#cke_vAct_modexBox_paragraph_content").hide();
            $(me.dragTarget).parents(".drag").css("transform-origin","left bottom")
            var h = $(".drag")[0].offsetHeight;
            me.oldObj = {x:e.pageX,y:e.pageY,w:w,h:h,lf:parseInt($(".drag").css("left")),tp:parseInt($(".drag").css("top"))}
        })
        $(window).mousemove(function(e){
            // e.preventDefault();
            if(me.trDragStatus){
                me.thisObj = {x:e.pageX,y:e.pageY};
                var deltaX = e.pageX-me.oldObj.x;
                var deltaY = e.pageY-me.oldObj.y;
                var w = me.oldObj.w;
                var h = me.oldObj.h;
                var newW = parseInt((w+deltaX)<60?60:(w+deltaX));
                var newH = parseInt((me.newW*h/w)<48?48:(newW*h/w));
                $(me.dragTarget).parents(".drag").css({"width":newW,"height":newH});
                me.newX = parseInt(newW-w);
                me.newY = parseInt(newH-h);
                $(me.dragTarget).parents(".drag").css({"top":me.oldObj.tp-me.newY,"left":me.oldObj.left})
            }
        })
        $(document).mouseup(function(e){
            me.trDragStatus = false;
            if(!$(e.target).hasClass("sizeControl")){
                $(".sizeControl_parent").remove();
                var vAct_modexBox_paragraphId = $(me.dragTarget).parents(".vAct_modexBox_paragraphId");
                if(vAct_modexBox_paragraphId.attr("id")){
                    me.getStyle(vAct_modexBox_paragraphId,vAct_modexBox_paragraphId.attr("id"))
                }
            }
        })
    },
    drag_bm:function(){
        var me = this;
        $("body").delegate(".bm","mousedown",function(e){
            me.bmDragStatus = true;
            var rect = $(".drag")[0].getBoundingClientRect();
            var w = $(".drag")[0].offsetWidth;
            $("#cke_vAct_modexBox_paragraph_content").hide();
            me.dragStatus = false;
            $(me.dragTarget).parents(".drag").css({"transform-origin":"center top"})
            var h = $(".drag")[0].offsetHeight;
            e.preventDefault();
            me.oldObj = {x:e.pageX,y:e.pageY,w:w,h:h}
        })
        $(window).mousemove(function(e){
            // e.preventDefault();
            if(me.bmDragStatus){
                me.thisObj = {x:e.pageX,y:e.pageY};
                var deltaX = e.pageX-me.oldObj.x;
                var deltaY = e.pageY-me.oldObj.y;
                var w = me.oldObj.w;
                var h = me.oldObj.h;
                var newH = h+deltaY;
                $(me.dragTarget).parents(".drag").css({"height":newH});
            }
        })
        $(document).mouseup(function(e){
            me.bmDragStatus = false;
            if(!$(e.target).hasClass("sizeControl")){
                $(".sizeControl_parent").remove();
                var vAct_modexBox_paragraphId = $(me.dragTarget).parents(".vAct_modexBox_paragraphId");
                if(vAct_modexBox_paragraphId.attr("id")){
                    me.getStyle(vAct_modexBox_paragraphId,vAct_modexBox_paragraphId.attr("id"))
                }
            }
        })
    },
    drag_tm:function(){
        var me = this;
        $("body").delegate(".tm","mousedown",function(e){
            me.tmDragStatus = true;
            var rect = $(".drag")[0].getBoundingClientRect();
            var w = $(".drag")[0].offsetWidth;
            me.dragStatus = false;
            e.preventDefault();
            $("#cke_vAct_modexBox_paragraph_content").hide();
            $(me.dragTarget).parents(".drag").css({"transform-origin":"center bottom"});
            var tp = parseInt($(me.dragTarget).parents(".drag").css("top"));
            var h = $(".drag")[0].offsetHeight;
            me.oldObj = {x:e.pageX,y:e.pageY,w:w,h:h,tp:tp}
        })
        $(window).mousemove(function(e){
            // e.preventDefault();
            if(me.tmDragStatus){
                me.thisObj = {x:e.pageX,y:e.pageY};
                var deltaX = e.pageX-me.oldObj.x;
                var deltaY = e.pageY-me.oldObj.y;
                var w = me.oldObj.w;
                var h = me.oldObj.h;
                var newH = h-deltaY;
                var newTp = newH-h;
                $(me.dragTarget).parents(".drag").css({"height":newH});
                $(me.dragTarget).parents(".drag").css({"top":(me.oldObj.tp-newTp)})
            }
        })
        $(document).mouseup(function(e){
            me.tmDragStatus = false;
            if(!$(e.target).hasClass("sizeControl")){
                $(".sizeControl_parent").remove();
                var vAct_modexBox_paragraphId = $(me.dragTarget).parents(".vAct_modexBox_paragraphId");
                if(vAct_modexBox_paragraphId.attr("id")){
                    me.getStyle(vAct_modexBox_paragraphId,vAct_modexBox_paragraphId.attr("id"))
                }
            }
        })
    },
    drag_ml:function(){
        var me = this;
        $("body").delegate(".ml","mousedown",function(e){
            me.mlDragStatus = true;
            var rect = $(".drag")[0].getBoundingClientRect();
            var w = $(".drag")[0].offsetWidth;
            me.dragStatus = false;
            e.preventDefault();
            $("#cke_vAct_modexBox_paragraph_content").hide();
            $(me.dragTarget).parents(".drag").css({"transform-origin":"right center"});
            var lf = parseInt($(me.dragTarget).parents(".drag").css("left"));
            var h = $(".drag")[0].offsetHeight;
            me.oldObj = {x:e.pageX,y:e.pageY,w:w,h:h,lf:lf}
        })
        $(window).mousemove(function(e){
            // e.preventDefault();
            if(me.mlDragStatus){
                me.thisObj = {x:e.pageX,y:e.pageY};
                var deltaX = e.pageX-me.oldObj.x;
                var deltaY = e.pageY-me.oldObj.y;
                var w = me.oldObj.w;
                var h = me.oldObj.h;
                var newW = w-deltaX;
                var newLf = newW-w;
                $(me.dragTarget).parents(".drag").css({"width":newW});
                $(me.dragTarget).parents(".drag").css({"left":(me.oldObj.lf-newLf)})
            }
        })
        $(document).mouseup(function(e){
            me.mlDragStatus = false;
            if(!$(e.target).hasClass("sizeControl")){
                $(".sizeControl_parent").remove();
                var vAct_modexBox_paragraphId = $(me.dragTarget).parents(".vAct_modexBox_paragraphId");
                if(vAct_modexBox_paragraphId.attr("id")){
                    me.getStyle(vAct_modexBox_paragraphId,vAct_modexBox_paragraphId.attr("id"))
                }
            }
        })
    },
    drag_mr:function(){
        var me = this;
        $("body").delegate(".mr","mousedown",function(e){
            me.mrDragStatus = true;
            var rect = $(".drag")[0].getBoundingClientRect();
            var w = $(".drag")[0].offsetWidth;
            me.dragStatus = false;
            e.preventDefault();
            $("#cke_vAct_modexBox_paragraph_content").hide();
            $(me.dragTarget).parents(".drag").css({"transform-origin":"left center"});
            var lf = parseInt($(me.dragTarget).parents(".drag").css("left"));
            var h = $(".drag")[0].offsetHeight;
            me.oldObj = {x:e.pageX,y:e.pageY,w:w,h:h,lf:lf}
        })
        $(window).mousemove(function(e){
            // e.preventDefault();
            if(me.mrDragStatus){
                me.thisObj = {x:e.pageX,y:e.pageY};
                var deltaX = e.pageX-me.oldObj.x;
                var deltaY = e.pageY-me.oldObj.y;
                var w = me.oldObj.w;
                var h = me.oldObj.h;
                var newW = w+deltaX;
                $(me.dragTarget).parents(".drag").css({"width":newW});
            }
        })
        $(document).mouseup(function(e){
            me.mrDragStatus = false;
            if(!$(e.target).hasClass("sizeControl")){
                $(".sizeControl_parent").remove();
                var vAct_modexBox_paragraphId = $(me.dragTarget).parents(".vAct_modexBox_paragraphId");
                if(vAct_modexBox_paragraphId.attr("id")){
                    me.getStyle(vAct_modexBox_paragraphId,vAct_modexBox_paragraphId.attr("id"))
                }
            }
        })
    },
    dragInit:function(){
        var me = this;
    	this.dragging(".dragBox",$(".dragBox").parent().parent(),function(){},function(e,target,changeDiv){
            me.movePos(e,target,changeDiv);
        });
    	this.drag_br();
        this.drag_bl();
        this.drag_tl();
        this.drag_tr();
        this.drag_bm();
        this.drag_tm();
        this.drag_ml();
        this.drag_mr();
    }
}
return dragObject;
})