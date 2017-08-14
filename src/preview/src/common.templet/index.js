define(function(require,exports,module){
    var $ = require("jquery");
    require("common.color/colorpicker")
    require("common.color/colorpicker.css")
    require("waterfall");
    require("plugins/froala_editor.min.js");
    var Engine = require("engine");
    var box = Engine.init();
    var setup = require("setup");
    var formatImg = require("common.formatImg/index");
    function getMatrix(radian, x, y) {
        //console.log(radian)
        var Cos = Math.cos(radian), Sin = Math.sin(radian);
        return {
            M11: Cos * x, M12:-Sin * y,
            M21: Sin * x, M22: Cos * y
        };
    }
    var app = {
        dragStatus:false,
        isEdit:false,
        tlDragStatus:false,
        tmDragStatus:false,
        brDragStatus:false,
        ptDragStatus:false,
        oldObj:{},
        thisObj:{},
        _mrX:0,
        _mrY:0,
        _mrRadian:0,
        _radian:0,
        styleSheet:{},
        dragTarget:null,
        show: function() {
            var matrix = getMatrix( this._radian, this._y, this._x );
            //ÉèÖÃ±äÐÎÑùÊ½
            this._img.style[ css3Transform ] = "matrix("
                + matrix.M11.toFixed(16) + "," + matrix.M21.toFixed(16) + ","
                + matrix.M12.toFixed(16) + "," + matrix.M22.toFixed(16) + ", 0, 0)";
        },
        colorPicker:function(currEle){
            var me = this;
           $(currEle).ColorPicker({
                    color: '#0000ff',
                    onShow: function (colpkr) {
                        $(colpkr).fadeIn(500);
                        return false;
                    },
                    onHide: function (colpkr) {
                        $(colpkr).fadeOut(500);
                        return false;
                    },
                    onChange: function (hsb, hex, rgb) {
                        $(currEle).css('backgroundColor', '#' + hex);
                        //console.log(currEle)
                        if(currEle==".skin-colorSelector-border"){
                            $(me.dragTarget).css("border-color",'#' + hex);
                        }else if(currEle==".skin-colorSelector-bg"){
                            $(me.dragTarget).css("backgroundColor",'#' + hex);
                        }
                    }
            });
        },
        dragging:function(target,changeDiv,beforeMove,callback,afterMove){
            var me = this;
            $(".mobile-container").delegate(target,"mousedown",function(e){
                if(me.edit==true){
                    return;
                }
                me.dragStatus = true;
                me.dragTarget = this;
                $(this).addClass("drag_selected")
                beforeMove&&beforeMove(e);
            })
            $(".mobile-container").mousemove(function(e){
                e.preventDefault();
                if(me.edit==true){
                    return;
                }
                if(me.dragStatus){
                    callback&&callback(e,target,$(me.dragTarget).parent().parent(),this)
                }
            })
            $(".mobile-container").delegate(target,"click",function(){
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
                if($(e.target).parents(".setting-panel")[0]){
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
        rotateFn:function(){
            var me = this;
            $("body").delegate(".rotateControl-point","mousedown",function(e){
                me.ptDragStatus = true;
                var w = $(".drag")[0].offsetWidth;

                var h = $(".drag")[0].offsetHeight;
                var rect = $(".dragBox_parent")[0].getBoundingClientRect();
                me._mrX = rect.left + w / 2;
                me._mrY = rect.top + h / 2;
                me.oldObj = {x:e.pageX,y:e.pageY,w:w,h:h}
            })
            $("body").mousemove(function(e){
                e.preventDefault();
                if(me.ptDragStatus){
                    me.thisObj = {x:e.pageX,y:e.pageY};
                    var deltaX = e.pageX-me.oldObj.x;
                    var deltaY = e.pageY-me.oldObj.y;
                    var w = me.oldObj.w;
                    var h = me.oldObj.h;
                    var huchang = Math.atan2( e.pageY - me._mrY, e.pageX - me._mrX ) - me._mrRadian;
                    me._radian = huchang;
                    $(".dragBox_parent").css({"transform":"rotate("+huchang+"deg)"});
                }
            })
            $(document).mouseup(function(e){
                me.ptDragStatus = false;
                if(!$(e.target).hasClass("sizeControl")){
                    $(".sizeControl_parent").remove();
                }
            })
        },
        drag_br:function(){
            var me = this;
            $("body").delegate(".br","mousedown",function(e){
                me.brDragStatus = true;
                var rect = $(".drag")[0].getBoundingClientRect();
                var w = $(".drag")[0].offsetWidth;

                var h = $(".drag")[0].offsetHeight;
                me.oldObj = {x:e.pageX,y:e.pageY,w:w,h:h}
            })
            $("body").mousemove(function(e){
                e.preventDefault();
                if(me.brDragStatus){
                    me.thisObj = {x:e.pageX,y:e.pageY};
                    var deltaX = e.pageX-me.oldObj.x;
                    var deltaY = e.pageY-me.oldObj.y;
                    var w = me.oldObj.w;
                    var h = me.oldObj.h;
                    //console.log(me.oldObj)
                    var newW = (w*Math.cos(0/180*Math.PI)+deltaX)/w*Math.cos(0/180*Math.PI)*w;
                    var newH = (h*Math.cos(0/180*Math.PI)+deltaY)/h*Math.cos(0/180*Math.PI)*h;
                    $(".drag").css({"width":newW,"height":newH});
                }
            })
            $(document).mouseup(function(e){
                me.brDragStatus = false;
                if(!$(e.target).hasClass("sizeControl")){
                    $(".sizeControl_parent").remove();
                }
            })
        },
        movePos:function(e,target,changeDiv){
            var me = this;
            var lf = parseInt($(changeDiv).css("left"));
            var tp = parseInt($(changeDiv).css("top"));
            $(changeDiv).css({"left":e.pageX-$(changeDiv)[0].offsetWidth/2-$(".mobile-container").offset().left,"top":e.pageY-$(changeDiv)[0].offsetHeight-$(".mobile-container").offset().top})
            me.styleSheet = {"left":e.pageX-$(changeDiv)[0].offsetWidth/2-$(".mobile-container").offset().left,"top":e.pageY-$(changeDiv)[0].offsetHeight-$(".mobile-container").offset().top};
        },
        dragProgress:function(){

        },
        chooseIcons:function(){
            var me = this;
            $(".text").click(function(){
                me.createElementNode(".VACT_main_page_index_box");
                $(".setting-panel").show();
            })
            $("body").delegate(".dragBox","dblclick",function(e){
                me.isEdit = true;
                me.dragStatus = false;
                $(this).attr("contenteditable",true)
                $(this).select();
                $(".setting-panel").show();
            })
            $("body").delegate(".dragBox","blur",function(e){
                $(this).removeAttr("contenteditable");
                me.isEdit = false;
                $(this).select();
                $(".setting-panel").hide();
            })
            $("body").delegate("#border_width_select","change",function(e){
                var value = $(this).find("option:selected").val();
                $(".drag_selected").css("border-width",value);
            })
            $("body").delegate("#border_type_select","change",function(e){
                var value = $(this).find("option:selected").val();
                $(".drag_selected").css("border-style",value);
            })
        },
        createElementNode:function(currEle){
            var oFlag = document.createDocumentFragment();
            var vAct_modexBox_paragraph = document.createElement("div");
            vAct_modexBox_paragraph.id = "vAct_modexBox_paragraph_"+new Date().getTime();
            if(!$(".sizeControl_parent")[0]){
                var str = '<div class="sizeControl tl"></div>'+
                      '<div class="sizeControl tm"></div>'+
                      '<div class="sizeControl tr"></div>'+
                      '<div class="sizeControl ml"></div>'+
                      '<div class="sizeControl mr"></div>'+
                      '<div class="sizeControl bl"></div>'+
                      '<div class="sizeControl bm"></div>'+
                      '<div class="sizeControl br"></div>'+
                      '<div class="rotateControl-point ui-draggable" title="旋转"></div>';
                vAct_modexBox_paragraph.innerHTML = "<div class='drag'><div class='dragBox_parent'><div class='dragBox'>双击此处开始编辑</div><div class='sizeControl_parent'>"+str+"</div></div></div>";
            }
            for(var key in this.styleSheet){
                vAct_modexBox_paragraph.style[key] = this.styleSheet[key];
            }
            oFlag.appendChild(vAct_modexBox_paragraph);
            $(currEle)[0].appendChild(oFlag)
        },
        init:function(){
            var me = this;
                blDragStatus = false;
            $(".dragBox_parent").css({"transform":"rotate(0deg)"});
            var lf = parseInt($(".dragBox_parent").css("left"));
            var tp = parseInt($(".dragBox_parent").css("top"));
            this.rotateFn();
            this.dragging(".dragBox",$(".dragBox").parent().parent(),function(){},function(e,target,changeDiv){
                me.movePos(e,target,changeDiv);
            });
            // this.drag_br();
            this.chooseIcons();
        }   
    }
    app.init();
    $('.mobile-container').editable({inlineMode: false, alwaysBlank: true})
    app.colorPicker('.skin-colorSelector-border');
    app.colorPicker('.skin-colorSelector-bg');
    return app;
});