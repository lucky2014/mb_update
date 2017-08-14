define(function(require,exports,module){
    var $ = require("jquery");
    var setup = require("setup");
    
    require("componentsSpecial/waterfall/waterfallSet/index.css");

    var Engine = require("engine");
    var box = Engine.init();
    var ajaxFileUpload = require("common.ajaxfileupload/index");
    
    //var formatImg = require("common.formatImg/index");
    
    var addOneTpl = require("componentsSpecial/waterfall/waterfallSet/addOne.tpl");
    var addOneShowTpl = require("componentsSpecial/waterfall/waterfallShow/addOne.tpl");
    var data = require("componentsSpecial/waterfall/data");
    var waterfallShow = require("componentsSpecial/waterfall/waterfallShow/index");

        

    var app = {
        /*tpl:function(){
            return require("componentsSpecial/waterfall/waterfallSet/index.tpl");
        },*/
        img_edit:function(){
            var v = data.returnObject.components[0];
            var attrList = v.attrList[0];
            var dvalue = attrList.value;
            /*waterfallShow.img_show();*/
            //将内容渲染到DOM
            var waterfallTpl = require("componentsSpecial/waterfall/waterfallSet/index.tpl");
            box.render($(".right"), dvalue, waterfallTpl);

            //删除
             $(".rightDiv").delegate(".delectCha","click",function(){
                var me = $(this);
                var ind = me.parents("dl").index();
                var thisModel = me.parents(".addDl").find("dl").length;

                if(thisModel>1){
                    me.parents("dl").remove();
                    dvalue.splice(ind,1);
                    waterfallShow.img_show();
                }
                $(".addBanBtn").show();
                //console.log(JSON.stringify(data,null,2));
             });

             //添加一个
             $(".rightDiv").delegate(".addBanBtn","click",function(){
                var me=$(this);
                var thisModel = me.siblings(".addDl").find("dl").length;
                box.render(me.siblings(".addDl"), "", addOneTpl, "0");
                me.siblings(".addDl").find("dl:last-child").find("input[name=myfiles]").attr("id","waterfall"+thisModel);
                box.render( $(".waterfall-container"), "", addOneShowTpl, "0");
                dvalue.push({
                    "value": "../src/1/images/addPicture2.png",
                    "description":"",
                    "linkUrl":"",
                    "width": "",
                    "height": "",
                })
                waterfallShow.img_show();

                if(thisModel>8){
                   me.hide(); 
                }
            });

             //上传图片
             $(".rightDiv").delegate("input[name=myfiles]", "change", function() {
                 var meInput = $(this);
                 var id = meInput.attr("id");
                 var ind = meInput.parents("dl").index();
                 var leftDiv = $(".waterfall #container");
                 var thisDl = meInput.parents("dl");

                 ajaxFileUpload(id, "uploadImg.do", function(msg){
                     var idd = meInput.attr("fileElementId"); 
                     $("#" + idd ).siblings(".addPicture").attr("src",msg[0]);

                     leftDiv.find(".item").eq(ind).find("img").attr("src",msg[0]);//上传图片后回显到左边
                     dvalue[ind].value = msg[0];
                     
                     //console.log(JSON.stringify(data,null,2));
                     waterfallShow.img_show();
                 }); 
             });

             //编辑右边回显到左边
             $(".rightDiv ").delegate(".waterfallName","keyup",function(){
                 var me = $(this);
                 var ind = me.parents("dl").index();

                 $(".waterfall #container .item").eq(ind).find(".foodName").html(me.val());
             })
        }
    };
    return app;
});