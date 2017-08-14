{{#each this}}
	{{#if text}} <!-- 判定是否有text值 -->
		{{else}}
			<div class="swiper-slide" style="background-image:url({{value.value}})" attrId={{attrId}}>
				<span class="produName">{{value.description}}</span>			            	
			</div>
	{{/if}}
{{/each}}