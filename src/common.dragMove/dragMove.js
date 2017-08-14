define(function(require,exports,module){
    var $ = require("jquery");
    var dragMoveObj = {
        dragStatus:false,
        getAllModalPos:function(currEle,targetTp,targetMove){
            var me = this;
            var self = $(currEle);
            for(var i = 0;i<self.length;i++){
                if(!self.eq(i).hasClass("dragMoveName")){
                    var tp = parseInt(self.eq(i).offset().top)+self.eq(i).height()/2;
                    if(i<self.length-2&&i>0){
                        var tpNext = parseInt(self.eq(i+1).offset().top)+self.eq(i+1).height()/2;
                        if(targetTp>tp&&targetTp<tpNext){
                            if(!self.eq(i).hasClass("dragMoveNewName")){
                                var div = document.createElement("div");
                                var w = $(".dragMoveNewName").width();
                                var h = $(".dragMoveNewName").height();
                                var id = $(".dragMoveNewName")[0].id;
                                var className = $(".dragMoveNewName")[0].className;
                                $(".dragMoveNewName").remove();
                                div.id = id;
                                div.className ="dragMoveNewName "+className;
                                div.style = "width:"+w+"px;height:"+h+"px";
                                div.setAttribute("ind",$(targetMove).attr("ind"))
                                self.eq(i).after(div)
                            }   
                        }
                    }else if(i==0){
                        var tp = parseInt(self.eq(i).offset().top+self.eq(i).height()/2);
                        if(targetTp<tp){
                            if(!self.eq(i).hasClass("dragMoveNewName")){
                                var div = document.createElement("div");
                                var w = $(".dragMoveNewName").width();
                                var h = $(".dragMoveNewName").height();
                                var id = $(".dragMoveNewName")[0].id;
                                var ind = $(".dragMoveNewName").attr("ind");
                                //console.log(ind)
                                var className = $(".dragMoveNewName")[0].className;
                                $(".dragMoveNewName").remove();
                                div.id = id;
                                div.className ="dragMoveNewName "+className;
                                div.style = "width:"+w+"px;height:"+h+"px";
                                div.setAttribute("ind",$(targetMove).attr("ind"))
                                self.eq(i).before(div)
                            }   
                        }
                    }
                }
            }
        },
        dragMove:function(){
            var me = this;
            var dragStatus = false;
            var targetMove = null;
            $("body").delegate(".banner,.companyAbstract,.companyInformation,.companyProduct,.companyMien,.footernav","dblclick",function(e){
                e.preventDefault();
                if(!$(".dragMoveName")[0]){
                    var div = me.createMovedEle(this);
                    dragStatus = true;
                    targetMove = this;
                    $("body").append(div)
                }
            })
            $(window).mousemove(function(e){
                if(dragStatus){
                    var pos = me.getMovePos(e,targetMove);
                    $(".dragMoveName").css(pos)
                    me.getAllModalPos(".banner,.companyAbstract,.companyInformation,.companyProduct,.companyMien,.footernav",pos.top,targetMove)
                }
            })
            $("body").delegate(".banner,.companyAbstract,.companyInformation,.companyProduct,.companyMien,.footernav","mouseup",function(e){
                dragStatus = false;
                var html = $(".dragMoveName").html();
                $(".dragMoveName").remove();
                $(".dragMoveNewName").html(html);
                $(".dragMoveNewName").removeClass("dragMoveNewName");
            })
        },
        getMovePos:function(e,target){
            var rect = {};
            rect.left = e.clientX-$(target).width()/2;
            rect.top = e.clientY-$(target).height()/2;
            return rect;
        },
        createMovedEle:function(target){
            var div = document.createElement("div");
            var className = target.className;
            var id= target.id;
            div.className = "dragMoveName "+className;
            div.id = id;
            var w = $(target).width();
            var h = $(target).height();
            var lf = $(target).offset().left;
            var tp = $(target).offset().top;
            var html = $(target).html();
            var ind = $(target).attr("ind");
            $(target).html("").css({"width":w,"height":h}).addClass("dragMoveNewName");
            div.setAttribute("ind",ind);
            div.style = "z-index:999;width:"+w+"px;height:"+h+"px;left:"+lf+"px;top:"+tp+"px;position:absolute;";
            div.innerHTML = html;
            return div;
        }
    }
    return dragMoveObj;
})