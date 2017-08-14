define(function(require,exports,module){
  var $ = require("jquery");
  //页面逻辑
  var app = {
    img_show : function(indexs){
        var thisDl = $(".bannerSet .addDl dl");
        return {
            attrList:function(){
                var arr = [];
                $.each(thisDl,function(i){
                    arr.push({
                        "attrSort" : i+1,
                        "attrTitle" : thisDl.eq(i).find(".bannerName").val(),
                        "height" : 104,
                        "isList" : 0,
                        "tagId": "banner"+(i+1),
                        "tagName": "img",
                        "value" : {
                           "description": "banner"+(i+1),
                           "value" : thisDl.eq(i).find(".addPicture").attr("src"),
                           "linkUrl" : thisDl.eq(i).find(".bannerLink").val(),
                       },
                       "width" : 308,
                    })
                })
                return arr;
            }(),
            "symbol" : "img_show",
            "componentSort" : indexs,
            "componentTitle": "",
            "linkUrl": "",
        };
    },
    about : function(indexs){
        var thisDiv = $(".companyAbstractSet"),
           thisLink = $(".companyAbstractSet .commonAddress input"),
           thisLi = $(".companyAbstractSet .hasPics");
        return {
           attrList:function(){
               var arr = [];
               arr.push({
                   "attrSort" : 1,
                   "attrTitle" : thisDiv.find(".modelInput").val(),//头部
                   "isList": 0,
                   "tagId": "model_name_about",
                   "tagName": "input",
                   "tagType": "text",
                   "value":{ 
                       "description":"",
                       "linkUrl" : "" || thisLink.val(),
                       "value": "关于我们",
                   },
               },
               {
                    "attrSort" : 2,
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
                    "attrSort": 3,
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
                    "attrSort": 4,
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
            "symbol": "about",
       };
    },
    corp_img : function(indexs){
       var thisDiv = $(".companyMienSet"),
           thisLink = $(".companyMienSet .commonAddress input"),
           thisLi = $(".companyMienSet .hasPics");
         return {
           attrList:function(){
               var arr = [];
               arr.push({
                   "attrSort" : 1,
                   "attrTitle" : thisDiv.find(".modelInput").val(),//头部
                   "isList": 0,
                   "tagId": "model_name_about",
                   "tagName": "input",
                   "tagType": "text",
                   "value":{ 
                       "description":"",
                       "linkUrl" : "" || thisLink.val(),
                       "value": "关于我们",
                   },
               },
               {
                    "attrSort" : 2,
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
            "symbol": "corp_img",
       };
    },
    information : function(indexs){
      var thisDiv = $(".companyInformationSet"),
         thisDl = $(".companyInformationSet .addDl dl");
      return   {
          attrList : function(){
             var arr = [];
             arr.push({
                  "attrId": 12,
                  "attrSort": 1,
                  "attrTitle": thisDiv.find(".modelInput").val(),//头部,
                  "isList": 0,
                  "tagId": "model_name_info",
                  "tagName": "input",
                  "tagType": "text",
                  "value": {
                      "linkUrl": "",
                      "description":"",
                      "value": "新闻资讯"
                  },
             },
             {    
                  "attrId": 13,
                  "attrSort": 2,
                  "attrTitle": "资讯1",
                  "isList": 0,
                  "tagId": "info_1",
                  "tagName": "a",
                 "value":{
                      "linkUrl": "",
                      "description":"",
                      "value":thisDiv.find(".news1").val(),     //资讯1
                 },
             },
             {
                  "attrId": 14,
                  "attrSort": 3,
                  "attrTitle": "资讯2",
                  "isList": 0,
                  "tagId": "info_2",
                  "tagName": "a",
                 "value":{
                      "linkUrl": "",
                      "description":"",
                     "value":thisDiv.find(".news2").val(),     //资讯2
                 },
             },
             {
                  "attrId": 16,
                  "attrSort": 4,
                  "attrTitle": "图片资讯",
                  "height": 52,
                  "isList": 1,
                  "tagId": "img_infomation",
                  "tagName": "img",
                 value:function(){
                     var innerArr = [];
                     $.each(thisDl,function(i){
                         innerArr.push({
                             "value":thisDl.find(".addPicture").eq(i).attr("src"),
                             "linkUrl": "",
                         });
                     })
                      return innerArr;
                 }(),
                 "width" : 86,
             });
             return arr;
          }(),
          "componentSort": indexs,
          "componentTitle": "新闻资讯",
          "linkUrl": "",
          "symbol": "information",
      };
    },
    product_show : function(indexs){
      var thisDiv = $(".companyProductSet"),
         thisLi = $(".companyProductSet .hasPics");
      return {
         attrList : function(){
             var arr = [];
             arr.push({
                  "attrSort": 1,
                  "attrTitle": thisDiv.find(".modelInput").val(),
                  "isList": 0,
                  "tagId": "model_name_prduct",
                  "tagName": "input",
                  "tagType": "text", 
                  "value": {
                      "linkUrl": "",
                      "description": "",
                      "value": "企业产品"
                  }
             });
             $.each(thisLi,function(i){
                 arr.push({
                      "attrSort": i+2,
                      "attrTitle": "",
                      "height": 300,
                      "isList": 0,
                      "tagId": "product_1",
                      "tagName": "img",
                     "value":{
                         "value":thisLi.eq(i).find(".addPicture").attr("src"),
                         "linkUrl": "",
                         "description": "商品1",
                     },
                     "width" : 200,
                 });
             });
             return arr;
         }(),
         "componentSort": indexs,
         "componentTitle": "",
         "linkUrl": "",
         "symbol": "product_show",
      };
    },
    footerNav : function(indexs){
      var thisDiv = $(".footernavSet"),
          thisDl = $(".footernavSet .addDl dl");
      return {
        attrList : function(){
          var arr = [];
          arr.push({
            "attrSort": 1,
            "attrTitle": "图片",
            "height": 17,
            "isList": 1,
            "relationId": 5,
            "tagId": "img_img",
            "tagName": "img",
             value:function(){
                   var innerArr = [];
                   $.each(thisDl,function(i){
                       innerArr.push({
                           "value":thisDl.eq(i).find(".addPicture").attr("src"),
                           "linkUrl": thisDl.eq(i).find(".linkAddress ").find("input").val(),
                           "description": thisDl.eq(i).find(".bannerName ").val(),
                       })
                   });
                    return innerArr;
               }(),
              "width": 17,
          });
          return arr;
        }(),
         "componentSort": indexs,
          "componentTitle": "导航",
          "symbol": "footerNav",
      }
    },
    aboutInfo: function(indexs){
       var thisDiv = $(".aboutSet"),
       thisLi = $(".piculCommon li");
       return {
           attrList : function(){
               var arr = [];
               arr.push({
                      "attrId": 5,
                      "attrSort": 1,
                      "attrTitle": $(".mustInput input").val(),
                      "height": $(".about .p1").height(),
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
                      "width":$(".about .p1").width(),
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
           "symbol": "aboutInfo",
       };
    },

    img_comp : function(indexs){
        var thisDl =$(".advertiseSet .addDl dl");
        return {
            attrList:function(){
                var arr = [];
                $.each(thisDl,function(i){
                    arr.push({
                        "attrId": 23,
                        "attrSort": 1,
                        "attrTitle": "广告",
                        "componentId": 7,
                        "height": $(".advertise .advantage img").height(),
                        "isList": 0,
                        "relationId": 7,
                        "tagId": "ad",
                        "tagName": "img",
                        "value": {
                          "attrId": 23,
                          "description": $(".advertiseSet .addDl .adverName").val(),
                          "id": 29,
                          "linkUrl": $(".advertiseSet .addDl .adverLink").val(),
                          "user_id": 49,
                          "value": $(".advertiseSet .addDl .addPicture").attr("src"),
                        },
                        "width": $(".advertise .advantage img").width(),
                    })
                })
                return arr;
            }(),
            "symbol" : "img_comp",
            "componentSort" : indexs,
            "componentTitle": "",
            "linkUrl": "",
        };
    },
    product_show2 : function(indexs){
         var thisDiv = $(".hotRecommendSet"),
             thisLi = $(".hotRecommendSet .hasPics");
         return {
             attrList : function(){
                 var arr = [];
                 arr.push({
                    "attrId": 24,
                    "attrSort": 1,
                    "attrTitle": thisDiv.find(".modelInput").val(),
                    "componentId": 3,
                    "height": 60,
                    "isList": 0,
                    "relationId": 8,
                    "tagId": "model_name_prduct",
                    "tagName": "input",
                    "value": {
                        "attrId": 24,
                        "description": "产品列表",
                        "id": 30,
                        "linkUrl": "product.html",
                        "user_id": 49,
                        "value": "http://122.224.218.61:8001/group1/M00/00/54/wKgCClljIjCAIeNRAAAKKW9b62w843.png",
                    },
                    "width": 375,
                 });
                 $.each(thisLi,function(i){
                     arr.push({
                          "attrId": 25,
                          "attrSort": i+2,
                          "attrTitle": "商品1",
                          "componentId": 3,
                          "height": 300,
                          "isList": 0,
                          "relationId": 8,
                          "tagId": "product_1",
                          "tagName": "img",
                         "value":{
                            "attrId": 25,
                            "description": "商品1",
                            "id": 31,
                            "resourceId": "1",
                            "resourceTable": "product",
                            "user_id": 49,
                            "value": thisLi.eq(i).find(".addPicture").attr("src"),
                         },
                         "width" : 200,
                     });
                 });
                 return arr;
             }(),
             "componentSort": indexs,
             "componentTitle": "",
             "linkUrl": "",
             "symbol": "product_show2",
         };
    },
    list_comp : function(indexs){
        var thisDl = $(".hotCategorySet .addDl dl.hasPics");
        return {
            attrList:function(){
                var arr = [];
                arr.push({
                  "attrId": 29,
                  "attrSort": 2,
                  "attrTitle": "分类",
                  "componentId": 7,
                  "height": $(".hotCategory .recoType ul li").height(),
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
                   "width" : $(".hotCategory .recoType ul li").width(),
                });
                return arr;
            }(),
            "symbol" : "list_comp",
            "componentSort" : indexs,
            "componentTitle": "",
            "linkUrl": "",
        };
    },
    img_new : function(indexs){
        var thisLi = $(".newProductSet .piculCommon li.hasPics");
        return {
            attrList:function(){
                var arr = [];
                    arr.push({
                      "attrId": 30,
                      "attrSort": 1,
                      "attrTitle": $(".newProductSet .modelName .modelInput").val(),
                      "componentId": 7,
                      "height": 60,
                      "isList": 0,
                      "relationId": 10,
                      "tagId": "model_name_prduct",
                      "tagName": "input",
                      "value": {
                        "attrId": 30,
                        "description": "热销推荐",
                        "id": 38,
                        "linkUrl": "product.html",
                        "user_id": 49,
                        "value": "http://122.224.214.231:8001/group1/M00/00/09/wKgCRFlTDyOAE6-mAAAVTG3hnGQ280.jpg"
                      },
                      "width": 375
                    })
                $.each(thisLi,function(i){
                    arr.push({
                        "attrId": 31,
                        "attrSort": i+2,
                        "attrTitle": "商品1",
                        "componentId": 7,
                        "height": $(".newProductSet .picShow li img").height(),
                        "isList": 0,
                        "relationId": 10,
                        "tagId": "product_1",
                        "tagName": "img",
                        "value": {
                          "attrId": 31,
                          "description": "商品1",
                          "id": 39,
                          "resourceId": "1",
                          "resourceTable": "product",
                          "user_id": 49,
                          "value": thisLi.eq(i).find(".addPicture").attr("src"),
                        },
                        "width": $(".newProductSet .picShow li img").width(),
                    })
                })
                return arr;
            }(),
            "symbol" : "img_new",
            "componentSort" : indexs,
            "componentTitle": "",
            "linkUrl": "",
        };
    },
    hot_recommend : function(indexs){
        var thisLi = $(".hotProductSet .piculCommon li.hasPics");
        return {
            attrList:function(){
                var arr = [];
                    arr.push({
                      "attrId": 30,
                      "attrSort": 1,
                      "attrTitle": $(".hotProductSet .modelName .modelInput").val(),
                      "componentId": 7,
                      "height": 60,
                      "isList": 0,
                      "relationId": 10,
                      "tagId": "model_name_prduct",
                      "tagName": "input",
                      "value": {
                        "attrId": 30,
                        "description": "热销推荐",
                        "id": 38,
                        "linkUrl": "product.html",
                        "user_id": 49,
                        "value": "http://122.224.214.231:8001/group1/M00/00/09/wKgCRFlTDyOAE6-mAAAVTG3hnGQ280.jpg"
                      },
                      "width": 375
                    })
                $.each(thisLi,function(i){
                    arr.push({
                        "attrId": 31,
                        "attrSort": i+2,
                        "attrTitle": "商品1",
                        "componentId": 7,
                        "height": $(".hotProductSet .picShow li img").height(),
                        "isList": 0,
                        "relationId": 10,
                        "tagId": "product_1",
                        "tagName": "img",
                        "value": {
                          "attrId": 31,
                          "description": "商品1",
                          "id": 39,
                          "resourceId": "1",
                          "resourceTable": "product",
                          "user_id": 49,
                          "value": thisLi.eq(i).find(".addPicture").attr("src"),
                        },
                        "width": $(".hotProductSet .picShow li img").width(),
                    })
                })
                return arr;
            }(),
            "symbol" : "hot_recommend",
            "componentSort" : indexs,
            "componentTitle": "",
            "linkUrl": "",
        };
    },
    contactUs: function(indexs){
        var thisDiv = $(".contactUsSet"),
            thisP = $(".contactUsSet .contact").find(".commonStyle");
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
                                 "value": $(".contactUsSet .logoImg .addPicture").attr("src"),
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
                                 "description": $(".contactUsSet .erweima .companyText").html(),
                                 "id": 21,
                                 "linkUrl": "about.html",
                                 "value": $(".contactUsSet .erweima .addPicture").attr("src") ,
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
            "symbol": "contactUs",
        };
    },
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
    picText2 : function(indexs){
       var thisDiv = $(".picText2"),
           thisLink = $(".picText2 .commonAddress input"),
           thisLi = $(".picText2 .hasPics");
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
            "symbol": "picText2",
       };
    },
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
    waterfall : function(indexs){
        var thisDl = $(".waterfallSet .addDl dl");
        return {
            attrList:function(){
                var arr = [];
                arr.push({
                  "attrSort": 1,
                  "attrTitle": "内部图片",
                  "isList": 1,
                  "relationId": 1,
                  "tagId": "inside",
                  "tagName": "img",
                   value:function(){
                         var innerArr = [];
                         $.each(thisDl,function(i){
                             innerArr.push({
                                "value": thisDl.eq(i).find(".addPicture").attr("src"),
                                "description":thisDl.eq(i).find(".waterfallName").val(),
                                "linkUrl":thisDl.eq(i).find(".waterfallLink").val(),
                                "width": thisDl.eq(i).find(".addPicture").width(),
                                "height": thisDl.eq(i).find(".addPicture").height()
                             })
                         });
                          return innerArr;
                     }(),
                });
                return arr;
            }(),
            "symbol" : "waterfall",
            "componentSort" : indexs,
            "componentTitle": "",
            "linkUrl": "",
        };
    }
  }
  return app;
});