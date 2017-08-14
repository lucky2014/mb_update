define(function(require,exports,module){
    var $ = require("jquery");
    require("common.mouseWheel/jquery.mCustomScrollbar.css");
    require("common.mouseWheel/jquery.mousewheel");
    require("common.mouseWheel/jquery.mCustomScrollbar");
    var app = {
        pos:null,
        init:function(currEle,callback,callbackBottom){
            var me = this;
            $(currEle).mCustomScrollbar({
                advanced:{ updateOnContentResize:true },
                mouseWheelPixels:300,
                callbacks:{
                    onScrollStart:function(){  },
                    onScroll:function(pos){callbackBottom&&callbackBottom(pos)},
                    onTotalScroll:function(pos){ 
                        
                    },
                    onTotalScrollBack:function(){  },
                    whileScrolling:function(pos){me.pos = pos;callback&&callback(pos) } 
                }
            });
        }
    }
    return app;
})