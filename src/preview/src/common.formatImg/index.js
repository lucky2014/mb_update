define(function(require,exports,module){
    
    var app = {
        init: function(imgUrl,width,height){
            //console.log(imgUrl);
            if(imgUrl){
                var lastIndex = imgUrl.lastIndexOf(".");
                var ret = imgUrl.slice(0,lastIndex);
                var imgUrl1 = ret + "_" + (width*375*2/308).toFixed(0) + "x" + (height*375*2/308).toFixed(0) + imgUrl.slice(lastIndex,imgUrl.length);


                //console.log(imgUrl);
                //console.log(imgUrl1);
                return imgUrl1;
            }else{
                return ;
            }
        }
    };

    //执行页面逻辑
    return app;
});