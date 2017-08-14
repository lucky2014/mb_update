define(function(require,exports,module){
   var $ = require("jquery");
   //十六进制颜色值的正则表达式  
   var app = {
      progress_bar : function(leftPer,callBack){
          $(".cuttingLineSet .progress_btn").css("left",leftPer*200)
          $('.cuttingLineSet .progress_bar').width(leftPer*200);

          var tag = false,ox = 0,left = leftPer*200,bgleft = 0;
          $('.cuttingLineSet .progress_btn').mousedown(function(e) {
              ox = e.pageX - left;
              tag = true;
          });
          $(document).mouseup(function() {
              tag = false;
          });
          $('.cuttingLineSet .progress').mousemove(function(e) {//鼠标移动
              if (tag) {
                  left = e.pageX - ox;
                  if (left <= 0) {
                      left = 0;
                  }else if (left > 200) {
                      left = 200;
                  }
                  $('.cuttingLineSet .progress_btn').css('left', left);
                  $('.cuttingLineSet .progress_bar').width(left);
                  $('.cuttingLineSet .text').html(parseInt((left/200)*100) + '%');
                  callBack && callBack(left);
              }
          });
          $('.cuttingLineSet .progress_bg').click(function(e) {//鼠标点击
              if (!tag) {
                  bgleft = $('.cuttingLineSet .progress_bg').offset().left;
                  left = e.pageX - bgleft;
                  if (left <= 0) {
                      left = 0;
                  }else if (left > 200) {
                      left = 200;
                  }
                  $('.cuttingLineSet .progress_btn').css('left', left);
                  $('.cuttingLineSet .progress_bar').animate({width:left},200);
                  $('.cuttingLineSet .text').html(parseInt((left/200)*100) + '%');
                  callBack && callBack(left);
              }
          });
      },
   }
   return app; 
  
});