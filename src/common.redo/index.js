define(function(require,exports,module){
    require("../common.redo/index.css");

	var $ = require("$");
    var MutationJS = require("../common.redo/mutationJS");
    
    var app = {
        init: function(cb){
            var MutationJs = new MutationJS();
            //取消监听
            MutationJs.disconnect();
            //重新监听
            MutationJs.reObserve();

            $("#b0").click(function(){
                var v = $("#value").val();
                $("#div").append("<div>" + v + "</div>");
            });

            $("#prev").click(function(){
                MutationJs.undo();
            });

            $("#next").click(function(){
                MutationJs.redo();
            });
        }
    };

    app.init();

    return app;
});