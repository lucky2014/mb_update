define(function(require,exports,module){
    var $ = require("jquery");
    var Swiper = require("swiper");

    //var data = require("app_index/data");
    var Engine = require("engine");
    var box = Engine.init();

    var formatImg = require("preview/src/common.formatImg/index");

    //页面逻辑
    var app = {

        //新闻资讯
        img_show: function(v,w){
            var aa = [];
            var bb = {};
            var jWidth = "";//定义宽度
            var jHeight = "";//定义高度
            //console.log(JSON.stringify(v.attrList,null,2));
            $.each(v.attrList, function(i,j){
                
                if(j.tagName == "input"){
                    $("#information .comContent").html(j.attrTitle);

                    j.text = 2; //用以区分
                }else if(j.tagName == "a"){
                    aa.push(j);//添加元素
                    //console.log(JSON.stringify(j,null,2));
                }else{
                    $.each(j.value, function(k,l){
                        l.value = formatImg.init(l.value, j.width, j.height);
                    });
                    //console.log(JSON.stringify(j,null,2));
                    bb = j.value;
                    jWidth = j.width;
                    jHeight = j.height;
                }
            });
            aa.length=2;
            //console.log(JSON.stringify(aa,null,2));
            //console.log(JSON.stringify(bb,null,2));
            var information = require("preview/src/common.news/information.tpl");
            var h = jHeight/jWidth*(w*0.92*0.4);
            box.render($("#swiper2 .swiper-wrapper"), bb, information);
            $("#swiper2 .swiper-wrapper, #swiper2 .swiper-slide").css({"height":h});
            var mySwiper2 = new Swiper ('#swiper2', {
                direction: 'horizontal',
                loop: true,
                // 如果需要分页器
                // pagination: '.swiper-pagination',
                
                // 如果需要前进后退按钮
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                autoplay: 2000
            });

            //console.log(JSON.stringify(aa,null,2));
            var informatext = require("preview/src/common.news/informatext.tpl");
            box.render($("#conInformation .conHistory"), aa, informatext);
        },


    }
    return app;
});