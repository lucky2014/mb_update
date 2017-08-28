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

    var app = {
        siteId: setup.getQueryString("siteId") || 60,
        templateId: setup.getQueryString("templateId"),
        deleteFn:function(){
            var me = this;
            $("body").keydown(function(e){
                var code = e.keyCode;
                var ctrlKey = e.ctrlKey;
                if($(".sizeControl_parent")[0]){
                    if($(me.dragTarget).attr("contenteditable")){
                        return;
                    }
                    if(code=="46"||code=="8"){
                        $(me.dragTarget).parents(".drag").parent().remove();
                        var vAct_modexBox = $(me.dragTarget).parents(".drag").parent();
                        if(vAct_modexBox.attr("id")){
                            delete me.elements[vAct_modexBox.attr("id")]
                        }
                    }
                }
            })
        },
        getStyle:function(element,id){  //取到element   drag
            //console.log(JSON.stringify(this.elements,null,2))
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
                                    classObj[key] = element.style[key]
                                }
                            }
                       }
                       classObj["attributes"] = {};
                       $.each(element.attributes,function(i,attrib){
                            if(attrib.name!="style"){
                                classObj["attributes"][attrib.name] = attrib.value;
                            }
                       })
                       var isNull = true;
                       for(key in classObj["attributes"]){
                            isNull = false;
                            break;
                       }
                       if(isNull){
                            delete classObj["attributes"]
                       }
                       classObj.nodeName = element.tagName;
                       if($(element).hasClass("dragBox")){
                            classObj.html = $(element).html();
                       }
                    }
                    this.getStyle(element,id)
                }
            }
           // console.log(JSON.stringify(this.elements,null,2))
        },
        compareCacheDatas: function(datas,callBack){
            var me = this;
            if(me.cacheDatas && datas){
                var a1 = JSON.stringify(datas);
                var a2 = JSON.stringify(me.cacheDatas);
                //console.log(a1);
                //console.log(a2);
                if(a1 == a2){
                    callBack && callBack();
                }else{
                    popUp({
                        "title": "提示<a class='cut'></a>",
                        "content": "<div class='deleText'><b></b>您有未保存的数据，点确定按钮保存数据？</div>" ,
                        showCancelButton: true,
                        showConfirmButton: true,
                    }, function(){
                        me.pageSave();
                        callBack && callBack();
                        $(".popUp").hide();
                    });
                    return ;
                }
            }else{
                callBack && callBack();
                me.cacheDatas = null;
            }
        },
        //保存,在running页面调用
        pageSave: function(){
            var me = this;
            var datas = me.saveData();
            //console.log(datas);
            var thisLi = $("li.activePage");
            var ishomepage = $("li.activePage").attr("isHomePage");

            //保存
            if($(".left").attr("pageId")){//新增的页面都调addPage接口
                var params = {
                   "pageId": $(".left").attr("pageId"),
                   "pageName": $("#sky h1").html().replace("&amp;","&"),
                   "data": JSON.stringify({components: datas.components}),
                   "siteId": me.siteId,
                   "isHomePage": ishomepage,
                };
                //console.log(JSON.stringify(datas,null,2))
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
                   "templateId":$(".left").attr("templateId") || me.templateId,
                   "pageName":$("#sky h1").html().replace("&amp;","&"),
                   "data": JSON.stringify({components: datas.components}),
                   "siteId": me.siteId
                };
                setup.commonAjax("addPage.do", params, function(msg){ 
                   // var href = "http://"+ location.host+ "/mb_update2/preview/index.html?pageId="+me.returnObject;
                    thisLi.attr("pageId",msg);
                    $(".left").attr("pageId",msg);
                    popUp({
                        "content":"保存成功！",
                        showCancelButton: false,
                        showConfirmButton: false,
                        timer: 1000
                    });
                });
            };
        
            me.cacheDatas = {};
            me.cacheDatas = $.extend({},datas);
        },
        pagePreview: function(){
            var me = this;
            var datas = me.saveData();
            var thisLi = $("li.activePage");
            var ishomepage = $("li.activePage").attr("isHomePage");

            box.render($("#previewPop"), {siteId: me.siteId, pageId: $(".left").attr("pageId")}, previewPop); 
            //保存、预览
            if($(".left").attr("pageId")){
                var params = {
                   "pageId": $(".left").attr("pageId"),
                   "pageName": $("#sky h1").html().replace("&amp;","&"),
                   "data": JSON.stringify({components: datas ? datas.components : ""}),
                   "siteId": me.siteId,
                   "isHomePage": ishomepage,
                };
                setup.commonAjax("editPage.do", params, function(msg){
                    var href = "http://"+ location.host+ "/mb_update2/preview/index.html?pageId=" + $(".left").attr("pageId");
                    //console.log(href)
                    me.qrcodeInit(href,datas);
                });
            }else{
                var params = {
                   "templateId":$(".left").attr("templateId") || me.templateId,
                   "pageName":$("#sky h1").html().replace("&amp;","&"),
                   "data": JSON.stringify({components: datas ? datas.components : ""}),
                   "siteId": me.siteId
                };
                
                setup.commonAjax("addPage.do", params, function(msg){
                    var href = "http://"+ location.host+ "/mb_update2/preview/index.html?pageId="+msg.returnObject;
                    thisLi.attr("pageId",msg);
                    $(".left").attr("pageId",msg);
                    //console.log(href)
                    // 预览弹框
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
            if(datas) app.loadFn(datas, "previewLeft");

            //关闭按钮
            $("#previewPop").delegate(".cut","click",function(){
                $("#previewPop").hide();
            });
        },
        //发布，在running页面调用
        pagePublish: function(){
            var me = this;
            var datas = me.saveData();
            //对比看是否有需要保存的数据
            me.compareCacheDatas(datas,function(){
                //先请求看是否已经发布过，判断是否曾经发布过
                me.getSiteInfo(me.siteId, function(msg){
                    /////此处为曾经发布过
                    me.hasPublished(me.siteId, msg.siteName, msg.domain, datas, 1);
                }, function(){

                    /////////此处为未发布

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
                            //检查域名是否被占用
                            me.checkDomain({domain: siteDomain},function(){
                                //发布前请求所有页面的数据
                                me.hasPublished(me.siteId, $(".siteName").val(), $(".siteDomain").val(), datas);
                            });
                        }

                        $(".siteDomain").focus(function(){
                            $(".pblErr").hide();
                        });
                    });

                    ///////为发布结束
                });
            });
        },
        //调发布接口
        hasPublished: function(siteId, siteName, domain, datas, publishStatus){ //previewPop为tpl
            var me = this;
            //发布前请求所有页面的数据
            setup.commonAjax("getSiteData.do", {"siteId": siteId}, function(msg){ 
                //console.log(JSON.stringify(msg,null,2));
                //组装html数组
                var htmlJson = [];
                var htmlStr = "";
                $.each(msg, function(i,v){
                    htmlStr = publish.publishInit(v.data);
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
                   "siteId": siteId,
                   "siteName": siteName,
                   "domain": domain,
                   "industryId": ""
                };
                
                setup.commonAjax("publish.do", params, function(msg){
                    
                    if(publishStatus){
                        popUp({
                            "content":"发布成功！",
                            showCancelButton: false,
                            showConfirmButton: false,
                            timer: 1000
                        });
                    }else{
                        //渲染弹框
                        box.render($("#previewPop"), {
                            siteId: siteId, 
                            pageName: datas.pageName, 
                            pageId: $(".left").attr("pageId"), 
                            publish: 1, 
                            url: msg
                        }, previewPop); 

                        me.qrcodeInit(msg,datas);

                        function jsCopy(){
                            var e=document.getElementById("pblUrl");//对象是content 
                              e.select(); //选择对象 
                              document.execCommand("Copy"); //执行浏览器复制命令
                        }

                        $("#previewPop").delegate(".blueBtn", "click", function(){
                            jsCopy();
                        }); 
                    }
                    
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
            setup.commonAjax("getSiteInfo.do", {siteId: siteId}, function(msg){
                if(msg.publishStatus == 1){
                    cb1(msg);
                }else{
                    cb2(msg);
                }
            });
        },
        saveData:function(){
            var me = this;

            this.elements={};
            var len = $(".left .drag").length;
            if(len>0){
                for(var i = 0;i<$(".left .drag").length;i++){
                    var vAct_modexBox = $(".left .drag").eq(i).parent();
                    if(vAct_modexBox.attr("id")){
                        if(!this.elements[vAct_modexBox.attr("id")]){
                            this.elements[vAct_modexBox.attr("id")] = {};
                        }
                        this.getStyle(vAct_modexBox,vAct_modexBox.attr("id"));
                    }
                }
            }
                
            //保持编辑框的新数据
            var components = [];
            var newObj = $.extend({},{elements: this.elements})
            components.push(newObj);
            var newDatas = $.extend({},{components: components});
            //保存数据成功后
            newDatas.components[0].backgroundColor = $("#sky").attr("color");
            newDatas.components[0].pageName = $("#sky h1").html();
            return newDatas;
        },
        changeData:function(){
            for(var id in this.elements){
                var idValue = this.elements[id]
                for(var className in idValue){
                    for(var style in idValue[className]){
                        if(style=="top"){
                            var top = idValue[className][style];
                            if(top.indexOf("%")==-1){ //px
                                top = top.replace(/px/,"");
                                idValue[className][style] = (top*1+55) + "px";
                            }else{
                                idValue[className][style] = idValue[className][style];
                            }
                        }
                    }
                }
            }
        },
        loadFn:function(datas, ele, log){ //渲染html5 //log=1说明返回的数据是包括components
            //目前components只有1个数组值
            var me = this;
            if(ele){ //说明是预览或者发布
                $("."+ele).html("");
                this.elements = datas.components[0].elements||{};
                this.changeData(); //预览的时候才需要改变数据的top值，减去55的sky header
                var htmls = '<div><div class="skyHeader">'+datas.components[0].pageName+'</div>';
                htmls += me.urlChangeFn(this.getSaved())+'</div>';
                $("." + ele).html(htmls);
                $("." + ele+">div").css({"backgroundColor": datas.components[0].backgroundColor});
                me.cacheDatas = {};
                me.cacheDatas = $.extend({},datas);
            }else{
                $(".left").html("");
                if(log){ //初始渲染
                    this.elements = datas.components[0] ? datas.components[0].elements : {};
                    var htmls = me.urlUndoFn(this.getSaved());
                    $(".left").html(htmls);
                }else{
                    this.elements = datas.elements||{};
                    var htmls = me.urlUndoFn(this.getSaved());
                    $(".left").html(htmls);
                }
                /**这个方法作为读取组件信息时的基础数据绑定js在component/index/index.js*/
                me.rightEditComponentInitAll(null,true);
                me.cacheDatas = null, 
                me.cacheDatas = $.extend({}, datas); 
            } 
        },
        urlChangeFn:function(val){
            var reg = new RegExp("data-click","ig");
            return val.replace(reg,"onclick")
        },
        urlUndoFn:function(val){
            var reg = new RegExp("onclick","ig");
            return val.replace(reg,"data-click")
        },
        getSaved:function(){//判断是否需要转换url为可点击跳转
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
                    var attr = "";
                    for(var childsEle in childrens){
                        if(childsEle!="nodeName"&&childsEle!="html"&&childsEle!="attributes"){
                            style+=(childsEle.replace(/([A-Z])/g,"-$1").toLowerCase()+":"+childrens[childsEle]+";")
                        }
                        if(childsEle=="attributes"){
                            for(var key2 in childrens[childsEle]){
                                attr+=(" "+key2+"="+childrens[childsEle][key2].replace(/"/g,"'"))
                            }
                        }
                    }
                    if(childEle=="dragBox"){
                        html = childrens.html;
                        child+=(" style='"+style+"'"+attr+">");
                    }else{
                        if(children[childEle].nodeName!="IMG"){
                            child+=(" style='"+style+""+attr+"'>");
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