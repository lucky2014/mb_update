define(function(require,exports,module){
    var $ = require("jquery");
    var Swiper = require("swiper");

    //var data = require("app_index/data");
    var Engine = require("engine");
    var box = Engine.init();

    require("componentsSpecial/picText5/picText5Show/index.css");
    var data = require("componentsSpecial/picText5/data");
    //页面逻辑
    var app = {

        //联系我们
        img_show: function(){
            var v = data.returnObject.components[0];
            var attrList = v.attrList;

            var contactUsTpl = require("componentsSpecial/picText5/picText5Show/index.tpl");
                box.render($(".left"), v, contactUsTpl,"0");
            $("#picText5").attr("symbol",v.symbol);
            
            //console.log(JSON.stringify(attrList,null,2));
            $.each(attrList, function(i,j){
                if(j.tagName == "logo_img"){
                    $(".head .logImg").attr("src",j.value.value);
                }else if(j.tagName == "erweima_img"){
                    $(".head .scan img").attr("src",j.value.value);
                    $(".head .scan p").html(j.value.description);
                }else if(j.tagId == "text"){
                    var inforTpl = require("componentsSpecial/picText5/picText5Show/infor.tpl");
                    box.render($(".contactWay"), j.value, inforTpl);
                }
               
            }); 
           /* var mienTpl = require("../common.honor/honor.tpl");
            box.render($("#companyMien"), "", mienTpl);*/      
        }


    }
    return app;
});