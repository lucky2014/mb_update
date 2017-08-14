define(function(require,exports,module){
    require("component/index/nav.css");

    var $ = require("jquery");
    
    var Engine = require("engine");
    var box = Engine.init();
    var navbarTpl = require("component/index/tpl/nav.tpl");
    var loadTemplateData = require("1/mb_index/index");

    var webRenameTpl = require("component/index/tpl/webRename.tpl");

    var setup = require("setup");
    var editSite = setup.getQueryString("editSite") || "";
    var initTemplateId = setup.getQueryString("templateId");
    var run = require("common.editAll/editBased/running");
    
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

            if(editSite == "true"){
                me.pageList();
                var _this = $(".new-icons-page").parents(".navi-btn");
                _this.addClass("active");
                if($(".itemsDraw li").length > 0){
                    $(".itemsDraw .noData").hide();
                }
                $(".navi-btn-dropdown").hide();
                _this.next().show();
            }else{
                $(".itemsDraw .noData").show();
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

            //左边滚动条美化
            var mouseWheel = require("common.mouseWheel/index"); //滚动条美化
            mouseWheel.init(".navi-btn-dropdown.site-page-navi-list,.navi-btn-dropdown.templates-list,.navi-btn-dropdown.ext-app");
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
                $(".itemsDraw .noData").hide();
            });
        },
        // 点击重命名
        reName: function(){
            var me = this;
            //点击时，如果有没有保存的修改，则保存
            $(".site-page-navi-list").delegate(".page-edit", "click", function(ev){
                var self = $(this);
                self.parents("li").find("a,.page-control").hide();
                self.parents("li").siblings().find("input,button,.noMarginI").hide();
                self.parents("li").siblings().find("a").show();

                var val = self.parent(".page-control").siblings("a").attr("title");
                var index = self.attr("index");
                var html ="<input type='text' value='"+ val +"' /><button>确认</button>";
                var html2 ="<input class='noMargin' type='text' value='"+ val +"' /><button>确认</button>";
                if(index == 1){
                    self.parents("li").append('<i class="homeIcon noMarginI"></i>'+html2)
                }else{
                    self.parents("li").append(html)
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
                var moduelId = self.attr('moduelId');
                $(".site-page-navi-list li[moduelId="+moduelId+"]").remove();
                if($(".itemsDraw li").length < 2){
                    $(".itemsDraw .noData").show();
                }
                me.getLinkData();
            });
        },
        //点击设为模板
        setModuel: function(){

        },
        //点击确认
        okBtn: function(){
            var me = this;
            $(".site-page-navi-list ul").delegate(" button", "click", function(){
                var self = $(this);
                var val = {
                    text: self.siblings("input").val(),
                    link:"https://www.iliujia.com",
                };
                //加载新的li
                box.render(self.parent(), val, webRenameTpl);
                me.getLinkData();
            });
        },
        pageList: function(){ //已创建页面接口
            var me = this;
            var params = {
                siteId : setup.getQueryString("siteId"),
                pageNum : 1,
                pageSize : 10,
            }
            console.log(setup.getQueryString("siteId"));
            setup.commonAjax("pageList.do", params, function(msg){  
                console.log(JSON.stringify(msg,null,2));
                var msg = msg.data;
                $.each(msg, function(i,v){
                    v.pageName = v.pageName ? v.pageName : "页面"+ (i+1);
                });

                var itemsTpl = require("component/index/tpl/items.tpl");
                box.render($(".itemsDraw"), msg, itemsTpl);  
                $(".itemsDraw li:first-child").addClass("activePage");  
                $(".itemsDraw li:first-child span").attr("index",1);       
                //点击每个页面中间渲染
                $(".itemsDraw").delegate(" li","click",function(){
                    $(".left").html("");
                    var self = $(this);
                    self.addClass("activePage").siblings().removeClass("activePage");
                    var pageId = self.attr("pageId");
                    loadTemplateData.init("getPageInfo.do", "pageId", pageId, function(datas){
                        run.running(datas);
                    });
                })                   
                
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
                    me.selectTemp(templateId,me);
                })
            });
        },
        //组件接口
        componentList: function(){ 
            setup.commonAjax("componentList.do", "", function(msg){ 
                var extsTpl = require("component/index/tpl/exts.tpl"); 
                /*var extsFastTpl = require("component/index/tpl/extsFast.tpl");*/
                box.render($(".extsDraw1"), msg, extsTpl);               
                /*box.render($(".extsDraw2"), "", extsFastTpl);*/               
            });
        },
        //加载模板页面（空白或非空白）
        selectTemp: function(templateId,me){
            if(templateId == "000"){
                loadTemplateData.init("");
                $(".left").css("background", "#fff");
            }else{
                loadTemplateData.init("templateData.do", "templateId", templateId,function(datas){
                    me.datas = datas;
                    $(".left").css("background", "#f4f5fa");
                    //console.log(JSON.stringify(run,null,2));
                    run.running(datas);
                });
            } 
        }
    }
    return app;
});