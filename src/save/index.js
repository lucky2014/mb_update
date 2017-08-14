define(function(require,exports,module){
    var $ = require("jquery");
    var Engine = require("engine");
    var box = Engine.init();
    var setup = require("setup");
    var popUp = require("common.PopUp/index");
    require("common.lib/jquery.ui/jquery.qrcode.min");

    function IsPC(){  
       var userAgentInfo = navigator.userAgent;  
       var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
       var flag = true;  
       for (var v = 0; v < Agents.length; v++) {  
           if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }  
       }  
       return flag;  
    }
    var app = {
        siteId: setup.getQueryString("siteId") || 60,
        basedDevicedWidth:$(".leftOuter").width()||window.innerWidth,
        deleteFn:function(){
            var me = this;
            $("body").keydown(function(e){
                var code = e.keyCode;
                if(code=="46"){
                    $(me.dragTarget).parents(".drag").parent().remove();
                    var vAct_modexBox = $(me.dragTarget).parents(".drag").parent();
                    if(vAct_modexBox.attr("id")){
                        delete me.elements[vAct_modexBox.attr("id")]
                    }
                }
            })
        },
        getStyle:function(element,id){
            if($(element)[0]){
                element = $(element).children()[0];
                var className = $(element).attr("name");
                var hasClass = $(element).hasClass("drag_selected");
                if(className){
                    if(!this.elements[id]){
                        return;
                    }
                    this.elements[id][className] = {};
                    var classObj = this.elements[id][className];
                    if(this.elements[id]){
                        for(var key in element.style){
                            if(element.style[key]&&typeof element.style[key] == "string"){
                                var val = Number(key)
                                if(isNaN(val)&&key!="cssText"){
                                    if(element.style[key].indexOf("%")==-1){
                                        if(!isNaN(parseInt(element.style[key]))){
                                            classObj[key] = parseInt(element.style[key])/308*this.basedDevicedWidth+"px"
                                        }else{
                                            classObj[key] = element.style[key]
                                        }
                                    }else{
                                        classObj[key] = element.style[key]
                                    }
                                }
                            }
                       }
                       classObj.nodeName = element.tagName;
                       if($(element).hasClass("dragBox")){
                            classObj.html = $(element).html();
                       }
                    }
                    this.getStyle(element,id)
                }
            }
        },
        saveFn:function(){
            var me = this;
            $("body").delegate(" .nav-operate a", "click", function(e){
                var datas = me.saveData(datas);

                var type = $(this).attr("type");
                if(datas && datas != {}){
                    //判断是不是发布
                    if(type == "publish"){
                        var html = '';
                        popUp({
                            "title": "温馨提示<img src='../imgs/close.png' class='cut' />",
                            "content": "" ,
                            showCancelButton: true,
                            showConfirmButton: true,
                        }, function(){
                         alert(0);
                        });
                        /*var publish = require("save/publish/publish");
                        var htmlStr = publish.publishInit(datas);
                        var params = {
                           "pageId": me.pageId,
                           "userId":me.userId,
                           "templateName": me.templateName,
                           "data": JSON.stringify({components: datas.components}),
                           "siteId": me.siteId
                        };
                        setup.commonAjax("publish.html", params, function(msg){
                            popUp({
                                "content":"保存成功！",
                                showCancelButton: false,
                                showConfirmButton: false,
                                timer: 2000
                            });
                        })*/
                    }else{
                        //保存、预览
                        if(datas.pageId){
                            var params = {
                               "pageId": me.pageId,
                               "templateName": me.templateName,
                               "data": JSON.stringify({components: datas.components}),
                               "siteId": me.siteId
                            };
                            setup.commonAjax("editPage.do", params, function(msg){
                                popUp({
                                    "content":"保存成功！",
                                    showCancelButton: false,
                                    showConfirmButton: false,
                                    timer: 2000
                                });
                            })
                        }else{
                            var params = {
                               "templateId": me.templateId || 0,
                               "userId": me.userId,
                               "templateName":me.templateName || 0,
                               "data": JSON.stringify({components: datas.components}),
                               "siteId": me.siteId
                            };
                            
                            setup.commonAjax("addPage.do", params, function(msg){ 
                                var href = "http://"+ location.host+ "/mb_update2/preview/index.html?pageId="+me.returnObject+"&userId=" + me.userId;
                                //console.log("http://"+ location.host+ "/mb_update2/preview/index.html?pageId="+me.returnObject+"&userId=" + me.userId);
                                var previewPop = require("save/previewPop.tpl");
                                    require("save/previewPop.css");
                                box.render($("#previewPop"), {siteId: me.siteId}, previewPop); 
                                $(".qrcode").html("");
                                $("#previewPop").show();


                                $(".qrcode").qrcode({
                                    render: "canvas",
                                    width: 200,
                                    height: 200,
                                    text: href
                                });

                                //预览功能：渲染左边手机
                                //require("preview/src/app_index/index");
                            });
                        };
                    }
                }else{
                    popUp({
                        "title":"温馨提示<img src='../imgs/close.png' class='cut' />",
                        "content":"<img src='../imgs/warn.png' class='lineIl' /><span class='lineIl'>您的页面是空的，请先编辑页面！</span>",
                        showCancelButton: true,
                        showConfirmButton: true,
                    });
                    return ;
                }
            });
        },
        saveData:function(datas){
            var me = this;
            for(var i = 0;i<$(".drag").parent().length;i++){
                var vAct_modexBox = $(".drag").parent().eq(i);
                if(vAct_modexBox.attr("id")){
                    this.getStyle(vAct_modexBox,vAct_modexBox.attr("id"));
                }
            }

            //判断数据是不是空的
            if(!datas){
                var components = [];
                components.push({elements: this.elements,componentSort: components.length+1,symbol:"baseComponents"});
                datas = $.extend({}, datas, {components: components});
            }else{
                var components = datas.components;
                datas.components.push({elements: this.elements,componentSort: components.length+1,symbol:"baseComponents"})
            }

            return datas;
        },
        changeData:function(){
            for(var id in this.elements){
                var idValue = this.elements[id]
                for(var className in idValue){
                    for(var style in idValue[className]){
                        if(style=="top"){
                            if(idValue[className][style].indexOf("%")==-1){
                                if(!isNaN(parseInt(idValue[className][style]))){
                                    if(!IsPC()){
                                        idValue[className][style] = parseInt((parseInt(idValue[className][style])-55)/308*this.basedDevicedWidth)+"px"
                                    }
                                }
                            }
                        }else if(style!="zIndex"){
                            if(idValue[className][style].indexOf("%")==-1){
                                if(!isNaN(parseInt(idValue[className][style]))){
                                    if(!IsPC()){
                                        idValue[className][style] = parseInt(parseInt(idValue[className][style])/308*this.basedDevicedWidth)+"px";
                                    }
                                }
                            }
                        }else{
                            idValue[className][style] = parseInt(parseInt(idValue[className][style]));
                        }
                        
                    }
                }
            }
        },
        loadFn:function(datas){ //渲染html5
            this.elements = datas.elements||{};
            this.changeData();
            var htmls = this.getSaved(datas);
            $(".left").append(htmls);
        },
        getSaved:function(){
            var me = this;
            var vAct_modexBoxArr = [];
            for(var key in me.elements){
                var child = "";
                var vAct_modexBox_paragraph="<div id='"+key+"' class='"+key+"'>";
                var children = me.elements[key];
                var nodeArr = [];
                var html = "";
                for(var childEle in children){
                    nodeArr.push(children[childEle].nodeName)
                    if(children[childEle].nodeName=="IMG"){
                        child += "";
                    }else{
                        child += "<"+children[childEle].nodeName+" class='"+childEle+"' name='"+childEle+"'";
                    }
                    var childrens = children[childEle];
                    var style = "";
                    for(var childsEle in childrens){
                        if(childsEle!="nodeName"&&childsEle!="html"){
                            style+=(childsEle.replace(/([A-Z])/g,"-$1").toLowerCase()+":"+childrens[childsEle]+";")
                        }
                    }
                    if(childEle=="dragBox"){
                        html = childrens.html;
                        child+=" style='"+style+"'>";
                    }else{
                        if(children[childEle].nodeName!="IMG"){
                            child+=" style='"+style+"'>";
                        }
                    }
                }
                if(nodeArr.length==4){
                    vAct_modexBox_paragraph+=(child+html+"</"+nodeArr[2]+"></"+nodeArr[0]+">"+"</div>")
                }else{
                    vAct_modexBox_paragraph+=(child+html+"</"+nodeArr[2]+"></"+nodeArr[1]+"></"+nodeArr[0]+">"+"</div>")
                }
                vAct_modexBoxArr.push(vAct_modexBox_paragraph)
            }
            return vAct_modexBoxArr.join("")
        }
    }
    return app;
})