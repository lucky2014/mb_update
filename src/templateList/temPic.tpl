{{#each this}}
	{{#if pic}} <!-- 判定是否有text值 -->
	{{else}}
	<div class="tempOuter" blank="0">
		<ul>
			{{#each childList}}
				<li templateId="{{templateId}}">
					<img src={{pic}} alt="">
				</li>
			{{/each}}
		</ul>
		<div class="previewCon">
			<span>{{pageName}}</span>
			<p>{{description}}</p>
			<div>
				<img src="../src/templateList/imgs/erweima.png" alt="">
				<i>扫码体验</i>
			</div>
			<button templateId="{{templateId}}">立即使用</button>
		</div>
	</div>
{{/if}}
{{/each}}