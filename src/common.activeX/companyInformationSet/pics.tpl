<span class="titleCommon">图片信息</span>
{{#each this}}
	<dl class="hasPics">
		<dd>
			<img src="{{value}}" class="addPicture">
			<input type="button" value="上传">
			<input type="file"  multiple="multiple" accept="image/*" id="companyInformation{{@index}}" name="myfiles">
			<span class="sibSpan">重新上传</span>
			<p class="lastDtP">建议尺寸220*210</p>
		</dd>
		<dt>
			<img src="../src/1/images/delectCha.png" class="delectCha">
			<ul>
				<li class="commonAddress">
					<span>链接地址</span>
					<input type="text" value="{{linkUrl}}">
				</li>
			</ul>
		</dt>
	</dl>
{{/each}}