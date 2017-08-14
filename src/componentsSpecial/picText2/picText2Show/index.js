define(function(require,exports,module){
    var $ = require("jquery");
    var Swiper = require("swiper");

    //var data = require("app_index/data");
    var Engine = require("engine");
    var box = Engine.init();

    require("componentsSpecial/picText2/picText2Show/index.css");
    var data = require("componentsSpecial/picText2/data");
    //页面逻辑
    var app = {

        //企业风采
        img_show: function(){
            var v = data.returnObject.components[0];
            var mienTpl = require("componentsSpecial/picText2/picText2Show/index.tpl");
                box.render($(".left"), v, mienTpl, "0");
             $(".picText2").attr("symbol",v.symbol);
                
            var attrList = v.attrList;
           //console.log(JSON.stringify(attrList,null,2));
            $.each(attrList, function(i,j){
                if(j.attrSort == 1){
                    $(".picText2 .editTextShow").html(j.value.value);
                }else{ 
                    var mienPics = require("componentsSpecial/picText2/picText2Show/pics.tpl");
                    box.render($(".picText2 .picShow ul"), j.value, mienPics);
                }
            }); 
           /* var mienTpl = require("../common.honor/honor.tpl");
            box.render($("#companyMien"), "", mienTpl);*/      
        }


    }
    return app;
});