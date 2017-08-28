{{#each this}}
	<li pageId="{{id}}">
		<a title="{{pageName}}" target=""><i class="homeIcon"></i>{{pageName}}</a>
		<div class="page-control" style="display: none;">
			<span class="page-edit" name="{{pageName}}"><i></i></span>
			<!-- <span class="page-copy" name="{{pageName}}"><i></i></span> -->
			<span class="page-dele" name="{{pageName}}"><i></i></span>
		</div>
	</li>
{{/each}}