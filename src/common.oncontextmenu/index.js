define(function(require,exports,module){
	var $ = require("../common.lib/jquery/jquery-1.8.3.min");
    require("../common.oncontextmenu/index.css");
    
    var app = {
        //点击出来右键
        init: function(cb){
            var me = this;
            var selfMenu = $("#menu");
            var targetDom = "";
            $(document).contextmenu(function(ev){
                var ev=ev||event;
                
                var top = ev.clientY + (document.documentElement.scrollTop || document.body.scrollTop) + "px";
                selfMenu.show();

                selfMenu.css({
                    "left" : ev.clientX+"px",
                    "top" : top
                });

                //console.log(ev);
                targetDom = ev.target;
                //$(".active").removeClass("active");
                //$(targetDom).addClass("active");

                cb && cb();

                //console.log(targetDom);

                $("#menu a").click(function(){
                    var self = $(this);
                    var className = self.attr("class");
                    me[className](targetDom);
                });

                return false; //阻止点击右键时的默认行为
            }); 

            $(document).click(function(){
                selfMenu.hide();
            });

        }, 
        //复功能制
        copy: function(targetDom){
            $(targetDom).addClass("active");
            //var e=document.getElementById(targetDom);//对象是content 
            //e.select(); //选择对象 
            document.execCommand("Copy"); //执行浏览器复制命令
            // alert("已复制好，可贴粘。"); 
        },
        //粘贴能制
        paste: function(targetDom){
            document.execCommand("Paste"); //执行浏览器复制命令
        },
        //删除能制
        delect: function(targetDom){
            $(targetDom).remove();
        },
        //置于顶层
        top: function(targetDom){
            $(targetDom).css("zIndex", 9999);
        },
        //置于底层
        bottom: function(targetDom){
            $(targetDom).css("zIndex", 0);
        }
    };
    return app;
});