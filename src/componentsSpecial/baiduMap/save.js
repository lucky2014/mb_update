define(function(require,exports,module){
  var $ = require("jquery");
  //页面逻辑
  var app = {
    picText1 : function(indexs){
       var thisDiv = $(".picText1"),
           thisLink = $(".picText1 .commonAddress input"),
           thisLi = $(".picText1 .hasPics");
         return {
           attrList:function(){
               var arr = [];
               arr.push(
               {
                    "attrSort" : 1,
                    "attrTitle": "文本介绍",
                    "isList": 0,
                    "tagId": "description",
                    "tagName": "textarea",
                   "value":{ 
                       "description":"",
                       "linkUrl": "",
                       "value": thisDiv.find(".editText").html(),//文本编辑
                   },
               },
               {    
                    "attrSort": 2,
                    "attrTitle": "建筑全景",
                    "height": 95,
                    "isList": 0,
                    "tagId": "building",
                    "tagName": "img",
                    "value": {
                        "description": "公司大楼",
                        "linkUrl": "",
                        "value": thisDiv.find(".bigPic").attr("src"),//大图
                    },
                    "width": 100,
               },
               {
                    "attrSort": 3,
                    "attrTitle": "内部图片",
                    "height": 52,
                    "isList": 1,
                    "tagId": "inside",
                    "tagName": "img",
                   value:function(){                               //小图
                       var innerArr = [];
                       $.each(thisLi,function(i){
                           innerArr.push({
                                "description": "餐厅",
                                "linkUrl": "",
                                "value" : thisLi.eq(i).find(".addPicture").attr("src"),
                           });
                       })
                        return innerArr;
                   }(),
                   "width" : 86,
               }); 
               return arr;
           }(),
            "componentSort": indexs,
            "componentTitle": "关于我们",
            "linkUrl": "",
            "symbol": "picText1",
       };
    },
  }
  return app;
});