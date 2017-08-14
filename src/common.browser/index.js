//判断浏览器类型
define(function(require, exports, module) {

    var = browser = {};   
    
    if(navigator.userAgent.indexOf("MSIE") > 0) {  
        browser.name = 'MSIE';
        browser.ie = true;  
    } else if(navigator.userAgent.indexOf("Firefox") > 0){ 
        browser.name = 'Firefox'; 
        browser.firefox = true;  
    } else if(navigator.userAgent.indexOf("Chrome") > 0) {
        browser.name = 'Chrome'; 
        browser.chrome = true;  
    } else if(navigator.userAgent.indexOf("Safari") > 0) {
        browser.name = 'Safari';
        browser.safari = true;
    } else if(navigator.userAgent.indexOf("Opera") >= 0) {
        browser.name = 'Opera';
        browser.opera = true;
    } else {
        browser.name = 'unknow';
    }  
    
    module.exports = browser;
});