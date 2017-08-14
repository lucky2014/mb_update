define(function(require,exports,module){
    var $ = require("jquery");

    var setup = require("setup");
    var Engine = require("engine");
    var box = Engine.init();

    require("1/mb_component/index.css");
    var ajaxFileUpload = require("common.ajaxfileupload/index");
    //加载瀑布流
    var waterfallShow = require("componentsSpecial/waterfall/waterfallShow/index");
    var picText1Show = require("componentsSpecial/picText1/picText1Show/index");

    var rightSet = {
        waterfall : require("componentsSpecial/waterfall/waterfallSet/index"),
        picText1 : require("componentsSpecial/picText1/picText1Set/index"),
        picText2 : require("componentsSpecial/picText2/picText2Set/index"),
        picText3 : require("componentsSpecial/picText3/picText3Set/index"),
        picText4 : require("componentsSpecial/picText4/picText4Set/index"),
        picText5 : require("componentsSpecial/picText5/picText5Set/index"),
        cuttingLine : require("componentsSpecial/cuttingLine/cuttingLineSet/index"),
        baiduMap : require("componentsSpecial/baiduMap/baiduMapSet/index"),
    }
    

     var app = {
           isEdit: setup.getQueryString("isEdit"), 
           templateId: setup.getQueryString("templateId") || 301,
           userId: setup.getQueryString("userId") || 49,
           pageId: setup.getQueryString("pageId") || 121, 
            init : function(){
                var me = this;
                if(me.isEdit == "true"){
                    var params = {
                           "pageId" : app.pageId,
                           "userId":  app.userId,
                        };
                    setup.commonAjax("getPageInfo.do", params, function(msg){
                        var datas = JSON.parse(msg.data);
                        app.datas = datas;
                        app.components = datas.components;
                        me.getInfor();
                    })
                }else{
                   /*me.getInfor();*/

                };
               
            },
            getInfor : function(){
                //页面名称change监控
                $(".skySet").delegate(".navInput","keyup",function(){
                    $(".sky h1").html($("#storeName").val());
                })

               require("common.activexShow/sky/index").img_show();
                $.each($(".leftDiv"), function(i,v){
                    $(this).attr("ind",i);
                });

                 $(".left .leftDiv").click(function(){ 
                   app.editdivChange(this);
                })
                
            },
            editdivChange : function(_this){ //点击左边模块，切换右边编辑模块
                var me = $(_this);
                var thisInd = me.attr("ind");
                var rightName = $(".right").find("div[ind="+thisInd+"]");

                $(".rightDiv").delegate("input[name=myfiles]", "change", function() {
                    var meInput = $(this);
                    var id = meInput.attr("id");
                    var parInd = meInput.parents(".rightDiv").attr("ind");
                    var parId = meInput.parents(".rightDiv").attr("id");
                    var leftId = $(".leftDiv[ind="+parInd+"]").attr("id");

                    ajaxFileUpload(id, "uploadImg.do", function(msg){
                        var idd = meInput.attr("fileElementId"); 
                        $("#" + idd ).siblings(".addPicture").attr("src",msg[0]);
                        /*imgEcho.init(meInput, app.components,msg[0]); //上传图片后回显到左边*/
                    }); 
                });
                

               $(".skySet").delegate(".navInput","keyup",function(){
                   $(".sky h1").html($("#storeName").val());
               })
                $(me).addClass("active").siblings(".leftDiv").removeClass("active");;
                $(me).find(".selectB").css("height",$(me).height()-4);
            },

     }
     
    app.init();
    
    $(".leftComponent").delegate("ul li","click",function(){
        /*waterfallShow.img_show();*/
        var self = $(this);
        var thisCom = self.attr("name");
        rightSet[thisCom].img_edit();
    });
   /* waterfall.init();*/
   rightSet.baiduMap.img_edit();
    
})