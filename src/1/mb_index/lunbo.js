define(function(require,exports,module){
	var $ = require("jquery");
  var requireNormal = require("1/mb_index/requireNormal");
  var save = require("common.save/index");

  var app={
      lunbo1 : function(imgArr,components){ //手机显示区banner图更新
        var ind = $(".left .active.leftDiv").index();
        var _html='<ul class="bannerList swiper-wrapper" style="width:'+imgArr.length*100+'%">'
             for(var i=0;i<imgArr.length;i++){
          _html+='<li class="swiper-slide" style="width:'+100/imgArr.length+'%"><img src="'+imgArr[i]+'"></li>'
        }
        _html+='</ul><div class="swiper-pagination"></div>'
        $(".bannerListBox").html(_html);
            $.each(components, function(i,v){
                var symbol = v.symbol;
                if(symbol == "img_show"){
                    components[ind-1] = save.img_show(ind);
                    requireNormal.leftShow[symbol].img_show(components[ind-1]);
                }
                    
            });
             $(".banner").addClass("active").find(".selectB").css("height",$(".banner").height()-4);
      },
     lunbo3 : function(imgArr,components){
         var _html='<div class="swiper-wrapper" style="width:'+imgArr.length*100+'%">';
         for(var i=0;i<imgArr.length;i++){
             _html+='<div class="swiper-slide" style="width:'+100/imgArr.length+'%"><img src="'+imgArr[i]+'"></div>'
         }
         _html+='</div><div class="swiper-pagination"></div>';
         $("#swiper2").html(_html);

         $.each(components, function(i,v){
             var symbol = v.symbol;
             if(symbol == "information"){
                 components[ind-1] = save.information(ind);
                 requireNormal.leftShow[symbol].img_show(components[ind-1]);
             }
                 
         });
         $(".companyInformation").addClass("active").find(".selectB").css("height",$(".companyInformation").height()-4);
     },
     lunbo4 : function(imgArr,components){
         var _html='<div class="swiper-wrapper">';
         for(var i=0;i<imgArr.length;i++){
             _html+='<div class="swiper-slide" index="1" style="background-image:url('+imgArr[i]+')"></div>'
         }
            _html+='</div>';
         $("#swiper3").html(_html);
         $.each(components, function(i,v){
             var symbol = v.symbol;
             if(symbol == "product_show"){
                 components[ind-1] = save.product_show(ind);
                 requireNormal.leftShow[symbol].img_show(components[ind-1]);
             }
                 
         });
         $(".companyProduct ").addClass("active").find(".selectB").css("height",$(".companyProduct").height()-4);
     },
  }
return app;	

})