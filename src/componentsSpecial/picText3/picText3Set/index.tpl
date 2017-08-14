<div class="picText3Set rightDiv" id="picText3Set">
	<!-- <div class="oneLine">
		<span>显示风格</span>
		<ul class="commonStyle lunboStyle">
			<li class="selected">
				<b><i></i></b>
				<em>图片轮播</em>
			</li>
		</ul>
	</div> -->
	<div class="addDl">
		<div class="imgInfor">
			<span class="imgTitle">图片信息</span>
		</div>
		{{#each this}}	
		<dl class="hasPics">
			<dd>
				<img src="{{value}}" class="addPicture">
				<input type="button" value="上传">
				<input type="file" name="myfiles" multiple="multiple" id="picText3{{@index}}" /> 
				<p class="lastDtP">建议尺寸300*150</p>
				<span class="lastDtspan">点击图片可重新上传</span>
			</dd>
			<dt>
				<img src="../src/1/images/delectCha.png" class="delectCha">
				<ul>
					<li>
						<span>标题</span>
						<input type="text" value="{{description}}" class="hotName" placeholder="为空时只显示图片">
					</li>
					<li class="linkAddress commonAddress">
						<span>链接地址</span>
						<input type="text" value="{{linkUrl}}" class="hotLink" placeholder="请输入链接地址">
					</li>
				</ul>
			</dt>
		</dl>
		{{/each}}
	</div>
	<button class="addBanBtn"><i></i>添加一个</button>
</div>

