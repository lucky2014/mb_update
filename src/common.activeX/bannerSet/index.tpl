<div class="bannerSet banfootCommon rightDiv" id="bannerSet" ind="1">
	<div class="oneLine">
		<span>显示风格</span>
		<ul class="commonStyle lunboStyle">
			<li class="selected">
				<b><i></i></b>
				<em>图片轮播</em>
			</li>
		</ul>
	</div>
	<div class="imgInfor">
		<span class="imgTitle">图片信息</span>
	</div>
	<div class="addDl">
		{{#each this}}	
		<dl>
			<dd>
				<img src="{{value.value}}" class="addPicture">
				<input type="button" value="上传">
				<input type="file" name="myfiles" multiple="multiple" id="banner{{@index}}" /> 
				<p class="lastDtP">建议尺寸750*250</p>
				<span class="lastDtspan">点击图片可重新上传</span>
			</dd>
			<dt>
				<img src="../src/1/images/delectCha.png" class="delectCha">
				<ul>
					<li>
						<span>标题</span>
						<input type="text" value="{{attrTitle}}" class="bannerName" placeholder="为空时只显示图片">
					</li>
					<!-- <li class="linkAddress commonAddress">
						<span>链接地址</span>
						<input type="text" value="{{value.linkUrl}}" class="bannerLink" placeholder="请输入链接地址">
					</li> -->
					<li class="linkAddress commonAddress">
						<span>链接页面</span>
						<input type="text" value="{{value.linkName}}" class="shclickLi" selUrl="{{value.linkUrl}}" readonly>
						<i class="shclickI"></i>
						<ul class="linkChoose" style="display:none;">
							<li class="selectedLi" urlname="">请选择</li>
						</ul>
					</li>
				</ul>
			</dt>
		</dl>
		{{/each}}

	</div>
	<button class="addBanBtn"><i></i>添加一个</button>
</div>

