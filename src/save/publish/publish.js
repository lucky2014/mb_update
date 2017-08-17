define(function(require,exports,module){
	//发布生成静态页面
    var html = '<!doctype HTML><html><head>'+
        '<meta charset="utf-8"/>'+
        '<meta http-equiv="X-UA-Compatible" content="IE=edge">'+
        '<meta name="viewport" content="width=320,initial-scale=1.0,maximum-scale=1.3,user-scalable=0">'+
        '<meta name="apple-mobile-web-app-capable" content="yes">'+
        '<meta name="format-detection" content="telephone=no">'+
        '<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />'+
        '<meta http-equiv="Pragma" content="no-cache" />'+
        '<meta http-equiv="Expires" content="0" />';
        
    var publish = {
        html: html,
        publishInit: function(datas){
            datas = JSON.parse(datas);
            var me = this;
            //渲染头部
            me.html += '<title>'+datas.templateName+'</title>'+
            '<link rel="stylesheet" href="http://'+ location.host+ '/mb_update2/src/save/publish/style.css" />'+
            '<link rel="stylesheet" href="http://'+ location.host+ '/mb_update2/src/save/publish/swiper.min.css" />'+
            '<script src="http://'+ location.host+ '/mb_update2/src/save/publish/jquery.min.js"></script>'+
            '<script src="http://'+ location.host+ '/mb_update2/src/save/publish/swiper.min.js"></script>'+
            '</head><body>';

            //渲染中间
            var obj = datas.components;
            for(var i=0;i<obj.length;i++){
                //banner
                if(obj[i].symbol == "img_show"){
                    me.html += '<div class="swiper-container" id="swiper1"><div class="swiper-wrapper">';
                    for(var j=0; j<obj[i].attrList.length; j++){
                        me.html += '<div class="swiper-slide" w="'+obj[i].attrList[j].width+'" h="'+obj[i].attrList[j].height+'"><img src="'+obj[i].attrList[j].value.value+'" /></div>'
                    }
                    me.html += '</div><div class="swiper-pagination"></div></div><script src="http://'+ location.host+ '/mb_update2/src/save/publish/bannerSwiper.js"></script>';
                }

                //首页企业介绍
                else if(obj[i].symbol == "about"){
                    for(var j=0; j<obj[i].attrList.length; j++){
                        if(obj[i].attrList[j].tagName == "input"){
                            me.html += '<div class="title"><p class="titlL"><i class="blueL"></i><span class="comContent">'+obj[i].attrList[j].value.description+'</span></p></div>'
                            me.html += '<div class="conTop boxPd">';
                        }else if(obj[i].attrList[j].tagName == "textarea" || obj[i].attrList[j].tagName == "img" && obj[i].attrList[j].tagId == "building"){
                            if(obj[i].attrList[j].tagName == "textarea"){
                                me.html += '<p class="cpanyInfor">'+obj[i].attrList[j].value.value+'</p>';
                            }else{
                                me.html += '<img src="'+obj[i].attrList[j].value.value+'" />';
                            }
                        }else{
                            me.html += '</div>';
                            me.html += '<div class="picShow"><ul>';
                            for(var k=0; k<obj[i].attrList[j].value.length; k++){
                                me.html += '<li><img src="'+obj[i].attrList[j].value[k].value+'" /></li>';
                            }
                            me.html += '</ul></div>'
                        }
                    }
                }

                //首页企业资讯
                else if(obj[i].symbol == "information"){
                    for(var j=0; j<obj[i].attrList.length; j++){
                        var v = obj[i].attrList[j];
                        if(v.tagName == "input"){
                            me.html += '<div class="title"><p class="titlL"><i class="blueL"></i><span class="comContent">'+v.value.description+'</span></p></div>'
                            me.html += '<div class="boxPd"><div class="newsList">';
                        }else if(v.tagName == "a"){
                            me.html += '<h1>'+v.attrTitle+'</h1><span>'+v.value.value+'</span>';
                        }else{
                            me.html += '</div>';
                            me.html += '<div class="swiper-container" id="swiper2"><div class="swiper-wrapper">';
                            for(var k=0; k<v.value.length; k++){
                                me.html += '<div class="swiper-slide" w="'+v.width+'" h="'+v.height+'"><img src="'+v.value[k].value+'" /></div>'
                            }
                            me.html += '</div>';
                            me.html += '<div class="swiper-button-prev"><img src="/imgs/scrollL.png" /></div><div class="swiper-button-next"><img src="/imgs/scrollR.png" /></div>';
                            me.html += '<div class="swiper-pagination"></div></div></div><script src="http://'+ location.host+ '/mb_update2/src/save/publish/newsSwiper.js"></script>';
                        }
                    }
                }

                //首页企业产品
                else if(obj[i].symbol == "product_show"){
                    for(var j=0; j<obj[i].attrList.length; j++){
                        var v = obj[i].attrList[j];
                        if(v.tagName == "input"){
                            me.html += '<div class="title"><p class="titlL"><i class="blueL"></i><span class="comContent">'+v.value.description+'</span></p></div>'
                            me.html += '<div class="boxPd"><div class="swiper-container" id="swiper3"><div class="swiper-wrapper">';
                        }else{
                            me.html += '<div class="swiper-slide" w="'+v.width+'" h="'+v.height+'" style="background-image:url('+v.value.value+')"><span class="produName">'+v.value.description+'</span></div>'
                        }
                    }
                    me.html += '</div>';
                    me.html += '<div class="swiper-button-prev"><img src="/imgs/scrollL.png" /></div><div class="swiper-button-next"><img src="/imgs/scrollR.png" /></div>';
                    me.html += '</div></div><script src="http://'+ location.host+ '/mb_update2/src/save/publish/productSwiper.js"></script>';
                }

                //首页企业风采
                else if(obj[i].symbol == "corp_img"){
                    for(var j=0; j<obj[i].attrList.length; j++){
                        var v = obj[i].attrList[j];
                        if(v.tagName == "input"){
                            me.html += '<div class="title"><p class="titlL"><i class="blueL"></i><span class="comContent">'+v.value.description+'</span></p></div>'
                        }else if(v.tagName =="textarea"){
                            me.html += '<div class="boxPd"><p class="honor">'+v.value.value+'</p></div>';
                        }else{
                            me.html += '<div class="picShow"><ul>';
                            for(var k=0; k<obj[i].attrList[j].value.length; k++){
                                me.html += '<li><img src="'+obj[i].attrList[j].value[k].value+'" /></li>';
                            }
                            me.html += '</ul></div>'
                        }
                    }
                }


                //底部导航
                else if(obj[i].symbol == "footerNav"){
                    var v = obj[i].attrList[0].value;
                    me.html += '<div class="footernav" len="'+v.length+'"><ul>';
                    var className = ""
                    for(var j=0; j<v.length; j++){
                        className = v[j].className ? v[j].className : "";
                        me.html += '<li class="'+className+'"><a href=users?pageId='+v[j].id+'><i><img src="'+v[j].value+'"></i><span>'+v[j].description+'</span></a></li>'
                    }
                    me.html += '</ul></div><script src="http://'+ location.host+ '/mb_update2/src/save/publish/footernav.js"></script>'
                }

                //组件类
                else if(obj[i].symbol == "baseComponents"){
                    var datas = obj[i].elements;
                    if(datas){

                        var loadComponents = {
                            elements: datas,
                            getSaved:function(){
                                var me = this;
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
                                        for(var childsEle in childrens){
                                            if(childsEle!="nodeName"&&childsEle!="html"){
                                                style+=(childsEle.replace(/([A-Z])/g,"-$1").toLowerCase()+":"+childrens[childsEle]+";")
                                            }
                                        }
                                        if(childEle=="dragBox"){
                                            htmlStr = childrens.html;
                                            child+=" style='"+style+"'>";
                                        }else{
                                            if(children[childEle].nodeName!="IMG"){
                                                child+=" style='"+style+"'>";
                                            }
                                        }
                                    }
                                    if(nodeArr.length==4){
                                        vAct_modexBox_paragraph+=(child+htmlStr+"</"+nodeArr[2]+"></"+nodeArr[0]+">"+"</div>")
                                    }else{
                                        vAct_modexBox_paragraph+=(child+htmlStr+"</"+nodeArr[2]+"></"+nodeArr[1]+"></"+nodeArr[0]+">"+"</div>")
                                    }
                                    vAct_modexBoxArr.push(vAct_modexBox_paragraph)
                                }
                                return vAct_modexBoxArr.join("")
                            }
                        };

                        var htmls = loadComponents.getSaved();

                        me.html += htmls;

                    }
                }

                //产品页面广告
                else if(obj[i].symbol == "img_comp"){
                    me.html += '<div class="advantage"><ul>';
                    for(var j=0; j<obj[i].attrList.length; j++){
                        me.html += '<li><img src="'+obj[i].attrList[j].value.value+'"></li>';
                    }
                    me.html += '</ul></div>';
                }

                //产品页面产品推荐
                else if(obj[i].symbol == "product_show2"){
                    for(var j=0; j<obj[i].attrList.length; j++){
                        var v = obj[i].attrList[j];
                        if(v.tagName == "input"){
                            me.html += '<div class="productTitle" style="background:url('+v.value.value+'); background-size:100% 100%"><p class="titleEchelon">'+v.value.description+'</p></div>'
                            me.html += '<div class="boxPd"><div class="swiper-container" id="swiper3"><div class="swiper-wrapper">';
                        }else{
                            me.html += '<div class="swiper-slide" w="'+v.width+'" h="'+v.height+'" style="background-image:url('+v.value.value+')"><span class="produName">'+v.value.description+'</span></div>'
                        }
                    }
                    me.html += '</div>';
                    me.html += '<div class="swiper-button-prev"><img src="/imgs/scrollL.png" /></div><div class="swiper-button-next"><img src="/imgs/scrollR.png" /></div>';
                    me.html += '</div></div><script src="http://'+ location.host+ '/mb_update2/src/save/publish/productSwiper.js"></script>';
                }


                //产品页面分类
                else if(obj[i].symbol == "list_comp"){
                    me.html += '<div class="hotCategory">';
                    for(var j=0; j<obj[i].attrList.length; j++){
                        var v = obj[i].attrList[j];
                        if(v.tagName == "input"){
                            me.html += '<h1>HOT CATEGORY</h1><p class="blueSu"><i></i></p><span class="blueTex">'+v.value.description+'</span>'
                            me.html += '<ul>';
                        }else{
                            for(var k=0; k<v.value.length; k++){
                                me.html += '<li style="background-image:url('+v.value[k].value+')"><i>'+v.value[k].description+'</i></li>';
                            }
                        }
                    }
                    me.html += '</ul>';
                    me.html += '</div>';
                }


                //产品页面新品上架
                else if(obj[i].symbol == "img_new"){
                    for(var j=0; j<obj[i].attrList.length; j++){
                        var v = obj[i].attrList[j];
                        if(v.tagName == "input"){
                            me.html += '<div class="productTitle" style="background:url('+v.value.value+'); background-size:100% 100%"><p class="titleEchelon">'+v.value.description+'</p></div>'
                            me.html += '<div class="img_new"><ul>';
                        }else{
                            me.html += '<li><img src="'+v.value.value+'"><span>'+v.value.description+'</span></li>'
                        }
                    }
                    me.html += '</ul></div>';
                }

                //产品页面新品上架
                else if(obj[i].symbol == "hot_recommend"){
                    for(var j=0; j<obj[i].attrList.length; j++){
                        var v = obj[i].attrList[j];
                        if(v.tagName == "input"){
                            me.html += '<div class="productTitle" style="background:url('+v.value.value+'); background-size:100% 100%"><p class="titleEchelon">'+v.value.description+'</p></div>'
                            me.html += '<div class="img_new"><ul>';
                        }else{
                            me.html += '<li><img src="'+v.value.value+'"></li>'
                        }
                    }
                    me.html += '</ul></div>';
                }


                //联系我们页面\快速组件5
                else if(obj[i].symbol == "contactUs" || obj[i].symbol == "text5"){
                    me.html += '<div class="contactUs">';
                    for(var j=0; j<obj[i].attrList.length; j++){
                        var v = obj[i].attrList[j];
                        if(v.tagType == "img"){
                            if(v.tagName == "logo_img"){
                                me.html += '<img src="'+v.value.value+'" class="logImg">';
                            }else{
                                me.html += '<div class="scan"><img src="'+v.value.value+'"><p>'+v.value.description+'</p></div>';
                            }
                        }else{
                            me.html += '<div class="contactWay">';
                            for(var k=0; k<v.value.length;k++){
                                me.html += '<p class="con"><span class="conL">'+v.value[k].description+'</span><i class="conR">'+v.value[k].value+'</i></p>'
                            }
                        }
                    }
                    me.html += '</div></div>';
                }


                //关于我们页面
                else if(obj[i].symbol == "aboutInfo"){
                    me.html += '<div class="aboutInfo">';
                    for(var j=0; j<obj[i].attrList.length; j++){
                        var v = obj[i].attrList[j];
                        if(v.tagId == "model_name"){
                            me.html += '<div class="head"><p class="p1" style="background-image:url('+v.value.value+')"><span class="descrip">'+v.value.description+'</span></p></div>';
                        }else if(v.tagId == "text1" || v.tagId == "text2" || v.tagId == "text3"){
                            me.html += '<p class="text">'+v.value.value+'</p>';
                        }else if(v.tagId == "imgs"){
                            me.html += '<div class="picShow"><ul>';
                            for(var k=0;k<v.value.length;k++){
                                me.html += '<li><img src="'+v.value[k].value+'"></li>';
                            }
                            me.html += '</ul></div>';
                        }else{
                            me.html += '<div class="big_img"><img src="'+v.value.value+'"></div>';
                        }
                    }
                    me.html += '</div></div>';
                }

                //快速组件text1，原公司介绍
                else if(obj[i].symbol == "text1"){
                    var v = obj[i].attrList;
                    me.html += '<div class="conTop boxPd">';
                    for(var j=0; j<v.length; j++){
                        if(v[j].tagName == "textarea" || v[j].tagName == "img" && v[j].tagId == "building"){
                            if(v[j].tagName == "textarea"){
                                me.html += '<p class="cpanyInfor">'+v[j].value.value+'</p>';
                            }else{
                                me.html += '<img src="'+v[j].value.value+'" />';
                            }
                        }else{
                            me.html += '</div>';
                            me.html += '<div class="picShow"><ul>';
                            for(var k=0; k<v[j].value.length; k++){
                                me.html += '<li><img src="'+v[j].value[k].value+'" /></li>';
                            }
                            me.html += '</ul>'
                        }
                    }
                    me.html += '</div>'
                }

                //快速组件text2，原我们的风采
                else if(obj[i].symbol == "text2"){
                    for(var j=0; j<obj[i].attrList.length; j++){
                        var v = obj[i].attrList[j];
                        if(v.tagName =="textarea"){
                            me.html += '<div class="boxPd"><p class="honor">'+v.value.value+'</p></div>';
                        }else{
                            me.html += '<div class="picShow"><ul>';
                            for(var k=0; k<obj[i].attrList[j].value.length; k++){
                                me.html += '<li><img src="'+obj[i].attrList[j].value[k].value+'" /></li>';
                            }
                            me.html += '</ul></div>'
                        }
                    }
                }

                //快速组件text3，原产品页面分类
                else if(obj[i].symbol == "text3"){
                    me.html += '<div class="hotCategory"><ul>';
                    var v = obj[i].attrList[0];
                    for(var j=0; j<v.value.length; j++){
                        me.html += '<li style="background-image:url('+v.value[j].value+')"><i>'+v.value[j].description+'</i></li>';
                    }
                    me.html += '</ul></div>';
                }

                //快速组件text4，原关于我们页面
                else if(obj[i].symbol == "text4"){
                    me.html += '<div class="aboutInfo">';
                    for(var j=0; j<obj[i].attrList.length; j++){
                        var v = obj[i].attrList[j];
                        if(v.tagId == "text1" || v.tagId == "text2" || v.tagId == "text3"){
                            me.html += '<p class="text">'+v.value.value+'</p>';
                        }else if(v.tagId == "imgs"){
                            me.html += '<div class="picShow"><ul>';
                            for(var k=0;k<v.value.length;k++){
                                me.html += '<li><img src="'+v.value[k].value+'"></li>';
                            }
                            me.html += '</ul></div>';
                        }else{
                            me.html += '<div class="big_img"><img src="'+v.value.value+'"></div>';
                        }
                    }
                    me.html += '</div></div>';
                }
            }

            //渲染完毕，结束标签
            me.html += '</body></html>';

            return me.html ;
        }
    };


    return publish;
})