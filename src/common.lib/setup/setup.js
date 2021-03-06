define(function(require, exports, module) {
	var $ = require("jquery");

    var setupApp = {
        url:"http://"+(location.host||"wx.yinnima.com")+"/template/official/", //测试
        getQueryString: function(name) { //获取URL的参数，isEit
          var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
          var r = window.location.search.substr(1).match(reg);
          if (r != null) {
            //return unescape(r[2]);
            return decodeURI(r[2]);
          }
          return null;
        },
        commonAjax: function(name, params, succCallback, errCallback,async){
            var me = this;
            $.ajax({  
                type: "POST",  
                url: me.url+name,  
                data: params,
                dataType: "json",
                async:async||true,  
                success: function(msg){
                    if(msg.resultCode == 1000){
                        //console.log(JSON.stringify(msg,null,2));
                        msg && succCallback(msg.returnObject);
                    }else if(msg.resultCode == 9998){ //系统异常或故障
                        /*popUp({
                            "title":"错误提示",
                            "content":"卡券创建不成功！",
                            showCancelButton: false,
                            showConfirmButton: false,
                            timer: 2000
                        });*/
                    }
                }, 
                complete: function (XHR, TS) { XHR = null },
                error: function (msg) {  
                    if(errCallback) errCallback(msg); 
                }  
            }); 
        },
        isIE: function(){ //判断浏览器是不是IE,暂时不需要
            return (!!window.ActiveXObject || "ActiveXObject" in window) ? true : false;
        }
    };

    module.exports = setupApp;
});