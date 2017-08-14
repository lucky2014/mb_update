define(function(require,exports,module){
    var $ = require("jquery");
    require("common.editAll/editText/editText.css");

    //文本编辑器
    var editText = {
        dragTarget:null,
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
        textEdit:function(){
            var me = this;
            $(".fontSize select").change(function(){
                var value = $(this).find("option:selected").val();
                var text = $(me.dragTarget)[0];
                var selectionObj = window.getSelection();
                var rangeObj = selectionObj.getRangeAt(0);
　　　　        var docFragment = rangeObj.cloneContents();
                var testDiv = document.createElement("div");
        　　　　testDiv.appendChild(docFragment);
        　　　　var selectHtml = testDiv.innerHTML;
                if(selectHtml==""){
                    return;
                }
                var textValue = $(text).html();
                var selectHtml2 = me.delHtmlTag(selectHtml,"sup");
                var newValue = textValue.replace(selectHtml,"<sup style='font-size:"+value+"px'>"+selectHtml2+"</sup>");
                $(text).html(newValue)
            })
            $(".lineHeight select").change(function(){
                var value = $(this).find("option:selected").val();
                var text = $(me.dragTarget)[0];
                var selectionObj = window.getSelection();
                var rangeObj = selectionObj.getRangeAt(0);
　　　　        var docFragment = rangeObj.cloneContents();
                var testDiv = document.createElement("div");

        　　　　testDiv.appendChild(docFragment);

        　　　　var selectHtml = testDiv.innerHTML;
                if(selectHtml==""){
                    return;
                }
                var selectHtml2 = me.delHtmlTag(selectHtml,"sub");
                var textValue = $(text).html();
                var newValue = textValue.replace(selectHtml,"<sub style='line-height:"+value+"'>"+selectHtml2+"</sub>");
                $(text).html(newValue)
            })
            $(".bold").click(function(e){
                me.stopBubble(e)
                var text = $(me.dragTarget)[0];
                var selectionObj = window.getSelection();
                var rangeObj = selectionObj.getRangeAt(0);
　　　　        var docFragment = rangeObj.cloneContents();
                var testDiv = document.createElement("div");

        　　　　testDiv.appendChild(docFragment);

        　　　　var selectHtml = testDiv.innerHTML;
                var selectText = testDiv.innerText;
                var textValue = $(text).html();
                if(selectHtml==""){
                    return;
                }
                if(!$(this).hasClass("drag_active")){
                    $(this).addClass("drag_active");
                    var selectHtml2 = me.delHtmlTag(selectHtml,"strong");
                    //console.log(selectHtml)
                    var newValue = textValue.replace(selectHtml,"<strong>"+selectHtml2+"</strong>");
                    $(text).html(newValue)
                }else{
                    $(this).removeClass("drag_active");
                    var selectHtml2 = me.delHtmlTag(selectHtml,"strong");
                    var newValue = textValue.replace(selectHtml,selectHtml2);
                    $(text).html(newValue)
                }
            })
            $(".italic").click(function(e){
                me.stopBubble(e)
                var text = $(me.dragTarget)[0];
                var selectionObj = window.getSelection();
                var rangeObj = selectionObj.getRangeAt(0);
　　　　        var docFragment = rangeObj.cloneContents();
                var testDiv = document.createElement("div");

        　　　　testDiv.appendChild(docFragment);

        　　　　var selectHtml = testDiv.innerHTML;
                if(selectHtml==""){
                    return;
                }
                var textValue = $(text).html();
                if(!$(this).hasClass("drag_active")){
                    $(this).addClass("drag_active");
                    var selectHtml2 = me.delHtmlTag(selectHtml,"i");
                    var newValue = textValue.replace(selectHtml,"<i style='font-style:italic;'>"+selectHtml2+"</i>");
                    $(text).html(newValue)
                }else{
                    $(this).removeClass("drag_active");
                    var selectHtml2 = me.delHtmlTag(selectHtml,"i");
                    var newValue = textValue.replace(selectHtml,selectHtml2);
                    $(text).html(newValue)
                }
            })
            var selectHtml = "";
            var text = "";
            $(".link").click(function(e){
                me.stopBubble(e)
                $("#myPopover1").show();
                text = $(me.dragTarget)[0];
                var selectionObj = window.getSelection();
                var rangeObj = selectionObj.getRangeAt(0);
　　　　        var docFragment = rangeObj.cloneContents();
                var testDiv = document.createElement("div");
        　　　　testDiv.appendChild(docFragment);
                selectHtml = testDiv.innerHTML;
                //console.log(selectHtml)
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
            $(".btn-primary").click(function(){
                if(selectHtml==""){
                    return;
                }
                $("#myPopover1").hide();
                var textValue = $(text).html();
                if(!$(this).hasClass("drag_active")){
                    $(this).addClass("drag_active");
                    var selectHtml2 = me.delHtmlTag(selectHtml,"a");
                    var newValue = textValue.replace(selectHtml,"<a href='"+$(".select_rt").attr("data-url")+"'>"+selectHtml2+"</a>");
                    $(text).html(newValue)
                }else{
                    $(this).removeClass("drag_active");
                    var selectHtml2 = me.delHtmlTag(selectHtml,"a");
                    var newValue = textValue.replace(selectHtml,selectHtml2);
                    $(text).html(newValue)
                }
            })
            $(".btn-default,.close").click(function(){
                $("#myPopover1").hide();
            })
            $(".edit_left,.edit_center,.edit_right").click(function(e){
                me.stopBubble(e)
                var align = $(this).find("a").attr("data-align");
                $(".left,.center,.right").removeClass("drag_active");
                $(this).addClass("drag_active");
                $(me.dragTarget).css("text-align",align);
            })
            /*$("body").delegate(".vAct_modexBox_paragraphId .dragBox","dblclick",function(e){
                me.stopBubble(e)
                var text = this;
                var lf = $(this).parents(".drag").offset().left;
                var tp = $(this).parents(".drag").offset().top;
                $("#dialog_paragraph").show();
                $("#cke_vAct_modexBox_paragraph_content").css({"left":lf,"top":tp-$("#cke_vAct_modexBox_paragraph_content").height()});
                $(this).attr("contenteditable",true);
                if (document.body.createTextRange) {
                    var range = document.body.createTextRange();
                    range.moveToElementText(text);
                    range.select();
                } else if (window.getSelection) {
                    var selection = window.getSelection();
                    var range = document.createRange();
                    range.selectNodeContents(text);
                    selection.removeAllRanges();
                    selection.addRange(range);
                } else {
                    
                }
            });*/

            //右键功能
            // $("body").delegate(".vAct_modexBox_paragraphId .dragBox","contextmenu",function(e){
            //     me.stopBubble(e)
            //     var text = this;
            //     me.choseAll(text)
            //     return false;
            // }); 

            $("body").click(function(e){
                me.stopBubble(e)
                if($(e.target).parents("#cke_vAct_modexBox_paragraph_content")[0]||$(e.target).parents(".drag")[0]||$(e.target).parents(".colorpicker")[0]){
                    return;
                }
                $("#dialog_paragraph").hide();
            })
        },
        choseAll:function(self){
            var lf = $(self).parents(".drag").offset().left;
            var tp = $(self).parents(".drag").offset().top;
            $("#dialog_paragraph").show();
            $("#cke_vAct_modexBox_paragraph_content").css({"left":lf,"top":tp-$("#cke_vAct_modexBox_paragraph_content").height()});
            $(self).attr("contenteditable",true);
            if (document.body.createTextRange) {
                var range = document.body.createTextRange();
                range.moveToElementText(self);
                range.select();
            } else if (window.getSelection) {
                var selection = window.getSelection();
                var range = document.createRange();
                range.selectNodeContents(self);
                selection.removeAllRanges();
                selection.addRange(range);
            } else {
                
            }
        }
    }
    return editText;
})