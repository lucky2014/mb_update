define(function(require,exports,module){
	var $ = require("jquery");
    var setup = require("setup");
    
    //上传商户LOGO
    require("common.ajaxfileupload/ajaxfileupload");
    function ajaxFileUpload(obj, url, callback){
        $.ajaxFileUpload({
            url: setup.url + url,
            type: 'post',
            secureuri: false, //一般设置为false
            async: true,
            fileElementId: obj,
            dataType: 'json', //返回值类型，一般设置为json、application/json
            success: function(msg) {
                var msg = JSON.parse(msg); 
                //console.log(JSON.stringify(msg,null,2));
                if (msg.resultCode == 1000) {
                    callback && callback(msg.returnObject);
                }
            },
            error: function(msg){
                //console.log(msg);
            }
        });
    }
    
    return ajaxFileUpload;
});