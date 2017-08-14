define(function(require,exports,module){
    var $ = require("jquery");
    var Swiper = require("swiper");

    //var data = require("app_index/data");
    var Engine = require("engine");
    var box = Engine.init();

    require("common.activexShow/companyInformation/index.css");
    //页面逻辑
    var app = {

        //新闻资讯
        img_show: function(v){
            var information = require("common.activexShow/companyInformation/index.tpl");
            box.render($("#companyInformation"), v, information);
            $(".companyInformation").attr("symbol",v.symbol);
            
            $.each(v.attrList, function(i,j){
                //console.log(JSON.stringify(v.attrList,null,2))
                if(j.attrSort == 1){
                    $(".companyInformation .modelInputShow").html(j.attrTitle)
                }else if(j.attrSort == 2){
                    $(".companyInformation .conHistory h3").eq(0).html(j.attrTitle);
                    $(".companyInformation .conHistory span").eq(0).html(j.value.value);
                }else if(j.attrSort == 3){
                    $(".companyInformation .conHistory h3").eq(1).html(j.attrTitle);
                    $(".companyInformation .conHistory span").eq(1).html(j.value.value);
                }else if(j.attrSort == 4){
                    var thisValue = j.value;
                    var picTpl = require("common.activexShow/companyInformation/pics.tpl");
                     box.render($(".companyInformation .swiper-wrapper"), thisValue, picTpl);
                }
            });

            var mySwiper2 = new Swiper ('#swiper2', {
                direction: 'horizontal',
                loop: true,
                // 如果需要分页器
                pagination: '.swiper-pagination',
                
                // 如果需要前进后退按钮
                nextButton: '',
                prevButton: '',
                autoplay: 2000
            });

            //console.log(JSON.stringify(aa,null,2));
            /*var informatext = require("common.news/informatext.tpl");
            box.render($("#conInformation .conHistory"), aa, informatext);*/
        },


    }
    return app;
});