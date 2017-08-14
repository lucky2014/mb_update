define(function(require,exports,module){
    require("preview/src/common.honor/index.css");
    var $ = require("jquery");
    var Swiper = require("swiper");

    //var data = require("app_index/data");
    var Engine = require("engine");
    var box = Engine.init();

    var formatImg = require("preview/src/common.formatImg/index");

    //页面逻辑
    var app = {

        //企业风采
        img_show: function(v,w){
            //console.log(JSON.stringify(v,null,2));
            var mienTpl = require("preview/src/common.honor/honor.tpl");
            box.render($(".left"), "", mienTpl,"0");

            $.each(v.attrList, function(i,j){
                
                if(j.tagId == "model_name_img"){
                    $("#comMien .comContent").html(j.attrTitle);
                }else if(j.tagId == "description_img"){
                    $(".mien").html(j.value.value);
                }else if(j.tagId == "img_img"){
                    $.each(j.value, function(k,l){
                        l.value = formatImg.init(l.value, j.width, j.height);
                    }); 
                    
                    var picsTpl = require("preview/src/common.honor/pics.tpl");
                    var h = j.height/j.width*(w*0.84/3);
                   // console.log(JSON.stringify(h,null,2))
                    box.render($(".companyMien .picShow ul"), j.value, picsTpl);
                    $(".picShow li img").css({"height":h});
                }
            });        
        }


    }
    return app;
});