define(function(require,exports,module){
    var $ = require("jquery");
    var Swiper = require("swiper");

    //var data = require("app_index/data");
    var Engine = require("engine");
    var box = Engine.init();
    require("componentsSpecial/baiduMap/baiduMapSet/index.css");
    var baiduMapShow = require("componentsSpecial/baiduMap/baiduMapShow/index");

    //页面逻辑
    var app = {
      img_edit: function(){
          var img_showTpl = require("componentsSpecial/baiduMap/baiduMapSet/index.tpl");
          box.render($(".right"), "", img_showTpl);
          var letter = ["A","B","C","D","E","F","G","H","I","J"];
          /*baiduMapShow.img_show();*/
          //创建和初始化地图函数：
          function initMap(){
            var city = $(".addressIn li:first-child input").val();
            createMap();//创建地图
            createMapSet();//创建地图
            setMapEvent(mapSet);//设置地图事件
            addMapControl();//向地图添加控件
            signPoint(city,map);//定位
            signPoint(city,mapSet);//定位
            location();
          }
          function createMap(){ //创建地图
            var point = new BMap.Point(116.400244,39.92556);
            map = new BMap.Map("allmap"); 
            /*map.centerAndZoom(point);*/  
          }
          function createMapSet(){  //创建地图
            var point = new BMap.Point(116.400244,39.92556);
            mapSet = new BMap.Map("allmapSet"); 
            /*map.centerAndZoom(point);*/  
          }
          function setMapEvent(map){//设置地图事件
            map.enableScrollWheelZoom();
            map.enableKeyboard();
            map.enableDoubleClickZoom();
          }
          function signPoint(city,local){ //
            if(city != ""){//定位
                local.centerAndZoom(city,11);      // 用城市名设置地图中心点
               var localSearch = new BMap.LocalSearch(local);
               localSearch.setSearchCompleteCallback(function (searchResult) {
                   var poi = searchResult.getPoi(0);
                   local.centerAndZoom(poi.point, 13);
                   var marker = new BMap.Marker(new BMap.Point(poi.point.lng, poi.point.lat));  // 创建标注，为要查询的地方对应的经纬度
                   local.addOverlay(marker);
                   marker.enableDragging();  //可拖拽
                   marker.addEventListener("mouseout",function(){
                      var p = marker.getPosition();       //获取marker的位置
                      alert("marker的位置是" + p.lng + "," + p.lat); 
                   });
               });
               localSearch.search(city);
              }
          };
          //向地图添加控件
          function addMapControl(){//向地图添加控件
            var navControl = new BMap.NavigationControl({anchor:BMAP_ANCHOR_BOTTOM_RIGHT,type:3});
            map.addControl(navControl);
            mapSet.addControl(navControl);
          }
          var map;
          var mapSet;
          initMap();

          function location(){
            $(".baiduMapSet .addressIn li").delegate("button","click",function(){ //点击定位
               var city = $(this).siblings("input").val();
               signPoint(city,map);
               signPoint(city,mapSet);
            });
          }
          $(".baiduMapSet").delegate(".addAn","click",function(){//添加地址
              var liL = $(".baiduMapSet .addressIn li").length;
              var addOne = require("componentsSpecial/baiduMap/baiduMapSet/addOne.tpl");
              box.render($(".baiduMapSet .addressIn"), "", addOne, "0");
              $(".newLi span").html("地址"+letter[liL]);
              $(".newLi").removeClass("newLi")
              if(liL > 8){
                $(this).hide();
              }
              location();
          });

          $(".baiduMapSet .addressIn").delegate("i","click",function(){ //删除地址
              var self = $(this);
              self.parent("li").remove();
              $(".baiduMapSet .addAn").show();
              $.each($(".baiduMapSet .addressIn li"), function(i){
                $(this).find("span").html("地址"+letter[i]);

              })
          });
      },
    }
    return app;
});