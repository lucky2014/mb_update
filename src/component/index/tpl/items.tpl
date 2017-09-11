{{#each this}}
	<li pageId="{{id}}" sort="{{sort}}">
		<a title="{{pageName}}" target=""><i class="homeIcon"></i>{{pageName}}</a>
		<div class="page-control" style="display: none;">
			<span class="page-edit" name="{{pageName}}" title="编辑"><i></i></span>
			<span class="page-copy" name="{{pageName}}" title="复制"><i></i></span>
			<span class="page-dele" name="{{pageName}}" title="删除"><i></i></span>
		</div>
	</li>
{{/each}}