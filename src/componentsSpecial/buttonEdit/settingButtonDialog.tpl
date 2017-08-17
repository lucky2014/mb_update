<div id="tipsDialog" class="modal layout-common btnDialog">
	  <div class="modal-header">
		  	<a class="close icon-popclose closeBtn"></a>
		  	<h3>组件设置</h3>
	  </div>
	  <ul class="picStyleSel">
		  	<li class="sel" indNum = "1">系统图库</li>
		  	<li indNum = "2">我的图片</li>
	  </ul>
	  <div class="modal-body sysPics" indNum = "1">
	    <div id="userPicList" class="picList">
	        		<div class="pic_thumb" data-url="../src/1/images/addPic1.png"><img src="../src/1/images/addPic1.png">
	        			<span class="pic_select"></span>
	        			<!-- <i class="delPic" style="display:none;"></i> -->
	        		</div>
	        		<div class="pic_thumb" data-url="../src/1/images/delectCha.png"><img src="../src/1/images/delectCha.png">
	        			<span class="pic_select"></span>
	        			<!-- <i class="delPic" style="display:none;"></i> -->
	        		</div>
	        		<div class="pic_thumb" data-url="../src/1/images/delectCha2.png"><img src="../src/1/images/delectCha2.png">
	        			<span class="pic_select"></span>
	        			<!-- <i class="delPic" style="display:none;"></i> -->
	        		</div>
	    </div>
	  </div>
	  <div class="modal-body myPics" style="display:none;" indNum = "2">
	    <div id="userPicList" class="picList">
         	 <div id="userpic_file_upload">
              	  <div id="uploadifive-file_upload_pic" class="uploadifive-button">
 		              	<div class="uploadifive-button" id="file_upload_pic" title="上传图片" style="display: inline-block;">
 		              	</div>
 	              		<input type="button" value="上传">
 	              		<input type="file" multiple="multiple" name="myfiles" id="picAdd">
 	              </div>
 	        </div>
	    </div>
	  </div>
	  <div id="userPicFooter">
         <div id="btn-cancel" class="btn-cancel">取 消</div>
         <div id="selectPic" class="picBtn active">确 定</div>
      </div>
</div>