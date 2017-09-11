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
        nav_init:function(){
            var me = this;

            box.render($(".navbar-inner"), "", navbarTpl);//加载导航

            me.pageList();
            /*if(editSite == "true"){*/
                /*me.pageList();*/
            var _this = $(".new-icons-page").parents(".navi-btn");
            _this.addClass("active");
            $(".navi-btn-dropdown").hide();
            _this.next().show();
            /*}else{ 
                var _that = $(".new-icons-tpl").parents(".navi-btn");
                 _that.addClass("active");
                $(".navi-btn-dropdown").hide();
                _that.next().show();
            }*/

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
            
            //me.selectTemp(initTemplateId,me);
            me.addPage(); //点击新增页面
            me.okBtn();  //点击新增页面的确认按钮
            me.reName(); //点击重命名
            //me.hovereName();
            me.copy();  //点击复制
            me.dele();//点击删除
        },
        //点击新增页面
        addPage: function(){
            $(".site-page-navi-add").click(function(){
                var pageNum = $(".itemsDraw li").length+1;
                $(".site-page-navi-list ul").append("<li><input type='text' value='第"+pageNum+"页'/><button>确认</button></li>");
                var datas = run.saveData();
                if(datas.components[0].elements){
                    run.compareCacheDatas(datas, function(){
                        run.cacheDatas = JSON.stringify(run.saveData());
                    });
                }
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
                var html ="<input type='text' value='"+ val +"' maxlength='16' /><button>确认</button>";
                var html2 ="<input class='noMargin' type='text' value='"+ val +"' maxlength='16'/><button>确认</button>";
                if(!editNow || editNow == "0"){ //避免重复append编辑框
                    if(index == 1){
                        self.parents("li").append('<i class="homeIcon noMarginI"></i>'+html2)
                    }else{
                        self.parents("li").append(html)
                    }
                    self.parents("li").attr("editNow","1");
                }else{
                    self.parents("li").find("input,button,.noMarginI").show();
                }
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
                //接口
                me.copyToAddPage(self);
            });
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
        //点击确认
        okBtn: function(){
            var me = this;
            $(".site-page-navi-list ul").delegate("button", "click", function(e){
                e.stopPropagation();
                if(!$(this).parents("li").hasClass("activePage")){
                    $(this).parents("li").click();
                }
                var self = $(this);
                var thisLi = self.parent();
                var val = {
                    text: self.siblings("input").val(),
                    link:"",
                };
                thisLi.attr("editNow","0");//编辑状态置0
                //加载新的li
                box.render(thisLi, val, webRenameTpl);

                if(!thisLi.attr("pageId")){
                    thisLi.addClass("activePage").attr("templateId", "0").siblings("li").removeClass("activePage");
                    $(".left").html("").attr("pageId","").attr("isHomePage", "").attr("templateId", "0");
                    pageSet.img_edit(dataBlank);
                }
                $("#sky h1").html(val.text);
                $("#storeName").val(val.text);
                if(thisLi.attr("ishomepage") != 1){
                    $(".left").attr("ishomepage",0);
                }else{
                    thisLi.find("a").prepend('<i class="homeIcon"></i>');
                    $(".itemsDraw li:first-child").find(".page-dele").remove();
                }
                
                run.pageSave(1);
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
                    //console.log(JSON.stringify(v,null,2))
                    if(v.isHomePage == 1){
                        $("#sky h1").html(v.pageName);
                        showDatas = $.extend({}, JSON.parse(v.data));
                        $(".left").attr("isHomePage", 1).attr("pageId",v.id);
                        //渲染中间的left
                        if(showDatas){
                            run.loadFn(showDatas,"",1); //有第二个参数是预览效果，
                        }
                        $(".right").html("");
                        pageSet.img_edit(v);
                    }
                });
                
                run.cacheDatas = JSON.stringify(run.saveData());
                var itemsTpl = require("component/index/tpl/items.tpl");
                box.render($(".itemsDraw"), msg, itemsTpl);  
                $(".itemsDraw li:first-child").addClass("activePage").attr("isHomePage","1");  
                $(".itemsDraw li:first-child").find(".page-dele").remove();
                $(".itemsDraw li:first-child span").attr("index",1); 
                //点击每个页面中间渲染
                app.selectItems();         
            });
        },
        //组件引入
        componentList: function(){ 
                var extsTpl = require("component/index/tpl/exts.tpl"); 
                box.render($(".extsDraw1"), "", extsTpl);  
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

            $(".itemsDraw").delegate(" li","click",function(){
                var self = $(this).children("a");
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
            
            $(".left").html("").attr("pageId", pageId).attr("isHomePage",isHomePage);
            setup.commonAjax("getPageInfo.do", {pageId:pageId}, function(msg){ 
                $("#sky h1").html(msg.pageName);
                run.loadFn(JSON.parse(msg.data),"",1); //1说明返回的数据是包括components
                //渲染右边页面设置
                pageSet.img_edit(msg);
                run.cacheDatas = JSON.stringify(run.saveData());
            });
        },

        //点击复制的时候，新增页面
        copyToAddPage: function(self){
            //新增之前先请求页面信息作为复制的内容
            var thisLi = self.parents("li");
            var html = thisLi.clone(true);
                thisLi.after(html);
            var pageId = thisLi.attr("pageId");
            setup.commonAjax("getPageInfo.do", {pageId: pageId}, function(msg){  
                var msg = msg;

                var params = {
                   "templateId": 0,
                   "pageName": msg.pageName,
                   "data": JSON.stringify({components: JSON.parse(msg.data).components}),
                   "siteId": msg.siteId,
                   "sortNum":thisLi.index()+2,
                };

                setup.commonAjax("addPage.do", params, function(newPageId){ 
                    var newPageId = newPageId.id;
                    $(".left").attr("pageId",newPageId);

                    $("#sky h1").html(msg.pageName);
                    run.loadFn(JSON.parse(msg.data),"",1); //1说明返回的数据是包括components
                    //渲染右边页面设置
                    pageSet.img_edit(msg);

                    popUp({
                        "content":"页面复制成功！",
                        showCancelButton: false,
                        showConfirmButton: false,
                        timer: 1000
                    });

                    $(".itemsDraw li").removeClass("activePage");
                    thisLi.next().addClass("activePage").attr("pageId",newPageId);
                    thisLi.next().removeAttr("ishomepage");
                    if(thisLi.attr("ishomepage") == 1){
                        thisLi.next().find(".page-control").append('<span class="page-share set-page-tpl page-dele"><i></i></span>');
                    }
                });

            });
        }
    }



    $("#sky.leftDiv").click(function(){
        var pageId = $(".left").attr("pageId");
        /*setup.commonAjax("getPageInfo.do", {pageId:pageId}, function(msg){  */
            //渲染右边页面设置
            var pageName = $(".sky h1").html();
            var bkColor = $("#sky").attr("color");
            pageSet.img_edit();
             $("#storeName").val(pageName);
             $("#skySet").find(".sp-preview-inner").css("background-color",bkColor);
        /*});*/
    });
    return app;
});