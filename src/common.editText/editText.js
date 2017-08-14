define(function(require,exports,module){
    var $ = require("jquery");
    require("common.editText/editText.css");
    var editText = {
        dragTarget:null,
        delHtmlTag:function(str,tag){
                var reg = new RegExp("<([\/]?)("+tag+")((:?\s*)(:?[^>]*)(:?\s*))>","ig");
                return str.replace(reg,"");//去掉所有的html标记
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
            $(".edit_left,.edit_center,.edit_right").click(function(e){
                me.stopBubble(e)
                var align = $(this).find("a").attr("data-align");
                $(".left,.center,.right").removeClass("drag_active");
                $(this).addClass("drag_active");
                $(me.dragTarget).css("text-align",align);
            })
            $("body").delegate(".vAct_modexBox_paragraphId .dragBox","dblclick",function(e){
                me.stopBubble(e)
                var text = this;
                var lf = $(this).parents(".drag").offset().left;
                var tp = $(this).parents(".drag").offset().top;
                $("#cke_vAct_modexBox_paragraph_content").show();
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
            })
        }
    }
    return editText;
})