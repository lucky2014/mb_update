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

          sessionStorage.setItem("backgColor1","-webkit-linear-gradient(top, rgb(121, 205, 255), rgb(29, 155, 227))");
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
              if(preInd == 1){
                $(app.dragTarget).find("input").css("background-color"," rgb(28, 154, 227)");
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
              //$(app.dragTarget).find("input").css("background-image",sessionStorage.getItem("backImage"));
              if(preInd == 1){
                $(app.dragTarget).find("input").css("background-color"," rgb(28, 154, 227)");
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
              $(app.dragTarget).find("input").css("background",sessionStorage.getItem("backgColor1"));
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