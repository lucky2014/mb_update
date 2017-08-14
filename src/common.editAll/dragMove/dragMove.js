define(function(require,exports,module){
    var $ = require("jquery");
    var dragMoveObj = {
        dragStatus:false,
        targetSymbolArr:[],
        oldTargetSymbol:null,
        components:[],
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
                                div.setAttribute("ind",$(targetMove).attr("ind"));
                                div.setAttribute("symbol",$(targetMove).attr("symbol"));
                                me.targetSymbolArr = [self.eq(i).attr("symbol"),"after"];
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
                                var className = $(".dragMoveNewName")[0].className;
                                $(".dragMoveNewName").remove();
                                div.id = id;
                                div.className ="dragMoveNewName "+className;
                                div.style = "width:"+w+"px;height:"+h+"px";
                                div.setAttribute("ind",$(targetMove).attr("ind"));
                                div.setAttribute("symbol",$(targetMove).attr("symbol"));
                                me.targetSymbolArr = [self.eq(i).attr("symbol"),"before"];
                                self.eq(i).before(div)
                            }   
                        }
                    }
                }
            }
        },
        dragMoveFn:function(callback){
            var me = this;
            var dragStatus = false;
            var targetMove = null;
            var oldTop = 0,
                newTop = 0;
            $("body").delegate(".leftDiv:not(.sky,.footernav)","mousedown",function(e){
                e.preventDefault();
                if($(this).hasClass("active")){
                    if(!$(".dragMoveName")[0]){
                        var div = me.createMovedEle(this);
                        dragStatus = true;
                        var ind = $(this).attr("ind");
                        me.oldTargetSymbol = $(this).attr("symbol");
                        oldTop = e.clientY;
                        targetMove = this;
                        $("body").append(div)
                    }
                }
            })
            $(window).mousemove(function(e){
                if(dragStatus){
                    var pos = me.getMovePos(e,targetMove);
                    $(".dragMoveName").css(pos);
                    if(e.clientY>=(window.innerHeight-$(".dragMoveName").height())){
                        $(".mobile-container")[0].scrollTop = $(".mobile-container")[0].scrollTop+2;
                    }else if(e.clientY<=$(".navbar-inner").height()+$(".dragMoveName").height()){
                        $(".mobile-container")[0].scrollTop = $(".mobile-container")[0].scrollTop-2>0?$(".mobile-container")[0].scrollTop-2:0;
                    }
                    me.getAllModalPos(".leftDiv:not(.sky,.footernav)",pos.top,targetMove)
                }
            })
            $("body").delegate(".leftDiv:not(.sky,.footernav)","mouseup",function(e){
                dragStatus = false;
                newTop = e.clientY;
                var deltaY = Math.abs(newTop-oldTop);
                var html = $(".dragMoveName").html();
                $(".dragMoveName").remove();
                $(".dragMoveNewName").html(html);
                $(".dragMoveNewName").removeClass("dragMoveNewName");
                //callback&&callback(); //调用的时候根本没有传这个参数，报错了，先隐去
                var target = $(".leftDiv[symbol='"+me.targetSymbolArr[0]+"']");
                if(deltaY>target.height()/2){
                    pubsub.publish('dataChange');
                    var datas = me.stateDo[me.stateDo.length-1];
                    var targetArr = [].concat(me.stateDo[me.stateDo.length-1].components);
                    me.stateDo[me.stateDo.length-1].components = me.sortOrder(targetArr);
                    //console.log(me.datas)
                }
            })
        },
        sortOrder:function(targetArr){
            var targetArr = [].concat(targetArr);
            var temporaryArr = null;
            var newArr = [];
            for(var i = 0 ;i<targetArr.length;i++){
                var symbol = targetArr[i].symbol;
                
                if(symbol==this.oldTargetSymbol){
                    temporaryArr = targetArr[i];
                    targetArr.splice(i,1);
                }
            }
            for(var i = 0 ;i<targetArr.length;i++){
                var symbol = targetArr[i].symbol;
                if(this.targetSymbolArr[1]=="after"){
                    if(symbol==this.targetSymbolArr[0]){
                        newArr.push(targetArr[i])
                        newArr.push(temporaryArr)
                    }else{
                        newArr.push(targetArr[i])
                    }
                }else if(this.targetSymbolArr[1]=="before"){
                    if(symbol==this.targetSymbolArr[0]){
                        newArr.push(temporaryArr)
                        newArr.push(targetArr[i])
                    }else{
                        newArr.push(targetArr[i])
                    }
                }
            }
            return newArr;
        },
        getMovePos:function(e,target){
            var rect = {};
            rect.left = e.clientX-$(target).width()/2+document.body.scrollLeft;
            rect.top = e.clientY-$(target).height()/2+document.body.scrollTop;
            return rect;
        },
        createMovedEle:function(target){
            var div = document.createElement("div");
            var className = target.className;
            var id= target.id;
            div.className = "dragMoveName "+className.split("active")[0];
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