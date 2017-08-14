define(function(require,exports,module){
    require("1/css/base.css");
    require("1/mb_index/index.css");
	var $ = require("jquery");

    var setup = require("setup");
    var Engine = require("engine");
    var box = Engine.init();

    var ajaxFileUpload = require("common.ajaxfileupload/index");
    var requireNormal = require("1/mb_index/requireNormal");
    //加载滚动条js
    var mouseWheel = require("common.mouseWheel/index");
    var linkAdress = require("common.linkAdress/index");
    //数据列表
    var save = require("common.save/index");
    var blankData = require("common.save/blankData");

    var app = {
        userId: setup.getQueryString("userId") || 49,
        pageId: setup.getQueryString("pageId"), 
        getEdit:false,
        init : function(name, key, val, callback){
            var me = this;
            var params = {
                "userId":  app.userId,
            };
            params[key] = val;

            if(name == ""){
                me.datas = blankData;
                callback && callback(me.datas);
                me.getInfor(me.datas);
                //console.log(me.datas)
            }else{
                setup.commonAjax(name, params, function(msg){
                    if(key == "pageId"){
                        me.datas = JSON.parse(msg.data);
                        me.components = JSON.parse(msg.data).components;
                    }else{
                        me.components = msg.components;
                        me.datas = msg;
                    }
                    //console.log(JSON.stringify(me.datas,null,2))
                    callback && callback(me.datas);
                    me.getInfor(me.datas);
                },null,false)
            }
            return me.datas;
        },
        getInfor : function(datas){
            $(".left").html("")
            if(datas){
                requireNormal.rightSet.ri0.img_edit(datas,this);
                requireNormal.leftShow["show0"].img_show(datas);
                $(".right").prepend('<div class="panelTitle"><p>组件设置</p></div>');
                
                $.each(datas.components, function(i,v){ //加载中间显示模块
                    var symbol = v.symbol;  
                    if(symbol && symbol !="baseComponents"){
                        requireNormal.leftShow[symbol].img_show(v);
                    }else if(symbol && symbol =="baseComponents"){
                        requireNormal.leftShow.componentEdit.loadFn(v);
                    }
                });
                $.each($(".leftDiv"), function(i){ //添加ind属性
                    $(this).attr("ind",i);
                });
                //切换右侧
                $("body").delegate(".leftDiv", "click", function() {
                    app.editdivChange(this,datas);
                    $(".right").attr("class","right")
                })
            }
        },
        editdivChange : function(_this,value,datas){ //点击左边模块，切换右边编辑模块
            var me = this;
            var self = $(_this);
            var thisSymbol = self.attr("symbol");
            me.loadRightSet(thisSymbol,value);
            me.updateData(datas,thisSymbol);
            //模块名称change监控
            $(".rightDiv ").delegate(".modelInput","keyup",function(){
                var self = $(this);
                var thisDiv = self.parents(".rightDiv").attr("id");
                var leftDiv = thisDiv.split("Set")[0];
                $("."+leftDiv).find(".modelInputShow").html(self.val());
            })

            $(".leftDiv").removeClass("active");
            self.addClass("active");
            self.find(".selectB").css("height",self.height()-4);
            pubsub.publish('dataChange');
        },
        updateData : function(datas,symbol){
            var me = this;
            var ind = $(".active.leftDiv").index(); //用于排序            //
            if(!symbol){
                  datas = $.extend(datas,{
                    templateName: $("#storeName").val(),
                    description: $(".skySet .descript").val(),
                    backgroundColor: $(".skySet .backColor i").attr("color")
                  });
            }else{
                $.each(app.datas.components, function(i,v){
                    if(symbol == v.symbol){
                        datas.components[ind-1] = save[symbol](ind);
                    }
                });
            }
            return datas;
        },
        loadRightSet : function(symbol,datas){
            $(".right").html("");
             if(!symbol){
                v = this.datas;
                requireNormal.rightSet["ri0"].img_edit(v);
            }else{
                $.each(datas.components, function(i,v){
                    if(symbol == v.symbol){
                        requireNormal.rightSet[symbol].img_edit(v);
                    }
                });
            }
            $(".right").prepend('<div class="panelTitle"><p>组件设置</p></div>');
        },
        //快速组件点击
        addData : function(datas,me){
            var _index =  $(".leftDiv").length-2;
            var type = $(me).attr("data-status");
            requireNormal.leftShow[type].img_show();
            requireNormal.rightSet[type].img_edit();
            if(type != "baiduMap" && datas){
                datas.components.splice(_index,0,save[type](_index));
            }else{
                datas = {};
                var components = [save[type](_index)];
                datas = $.extend({},{components: components});
            }

            this.datas = datas;
        }

    }  
    return app;
});

