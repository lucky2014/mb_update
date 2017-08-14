define(function(require,exports,module){
		var $ = require("jquery");
		var rotate = {
			ptDragStatus:false,
			oldObj:{},
        	thisObj:{},
			rotateFn:function(){
		        var me = this;
		        var target = null;
		        $("body").delegate(".rotateControl-point","mousedown",function(e){
		            me.ptDragStatus = true;
		            var rect = $(this).parents(".drag")[0].getBoundingClientRect();
		            var w = $(this).parents(".drag")[0].offsetWidth;
		            var h = $(this).parents(".drag")[0].offsetHeight;
		            $("#cke_vAct_modexBox_paragraph_content").hide();
		            me._mrX = rect.left + w / 2;
		            me._mrY = rect.top + h / 2;
		            me.dragStatus = false;
		            e.preventDefault();
		            target = $(this).parents(".drag")[0];
		            me._mrRadian = Math.atan2( e.clientY - me._mrY, e.clientX - me._mrX ) - me._radian;
		            $(me.dragTarget).parents(".drag").css("transform-origin","center center");
		            me.oldObj = {x:e.pageX,y:e.pageY,w:w,h:h}
		        })
		        $(window).mousemove(function(e){
		            // e.preventDefault();
		            if(me.ptDragStatus){
		                me.thisObj = {x:e.pageX,y:e.pageY};
		                var deltaX = e.pageX-me.oldObj.x;
		                var deltaY = e.pageY-me.oldObj.y;
		                var w = me.oldObj.w;
		                var h = me.oldObj.h;
		                var huchang = Math.atan2( e.pageY - me._mrY, e.pageX - me._mrX ) - me._mrRadian;
		                me._radian = huchang;
		                me.show(target);
		                // $(me.dragTarget).parents(".dragBox_parent").css({"transform":"rotate("+huchang+"deg)"});
		            }
		        })
		        $(document).mouseup(function(e){
		            me.ptDragStatus = false;
		            if(!$(e.target).hasClass("sizeControl")){
		                $(".sizeControl_parent").remove();
		            }
		        })
		    },
		    show: function(currEle,x,y) {
		        var matrix = this.getMatrix( this._radian, this._y, this._x );
		        //设置变形样式
		        currEle.style[ "transform" ] = "matrix("
		            + matrix.M11.toFixed(16) + "," + matrix.M21.toFixed(16) + ","
		            + matrix.M12.toFixed(16) + "," + matrix.M22.toFixed(16) + ", "+(x||0)+", "+(y||0)+")";
		    },
		    getMatrix:function(radian, x, y) {
		        var Cos = Math.cos(radian), Sin = Math.sin(radian);
		        return {
		            M11: Cos * x, M12:-Sin * y,
		            M21: Sin * x, M22: Cos * y
		        };
		    }
		}
		return rotate;
})