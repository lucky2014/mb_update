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

  var linkAdress = require("common.linkAdress/index");
  //页面逻辑
  var app = {
    init:function(app){
      var me = this;
    	$("body").delegate("#inpBtn span","click",function(){  //按钮类型选择
          var ind = $(this).index();
          if(ind==0){
              $(app.dragTarget).html(button1);
              $(".setting-panel").html(settingButton);
              app.colorPicker(".skin-colorSelector-bg");
              app.colorPicker(".skin-colorSelector-border");
              app.colorPicker(".skin-colorSelector-font");
          }else if(ind==2){
              $(app.dragTarget).html(button2);
              $(".setting-panel").html(settingPicButton);
              app.colorPicker(".skin-colorSelector-border");
              app.colorPicker(".skin-colorSelector-bg");
              app.colorPicker(".skin-colorSelector-font");
          }else if(ind==1){
              $(app.dragTarget).html(button3);
              $(".setting-panel").html(settingGridentButton);
              app.colorPicker(".skin-colorSelector-border");
              app.colorPicker(".skin-colorSelector-bg");
              app.colorPicker(".skin-colorSelector-font");
              app.colorPicker(".skin-colorSelector-bgTp");
              app.colorPicker(".skin-colorSelector-bgBtm");
          }
          linkAdress.init();
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
      $(".right").delegate(".progress-circle","mouseout",function(){
        var self = $(this);
        self.removeClass("hover");
        self.siblings("span").hide();
      })

      $("body").delegate(".picStyleSel li","click",function(){  //系统图片or我的图片切换
         var self = $(this);
         var indNum = self.attr("indNum");
         self.addClass("sel").siblings().removeClass("sel");
         $(".modal-body[indNum="+indNum+"]").show().siblings(".modal-body").hide();

      })
      $("body").delegate(".picButFast li","click",function(){ //快速更换按钮图标
          var self = $(this);
          var url = self.find("img").attr("src");
          $(app.dragTarget).find(".picBut").css("background-image","url("+url+")");
      })
      $("body").delegate(".form-control","keyup",function(){
          $(app.dragTarget).find("input").val($(this).val());
      })
      linkAdress.init();
    },
    tpl:function(){return require("componentsSpecial/buttonEdit/settingButton.tpl")}
  }
  return app;
});