{{#each this}}
	{{#if text}} <!-- 判定是否有text值 -->
	  {{else}}
			<li>
				<img src="{{value.value}}">
			</li>
	  {{/if}}
{{/each}}