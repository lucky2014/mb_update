define(function(require,exports,module){
    var indexTpl = require("image.dialog/index/index.tpl");
    require("image.dialog/index/index.css")
    var $ = require("jquery");
    
    var Engine = require("engine");
    var box = Engine.init();
    var setup = require("setup");
    //console.log(indexTpl)
    box.render($("#userPicDialog"), "", indexTpl);
    function getMatrix(radian, x, y) {
        var Cos = Math.cos(radian), Sin = Math.sin(radian);
        return {
            M11: Cos * x, M12:-Sin * y,
            M21: Sin * x, M22: Cos * y
        };
    }
   
});