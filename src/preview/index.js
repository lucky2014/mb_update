define(function(require,exports,module){
    var $ = require("jquery");
    var setup = require("setup");

    //var data = require("app_index/data");
    var Engine = require("engine");
    var box = Engine.init();
    var run = require("common.editAll/editBased/running");
    require("../../css/common.css");

    //页面逻辑
    var app = {
        Wwidth: $(window).width(),
        pageId: setup.getQueryString("pageId"),
        siteId: setup.getQueryString("siteId"),
        type: setup.getQueryString("type"),
        init: function(){ 
            var me = this;
            var params = {};
            //判断是单页预览还是整站预览
            if(me.type == "site"){
                params = {
                    id: me.siteId, 
                    type: "site"
                }
            }else{
                params = {
                    id: me.pageId, 
                    type: "page"
                }
            }
            
            setup.commonAjax("showPage.do", params, function(msg){  
                $("body").attr("style","background-color: "+msg.components[0].backgroundColor);
                $("title").html(msg.components[0].pageName);

                //run.loadFn(msg,"",1); //有第二个参数是预览效果，

                var htmls = me.urlChangeFn(me.changePreviewDatas(msg));
                $(".left").html(htmls);
            });
        },
        urlChangeFn:function(val){
            var reg = new RegExp("data-click","ig");
            return val.replace(reg,"onclick")
        },
        //预览的时候，改变数据格式，left、width变成百分百
        changePreviewDatas: function(datas){
            var me = this;
            me.elements = datas.components[0].elements;
            var vAct_modexBoxArr = [];
            for(var key in me.elements){
                var child = "";
                var vAct_modexBox_paragraph="<div id='"+key+"' class='"+key+"'>";
                var children = me.elements[key];
                var nodeArr = [];
                var htmlStr = "";
                for(var childEle in children){
                    nodeArr.push(children[childEle].nodeName)
                    if(children[childEle].nodeName=="IMG"){
                        child += "";
                    }else{
                        child += "<"+children[childEle].nodeName+" class='"+childEle+"' name='"+childEle+"'";
                    }

                    var childrens = children[childEle];
                    var style = "";
                    var top = '';
                    var attr = "";
                    for(var childsEle in childrens){
                        if(childsEle!="nodeName"&&childsEle!="html"&&childsEle!="attributes"){
                            if(childsEle=="top"){
                                var t = childrens.top;
                                if(t.indexOf("px")>-1){
                                    t = t.replace(/px/,"");
                                    style += "top:" + (t*$(window).width()/308).toFixed(2) + "px;";
                                }else{
                                    style += "top:" + childrens[childsEle]+";";
                                }
                            }else if(childsEle=="height"){
                                var t = childrens.height;
                                if(t.indexOf("px")>-1){
                                    t = t.replace(/px/,"");
                                    style += "height:" + (t*$(window).width()/308).toFixed(2) + "px;";
                                }else{
                                    style += "height:" + childrens[childsEle]+";";
                                }
                            }else if(childsEle=="width"){
                                var w = childrens[childsEle];
                                if(w.indexOf("px")>-1){
                                    w = w.replace(/px/,"");
                                    style += "width:" + (w/308).toFixed(3)*100 + "%;";
                                }else{
                                    style += "width:" + childrens[childsEle]+";";
                                }
                                
                            }else if(childsEle=="left"){
                                var w = childrens[childsEle];
                                if(w.indexOf("px")>-1){
                                    w = w.replace(/px/,"");
                                    style += "left:" + (w/308).toFixed(3)*100 + "%;";
                                }else{
                                    style += "left:" + childrens[childsEle]+";";
                                }
                            }else if(childsEle=="zIndex"){
                                var w = childrens[childsEle];
                                w = w.replace(/px/,"");
                                style += "z-index:" + w+";";
                            }else if(childsEle=="fontSize"){
                                var f = childrens[childsEle];
                                f = f.replace(/px/,"");
                                style += "font-size:" + (f*$(window).width()/308).toFixed(2) +"px;"
                            }else{
                                style+=(childsEle.replace(/([A-Z])/g,"-$1").toLowerCase()+":"+childrens[childsEle]+";")
                            }
                        }
                        if(childsEle=="attributes"){
                            for(var key2 in childrens[childsEle]){
                                attr+=(" "+key2+"="+childrens[childsEle][key2].replace(/"/g,"'"))
                            }
                        }
                    }
                    if(childEle=="dragBox"){
                        htmlStr = childrens.html;
                        child += " style='"+style+"' "+attr+">";
                    }else{
                        if(children[childEle].nodeName!="IMG"){
                            child+=" style='"+style+"' "+attr+">";
                        }
                    }
                }
                //console.log(htmlStr)
                if(nodeArr.length==4){
                    vAct_modexBox_paragraph+=(child + htmlStr+"</"+nodeArr[2]+"></"+nodeArr[0]+">"+"</div>")
                }else{
                    vAct_modexBox_paragraph+=(child + htmlStr+"</"+nodeArr[2]+"></"+nodeArr[1]+"></"+nodeArr[0]+">"+"</div>")
                }
                vAct_modexBoxArr.push(vAct_modexBox_paragraph)
            }
            return vAct_modexBoxArr.join("")

        }
    }
    //执行页面逻辑
    app.init();
});