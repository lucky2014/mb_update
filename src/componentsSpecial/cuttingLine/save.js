define(function(require,exports,module){
  var $ = require("jquery");
  //页面逻辑
  var app = {
    cuttingLine : function(indexs){
       var thisDiv = $(".cuttingLine");
         return {
           attrList:function(){
               var arr = [];
               arr.push({
                   "attrSort": 1,
                   "attrTitle": "分割线",
                   "isList": 0,
                   "relationId": 5,
                   "tagId": "border_img",
                   "tagName": "border",
                   "value": {
                     "color": thisDiv.find(".line").attr("col"),
                     "borderWidth":thisDiv.find(".line").attr("wwidth"),
                     "borderStyle":thisDiv.find(".line").attr("sstyle"),
                     "transparency":thisDiv.find(".line").attr("par"),
                   }
               }); 
               return arr;
           }(),
            "componentSort": "",
            "componentTitle": "分割线",
            "symbol": "cuttingLine",
       };
    },
  }
  return app;
});