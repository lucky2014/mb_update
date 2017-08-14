define(function(require,exports,module){
    var $ = require("jquery");
    var Swiper = require("swiper");

    //var data = require("app_index/data");
    var Engine = require("engine");
    var box = Engine.init();

    require("common.activexShow/companyMien/index.css");
    //页面逻辑
    var app = {

        //企业风采
        img_show: function(v){
            var mienTpl = require("common.activexShow/companyMien/index.tpl");
                box.render($(".left"), v, mienTpl, "0");
                 $(".companyMien").attr("symbol",v.symbol);
                
            var attrList = v.attrList;
           //console.log(JSON.stringify(attrList,null,2));
            $.each(attrList, function(i,j){
                if(j.attrSort == 1){
                    $(".companyMien .modelInputShow").html(j.attrTitle);
                }else if(j.attrSort == 2){
                    $(".companyMien .editTextShow").html(j.value.value);
                }else{ 
                    var mienPics = require("common.activexShow/companyMien/pics.tpl");
                    box.render($(".companyMien .picShow ul"), j.value, mienPics);
                }
            }); 
           /* var mienTpl = require("../common.honor/honor.tpl");
            box.render($("#companyMien"), "", mienTpl);*/      
        }


    }
    return app;
});