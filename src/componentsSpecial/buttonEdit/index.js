define(function(require,exports,module){
  var $ = require("jquery");
  var Engine = require("engine");
  var box = Engine.init();
  require("componentsSpecial/buttonEdit/index.css");
  var linkByOut = require("componentsSpecial/buttonEdit/linkByOut.tpl");
  var linkByInner = require("componentsSpecial/buttonEdit/linkByInner.tpl");
  var settingButton = require("componentsSpecial/buttonEdit/settingButton.tpl");
  var settingPicButton = require("componentsSpecial/buttonEdit/settingPicButton.tpl");
  var settingGridentButton = require("componentsSpecial/buttonEdit/settingGridentButton.tpl");
  var button1 = require("componentsSpecial/buttonEdit/index.tpl");
  var button2 = require("componentsSpecial/buttonEdit/index2.tpl");
  var button3 = require("componentsSpecial/buttonEdit/index3.tpl");
  //页面逻辑
  var app = {
    init:function(app){
      var me = this;
    	$("body").delegate("#inpBtn span","click",function(){
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
        $(this).parent().children().eq(ind).addClass("active").siblings().removeClass("active");
    	})
      $("body").delegate("#font_type_select .before","click",function(){
        $("#fontConfig").slideToggle(300);
      })
      $("body").delegate("#fontConfig i","click",function(){
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
      $("body").delegate("#fontConfig select","change",function(){
          var self = $(this).find("option:selected");
          $(app.dragTarget).find("input").css("font-size",self.html())
      })
      $("body").delegate(".btnLinkChoose select","change",function(){
          var ind = $(this).find("option:selected").index();
          if(ind==0){
              box.render($(".btnLink"), "", linkByOut);
          }else if(ind==1){
              box.render($(".btnLink"), "", linkByInner);
              app.getLinkData();
          }
      })
      $("body").delegate(".btnLink select","change",function(){
          var link = $(this).find("option:selected").attr("data-link");
          $(app.dragTarget).find("input").attr("onclick","location.href='"+link+"'");
      })
      $("body").delegate(".btnLink input","input propertychange",function(){
          var link = $(".linkByOut input").val();
          $(app.dragTarget).find("input").attr("onclick","location.href='"+link+"'");
      })
      $("body").delegate(".btnText input","input propertychange",function(){
          $(app.dragTarget).find("input").val($(this).val())
      })
      $(".right").delegate(".progress-circle","mouseover",function(){
        var self = $(this);
        self.addClass("hover");
        self.siblings(".percent").html(self.parents("p").attr("value"));
        self.siblings("span").show();

      })
      $(".right").delegate(".progress-circle","mouseout",function(){
        var self = $(this);
        self.removeClass("hover");
        self.siblings("span").hide();
      })
    },
    tpl:function(){return require("componentsSpecial/buttonEdit/settingButton.tpl")}
  }
  return app;
});