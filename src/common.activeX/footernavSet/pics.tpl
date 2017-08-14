
{{#each this}}
<dl>
	<dd>
		<img src="{{value}}" class="addPicture">
		<input type="button" value="上传">
		<input type="file" name="myfiles" multiple="multiple" id="footernav{{@index}}" /> 
		<p class="lastDtP">建议尺寸48*48</p>
		<span class="lastDtspan">点击图片可重新上传</span>
	</dd>
	<dt>
		<img src="../src/1/images/delectCha.png" class="delectCha">
		<ul>
			<li>
				<span>标题</span>
				<input type="text" value="{{description}}" class="bannerName" placeholder="为空时只显示图片">
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
	</dt>
</dl>
{{/each}}