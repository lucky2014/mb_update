define(function(require,exports,module){
    var $ = require("jquery");
    var setup = require("setup");

    var indexTpl = require("plat_index/index.tpl");
    var templateTpl = require("plat_index/template.tpl");
    var Engine = require("engine");
    var box = Engine.init();

    var nowDate = require("common.date/nowDate");
    var Pagenation = require("pagenation");

    //页面逻辑
    var app = {
        Wwidth: $(window).width(),
        PAGEDATA:null,//存贮构造分页对象
        TOTALNUM:0,//一共多少条数据
        PAGESIZE:10,//每页显示的个数
        CURPAGE:1,//当前页
        PAGEBOX:null,//分页对象
        //查询已创建的模板列表
        init: function(pageNum, pageSize){ 
            setup.commonAjax("pageList.do", {userId: 49,pageNum: pageNum, pageSize:pageSize}, function(msg){
                var me = this;
                //console.log(JSON.stringify(msg.data,null,2));
                /*me.TOTALNUM = msg.page.totalPage;

                me.PAGEDATA.setPaging({
                    total: me.TOTALNUM, 
                    page: me.CURPAGE, 
                    size: me.PAGESIZE
                });*/

                if(msg.data.length >0){
                    $.each(msg, function(i,v){
                        v.createTime = nowDate.toDate(v.createTime, true);
                    });
                    box.render($("#table1 tbody"), msg.data, indexTpl);


                }else{
                    $("#table1 .hide").show();
                }
            });
        },
        //选择模板
        templateList: function(){
            var me = this;
            setup.commonAjax("templateList.do", {userId: 49}, function(msg){
                //console.log(JSON.stringify(msg,null,2));
                if(msg.length >0){
                    box.render($(".mask ul"), msg, templateTpl);
                    $(".mask").show();
                }else{
                    $(".mask .hide").show();
                }
            });
        },
        //删除模板
        delPage: function(pageId){
            var me = this;
            setup.commonAjax("delPage.do", {pageId: pageId,userId: 49}, function(msg){
               // console.log(JSON.stringify(msg,null,2));
                me.init();
            });
        },
        pagenation: function(totalNumber){
            var me=this;
            var _size = me.PAGESIZE, _total = me.TOTALNUM;

            var tar = $("#pagination");

            if(tar.data("pagesize")){
                _size = tar.data("pagesize");
            }else{
                tar.data("pagesize",_size);
            }
            var pageData = new Pagenation(tar, {
                page : me.CURPAGE,
                redirectUrl : '',
                sizeList : [10,15,20],//For pagesize option select setting use!
                type : 'table',//使用场景'common'通用的大分页； 'table'在表格中使用的分页；
                size : _size,
                showOnePage:true,
                showQuickTrigger: false,
                onPageChanged:function(page){
                    me.CURPAGE = page;
                    me.PAGESIZE = tar.data("pagesize");
                    me.getAjax(page,10);
                }
            });
            me.PAGEDATA = pageData;
        },
    }

    //执行页面逻辑，渲染表格
    app.init(1,10);
    //app.pagenation(app.TOTALNUM);  

    //点击新建模板
    $(".n_btn").click(function(){
        $("body,html").css({"overflow": "hidden", "height": "100%"});
        app.templateList();
    });

    //关闭选择模板遮罩
    $(".close").click(function(){
        $(".mask").hide();
        $("body,html").attr("style", "");
    });

    //删除已创建的模板
    $("#table1").delegate(".dele", "click", function(){
        var pageId = $(this).attr("id");
        app.delPage(pageId);
    });
});