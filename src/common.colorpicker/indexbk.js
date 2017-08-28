/**
 *
 * Color picker
 * Author: Stefan Petre www.eyecon.ro
 * 
 * Dual licensed under the MIT and GPL licenses
 * 
 */
 define(function(require,exports,module){
 	var $ = require("jquery");
 	require("common.colorpicker/colorpicker");
    // require("common.color/spectrum.css");
    // require("common.color/jquery-ui-1.8.16.custom.css");
    // require("common.color/spectrum");
    var browser = function () {   
    var agent = navigator.userAgent.toLowerCase(),  
    opera = window.opera,  
    browser = {  
            //检测当前浏览器是否为IE  
            ie: /(msie\s|trident.*rv:)([\w.]+)/.test(agent), 
     
            //检测当前浏览器是否为Opera  
            opera: (!!opera && opera.version), 
            //检测当前浏览器是否是webkit内核的浏览器  
            webkit: (agent.indexOf(' applewebkit/') > -1), 
            //检测当前浏览器是否是运行在mac平台下  
            mac: (agent.indexOf('macintosh') > -1), 
            //检测当前浏览器是否处于“怪异模式”下  
            quirks: (document.compatMode == 'BackCompat')  
        }; 
        //检测当前浏览器内核是否是gecko内核  
        browser.gecko = (navigator.product == 'Gecko' && !browser.webkit && !browser.opera && !browser.ie); 
        var version = 0; 
        // Internet Explorer 6.0+  
        if (browser.ie) {  
            var v1 = agent.match(/(?:msie\s([\w.]+))/);  
            var v2 = agent.match(/(?:trident.*rv:([\w.]+))/);  
            if (v1 && v2 && v1[1] && v2[1]) {  
                version = Math.max(v1[1] * 1, v2[1] * 1);  
            } else if (v1 && v1[1]) {  
                version = v1[1] * 1;  
            } else if (v2 && v2[1]) {  
                version = v2[1] * 1;  
            } else {  
                version = 0;  
            } 
            //检测浏览器模式是否为 IE11 兼容模式  
            browser.ie11Compat = document.documentMode == 11; 
            //检测浏览器模式是否为 IE9 兼容模式  
            browser.ie9Compat = document.documentMode == 9; 
            //检测浏览器模式是否为 IE10 兼容模式  
            browser.ie10Compat = document.documentMode == 10; 
            //检测浏览器是否是IE8浏览器  
            browser.ie8 = !!document.documentMode; 
            //检测浏览器模式是否为 IE8 兼容模式  
            browser.ie8Compat = document.documentMode == 8; 
            //检测浏览器模式是否为 IE7 兼容模式  
            browser.ie7Compat = ((version == 7 && !document.documentMode) || document.documentMode == 7); 
            //检测浏览器模式是否为 IE6 模式 或者怪异模式  
            browser.ie6Compat = (version < 7 || browser.quirks); 
            browser.ie9above = version > 8; 
            browser.ie9below = version < 9;  
        } 
        // Gecko.  
        if (browser.gecko) {  
            var geckoRelease = agent.match(/rv:([\d\.]+)/);  
            if (geckoRelease) {  
                geckoRelease = geckoRelease[1].split('.');  
                version = geckoRelease[0] * 10000 + (geckoRelease[1] || 0) * 100 + (geckoRelease[2] || 0) * 1;  
            }  
        } 
        //检测当前浏览器是否为Chrome, 如果是，则返回Chrome的大版本号  
        if (/chrome\/(\d+\.\d)/i.test(agent)) {  
            browser.chrome = +RegExp['\x241'];  
        } 
        //检测当前浏览器是否为Safari, 如果是，则返回Safari的大版本号  
        if (/(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(agent) && !/chrome/i.test(agent)) {  
            browser.safari = +(RegExp['\x241'] || RegExp['\x242']);  
        } 
        // Opera 9.50+  
        if (browser.opera)  
            version = parseFloat(opera.version()); 
        // WebKit 522+ (Safari 3+)  
        if (browser.webkit)  
            version = parseFloat(agent.match(/ applewebkit\/(\d+)/)[1]); 
        //检测当前浏览器版本号  
        browser.version = version; 
        return browser;  
    }();
    String.prototype.colorHex = function(){ 
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        var that = this;  
        if(/^(rgb|RGB)/.test(that)){  
            var aColor = that.replace(/(?:||rgb|RGB)*/g,"").split(",");  
            var strHex = "#";  
            for(var i=0; i<aColor.length; i++){  
                var hex = Number(aColor[i]).toString(16);  
                if(hex === "0"){  
                    hex += hex;   
                }  
                strHex += hex;  
            }  
            if(strHex.length !== 7){  
                strHex = that;    
            }  
            return strHex;  
        }else if(reg.test(that)){  
            var aNum = that.replace(/#/,"").split("");  
            if(aNum.length === 6){  
                return that;      
            }else if(aNum.length === 3){  
                var numHex = "#";  
                for(var i=0; i<aNum.length; i+=1){  
                    numHex += (aNum[i]+aNum[i]);  
                }  
                return numHex;  
            }  
        }else{  
            return that;      
        }  
    }
 	var app = {
 		colorPicker:function(currEle){
            var me = this;
            var colorText = "";
            var colorText2 = "";
    //         $(currEle).spectrum({
    //             allowEmpty:true,
    //             color: "#ECC",
    //             showInput: true,
    //             containerClassName: currEle,
    //             showInitial: true,
    //             showPalette: true,
    //             showSelectionPalette: true,
    //             showAlpha: true,
    //             maxPaletteSize: 10,
    //             preferredFormat: "hex",
    //             localStorageKey: "spectrum.demo",
    //             move: function (color) {
    //                 hex = color.toHex();
    //                 $(currEle).css("backgroundColor",'#fff');
    //                 $(currEle).siblings("b").css("backgroundColor",'#' + hex);
    //                 if(currEle==".skin-colorSelector-border"){
    //                     if($(me.dragTarget).find("svg")[0]){
    //                         $(me.dragTarget).find("svg").css("stroke",'#' + hex);
    //                     }else{
    //                         $(me.dragTarget).css("border-color",'#' + hex);
    //                     }
    //                 }else if(currEle==".skin-colorSelector-bg"){
    //                     if($(me.dragTarget).find("svg")[0]){
    //                         $(me.dragTarget).find("svg").css("fill",'#' + hex);
    //                     }else{
    //                         $(me.dragTarget).css("backgroundColor",'#' + hex)
    //                     }
    //                 }else if(currEle == ".color"){
    //                     var text = $(me.dragTarget)[0];
    //                     var textValue = $(text).html();
    //                     if(!colorText){
    //                         return;
    //                     }
    //                     if(!$(me.dragTarget).find(".changeColor")[0]){
    //                         var newValue = textValue.replace(colorText,"<b class='changeColor colorSpan' style='color:#"+hex+"'>"+colorText2+"</b>");
    //                         $(text).html(newValue)
    //                     }else{
    //                         $(me.dragTarget).find(".changeColor").css("color","#"+hex)
    //                     }
    //                 }else if(currEle==".skin-colorSelector-font"){
    //                     $(me.dragTarget).find("*").css("color",'#' + hex);
    //                 }else if(currEle==".skin-colorSelector-bgTp"){
    //                     var temp1 = '#' + hex;
    //                     var temp2 = $(".skin-colorSelector-bgBtm").attr("data-color");
    //                     $(".skin-colorSelector-bgTp").attr("data-color",temp1);
    //                     if(browser.webkit){
    //                         $(me.dragTarget).find("input")[0].style.background = "-webkit-linear-gradient("+temp1+", "+temp2+")";
    //                     }else if(browser.mac){
    //                         $(me.dragTarget).find("input")[0].style.background = "-o-linear-gradient("+temp1+", "+temp2+")";
    //                     }else{
    //                         $(me.dragTarget).find("input")[0].style.background = "linear-gradient("+temp1+", "+temp2+")";
    //                     }
    //                 }else if(currEle==".skin-colorSelector-bgBtm"){
    //                     var temp1 = $(".skin-colorSelector-bgTp").attr("data-color");
    //                     var temp2 = '#' + hex;
    //                     $(".skin-colorSelector-bgBtm").attr("data-color",temp2);
    //                     $(me.dragTarget).find("input")[0].style.background = "linear-gradient("+temp1+", "+temp2+")";
    //                     if(browser.webkit){
    //                         $(me.dragTarget).find("input")[0].style.background = "-webkit-linear-gradient("+temp1+", "+temp2+")";
    //                     }else if(browser.mac){
    //                         $(me.dragTarget).find("input")[0].style.background = "-o-linear-gradient("+temp1+", "+temp2+")";
    //                     }else{
    //                         $(me.dragTarget).find("input")[0].style.background = "linear-gradient("+temp1+", "+temp2+")";
    //                     }
    //                 }
    //             },
    //             show: function (colpkr) {
    //                 colpkr = colpkr.toHex();
    //                 $(colpkr).fadeIn(500);
    //                 var text = $(me.dragTarget)[0];
    //                 var selectionObj = window.getSelection();
    //                 var rangeObj = selectionObj.getRangeAt(0);
    // 　　　　        var docFragment = rangeObj.cloneContents();
    //                 var testDiv = document.createElement("div");

    //         　　　　testDiv.appendChild(docFragment);
    //         　　　　colorText = testDiv.innerHTML;
    //                 colorText2 = me.delHtmlTag(colorText,"b");
    //             },
    //             beforeShow: function () {

    //             },
    //             hide: function (colpkr) {
    //                 colpkr = colpkr.toHex();
    //                 $(colpkr).fadeOut(500);
    //                 colorText = "";
    //                 colorText2 = "";
    //                 $(me.dragTarget).find(".changeColor").removeClass("changeColor")
    //             },

    //             palette: [
    //                 ["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)", /*"rgb(153, 153, 153)","rgb(183, 183, 183)",*/
    //                 "rgb(204, 204, 204)", "rgb(217, 217, 217)", /*"rgb(239, 239, 239)", "rgb(243, 243, 243)",*/ "rgb(255, 255, 255)"],
    //                 ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)",
    //                 "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"],
    //                 ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)",
    //                 "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)",
    //                 "rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)",
    //                 "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)",
    //                 "rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)",
    //                 "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)",
    //                 "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)",
    //                 "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)",
    //                 /*"rgb(133, 32, 12)", "rgb(153, 0, 0)", "rgb(180, 95, 6)", "rgb(191, 144, 0)", "rgb(56, 118, 29)",
    //                 "rgb(19, 79, 92)", "rgb(17, 85, 204)", "rgb(11, 83, 148)", "rgb(53, 28, 117)", "rgb(116, 27, 71)",*/
    //                 "rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)",
    //                 "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]
    //             ]
    //         });
            $(currEle).ColorPicker({
                color: '#0000ff',
                onShow: function (colpkr) {
                    $(colpkr).fadeIn(500);
                    var text = $(me.dragTarget)[0];
                    var selectionObj = window.getSelection();
                    var rangeObj = selectionObj.getRangeAt(0);
    　　　　        var docFragment = rangeObj.cloneContents();
                    var testDiv = document.createElement("div");

            　　　　testDiv.appendChild(docFragment);
            　　　　colorText = testDiv.innerHTML;
                    colorText2 = me.delHtmlTag(colorText,"b");
                    return false;
                },
                onHide: function (colpkr) {
                    $(colpkr).fadeOut(500);
                    colorText = "";
                    colorText2 = "";
                    $(me.dragTarget).find(".changeColor").removeClass("changeColor")
                    return false;
                },
                onChange: function (hsb, hex, rgb) {
                    $(currEle).css("backgroundColor",'#fff');
                    $(currEle).siblings("b").css("backgroundColor",'#' + hex);
                    if(currEle==".skin-colorSelector-border"){
                        if($(me.dragTarget).find("svg")[0]){
                            $(me.dragTarget).find("svg").css("stroke",'#' + hex);
                        }else{
                            $(me.dragTarget).css("border-color",'#' + hex);
                        }
                    }else if(currEle==".skin-colorSelector-bg"){
                        if($(me.dragTarget).find("svg")[0]){
                            $(me.dragTarget).find("svg").css("fill",'#' + hex);
                        }else if($(me.dragTarget).find("input")[0]){
                            $(me.dragTarget).find("input").css("backgroundColor",'#' + hex);
                        }else{
                            $(me.dragTarget).css("backgroundColor",'#' + hex)
                        }
                    }else if(currEle == ".color"){
                        var text = $(me.dragTarget)[0];
                        var textValue = $(text).html();
                        if(!colorText){
                            return;
                        }
                        if(!$(me.dragTarget).find(".changeColor")[0]){
                            var newValue = textValue.replace(colorText,"<b class='changeColor colorSpan' style='color:#"+hex+"'>"+colorText2+"</b>");
                            $(text).html(newValue)
                        }else{
                            $(me.dragTarget).find(".changeColor").css("color","#"+hex)
                        }
                    }else if(currEle==".skin-colorSelector-font"){
                        $(me.dragTarget).find("*").css("color",'#' + hex);
                    }else if(currEle==".skin-colorSelector-bgTp"){
                        var temp1 = '#' + hex;
                        var temp2 = $(".skin-colorSelector-bgBtm").attr("data-color");
                        $(".skin-colorSelector-bgTp").attr("data-color",temp1);
                        if(browser.webkit){
                            $(me.dragTarget).find("input")[0].style.background = "-webkit-linear-gradient("+temp1+", "+temp2+")";
                        }else if(browser.mac){
                            $(me.dragTarget).find("input")[0].style.background = "-o-linear-gradient("+temp1+", "+temp2+")";
                        }else{
                            $(me.dragTarget).find("input")[0].style.background = "linear-gradient("+temp1+", "+temp2+")";
                        }
                    }else if(currEle==".skin-colorSelector-bgBtm"){
                        var temp1 = $(".skin-colorSelector-bgTp").attr("data-color");
                        var temp2 = '#' + hex;
                        $(".skin-colorSelector-bgBtm").attr("data-color",temp2);
                        $(me.dragTarget).find("input")[0].style.background = "linear-gradient("+temp1+", "+temp2+")";
                        if(browser.webkit){
                            $(me.dragTarget).find("input")[0].style.background = "-webkit-linear-gradient("+temp1+", "+temp2+")";
                        }else if(browser.mac){
                            $(me.dragTarget).find("input")[0].style.background = "-o-linear-gradient("+temp1+", "+temp2+")";
                        }else{
                            $(me.dragTarget).find("input")[0].style.background = "linear-gradient("+temp1+", "+temp2+")";
                        }
                    }
                }
            });
        }
 	}
 	return app;
 })
