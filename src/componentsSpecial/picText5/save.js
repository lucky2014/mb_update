define(function(require,exports,module){
  var $ = require("jquery");
  //页面逻辑
  var app = {
    picText5: function(indexs){
            var thisDiv = $(".picText5Set"),
                thisP = $(".picText5Set .contact").find(".commonStyle");
        return {
            attrList : function(){
                var arr = [];
                arr.push({
                       "attrId": 17,
                       "attrSort": 1,
                       "attrTitle": "",
                       "isList": 0,
                       "relationId": 5,
                       "tagId": "img",
                       "tagName": "logo_img",
                       "tagType": "img",
                       "width": "308",
                       "height":"80",
                       "value": {
                                 "attrId": 17,
                                 "description": "",
                                 "id": 21,
                                 "linkUrl": "about.html",
                                 "value": $(".picText5Set .logoImg .addPicture").attr("src"),
                               },
                });
                arr.push({
                       "attrId": 17,
                       "attrSort": 2,
                       "attrTitle": "",
                       "isList": 0,
                       "relationId": 5,
                       "tagId": "img",
                       "tagName": "erweima_img",
                       "tagType": "img",
                       "width": "92",
                       "height":"92",
                       "value":{
                                 "attrId": 17,
                                 "description": $(".picText5Set .erweima .companyText").html(),
                                 "id": 21,
                                 "linkUrl": "about.html",
                                 "value": $(".picText5Set .erweima .addPicture").attr("src") ,
                               },
                });
                
                    arr.push({
                         "attrId": 17,
                         "attrSort": 3,
                         "attrTitle": "",
                         "isList": 1,
                         "relationId": 5,
                         "tagId": "text",
                         "tagName": "text_input",
                         "tagType": "text",
                          value:function(){
                             var innerArr = [];
                           $.each(thisP,function(i){
                               innerArr.push({
                                 "value":thisP.eq(i).find("input").val(),
                                 "description": thisP.eq(i).find("span").html(),
                               }); 
                             });
                           return innerArr;
                        }(),
                });
                return arr;
            }(),
            "componentSort": indexs,
            "componentTitle": "",
            "linkUrl": "",
            "symbol": "picText5",
        };
    },
  }
  return app;
});