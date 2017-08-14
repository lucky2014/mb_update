define(function(require,exports,module){
		var $ = require("jquery");
		var app = {
			isEdit:false,
	        _mrX:0,
	        _mrY:0,
	        _mrRadian:0,
	        _radian:0,
	        styleSheet:{},
	        stateDo:[],
	        redo:[],
	        dhStatus:false,
	        _x:1,
	        _y:1,
	        elements:{},
	        dragProgressStatus:false,
	        newX:0,
	        newY:0,
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
		    basedArr:["rotateFn","saveFn","loadFn",
		    		  "dragInit","deleteFn","dragMoveFn",
		    		  "dragProgress","rightEditEvt","dragHeight",
		    		  "textEdit","selectPicture",
		    		  "deleteFn","nav_init","redoFunc","undoFunc"]
		}
		return app;
})