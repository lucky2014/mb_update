<div class="skySet rightDiv" id="skySet" ind="0">
	{{#with this}}
	<ul class="commonStyle">
		<li class="mustInput">
			<span  class="navSpan"><i>*</i>页面名称</span>
			<input type="text" class="navInput" value="{{templateName}}" placeholder="请输入页面名称" id="storeName">
		</li>
		<li>
			<span >页面描述</span>
			<input type="text" class="descript" value="{{description}}" placeholder="分享给朋友时会自动显示页面描述">
		</li>
		<li class="backColor">
			<span  class="">背景颜色</span>
			<input type="text"  readonly>
			<button>重置</button>
			<p>背景颜色只在手机端显示</p>
			<i id="cp3" color="{{backgroundColor}}" style="background:{{backgroundColor}}"></i>
		</li>
	</ul>
	{{/with}}
<div>