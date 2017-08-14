<div id="tipsDialog" class="modal layout-common" style="width:920px;">
	  <div class="modal-header"><a class="close icon-popclose closeBtn"></a><h3> 选择图片</h3></div>
	  <div class="modal-body">
	    <div id="userPicList" class="picList" style="padding-top:10px;">
	        <div id="svgBox" style="float: left;">
	        	{{#each this}}
		        	<div style="width:80px;height:80px;margin-top:23px;margin-left:23px;position: relative;" class="pic_thumb" data-type="rect"><i data-url="../src/component/imgs/btnIconsList.png" pos="{{left}}px {{top}}px" style="display: block;position: absolute;left:50%;top:50%;transform:scale(2);margin-left:-16px;margin-top:-16px;width:32px;height:32px;background:url(../src/component/imgs/btnIconsList.png) {{left}}px {{top}}px"></i></div>
		        {{/each}}
		    </div>
	        
	    </div>
	    <div id="userPicFooter">
	        <div id="uploadifive-upload_pic_btn" class="uploadifive-button" style="height: 40px; line-height: 40px; overflow: hidden; position: relative; text-align: center; width: 100px;"><input type="file" title="" style="font-size: 40px; opacity: 0; position: absolute; right: -3px; top: -3px; z-index: 999;" multiple="multiple"></div>
	        <div id="btn-cancel" class="btn-cancel" style="right: 130px; bottom: 10px;">取 消</div>
	        <div id="selectPic" class="picBtn active">确 定</div>
	    </div>
	  </div>
</div>