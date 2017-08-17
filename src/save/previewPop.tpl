<div class="previewPopInit">
	<div class="previewLeft"><div></div></div>
	
	<div class="r">	
		<a class="cut"></a>
		<div class="qrcode"></div>
		
		{{#if publish}}
		<div id="pblBox">
		<span>推广链接</span>
		<input type="text" value="{{url}}" id="pblUrl" /><a class="blueBtn">复制</a>
		</div>
		{{else}}
		<a class="blueBtn" href="../component/index.html?siteId={{siteId}}&editSite=true&pageId={{pageId}}">编辑站点</a>
		{{/if}}
	</div>
</div>