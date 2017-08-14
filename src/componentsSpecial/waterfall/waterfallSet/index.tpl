<div class="waterfallSet rightDiv" id="waterfallSet">
	<div class="imgInfor">
		<span class="imgTitle">图片信息</span>
	</div>
	<div class="addDl">
		{{#each this}}	
				<dl>
					<dd>
						<img src="{{value}}" class="addPicture">
						<input type="button" value="上传">
						<input type="file" name="myfiles" multiple="multiple" id="waterfall{{@index}}" /> 
						<span class="lastDtspan">点击图片可重新上传</span>
						<!-- <p class="lastDtP">建议尺寸750*250</p> -->
					</dd>
					<dt>
						<img src="../src/1/images/delectCha.png" class="delectCha">
						<ul>
							<li>
								<span>标题</span>
								<input type="text" value="{{description}}" class="waterfallName" placeholder="为空时只显示图片">
							</li>
							<!-- <li class="imgLink commonLink">
								<span class="link">链接</span>
								<input readonly>
								<i></i>
								<ul class="linkChoose dn">
									<li class="selectedLi">无</li>
									<li classify = "1">商品链接</li>
									<li classify = "2">资讯链接</li>
									<li classify = "3">站内链接</li>
									<li classify = "4">外部链接</li>
								</ul>
							</li>  -->
							<li class="linkAddress commonAddress">
								<span>链接地址</span>
								<input type="text" value="{{linkUrl}}" class="waterfallLink" placeholder="请输入链接地址">
							</li>
						</ul>
					</dt>
				</dl>
				{{/each}}

	</div>
	<button class="addBanBtn"><i></i>添加一个</button>
</div>

