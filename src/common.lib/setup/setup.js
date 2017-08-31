define(function(require, exports, module) {
	var $ = require("jquery");
    var popUp = require("common.PopUp/index");

    var setupApp = {
        url:"http://"+(location.host||"wx.yinnima.com:8088")+"/template/official/", //测试
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
                        msg && succCallback(msg.returnObject);
                    }else if(msg.resultCode == 8001){ //域名已被占用
                        $(".pblErr").show();
                    }else if(msg.resultCode == 8002){
                        popUp({
                            "content":"页面名称不能超过16个字符！",
                            showCancelButton: false,
                            showConfirmButton: false,
                            timer: 2000
                        });
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