define(function(require,exports,module){
    require("../../../css/base.css");
    require("component/index/nav.css");
    require("../../../css/common.css");
    

    var $ = require("jquery");
    
    var Engine = require("engine");
    var box = Engine.init();
    var navbarTpl = require("component/index/tpl/nav.tpl");

    var webRenameTpl = require("component/index/tpl/webRename.tpl");

    var setup = require("setup");
    var editSite = setup.getQueryString("editSite") || "";
    var initTemplateId = setup.getQueryString("templateId");
    var run = require("common.editAll/editBased/running");

    var popUp = require("common.PopUp/index");
    var pageSet = require("componentsSpecial/skySet/index");
    var saveSet = require("save/index");

    var dataBlank={
      "data": "{\"components\":[{\"elements\":{},\"backgroundColor\":\"#f0f0fa\",\"pageName\":\"\"}]}",
      "pageName": "",
      "templateId": 0
    }
    var siteId = setup.getQueryString("siteId")
    var app = {
        getLinkData:function(){
          var temp = "<option data-link='a1'>a2</option>";
          var str = "";
          for(var i = 0;i<$(".itemsDraw li").length;i++){
            var link = $(".itemsDraw li").eq(i).find("a").attr("data-link");
            var html = $(".itemsDraw li").eq(i).find("a").html();
            var reg = new RegExp("a1","g");
            var reg2 = new RegExp("a2","g");
            str+=temp.replace(reg,link).replace(reg2,html);
          }
          $(".btnLink select").html(str)
        },
        nav_init:function(){
            var me = this;

            box.render($(".navbar-inner"), "", navbarTpl);//加载导航

            me.pageList();
            if(editSite == "true"){
                /*me.pageList();*/
                var _this = $(".new-icons-page").parents(".navi-btn");
                _this.addClass("active");
                $(".navi-btn-dropdown").hide();
                _this.next().show();
            }else{ 
                var _that = $(".new-icons-tpl").parents(".navi-btn");
                 _that.addClass("active");
                $(".navi-btn-dropdown").hide();
                _that.next().show();
            }

            me.templateList();
            me.componentList();

            //导航点击事件
            $(".navi-btn").click(function(){
                var self = $(this);
                var ind = self.parent().index();
                self.parent().siblings().find(".navi-btn").removeClass("active")
                self.addClass("active");
                $(".navi-btn-dropdown").hide();
                self.next().show();
                
                if(self.hasClass("zujian")){   //组件库边框样式
                    var liL = $(".extsDraw2 li").length;
                    for(var i=0;i<liL/3;i++){
                        var j = 3*(i+1)-1;
                        $(".extsDraw2 li:eq("+j+")").addClass("bor");
                        $(".extsDraw2 li").mouseover(function(){
                             $(".extsDraw2 li").removeClass("bor");
                        })
                    }
                }
            });
            
            me.pageInit();//网页模块小功能       
        },
        //网页模块小功能
        pageInit: function(){
            var me = this;
            //鼠标移上去，出来网页重命名、复制、设为模板功能
            $(".site-page-navi-list").delegate("li", "mouseover", function(ev){
                var self = $(this);
                $(".page-control").hide();
                self.find(".page-control").show();
                return false;
            });
            //鼠标移开，隐藏网页重命名、复制、设为模板功能
            $(".site-page-navi-list").delegate("li", "mouseout", function(ev){
                var self = $(this);
                $(".page-control").hide();
                self.find(".page-control").hide();
                return false;
            });
            
            me.selectTemp(initTemplateId,me);
            me.addPage(); //点击新增页面
            me.okBtn();  //点击新增页面的确认按钮
            me.reName(); //点击重命名
            me.hovereName();
            me.copy();  //点击复制
            me.dele();//点击删除
            me.setModuel();//点击设为模板
        },
        //点击新增页面
        addPage: function(){
            $(".site-page-navi-add").click(function(){
                var pageNum = $(".itemsDraw li").length+1;
                $(".site-page-navi-list ul").append("<li><input type='text' value='第"+pageNum+"页'/><button>确认</button></li>");
            });
        },
        // 点击重命名
        reName: function(){
            var me = this;
            //点击时，如果有没有保存的修改，则保存
            $(".site-page-navi-list").delegate(".page-edit", "click", function(ev){
                var self = $(this);
                var editNow = self.parents("li").attr("editNow");
                self.parents("li").find("a,.page-control").hide();
                self.parents("li").siblings().find("input,button,.noMarginI").hide();
                self.parents("li").siblings().find("a").show();

                var val = self.parent(".page-control").siblings("a").attr("title");
                var index = self.attr("index");
                var html ="<input type='text' value='"+ val +"' /><button>确认</button>";
                var html2 ="<input class='noMargin' type='text' value='"+ val +"' /><button>确认</button>";
                if(!editNow || editNow == "0"){ //避免重复append编辑框
                    if(index == 1){
                        self.parents("li").append('<i class="homeIcon noMarginI"></i>'+html2)
                    }else{
                        self.parents("li").append(html)
                    }
                    self.parents("li").attr("editNow","1");
                }
                me.getLinkData();
            });
        },
        hovereName: function(){ //hover提示重命名 复制 删除字样
            $(".site-page-navi-list").delegate(".page-control span", "mouseover", function(ev){
                var self = $(this);
                self.find("b").show();
            });
             $(".site-page-navi-list").delegate(".page-control span", "mouseout", function(ev){
                var self = $(this);
                self.find("b").hide();
            });
        },
        //点击复制
        copy: function(){
            var me = this;
            $(".site-page-navi-list").delegate(".page-copy", "click", function(ev){
                var self = $(this);
                var html = self.parents("li").clone(true);
                self.parents("li").after(html);
            });
            me.getLinkData();
        },
        //点击删除
        dele: function(){
            var me = this;
            $(".site-page-navi-list").delegate(".page-dele", "click", function(ev){
                var self = $(this);
                var pageId = self.parents("li").attr('pageId');

                popUp({
                    "title": '提示<a class="cut"></a>',
                    "content":"<div class='deleText'><b></b>此操作将永久删除页面，是否继续？</div>",
                    showCancelButton: true,
                    showConfirmButton: true,
                }, function(){
                    if(pageId){
                        setup.commonAjax("delPage.do", {pageId:pageId}, function(msg){  
                          popUp({
                              "content":"删除成功！",
                              showCancelButton: false,
                              showConfirmButton: false,
                              timer: 1000
                          });
                          self.parents("li").remove();
                          me.getLinkData();
                          setTimeout(function(){
                              window.location.href = "../component/index.html?&siteId="+siteId+"&editSite=true";
                          },1000)
                        });
                    }else{
                        popUp({
                            "content":"删除成功！",
                            showCancelButton: false,
                            showConfirmButton: false,
                            timer: 1000
                        });
                        self.parents("li").remove();
                        setTimeout(function(){
                            window.location.href = "../component/index.html?&siteId="+siteId+"&editSite=true";
                        },1000)
                    }
                    
                });
            });
        },
        //点击设为模板
        setModuel: function(){

        },
        //点击确认
        okBtn: function(){
            var me = this;
            $(".site-page-navi-list ul").delegate(" button", "click", function(){
                $(".left").height($(".left").css("min-height"))
                var self = $(this);
                var thisLi = self.parent();
                var val = {
                    text: self.siblings("input").val(),
                    link:"",
                };
                thisLi.attr("editNow","0");//编辑状态置0
                //加载新的li
                box.render(thisLi, val, webRenameTpl);
                me.getLinkData();

                if(!thisLi.attr("pageId")){
                    thisLi.addClass("activePage").attr("templateId", "0").siblings("li").removeClass("activePage");
                    $(".left").html("").attr("pageId","").attr("isHomePage", "").attr("templateId", "0");
                  
                    pageSet.img_edit(dataBlank);
                }
                $("#sky h1").html(val.text);
                $("#storeName").val(val.text);


                var components = [];
                var newObj = $.extend({},{elements: {}})
                newObj.backgroundColor = $("#sky").attr("color");
                newObj.pageName = $("#sky h1").html();
                
                components.push(newObj);
                run.cacheDatas = $.extend({},{components: components});
            });
        },
        pageList: function(){ //已创建页面接口
            var me = this;
            var params = {
                siteId : setup.getQueryString("siteId"),
                pageNum : 1,
                pageSize : 100,
            }
            setup.commonAjax("pageList.do", params, function(msg){  
                var msg = msg.data;
                var showDatas = {};
                $(".left").html("");
                $.each(msg, function(i,v){
                    v.pageName = v.pageName ? v.pageName : "第"+ (i+1)+"页";
                    if(v.isHomePage == 1){
                        $("#sky h1").html(v.pageName);
                        showDatas = $.extend({}, JSON.parse(v.data));
                        $(".left").attr("isHomePage", 1).attr("pageId", v.id);
                        pageSet.img_edit(v);
                        
                        //渲染中间的left
                        if(showDatas){
                            run.loadFn(showDatas,"",1); //有第二个参数是预览效果，
                            run.cacheDatas = showDatas;
                        }
                    }
                });

                var itemsTpl = require("component/index/tpl/items.tpl");
                box.render($(".itemsDraw"), msg, itemsTpl);  
                $(".itemsDraw li:first-child").addClass("activePage").attr("isHomePage","1");  
                $(".itemsDraw li:first-child").find(".page-dele").remove();
                $(".itemsDraw li:first-child span").attr("index",1); 
   
                //点击每个页面中间渲染
                app.selectItems();         
            });
        },
        templateList: function(){ //模板接口
            var me = this;
            var userId = setup.getQueryString("userId") || 49;
            var params = {
                type : 1, //1为单页模板，2为多页模板
                pageNum : 1,
                pageSize : 100,
              }
            setup.commonAjax("showTemplateList.do", params, function(msg){ 
                $.each(msg,function(i,v){
                    v.userId = userId;
                }) 
                var templatesTpl = require("component/index/tpl/templates.tpl");
                box.render($(".templatesDraw"), msg.data, templatesTpl);                
                $(".templatesDraw").delegate(" li","click",function(){
                    $(".left").html("");
                    var self = $(this);
                    self.addClass("active").siblings().removeClass("active");
                    var userId = self.attr("userId");
                    var templateId = self.attr("templateId");
                })
            });
        },
        //组件接口
        componentList: function(){ 
            setup.commonAjax("componentList.do", "", function(msg){ 
                var extsTpl = require("component/index/tpl/exts.tpl"); 
                box.render($(".extsDraw1"), msg, extsTpl);               
            });
        },
        //加载模板页面（空白或非空白）
        selectTemp: function(templateId){
            if(templateId == "000"){
                $(".left").css("background", "#fff");
            }else{
                setup.commonAjax("templateData.do", {templateId:templateId}, function(msg){  
                    //$(".left").css("background", "#f4f5fa");
                    //run.loadFn(JSON.parse(msg.data),"",1); //1说明返回的数据是包括components
                    //run.running(JSON.parse(msg.data));
                });
            } 
        }, 
        //点击页面列表切换中间显示区
        selectItems: function(){ 
            var me = this;

            $(".itemsDraw").delegate(" li a","click",function(){
                var self = $(this);
                var datas = run.saveData();
                //编辑区的有需要保存的内容才弹框
                if(datas.components[0].elements){
                    run.compareCacheDatas(datas, function(){
                        me.pageListClick(self);
                    });
                }else{
                    me.pageListClick(self);
                }
            })        
        },
        pageListClick: function(self){
            self.parent().addClass("activePage").siblings().removeClass("activePage");
            var pageId = self.parent("li").attr("pageId");
            var isHomePage = self.parent("li").attr("isHomePage") || 0;
            
            if(pageId){
                $(".left").html("").attr("pageId", pageId).attr("isHomePage",isHomePage);
                setup.commonAjax("getPageInfo.do", {pageId:pageId}, function(msg){ 
                    $("#sky h1").html(msg.pageName);
                    run.loadFn(JSON.parse(msg.data),"",1); //1说明返回的数据是包括components
                    //渲染右边页面设置
                    pageSet.img_edit(msg);
                });
            }else{
                var templateId = self.parent("li").attr("templateId");
                $(".left").html("").attr("pageId", "").attr("templateId",templateId).attr("isHomePage", 0);
                var title = self.attr("title");
                 pageSet.img_edit(dataBlank);
                 $("#sky h1").html(title);
                 $("#storeName").val(title);

                 run.cacheDatas = {"components":[{"elements":{},"backgroundColor":$("#sky").attr("color"),"pageName":$("#sky h1").html()}]};
            }
        }
    }



    $("#sky.leftDiv").click(function(){
        var pageId = $(".left").attr("pageId");
        setup.commonAjax("getPageInfo.do", {pageId:pageId}, function(msg){  
            //渲染右边页面设置
            pageSet.img_edit(msg);
        });
    });
    return app;
});