<div class="companyAbstractSet rightDiv" id="companyAbstractSet" ind="2">
	<ul class="abstractSet commonStyle">
		<li class="mustInput">
			<span  class=""><i>*</i>模块名称</span>
			<input type="text" class="modelInput" placeholder="请输入模块名称">
		</li>
		<li class="linkAddress commonAddress">
			<span>链接页面</span>
			<input type="text" value="{{linkName}}" class="shclickLi" selUrl="{{linkUrl}}" readonly>
			<i class="shclickI"></i>
			<ul class="linkChoose" style="display:none;">
				<li class="selectedLi" urlname="">请选择</li>
			</ul>
		</li>
	</ul>
	<div class="companyText DivCommon">
		<span class="titleCommon">文本介绍</span>
		<p class="editText" contenteditable="true">
		</p>
	</div>
	<div class="companyPics DivCommon">
		<span class="titleCommon">图片信息</span>
		<div>
				<img src="../src/1/images/test/contentLogo.png" class="addPicture bigPic">
				<input type="button" value="上传">
				<input type="file" multiple="multiple" id="bigPicComab" name="myfiles">
				<span class="sibSpan">重新上传</span>
				<p class="lastDtP">建议尺寸220*210</p>
		</div>
		<ul class="piculCommon">
			
		</ul>
	</div>
</div>