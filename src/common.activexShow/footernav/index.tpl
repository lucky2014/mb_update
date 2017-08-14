<b class="selectB"></b>
<ul>
	{{#each this}}
	<li class="selectedHtml">
		<i><img src="{{value}}"></i>
		<span>{{description}}</span>
	</li>
	{{/each}}
</ul>