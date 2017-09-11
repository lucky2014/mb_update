define(function(require,exports,module){
  var $ = require("jquery");
  var Engine = require("engine");
  var box = Engine.init();
  require("componentsSpecial/buttonEdit/index.css");
  require("common.editAll/rightEdit/index.css");
  var linkByOut = require("componentsSpecial/buttonEdit/linkByOut.tpl");
  var linkByInner = require("componentsSpecial/buttonEdit/linkByInner.tpl");
  var settingButton = require("componentsSpecial/buttonEdit/settingButton.tpl");
  var settingPicButton = require("componentsSpecial/buttonEdit/settingPicButton.tpl");
  var settingGridentButton = require("componentsSpecial/buttonEdit/settingGridentButton.tpl");
  var button1 = require("componentsSpecial/buttonEdit/index.tpl");
  var button2 = require("componentsSpecial/buttonEdit/index2.tpl");
  var button3 = require("componentsSpecial/buttonEdit/index3.tpl");

  var rightEditShow = require("component/index/tpl/positionSetting");

  var linkAdressTpl = require("common.linkAdress/linkAdress.tpl");

  var browser = function () {   
        var agent = navigator.userAgent.toLowerCase(),  
        opera = window.opera,  
        browser = {  
            //检测当前浏览器是否为IE  
            ie: /(msie\s|trident.*rv:)([\w.]+)/.test(agent), 
     
            //检测当前浏览器是否为Opera  
            opera: (!!opera && opera.version), 
            //检测当前浏览器是否是webkit内核的浏览器  
            webkit: (agent.indexOf(' applewebkit/') > -1), 
            //检测当前浏览器是否是运行在mac平台下  
            mac: (agent.indexOf('macintosh') > -1), 
            //检测当前浏览器是否处于“怪异模式”下  
            quirks: (document.compatMode == 'BackCompat'),
            moz:agent.indexOf("firefox")!=-1 
        }; 
        //检测当前浏览器内核是否是gecko内核  
        browser.gecko = (navigator.product == 'Gecko' && !browser.webkit && !browser.opera && !browser.ie); 
        var version = 0; 
        // Internet Explorer 6.0+  
        if (browser.ie) {  
            var v1 = agent.match(/(?:msie\s([\w.]+))/);  
            var v2 = agent.match(/(?:trident.*rv:([\w.]+))/);  
            if (v1 && v2 && v1[1] && v2[1]) {  
                version = Math.max(v1[1] * 1, v2[1] * 1);  
            } else if (v1 && v1[1]) {  
                version = v1[1] * 1;  
            } else if (v2 && v2[1]) {  
                version = v2[1] * 1;  
            } else {  
                version = 0;  
            } 
            //检测浏览器模式是否为 IE11 兼容模式  
            browser.ie11Compat = document.documentMode == 11; 
            //检测浏览器模式是否为 IE9 兼容模式  
            browser.ie9Compat = document.documentMode == 9; 
            //检测浏览器模式是否为 IE10 兼容模式  
            browser.ie10Compat = document.documentMode == 10; 
            //检测浏览器是否是IE8浏览器  
            browser.ie8 = !!document.documentMode; 
            //检测浏览器模式是否为 IE8 兼容模式  
            browser.ie8Compat = document.documentMode == 8; 
            //检测浏览器模式是否为 IE7 兼容模式  
            browser.ie7Compat = ((version == 7 && !document.documentMode) || document.documentMode == 7); 
            //检测浏览器模式是否为 IE6 模式 或者怪异模式  
            browser.ie6Compat = (version < 7 || browser.quirks); 
            browser.ie9above = version > 8; 
            browser.ie9below = version < 9;  
        } 
        // Gecko.  
        if (browser.gecko) {  
            var geckoRelease = agent.match(/rv:([\d\.]+)/);  
            if (geckoRelease) {  
                geckoRelease = geckoRelease[1].split('.');  
                version = geckoRelease[0] * 10000 + (geckoRelease[1] || 0) * 100 + (geckoRelease[2] || 0) * 1;  
            }  
        } 
        //检测当前浏览器是否为Chrome, 如果是，则返回Chrome的大版本号  
        if (/chrome\/(\d+\.\d)/i.test(agent)) {  
            browser.chrome = +RegExp['\x241'];  
        } 
        //检测当前浏览器是否为Safari, 如果是，则返回Safari的大版本号  
        if (/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(agent) && !/chrome/i.test(agent)) {  
            browser.safari = +(RegExp['\x241'] || RegExp['\x242']);  
        } 
        // Opera 9.50+  
        if (browser.opera)  
            version = parseFloat(opera.version()); 
        // WebKit 522+ (Safari 3+)  
        if (browser.webkit)  
            version = parseFloat(agent.match(/ applewebkit\/(\d+)/)[1]); 
        //检测当前浏览器版本号  
        browser.version = version; 
        return browser;  
    }();var browser = function () {   
        var agent = navigator.userAgent.toLowerCase(),  
        opera = window.opera,  
        browser = {  
            //检测当前浏览器是否为IE  
            ie: /(msie\s|trident.*rv:)([\w.]+)/.test(agent), 
     
            //检测当前浏览器是否为Opera  
            opera: (!!opera && opera.version), 
            //检测当前浏览器是否是webkit内核的浏览器  
            webkit: (agent.indexOf(' applewebkit/') > -1), 
            //检测当前浏览器是否是运行在mac平台下  
            mac: (agent.indexOf('macintosh') > -1), 
            //检测当前浏览器是否处于“怪异模式”下  
            quirks: (document.compatMode == 'BackCompat'),
            moz:agent.indexOf("firefox")!=-1 
        }; 
        //检测当前浏览器内核是否是gecko内核  
        browser.gecko = (navigator.product == 'Gecko' && !browser.webkit && !browser.opera && !browser.ie); 
        var version = 0; 
        // Internet Explorer 6.0+  
        if (browser.ie) {  
            var v1 = agent.match(/(?:msie\s([\w.]+))/);  
            var v2 = agent.match(/(?:trident.*rv:([\w.]+))/);  
            if (v1 && v2 && v1[1] && v2[1]) {  
                version = Math.max(v1[1] * 1, v2[1] * 1);  
            } else if (v1 && v1[1]) {  
                version = v1[1] * 1;  
            } else if (v2 && v2[1]) {  
                version = v2[1] * 1;  
            } else {  
                version = 0;  
            } 
            //检测浏览器模式是否为 IE11 兼容模式  
            browser.ie11Compat = document.documentMode == 11; 
            //检测浏览器模式是否为 IE9 兼容模式  
            browser.ie9Compat = document.documentMode == 9; 
            //检测浏览器模式是否为 IE10 兼容模式  
            browser.ie10Compat = document.documentMode == 10; 
            //检测浏览器是否是IE8浏览器  
            browser.ie8 = !!document.documentMode; 
            //检测浏览器模式是否为 IE8 兼容模式  
            browser.ie8Compat = document.documentMode == 8; 
            //检测浏览器模式是否为 IE7 兼容模式  
            browser.ie7Compat = ((version == 7 && !document.documentMode) || document.documentMode == 7); 
            //检测浏览器模式是否为 IE6 模式 或者怪异模式  
            browser.ie6Compat = (version < 7 || browser.quirks); 
            browser.ie9above = version > 8; 
            browser.ie9below = version < 9;  
        } 
        // Gecko.  
        if (browser.gecko) {  
            var geckoRelease = agent.match(/rv:([\d\.]+)/);  
            if (geckoRelease) {  
                geckoRelease = geckoRelease[1].split('.');  
                version = geckoRelease[0] * 10000 + (geckoRelease[1] || 0) * 100 + (geckoRelease[2] || 0) * 1;  
            }  
        } 
        //检测当前浏览器是否为Chrome, 如果是，则返回Chrome的大版本号  
        if (/chrome\/(\d+\.\d)/i.test(agent)) {  
            browser.chrome = +RegExp['\x241'];  
        } 
        //检测当前浏览器是否为Safari, 如果是，则返回Safari的大版本号  
        if (/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(agent) && !/chrome/i.test(agent)) {  
            browser.safari = +(RegExp['\x241'] || RegExp['\x242']);  
        } 
        // Opera 9.50+  
        if (browser.opera)  
            version = parseFloat(opera.version()); 
        // WebKit 522+ (Safari 3+)  
        if (browser.webkit)  
            version = parseFloat(agent.match(/ applewebkit\/(\d+)/)[1]); 
        //检测当前浏览器版本号  
        browser.version = version; 
        return browser;  
    }();
  //页面逻辑
  var appParent = null;
  var app = {
    init:function(app){
      var me = this;
      appParent = app;
    	$("body").delegate("#inpBtn span","click",function(){  //按钮类型选择
          var ind = $(this).index();
          var thisStyle = $(app.dragTarget).find("input").attr("style");
          var btnName = $(app.dragTarget).find("input").val();

          sessionStorage.setItem("backgColor1","top, rgb(121, 205, 255), rgb(29, 155, 227)");
          //sessionStorage.setItem("backImage","url(http://122.224.218.61:8001/group1/M00/00/62/wKgCClmb6rOACbYxAAAE2wy7hXk965.png)");
          var preInd = $("#inpBtn span.active").index();
          if(preInd == 2){
            //var backImage = $(app.dragTarget).find("input").css("background-image");
            //sessionStorage.setItem("backImage",backImage);
          }else if(preInd == 1){
            var backgColor1 = $(app.dragTarget).find("input").css("background");
             sessionStorage.setItem("backgColor1",backgColor1);
          }
          if(ind==0){
              $(app.dragTarget).html(button1);
              $(app.dragTarget).find("input").val(btnName);
              $(app.dragTarget).find("input").attr("style",thisStyle);
              $(app.dragTarget).find("input").css("background-image","none");
              $(app.dragTarget).find("input")[0].style.filter = "";
              if(preInd == 1){
                $(app.dragTarget).find("input").css("background"," rgb(28, 154, 227)");
              }
              $(".setting-panel").html(settingButton);
              $(".linkDemo").html(linkAdressTpl);
              rightEditShow.rightShow(app);
              app.colorPicker(".skin-colorSelector-bg");
              app.colorPicker(".skin-colorSelector-border");
              app.colorPicker(".skin-colorSelector-font");
          }else if(ind==2){
              $(app.dragTarget).html(button2);
              $(app.dragTarget).find("input").val(btnName);
              $(app.dragTarget).find("input").attr("style",thisStyle);
              $(app.dragTarget).find("input")[0].style.filter = "";
              //$(app.dragTarget).find("input").css("background-image",sessionStorage.getItem("backImage"));
              if(preInd == 1){
                $(app.dragTarget).find("input").css("background"," rgb(28, 154, 227)");
              }
              $(".setting-panel").html(settingPicButton);
              $(".linkDemo").html(linkAdressTpl);
              rightEditShow.rightShow(app);
              app.colorPicker(".skin-colorSelector-border");
              app.colorPicker(".skin-colorSelector-bg");
              app.colorPicker(".skin-colorSelector-font");
          }else if(ind==1){
              $(app.dragTarget).html(button3);
              $(app.dragTarget).find("input").val(btnName);
              $(app.dragTarget).find("input").attr("style",thisStyle);
              $(app.dragTarget).find("input").css("background-image","none");
              var temp1 = "#79cdff";
              var temp2 = "#1d9be3";
              if(browser.webkit){
                    $(app.dragTarget).find("input")[0].style.background = "-webkit-linear-gradient("+temp1+", "+temp2+")";
                }else if(browser.opera){
                    $(app.dragTarget).find("input")[0].style.background = "-o-linear-gradient("+temp1+", "+temp2+")";
                }else if(browser.moz){
                    $(app.dragTarget).find("input")[0].style.background = "-moz-linear-gradient("+temp1+", "+temp2+")";
                }else if(browser.ie){
                    $(app.dragTarget).find("input")[0].style.filter = "progid:DXImageTransform.Microsoft.gradient(startcolorstr="+temp1+",endcolorstr="+temp2+",gradientType=0);"
                    $(app.dragTarget).find("input")[0].style.background = "linear-gradient("+temp1+", "+temp2+")";
                }else{
                    $(app.dragTarget).find("input")[0].style.background = "linear-gradient("+temp1+", "+temp2+")";
                }
              $(".setting-panel").html(settingGridentButton);
              $(".linkDemo").html(linkAdressTpl);
              rightEditShow.rightShow(app);
              app.colorPicker(".skin-colorSelector-border");
              app.colorPicker(".skin-colorSelector-bg");
              app.colorPicker(".skin-colorSelector-font");
              app.colorPicker(".skin-colorSelector-bgTp");
              app.colorPicker(".skin-colorSelector-bgBtm");
          }
          $(this).parent().find("span").eq(ind).addClass("active").siblings("span").removeClass("active");
    	})
      $("body").delegate("#font_type_select .before","click",function(){
        $("#fontConfig").slideToggle(300);
      })
      $("body").delegate("#fontConfig i","click",function(){  //加粗倾斜设置

        var type = $(this).attr("type");
        var config = $(this).attr("config");
        if($(this).hasClass("active")){
            if(type=="font-weight"){
                $(app.dragTarget).find("input").css({"font-weight":"normal"})
            }else{
                $(app.dragTarget).find("input").css({"font-style":"normal"})
            }
            $(this).removeClass("active");
        }else{
            if(type=="font-weight"){
                $(app.dragTarget).find("input").css({"font-weight":config})
            }else{
                $(app.dragTarget).find("input").css({"font-style":config})
            }
            $(this).addClass("active");
        }
      })
     /* $(".right").delegate(".progress-circle","mouseout",function(){
        var self = $(this);
        self.removeClass("hover");
        self.siblings("span").hide();
      })*/

      $("body").delegate(".picStyleSel li","click",function(){  //系统图片or我的图片切换
         var self = $(this);
         var indNum = self.attr("indNum");
         self.addClass("sel").siblings().removeClass("sel");
         $(".modal-body[indNum="+indNum+"]").show().siblings(".modal-body").hide();

      })
      $("body").delegate(".picButFast li","click",function(){ //快速更换按钮图标
          var self = $(this);
          var url = self.find("img").attr("src");
          $(app.dragTarget).find("img").attr("src",url);
      })
      $("body").delegate(".form-control","keyup",function(){
          $(app.dragTarget).find("input").val($(this).val());
      })
    },
    tpl:function(){
        return require("componentsSpecial/buttonEdit/settingButton.tpl")
    }
  }
  return app;
});