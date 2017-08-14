define(function(require,exports,module){
  var app = {
  	config:{
  		width:80,
  		height:80,
  		fillColor:"#1c9ae3",
  		strokeColor:"#1c9ae3",
  		borderWidth:1
  	},
    init:function(){
    	
    },
    tpl:function(){return require("component/index/tpl/svg.tpl")}
  }
  return app;
})