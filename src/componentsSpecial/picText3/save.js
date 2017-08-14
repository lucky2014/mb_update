define(function(require,exports,module){
  var $ = require("jquery");
  //页面逻辑
  var app = {
    picText3 : function(indexs){
        var thisDl = $(".picText3Set .addDl dl.hasPics");
        return {
            attrList:function(){
                var arr = [];
                arr.push({
                  "attrId": 29,
                  "attrSort": 1,
                  "attrTitle": "分类",
                  "componentId": 7,
                  "height": $(".picText3 .recoType ul li").height(),
                  "isList": 1,
                  "relationId": 9,
                  "tagId": "product_1",
                  "tagName": "img",
                   value:function(){
                         var innerArr = [];
                         $.each(thisDl,function(i){
                             innerArr.push({
                                "attrId": 29,
                                "description": thisDl.eq(i).find(".hotName ").val(),
                                "id": 36,
                                "resourceId": "2",
                                "resourceTable": "catgory",
                                "linkUrl": thisDl.eq(i).find(".linkAddress").find(".hotLink").val(),
                                "user_id": 49,
                                "value": thisDl.eq(i).find(".addPicture").attr("src"),
                             })
                         });
                          return innerArr;
                     }(),
                   "width" : $(".picText3 .recoType ul li").width(),
                });
                return arr;
            }(),
            "symbol" : "picText3",
            "componentSort" : indexs,
            "componentTitle": "",
            "linkUrl": "",
        };
    },
  }
  return app;
});