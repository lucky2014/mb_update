define(function(require,exports,module){
    var $ = require("jquery");
    require("common.editAll/editText/editText.css");
    var Engine = require("engine");
    var box = Engine.init();
    var popUp = require("common.PopUp/index");
    var linkAdressTpl = require("common.linkAdress/linkAdress.tpl");
    //文本编辑器
    function getSelection($a){var $b,$c,$d;$b=$a.value.length;$c=$a.value.length;$d="";if($a.selectionStart){$b=$a.selectionStart;$c=$a.selectionEnd;$d=$a.value.substring($b,$c);}else{var $e=document.selection.createRange();if($e.parentElement()==$a){$d=$e.text;var $f=$d.length;$e.moveStart("character",-event.srcElement.value.length);$b=$e.text.length-$f;$c=$e.text.length;}};return{"selStart":$b,"selEnd":$c,"selText":$d};};
    function setSelection($a,$b,$c){if($a.selectionStart){$a.selectionStart=$b;$a.selectionEnd=$c;$a.setSelectionRange($b,$c);}else{var $e=$a.createTextRange();$e.collapse();$e.moveEnd('character',$c);$e.moveStart('character',$b);$e.select();};return getSelection($a);}
    function getStyle(obj,attr){
        return window.getComputedStyle(obj,null)[attr]
    }
    var clearSlct= "getSelection" in window ? function(){
     window.getSelection().removeAllRanges();
    } : function(){
     document.selection.empty();
    };
    function IsURL (str_url) { 
        var strRegex = '^((https|http|ftp|rtsp|mms)?://)'
        + '?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?' //ftp的user@ 
        + '(([0-9]{1,3}.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184 
        + '|' // 允许IP和DOMAIN（域名） 
        + '([0-9a-z_!~*\'()-]+.)*' // 域名- www. 
        + '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' // 二级域名 
        + '[a-z]{2,6})' // first level domain- .com or .museum 
        + '(:[0-9]{1,4})?' // 端口- :80 
        + '((/?)|' // a slash isn't required if there is no file name 
        + '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$'; 
        var re=new RegExp(strRegex); 
        //re.test() 
        if (re.test(str_url)) { 
        return (true); 
        } else { 
        return (false); 
        } 
    }
    var errorTip = require("common.errorTip/index.js");
    var editText = {
        dragTarget:null,
        selectionObj:null,
        rangeTxt:null,
        rememberText:"",
        delHtmlTag:function(str,tag){
                var reg = new RegExp("<([\/]?)("+tag+")((:?\s*)(:?[^>]*)(:?\s*))>","ig");
                return str.replace(reg,"");//去掉所有的html标记
        },
        getPageList:function(currEle,targetEle){
                var html = "";
                for(var i = 0;i<$(currEle).length;i++){
                    var title = $(currEle).eq(i).find("a").attr("title");
                    var url = $(currEle).eq(i).find("a").attr("data-url");
                    html+="<option data-url="+(url||"1.html")+">"+title+"</optiom>";
                }
                return html;   
        },
        setFocus:function(obj,posLen){//设置鼠标指针位置
          if(obj.setSelectionRange){ // IE浏览器  
                  obj.setSelectionRange(posLen, posLen);     
          }else if(obj.createTextRange){ // 非IE浏览器  
              var range=obj.createTextRange();    
              range.collapse(true);     
              range.moveStart('character', posLen);    
              range.moveEnd('character', posLen);  
              range.select();    
          } 
        },
        getSelectionHtml:function(){
            var me = this;
            var selectionObj = window.getSelection();
            if(selectionObj.getRangeAt){
                try{
                    var rangeObj = selectionObj.getRangeAt(0);
                }catch(error){
                    return;
                }
                var rangeObj = selectionObj.getRangeAt(0);
　　　　        var docFragment = rangeObj.cloneContents();
                var testDiv = document.createElement("div");
        　　　　testDiv.appendChild(docFragment);
        　　　　var selectHtml = testDiv.innerHTML||"";
                return selectHtml;
            }else{
                return "";
            }
        },
        textEdit:function(){
            var me = this;
            $(".fontSize li").click(function(){
                var text = $(me.dragTarget)[0];
                var selectHtml = me.getSelectionHtml()||me.rememberText;
                var textValue = $(text).html();
                var selectHtml2 = me.delHtmlTag(selectHtml,"sup");
                var value = $(this).attr("value");
                var className = "fontSize"+new Date().getTime();
                if(value){
                    var newValue = textValue.replace(selectHtml,"<sup class='"+className+"' style='font-size:"+value+"px'>"+selectHtml2+"</sup>");
                    $(text).html(newValue)
                    me.choseAllFocus($("."+className)[0])
                }
                
            })
            $(".lineHeight li").click(function(){
                var text = $(me.dragTarget)[0];
                var selectHtml = me.getSelectionHtml()||me.rememberText;
                var selectHtml2 = me.delHtmlTag(selectHtml,"sub");
                var textValue = $(text).html();
                var value = $(this).attr("value");
                var className = "lineHeight"+new Date().getTime();
                if(value){
                    var newValue = textValue.replace(selectHtml,"<sub class='"+className+"' style='line-height:"+value+"'>"+selectHtml2+"</sub>");
                    $(text).html(newValue)
                    me.choseAllFocus($("."+className)[0])
                }
            })
            var boldClass = "";
            $(".bold").click(function(e){
                me.stopBubble(e);
                var text = $(me.dragTarget)[0];
                var selectHtml = me.getSelectionHtml()||me.rememberText;
                var textValue = $(text).html();
                var boldClass = "hasBold"+new Date().getTime();
                if(!$(this).hasClass("drag_active")){
                    $(this).addClass("drag_active");
                    var selectHtml2 = me.delHtmlTag(selectHtml,"strong");
                    var newValue = textValue.replace(selectHtml,"<strong class='"+boldClass+"'>"+selectHtml2+"</strong>");
                    $(text).html(newValue)
                    me.choseAllFocus($("."+boldClass)[0])
                }else{
                    $(this).removeClass("drag_active");
                    var selectHtml2 = me.delHtmlTag(selectHtml,"strong");
                    var newValue = me.delHtmlTag(textValue,"strong");
                    $(text).html(newValue)
                }
            })
            var bodyDrag = false;
            $("body").delegate(".dragBox","mousedown",function(){
                bodyDrag = true;
            })
            $("body").delegate(".dragBox","mousemove",function(){
                if(bodyDrag == true){
                    
                }
            })
            $("body").delegate(".dragBox","blur",function(){
                if($(me.dragTarget).attr("contenteditable")){
                    $("#dialog_paragraph,#cke_vAct_modexBox_paragraph_content").show();
                }
                if(bodyDrag){
                    if(me.getSelectionHtml()!=""){
                        me.rememberText = me.getSelectionHtml();
                        if(me.rememberText){
                            if(me.rememberText.indexOf("hasBold")!=-1){
                                $(".bold").addClass("drag_active");
                            }else{
                                $(".bold").removeClass("drag_active");
                            }
                            if(me.rememberText.indexOf("hasItalic")!=-1){
                                $(".italic").addClass("drag_active");
                            }else{
                                $(".italic").removeClass("drag_active");
                            }
                        }
                    }
                    bodyDrag = false;
                }
            })
            function focusVal(className,val){
               $(className+" li").removeClass("selected");
               $(className+" input").val(val);
               $(className+" li[value='"+val+"']").addClass("selected");
            }
            $("body").delegate(".dragBox","click",function(e){
               var fontSize = parseInt($(e.target).css("font-size"));
               var lineHeight = $(e.target).css("line-height");
               lineHeight = parseFloat(parseFloat(lineHeight).toFixed(1)/fontSize)?parseFloat(parseFloat(lineHeight).toFixed(1)/fontSize).toFixed(1):1.0;
               focusVal(".fontSize",fontSize)
               focusVal(".lineHeight",lineHeight)
            })
            $("body").delegate(".dragBox","dblclick",function(e){
               var fontSize = parseInt($(e.target).css("font-size"));
               var lineHeight = $(e.target).css("line-height");
               lineHeight = parseFloat(parseFloat(lineHeight).toFixed(1)/fontSize)?parseFloat(parseFloat(lineHeight).toFixed(1)/fontSize).toFixed(1):1.0;
               focusVal(".fontSize",fontSize)
               focusVal(".lineHeight",lineHeight)
            })
            $("body").mousedown(function(e){
                if(!$(e.target).parents("#cke_vAct_modexBox_paragraph_content")[0]){
                    if(!$(e.target).parents(".drag")[0]){
                        $(".dragBox").removeAttr("contenteditable");
                        $("#dialog_paragraph,#cke_vAct_modexBox_paragraph_content").hide();
                        clearSlct();
                    }
                }
            })
            $(".italic").click(function(e){
                me.stopBubble(e)
                var text = $(me.dragTarget)[0];
                var selectHtml = me.getSelectionHtml()||me.rememberText;
                var textValue = $(text).html();
                var italicClass = "hasItalic"+new Date().getTime();
                if(!$(this).hasClass("drag_active")){
                    $(this).addClass("drag_active");
                    var selectHtml2 = me.delHtmlTag(selectHtml,"i");
                    var newValue = textValue.replace(selectHtml,"<i class='"+italicClass+"' style='font-style:italic;'>"+selectHtml2+"</i>");
                    $(text).html(newValue)
                    me.choseAllFocus($("."+italicClass)[0])
                }else{
                    $(this).removeClass("drag_active");
                    var newValue = me.delHtmlTag(textValue,"i");;
                    $(text).html(newValue)
                }
            })
            var selectHtml = "";
            var text = "";
            var removeTimer = null;
            $(".link").click(function(e){
                me.stopBubble(e)
                /*$("#myPopover1").show();*/
                popUp({
                    "title": '链接设置<a class="cut"></a>',
                    "content":'<div class="linkDemo textLink">',
                    showCancelButton: true,
                    showConfirmButton: true,
                }, function(){
                    var sign = $(".linkStyle").attr("sign");
                    var linkVal = $(".commonAddress[remark="+sign+"] input").attr("urlname");
                    var self = $(".popUp .linkAddress input")[0];
                    if(!IsURL(linkVal)){
                        errorTip.init(self,"仅支持http,https,ftp格式的链接,并确保填写的外部的链接可以在浏览器中打开。")
                        $(self).css("border-color","#f00");
                        clearTimeout(removeTimer);
                        removeTimer = setTimeout(function(){
                            $(self).css("border-color","#c4c4c4");
                            errorTip.removeFn(self);
                        },2000)
                    }else{
                        var textValue = $(text).html();
                        if(!$(self).hasClass("drag_active")){
                            $(self).addClass("drag_active");
                            var selectHtml2 = me.delHtmlTag(selectHtml,"a");
                            var newValue = textValue.replace(selectHtml,"<a data-url='"+linkVal+"'>"+selectHtml2+"</a>");
                            $(text).html(newValue)
                        }else{
                            $(self).removeClass("drag_active");
                            var selectHtml2 = me.delHtmlTag(selectHtml,"a");
                            var newValue = textValue.replace(selectHtml,selectHtml2);
                            $(text).html(newValue)
                        }
                        $(".popUp").css("display","none");
                    }
                });
                
                box.render($(".linkDemo"), "", linkAdressTpl);
                var sign = $(me.dragTarget).attr("sign"); //链接类型判断
                
                var linkName = $(me.dragTarget).attr("linkName"); //链接名称
                if(sign == 1){
                    $(".linkAddress").show();
                    $(".selectAddress,.backAddress").hide();

                    $(".linkStyle input").val("外部链接");
                    $(".linkAddress input").val(linkName);
                    /*$(".selectAddress .linkChoose").html("");*/
                }else if(sign == 2){
                    $(".linkAddress,.backAddress").hide();
                    $(".selectAddress").show();

                    $(".linkStyle input").val("站内链接");
                    $(".selectAddress input").val(linkName);
                }else if(sign == 3){
                    $(".linkAddress,.selectAddress").hide();
                    $(".backAddress").show();

                    $(".linkStyle input").val("返回");
                }
                $(".linkChoose li").removeClass("selectedLi");
                $(".linkChoose li[sign="+sign+"]").addClass("selectedLi");

                text = $(me.dragTarget)[0];
                if(window.getSelection().focusNode){
                    var selectionObj = window.getSelection();
                }else{
                    var selectionObj = me.selectionObj;
                }
                me.selectionObj = selectionObj;
                var rangeObj = selectionObj.getRangeAt(0);
　　　　        var docFragment = rangeObj.cloneContents();
                var testDiv = document.createElement("div");
        　　　　testDiv.appendChild(docFragment);
                selectHtml = testDiv.innerHTML;
            })
            $(".popover-content>select").change(function(){
                var ind = $(this).find("option:selected").index();
                if(ind==0){
                    $(".select_rt select").hide();
                    $(".select_rt input").show();
                }else{
                    $(".select_rt input").hide();
                    $(".select_rt select").html(me.getPageList(".site-page-navi-list li"))
                    var url = $(".select_rt select option:selected").attr("data-url");
                    $(".select_rt").attr("data-url",url)
                    $(".select_rt select").show();
                }
            })
            $(".popover-content").delegate("input","input propertychange",function(){
                var url = $(this).val();
                $(".select_rt").attr("data-url",url)
            })
            /*$(".btn-default,.close").click(function(){
                $("#myPopover1").hide();
            })*/
            $(".edit_left,.edit_center,.edit_right").click(function(e){
                me.stopBubble(e)
                var align = $(this).find("a").attr("data-align");
                $(".left,.center,.right").removeClass("drag_active");
                $(this).addClass("drag_active");
                $(me.dragTarget).css("text-align",align);
            })

            $("body").click(function(e){
                me.stopBubble(e)
                if($(e.target).parents("#cke_vAct_modexBox_paragraph_content")[0]||$(e.target).parents(".drag")[0]||$(e.target).parents(".colorpicker")[0]){
                    return;
                }
                $("#dialog_paragraph").hide();
            })
        },
        choseAllFocus:function(target){
            try{
                if (document.body.createTextRange) {
                    var range = document.body.createTextRange();
                    range.moveToElementText(target);
                    range.select();
                } else if (window.getSelection) {
                    var selection = window.getSelection();
                    var range = document.createRange();
                    range.selectNodeContents(target);
                    selection.removeAllRanges();
                    selection.addRange(range);
                } else {
                    
                }
            }catch(err){
                //错误提示
            }
            
        },
        choseAll:function(self){
            var lf = $(self).parents(".drag").offset().left;
            var tp = $(self).parents(".drag").offset().top;
            $("#dialog_paragraph,#cke_vAct_modexBox_paragraph_content").show();
            $("#cke_vAct_modexBox_paragraph_content").css({"left":lf,"top":tp-$("#cke_vAct_modexBox_paragraph_content").height()});
            $(self).attr("contenteditable",true);
            $(self).attr("spellcheck",false)
            this.choseAllFocus(self)
        }
    }
    return editText;
})