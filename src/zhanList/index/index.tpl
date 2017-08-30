{{#each this}}
	<dd class="microItem" siteId={{id}}  url="{{url}}" status={{status}}>
		<span class="{{siteStatusClass status}} siteStatus">{{siteStatus status}}</span>
		<img src="../imgs/zhanPics2.png" alt="" />
		<div class="hover">
			<a href="#" class="visit"><img src="../imgs/site1.png"><span>访问站点</span></a>
			<!--a href="#" class="manage"><img src="../imgs/site2.png"><span>站点管理</span></a-->
			<a href="#" class="edit"><img src="../imgs/site3.png"><span>编辑</span></a>
		</div>
		
		<!--站点点击事件-->
		<div class="siteEv"></div>

		<div class="miContent">
			<p>{{siteName}}</p>
			<div class="time"><i></i>{{siteTime createTime}}</div>
			<dl class="siteQl">
				{{{siteQl status}}}
			</dl>
		</div>
	</dd>
{{/each}}