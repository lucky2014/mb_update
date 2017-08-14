define(function(require,exports,module){
	var $ = require("jquery");

  var setup = require("setup");

  var Engine = require("engine");
  var box = Engine.init();
  
  var siteId = setup.getQueryString("siteId");
  //页面逻辑
  var app = {
      templateList: function(){ //查询站点列表
        var indexTpl = require("templateList/index.tpl");
        //console.log(indexTpl)
        box.render($(".microTemplate"), "", indexTpl);
          var me = this;
          var params = {
            type : 2,
            pageNum : 1,
            pageSize : 10,
          }
          setup.commonAjax("showTemplateList.do", params, function(msg){  
              var datas = msg.data;
              $.each(datas, function(i,j){
                if(j.childList.pic){
                  j.pic = 0;
                }
              });
              var temPicTpl = require("templateList/temPic.tpl");

              box.render($(".temsContainer"), msg.data, temPicTpl,"0");

              $(".previewCon").delegate("button","click",function(){
                  app.useNow($(this));
              })
         });
      },
      clickLi: function(self){
        self.addClass("selected").siblings("li").removeClass("selected");

        var htm1 = $(".userTrade li.selected").html();
        var htm2 = $(".userScene li.selected").html();

        if((htm1 == "全部" && htm2 == "全部") || (htm1 == "全部" && htm2 == "展示") || (htm1 == "全部" && htm2 == "预约") || (htm1 == "制造" && htm2 == "全部")){
          $(".tempOuter").show();
        }else{
          $(".tempOuter[blank=1]").show();
          $(".tempOuter[blank=0]").hide();
        }
      },
      useNow: function(self){
        var templateId = "";
        var blank = self.parents(".tempOuter").attr("blank");
        var temLi =self.parents(".previewCon").siblings("ul").find("li:first-child").attr("templateId");

        templateId = (blank==1) ?  "000" : temLi;

        window.location.href = "../component/index.html?&siteId="+siteId+"&templateId="+templateId;
      },
  }
  app.templateList();
  $(".classify").delegate("li","click",function(){
    app.clickLi($(this));
  })
 
});

