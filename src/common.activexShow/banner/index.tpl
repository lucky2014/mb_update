
	<b class="selectB"></b>
	<div class="bannerListBox swiper-container" id="swiper1"> 
		<ul class="bannerList swiper-wrapper">
			{{#each this}}
				<li class="oldOne swiper-slide">
					<img src="{{value.value}}" height="100px">
				</li>
			{{/each}}
		</ul>
		<div class="swiper-pagination"></div>
	</div>
