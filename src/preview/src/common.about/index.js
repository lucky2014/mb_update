define(function(require,exports,module){
    require("preview/src/common.about/index.css");

    var $ = require("jquery");
    var Swiper = require("swiper");

    //var data = require("app_index/data");
    var Engine = require("engine");
    var box = Engine.init();

    var formatImg = require("preview/src/common.formatImg/index");
    var footer = require("preview/src/common.footernav/index");
    //页面逻辑
    var app = {

        //关于我们
        img_show: function(v,w){
            var aboutTpl = require("preview/src/common.about/about.tpl");
            box.render($(".left"), "", aboutTpl,"0");

            $.each(v.attrList, function(i,j){
                //console.log(JSON.stringify(j,null,2));
                if(j.tagId == "model_name_about"){
                    $("#about .comContent").html(j.attrTitle);
                    // $("#about .arrowR").attr("href",j.value.linkUrl);
                }else if(j.tagId == "building"){
                    j.value.value = formatImg.init(j.value.value, j.width, j.height);
                    $("#building").attr("src", j.value.value);
                    var h = j.height/j.width*w*0.88*0.4;
                    $("#building").css({"height":h});
                }else if(j.tagId == "description"){
                    $(".cpanyInfor").html(j.value.value);              
                }else{
                    //console.log(JSON.stringify(j,null,2));
                    $.each(j.value, function(k,l){
                        l.value = formatImg.init(l.value, j.width, j.height);
                    });
                    var picsTpl = require("preview/src/common.about/pics.tpl");
                    var h = j.height/j.width*(w*0.84/3);
                    box.render($(".companyAbstract .picShow ul"), j.value, picsTpl);
                    $(".picShow li img").css({"height":h});
                }
            });
        },

    }
    return app;
});