<div class="advertiseSet rightDiv" id="advertiseSet">
	<div class="oneLine">
		<span>显示风格</span>
		<ul class="commonStyle lunboStyle">
			<li class="selected">
				<b><i></i></b>
				<em>图片风格</em>
			</li>
		</ul>
	</div>
	<div class="addDl">
		<div class="imgInfor">
			<span class="imgTitle">图片信息</span>
		</div>
		
		{{#with this}}	
		<dl>
			<dd>
				<img src="{{value}}" class="addPicture">
				<input type="button" value="上传">
				<input type="file" name="myfiles" multiple="multiple" id="adverImg" /> 
				<p class="lastDtP">建议尺寸750*100</p>
				<span class="lastDtspan">点击图片可重新上传</span>
			</dd>
			<dt>
				<ul>
					<li>
						<span>标题</span>
						<input type="text" value="{{description}}" class="adverName" placeholder="为空时只显示图片">
					</li>
					<li class="linkAddress commonAddress">
						<span>链接页面</span>
						<input type="text" value="{{linkName}}" class="shclickLi adverLink" selUrl="{{linkUrl}}" readonly>
						<i class="shclickI"></i>
						<ul class="linkChoose" style="display:none;">
							<li class="selectedLi" urlname="">请选择</li>
						</ul>
					</li>
				</ul>
			</dt>
		</dl>
		{{/with}}

	</div>
</div>