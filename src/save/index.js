//cacheDatas，缓存数据，是用来对比是否有编辑，有改动的数据

define(function(require,exports,module){
    
    var $ = require("jquery");
    var Engine = require("engine");
    var box = Engine.init();
    var setup = require("setup");
    var popUp = require("common.PopUp/index");
    var now = require("save/pblTime");
    var publish = require("save/publish/publish");
    //预览

    var previewPop = require("save/previewPop.tpl");
        require("save/previewPop.css");

    require("common.lib/jquery.ui/jquery.qrcode.min");

    function IsPC(){  
       var userAgentInfo = navigator.userAgent;  
       var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");  
       var flag = true;  
       for (var v = 0; v < Agents.length; v++) {  
           if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }  
       }  
       return flag;  
    };

    var app = {
        siteId: setup.getQueryString("siteId") || 60,
        templateId: setup.getQueryString("templateId"),
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
                    //console.log(this.elements[id][className])
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
        compareCacheDatas: function(datas){
            var me = this;
            //console.log(JSON.stringify(datas,null,2));
            if(me.cacheDatas){
                var a1 = JSON.stringify(datas);
                var a2 = JSON.stringify(me.cacheDatas);
                if(a1 == a2){
                    return false;
                }else{
                    return true;
                }
            }             
        },
        //保存,在running页面调用
        pageSave: function(){
            var me = this;
            var datas = me.saveData();
            //console.log(JSON.stringify(datas,null,2))
            var ishomepage = $("li.activePage").attr("isHomePage");
            datas.components[0].backgroundColor = $("#sky").attr("color");
            datas.components[0].pageName = $("#sky h1").html();

            //保存
            if($(".left").attr("pageId")){//新增的页面都调addPage接口
                var params = {
                   "pageId": $(".left").attr("pageId"),
                   "pageName": $("#sky h1").html(),
                   "data": JSON.stringify({components: datas.components}),
                   "siteId": me.siteId,
                   "isHomePage": ishomepage,
                };
                //console.log(JSON.stringify(params,null,2))
                setup.commonAjax("editPage.do", params, function(msg){
                    popUp({
                        "content":"保存成功！",
                        showCancelButton: false,
                        showConfirmButton: false,
                        timer: 1000
                    });
                });
            }else{
                //新增
                var params = {
                   "templateId":me.templateId || 0,
                   "pageName":$("#sky h1").html(),
                   "data": JSON.stringify({components: datas.components}),
                   "siteId": me.siteId
                };
                //console.log(JSON.stringify(params,null,2))
                setup.commonAjax("addPage.do", params, function(msg){ 
                   // var href = "http://"+ location.host+ "/mb_update2/preview/index.html?pageId="+me.returnObject;
                    popUp({
                        "content":"保存成功！",
                        showCancelButton: false,
                        showConfirmButton: false,
                        timer: 1000
                    });
                });
            };
        },
        pagePreview: function(){
            var me = this;
            var datas = me.saveData();
            //渲染弹框
            box.render($("#previewPop"), {siteId: me.siteId, pageId: $(".left").attr("pageId")}, previewPop); 
            //保存、预览
            if($(".left").attr("pageId")){
                var params = {
                   "pageId": $(".left").attr("pageId"),
                   "pageName": datas.pageName,
                   "data": JSON.stringify({components: datas.components}),
                   "siteId": me.siteId
                };
                setup.commonAjax("editPage.do", params, function(msg){
                    var href = "http://"+ location.host+ "/mb_update2/preview/index.html?pageId=" + $(".left").attr("pageId");
                    me.qrcodeInit(href,datas);
                    console.log("http://"+ location.host+ "/mb_update2/preview/index.html?pageId=" + $(".left").attr("pageId"));
                });
            }else{
                var params = {
                   "templateId": me.templateId || 0,
                   "pageName":me.pageName || 0,
                   "data": JSON.stringify({components: datas.components}),
                   "siteId": me.siteId
                };
                
                setup.commonAjax("addPage.do", params, function(msg){ 
                    var href = "http://"+ location.host+ "/mb_update2/preview/index.html?pageId="+msg.returnObject;
                    console.log("http://"+ location.host+ "/mb_update2/preview/index.html?pageId="+msg.returnObject);
                    me.qrcodeInit(href,datas);
                });
            };
        },
        qrcodeInit: function(href, datas){
            var me = this;
            
            $(".qrcode").html("");
            $("#previewPop").show();

            $(".qrcode").qrcode({
                render: "canvas",
                width: 200,
                height: 200,
                text: href
            });

            //预览功能：渲染左边手机
            app.loadFn(datas, "previewLeft");

            //关闭按钮
            $("#previewPop").delegate(".cut","click",function(){
                $("#previewPop").hide();
            });
        },
        //发布，在running页面调用
        pagePublish: function(){
            var me = this;
            var datas = me.saveData();
            if(me.compareCacheDatas(datas)){
                popUp({
                    "title": "提示<a class='cut'></a>",
                    "content": "<div class='deleText'><b></b>您有未保持的数据，请先保存再发布！</div>" ,
                    showCancelButton: true,
                    showConfirmButton: true,
                }, function(){
                    $("#pop").hide();
                });
                return ;
            }else{


                var pblTime = now.getDate();
                //发布站点弹框
                var html = '<ul class="publishBox">'+
                  '<li><label>站点名称</label><input type="text" class="siteName" placeholder="请输入站点名称" /></li>'+
                  '<li><label>站点域名</label><input type="text" value="" class="siteDomain" /><span>.iliujia.com</span></li>'+
                  '<li class="pblErr"><label></label><span id="errMsg">此域名已被占用，请重新设置您的域名！</span></li>'+
                  '<li><label>创建时间</label><span class="pblTime">'+pblTime+'</span></li>'+
                '</ul>';
                popUp({
                    "title": "发布站点<a class='cut'></a>",
                    "content": html ,
                    width: 500,
                    showCancelButton: true,
                    showConfirmButton: true,
                }, function(){
                    var siteName = $(".siteName").val();
                    var siteDomain = $(".siteDomain").val();

                    if(!siteName){
                        $(".pblTipBox").html('<div class="pblTip">请输入您的站点名称！</div>').show();
                        setTimeout(function(){
                            $(".pblTipBox").hide();
                        },1000);
                    }else if(!siteDomain){
                        $(".pblTipBox").html('<div class="pblTip">请输入您的域名！</div>').show();
                        setTimeout(function(){
                            $(".pblTipBox").hide();
                        },1000);
                    }else{
                        me.getSiteInfo(me.siteId, function(){

                            /////次处为曾经发布过
                            var params = {
                               "htmlJson": JSON.stringify(htmlJson),
                               "siteId": me.siteId,
                               "siteName": $(".siteName").val(),
                               "domain": $(".siteDomain").val(),
                               "industryId": ""
                            };
                            me.publish(params, datas, previewPop);

                            /////
                        }, function(){
                            /////////次处为未发布


                            //检查域名是否被占用
                            me.checkDomain({domain: siteDomain},function(){
                                //发布前请求所有页面的数据
                                setup.commonAjax("getSiteData.do", {"siteId": me.siteId}, function(msg){ 
                                    //组装html数组
                                    var htmlJson = [];
                                    $.each(msg, function(i,v){
                                        var htmlStr = publish.publishInit(v.data);
                                        htmlJson.push({
                                            pageId: v.id, 
                                            name: v.pageName, 
                                            data: htmlStr, 
                                            pageSort: v.sort,
                                            isHomePage: v.isHomePage
                                        });
                                    });

                                    var params = {
                                       "htmlJson": JSON.stringify(htmlJson),
                                       "siteId": me.siteId,
                                       "siteName": $(".siteName").val(),
                                       "domain": $(".siteDomain").val(),
                                       "industryId": ""
                                    };
                                    
                                    me.publish(params, datas, previewPop);
                                });
                            });


                            ///////为发布结束
                        });
                        
                    }

                    $(".siteDomain").focus(function(){
                        $(".pblErr").hide();
                    });
                });
            }
        },
        //调发布接口
        publish: function(params, datas, previewPop){ //previewPop为tpl
            var me = this;
            setup.commonAjax("publish.do", params, function(msg){
                //渲染弹框
                box.render($("#previewPop"), {siteId: me.siteId, pageId: datas.pageId, publish: 1, url: msg}, previewPop); 
                me.qrcodeInit(msg,datas);

                function jsCopy(){
                    var e=document.getElementById("pblUrl");//对象是content 
                      e.select(); //选择对象 
                      document.execCommand("Copy"); //执行浏览器复制命令
                  }

                  $("#previewPop").delegate(".blueBtn", "click", function(){
                    jsCopy();
                  }); 
            });
        },
        //检查域名是否被占用
        checkDomain: function(params, cb){
            setup.commonAjax("checkDomain.do", params, function(msg){
                 cb();
            });
        },
        //判断是否已经发布过站点
        getSiteInfo: function(siteId, cb1, cb2){ //cb1已发布，cb2未发布
            setup.commonAjax("checkDomain.do", {siteId: siteId}, function(msg){
                if(msg.status == 1){
                    cb1();
                }else{
                    cb2();
                }
            });
        },
        saveData:function(sky){
            //每一次都是重新取数值，所以默认data={}
            var me = this;
            var datas = me.cacheDatas; //缓存数据
            
            this.elements={};
            for(var i = 0;i<$(".drag").parent().length;i++){
                var vAct_modexBox = $(".drag").parent().eq(i);
                if(vAct_modexBox.attr("id")){
                    if(!this.elements[vAct_modexBox.attr("id")]){
                        this.elements[vAct_modexBox.attr("id")] = {};
                    }
                    this.getStyle(vAct_modexBox,vAct_modexBox.attr("id"));
                }
            }
               // console.log(this.elements)
            
            //console.log(JSON.stringify(datas,null,2))
            //判断是不是保存有页面设置的配置，如果没有取缓存里的
            if(sky){
                var o = $(".left");
                var components = [];
                components.push({elements: this.elements,componentSort: components.length+1,symbol:"baseComponents"});
                datas = $.extend({}, {components: components, pageId: o.attr("pageId"), isHomePage: o.attr("isHomePage")});
            }else{
                delete datas.components[0].elements;
                //console.log(JSON.stringify(this.elements,null,2))
                var components = [];
                var newObj = $.extend({},{elements: this.elements},datas.components[0])

                components.push(newObj);
                datas = $.extend({},{components: components});
            }

            //保存数据成功后
            me.cacheDatas = datas;
            return datas;
        },
        changeData:function(w,h){
            w = w ? w:308;
            h = h ? h : 55;
            for(var id in this.elements){
                var idValue = this.elements[id]
                for(var className in idValue){
                    for(var style in idValue[className]){
                        if(style=="top"){
                            if(idValue[className][style].indexOf("%")==-1){
                                if(!isNaN(parseInt(idValue[className][style]))){
                                    if(!IsPC()){
                                        idValue[className][style] = parseInt((parseInt(idValue[className][style])+55)/308*this.basedDevicedWidth)+"px"
                                    }else{
                                        idValue[className][style] = parseInt((parseInt(idValue[className][style])+h)/308*w)+"px"
                                    }
                                }
                            }
                        }else if(style!="zIndex"){
                            if(idValue[className][style].indexOf("%")==-1){
                                if(!isNaN(parseInt(idValue[className][style]))){
                                    if(!IsPC()){
                                        idValue[className][style] = parseInt(parseInt(idValue[className][style])/308*this.basedDevicedWidth)+"px";
                                    }else{
                                        idValue[className][style] = parseInt(parseInt(idValue[className][style])/308*w)+"px";
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
        loadFn:function(datas, ele, log){ //渲染html5 //log=1说明返回的数据是包括components
            //目前components只有1个数组值
            //console.log(JSON.stringify(datas,null,2));
            var me = this;
            if(ele){ //说明是预览或者发布
                $("."+ele).html("");
                this.elements = datas.components[0].elements||{};
                this.changeData(308,55);
                var htmls = '<div><div class="skyHeader">'+datas.components[0].pageName+'</div>';
                htmls += this.getSaved()+'</div>';
                $("." + ele).html(htmls);
                $("." + ele+">div").css({"backgroundColor": datas.components[0].backgroundColor})
            }else{
                $(".left").html("");
                if(log){ //初始渲染
                    this.elements = datas.components[0].elements||{};
                    //this.changeData();
                    var htmls = this.getSaved();
                    $(".left").html(htmls);
                }else{
                    this.elements = datas.elements||{};
                    //this.changeData();
                    var htmls = this.getSaved();
                    $(".left").html(htmls);
                }
                /**这个方法作为读取组件信息时的基础数据绑定js在component/index/index.js*/
                me.rightEditComponentInitAll();
            } 

            me.cacheDatas = datas;          
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
    };
    return app;
})