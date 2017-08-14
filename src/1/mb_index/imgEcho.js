define(function(require,exports,module){
	var $ = require("jquery");
    var Engine = require("engine");
    var box = Engine.init();
    var requireNormal = require("1/mb_index/requireNormal");
    var save = require("common.save/index");
   
    var app ={
        init: function(me, components, msg){
            
            var parInd = me.parents(".rightDiv").index();
            var parId = me.parents(".rightDiv").attr("id");
            var leftDiv =  $(".leftDiv[id="+parId+"]").split("Set")[0];
            var addOne = {
                add2 : require("common.activeX/companyAbstractSet/addOne.tpl"),
                add4 : require("common.activeX/companyProductSet/addOne.tpl"),
                add5 : require("common.activeX/companyMienSet/addOne.tpl"),
            }
            if(leftDiv == "banner"){
                $.each(components, function(i,v){
                    var symbol = v.symbol;
                    if(symbol == "img_show"){
                        components[ind-1] = save.img_show(ind);
                        requireNormal.leftShow[symbol].img_show(components[ind-1]);
                    }
                        
                });
            }else if(leftDiv == "companInformation"){
                $.each(components, function(i,v){
                    var symbol = v.symbol;
                    if(symbol == "information"){
                        components[ind-1] = save.information(ind);
                        requireNormal.leftShow[symbol].img_show(components[ind-1]);
                    }
                        
                });
                 me.siblings("span").removeClass('dn');
                 me.parents("dl").addClass("hasPics").removeClass("nodataPics");
            }else if(leftDiv == "footernav"){
                var thisind = me.parents("dl").index();
                $(".footernav ul li").eq(thisind-2).find("img").attr("src",msg);
            }else{
                 var _index = me.parents("li").index();
                 if(me.parents("li").hasClass("nodataPics")){
                        $("."+leftId+" .picShow ul").append("<li><img src="+msg+" /></li>")
                        me.siblings("span,.delectCha").removeClass("dn");
                        me.parents("li").addClass("hasPics").removeClass("nodataPics");
                        box.render(me.parents(".piculCommon"), "", addOne["add"+parInd], "0");

                       if(leftDiv == "companyAbstract"){
                           var hasPic = $(".hasPics").length;
                           $(".nodataPics input[name=myfiles]").attr("id","companyAbstract"+hasPic);
                           components[parInd-1] = save.aboutUs(parInd,parId);
                       }else if(leftDiv == "companyMien"){
                            var hasPic = $(".hasPics").length;
                            $(".nodataPics input[name=myfiles]").attr("id","companyMien"+hasPic);
                            components[parInd-1] = save.aboutUs(parInd,parId);
                            $(".companyMien").addClass("active").find(".selectB").css("height",$(".companyMien").height()-4);
                       }else if(leftDiv == "companyProduct"){
                           var hasPic = $(".hasPics").length+1;
                           $(".nodataPics input[name=myfiles]").attr("id","companyProduct"+hasPic);
                           components[parInd-1] = save.product_show(parInd)
                           requireNormal.leftShow.show4.img_show(components[parInd-1]);
                       }
                 }else if(me.attr("id") == "bigPic"){
                    $(".companyAbstract .conTop img").attr("src",msg);
                 }else{
                    if(leftDiv == "companyProduct"){
                        var len = $("."+leftId+" .swiper-wrapper").find(".swiper-slide").length/3;
                        $("."+leftId+" .swiper-wrapper").find(".swiper-slide").eq(_index+len).css('backgroundImage','url('+msg+')');
                        /*$("."+leftId+" .swiper-wrapper").find(".swiper-slide").eq(_index+len).attr("style",'background-image:url('+msg+')');*/

                    }else{
                        $("."+leftId+" .picShow ul").find("li").eq(_index).find("img").attr("src",msg);
                    }
                 }
            }
          leftDiv.find(".selectB").css("height",leftDiv.height()-4);  
        }
    };
    return app;
    
});

