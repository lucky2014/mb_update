define(function(require,exports,module){
  var $ = require("jquery");
  //页面逻辑
  var app = {
    picText4: function(indexs){
            var thisDiv = $(".picText4Set"),
            thisLi = $(".piculCommon li");
        return {
            attrList : function(){
                var arr = [];
                arr.push({
                       "attrId": 5,
                       "attrSort": 1,
                       "attrTitle": $(".mustInput input").val(),
                       "height": $(".picText4 .p1").height(),
                       "isList": 0,
                       "tagId": "model_name",
                       "tagName": "img",
                       "value": {
                         "attrId": 5,
                         "description": "公司介绍",
                         "id": 7,
                         "user_id": 49,
                         "value": $(".titlePic img").attr("src"),
                       },
                       "width":$(".picText4 .p1").width(),
                });
                arr.push({
                       "attrId": 6,
                       "attrSort": 2,
                       "attrTitle": "文本介绍(一)",
                       "isList": 0,
                       "tagId": "text1",
                       "tagName": "img",
                       "value": {
                         "attrId": 6,
                         "description": "banner2",
                         "id": 8,
                         "user_id": 49,
                         "value": $(".companyText1 p").html(),
                       }
                });
                arr.push({
                       "attrId": 7,
                       "attrSort": 3,
                       "attrTitle": "图片组",
                       "height": $(".picShow ul li img").height(),
                       "isList": 1,
                       "tagId": "imgs",
                       "tagName": "img",
                      value:function(){
                           var innerArr = [];
                           $.each(thisLi,function(i){
                               innerArr.push({
                                   "value":thisLi.eq(i).find(".addPicture").attr("src"),
                                   "attrId": 4,
                                    "description": "餐厅",
                                    "id": 6,
                                    "user_id": 49,
                               })
                           });
                            return innerArr;
                       }(),
                      "width": $(".picShow ul li img").width(),
                });
               arr.push({
                      "attrId": 6,
                       "attrSort": 4,
                       "attrTitle": "文本介绍(二)",
                       "isList": 0,
                       "tagId": "text2",
                       "tagName": "text",
                       "value": {
                         "attrId": 6,
                         "description": "banner2",
                         "id": 8,
                         "user_id": 49,
                         "value": $(".companyText2 p").html(),
                       }
               });
               arr.push({
                      "attrId": 7,
                      "attrSort": 5,
                      "attrTitle": "图片",
                      "height": $(".description3 img").height(),
                      "isList": 0,
                      "tagId": "big_img",
                      "tagName": "img",
                      "value": {
                        "attrId": 4,
                        "description": "餐厅",
                        "id": 6,
                        "user_id": 49,
                        "value": $(".bigPic img").attr("src"),
                      },
                      "width": $(".description3 img").width(),
               });
               arr.push({
                      "attrId": 6,
                       "attrSort": 6,
                       "attrTitle": "文本介绍(三)",
                       "componentId": 2,
                       "isList": 0,
                       "tagId": "text3",
                       "tagName": "img",
                       "value": {
                         "attrId": 6,
                         "description": "banner2",
                         "id": 8,
                         "user_id": 49,
                         "value": $(".companyText3 p").html(),
                       }
               });
                return arr;
            }(),
            "componentId": 2,
            "componentSort": 1,
            "componentTitle": "",
            "linkUrl": "",
            "symbol": "picText4",
        };
    },
  }
  return app;
});