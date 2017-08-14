define(function(require,exports,module){
    var $ = require("jquery");
    var Swiper = require("swiper");

    //var data = require("app_index/data");
    var Engine = require("engine");
    var box = Engine.init();

    require("common.activexShow/contactUs/index.css");
    //页面逻辑
    var app = {

        //联系我们
        img_show: function(v){
            var attrList = v.attrList;

            var contactUsTpl = require("common.activexShow/contactUs/index.tpl");
                box.render($(".left"), v, contactUsTpl,"0");
                $("#contactUs").attr("symbol",v.symbol);
            
            //console.log(JSON.stringify(attrList,null,2));
            $.each(attrList, function(i,j){
                if(j.tagName == "logo_img"){
                    $(".head .logImg").attr("src",j.value.value);
                }else if(j.tagName == "erweima_img"){
                    $(".head .scan img").attr("src",j.value.value);
                    $(".head .scan p").html(j.value.description);
                }else if(j.tagId == "text"){
                    var inforTpl = require("common.activexShow/contactUs/infor.tpl");
                    box.render($(".contactWay"), j.value, inforTpl);
                }
               
            }); 
           /* var mienTpl = require("../common.honor/honor.tpl");
            box.render($("#companyMien"), "", mienTpl);*/      
        }


    }
    return app;
});