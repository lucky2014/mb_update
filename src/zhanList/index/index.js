define(function(require,exports,module){
	var $ = require("jquery");

    var setup = require("setup");

    var Engine = require("engine");
    var box = Engine.init();

    require("common.lib/jquery.ui/jquery.qrcode.min"); //生成二维码
    var popUp = require("common.PopUp/index");
    
    //页面逻辑
    var app = {
        init: function(){ 
            var me = this;
             $(".microItem").hover(
               function(){
                 $(this).find(".hover").fadeIn(300);
               },
               function(){
                 $(this).find(".hover").fadeOut(300);
               }
             );

             $(".siteEv").hide();
        },
        siteList: function(){ //查询站点列表
            var me = this;
            setup.commonAjax("siteList.do", "", function(msg){  
                var indexTpl = require("zhanList/index/index.tpl");
                box.render($(".microContainer dl"), msg, indexTpl, 1);
                me.init(); 
            });
        },
    }

    //执行页面逻辑
    app.siteList();

    //新建站点
    $(".section").delegate(".newSite","click",function(){ 
         setup.commonAjax("addSite.do", "", function(msg){  
             window.location.href = "../templateList/templateList.html?&siteId="+msg;  
         });
    });

    ////鼠标移上去图片，点击按钮
    $(".microContainer").delegate(".hover a","click",function(){ 
        var self = $(this);
        var siteId = self.parents("dd.microItem").attr("siteId");
        var url = self.parents("dd.microItem").attr("url") || "http://www.iliujia.com";
        var type = self.attr("class");
        var html = '<div class="siteCode"></div>';

        if(type == "edit"){ //编辑状态
          window.location.href = "../component/index.html?&siteId="+siteId+"&editSite=true";
        }else if(type == "manage"){ //站点管理

        }else{ //预览
          $(".siteEv").html("");
          $(".hover,.siteEv").hide();
          self.parents(".hover").siblings(".siteEv").html(html).show();

          $(".siteCode").qrcode({
              render: "canvas",
              width: 100,
              height: 100,
              text: url
          });

        }

        return false;
        
    });
    

    //点击站点最下面的4个按钮
    $(".microContainer").delegate(".microItem a","click",function(){ 
        var self = $(this);
        var thisLi = self.parents("dd.microItem");
        var siteId = thisLi.attr("siteId");
        var url = thisLi.attr("url") || "http://www.iliujia.com";
        var type = self.attr('class');

        if(type == "del"){
          setup.commonAjax("delSite.do", {siteId:siteId}, function(msg){  
            popUp({
                "content":"删除成功！",
                showCancelButton: false,
                showConfirmButton: false,
                timer: 2000
            });
            thisLi.remove();
          });
        }else if(type == "up"){ // 上线
          setup.commonAjax("changeSiteStatus.do", {siteId: siteId, status: 1}, function(msg){  
            popUp({
                "content":"上线成功！",
                showCancelButton: false,
                showConfirmButton: false,
                timer: 2000
            });

            self.attr("class","down").html("<i></i>下线");
          });
        }else if(type == "down"){ // 下线
          setup.commonAjax("changeSiteStatus.do", {siteId: siteId, status: 0}, function(msg){  
            popUp({
                "content":"下线成功！",
                showCancelButton: false,
                showConfirmButton: false,
                timer: 2000
            });
            self.attr("class","up").html("<i></i>上线");
          });
        }else if(type == "link"){ // 连接
          //先清除相同位置可能出现的杂质
          $(".siteEv").html("");
          $(".hover,.siteEv").hide();
          //再添加
          var html = "<div>推广连接</div><input type='text' id='url1' value='"+url+"' /><button>复制</button>";

          self.parents("dd.microItem").find(".siteEv").html(html).show();
          $(".hover").hide();

          function jsCopy(){
            var e=document.getElementById("url1");//对象是content 
              e.select(); //选择对象 
              document.execCommand("Copy"); //执行浏览器复制命令
          }

          $(".microContainer").delegate(".siteEv button", "click", function(){
            jsCopy();
          }); 

        }else if(type == "qrcode"){ // 二维码
          var html = '<div class="siteCode"></div>';

          $(".siteEv").html("");
          $(".hover,.siteEv").hide();
          self.parents("dd.microItem").find(".siteEv").html(html).show();

          $(".siteCode").qrcode({
              render: "canvas",
              width: 100,
              height: 100,
              text: url
          });

        }  

        return false;       
    });


});

