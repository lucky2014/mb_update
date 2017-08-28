define(function(require,exports,module){
    var $ = require("jquery");
    document.ondragstart=function() {return false;}
    var beginHeight,beginY,goType;
    //元素整体拖动
    $(".mobile-container").delegate(".ctrlIcon","mousedown",function(e){
        beginY=e.pageY;
        beginHeight=$(".left").height();
        goType=0;
        boxMouseDown();
    });
    //按下鼠标并移动时(拖动)，调用的函数；
    function boxStartSelection(e){
        var moveHeight=(e.pageY - beginY);
        for(var i=0;i<$(".left>div").length;i++){
            var minHeight=parseInt($(".left>div").eq(i).find(".drag").css("top"))+$(".left>div").eq(i).find(".drag").height();
            if(minHeight>beginHeight+moveHeight){
               goType=1;
               break;
            }
        }
        if(moveHeight>0||goType!=1){
            $(".left").height(beginHeight+moveHeight);
        }
    }
    //解除移动时的处理函数；
    function boxCancelSelection() {
        $(document).unbind('mousemove', boxStartSelection).unbind('mouseup', boxCancelSelection);
    }
    //鼠标在按下时调用的函数
    function boxMouseDown(e){
        $(document).mousemove(boxStartSelection).mouseup(boxCancelSelection);
    }
})