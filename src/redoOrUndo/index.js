define(function(require,exports,module){
	var $ = require("jquery");
	var Engine = require("engine");
    var box = Engine.init();
    var setup = require("setup");
    //观察者模式
    window.pubsub = {};
	(function (q) {

	    var topics = {}, // 回调函数存放的数组
	        subUid = -1;
	    // 发布方法
	    q.publish = function (topic, args) {

	        if (!topics[topic]) {
	            return false;
	        }

	        setTimeout(function () {
	            var subscribers = topics[topic],
	                len = subscribers ? subscribers.length : 0;

	            while (len--) {
	                subscribers[len].func(topic, args);
	            }
	        }, 0);

	        return true;

	    };
	    //订阅方法
	    q.subscribe = function (topic, func) {

	        if (!topics[topic]) {
	            topics[topic] = [];
	        }

	        var token = (++subUid).toString();
	        topics[topic].push({
	            token: token,
	            func: func
	        });
	        return token;
	    };
	    //退订方法
	    q.unsubscribe = function (token) {
	        for (var m in topics) {
	            if (topics[m]) {
	                for (var i = 0, j = topics[m].length; i < j; i++) {
	                    if (topics[m][i].token === token) {
	                        topics[m].splice(i, 1);
	                        return token;
	                    }
	                }
	            }
	        }
	        return false;
	    };
	} (pubsub));
	var app = {
        redoFunc:function(){

        },
        undoEdit:function(self){
        	var len = this.stateDo.length-1;
        	if(len>=0){
					this.stateDo.splice(len, 1);
        	}
        },
        undoFunc:function(appParent){
        	var me = this;
        	pubsub.subscribe('dataChange', function (topics, data) {
			    me.stateDo.push(me.stateDo[me.stateDo.length-1]);
			    if(data){
			    	me.updateData(data,me)
			    }
			});
			   
			// 随后,你还可以停止观察  
			// observer.disconnect();  
        	$("#undo").click(function(){
        		me.undoEdit();
        		me.getInfor(me.stateDo[me.stateDo.length-1])
        	})
        }
    }
    return app;
})