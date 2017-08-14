<div class="swiper-container" id="swiper1">
    <div class="swiper-wrapper">
    	{{#each this}}
			<div class="swiper-slide" attrId={{attrId}}><img src="{{value.value}}" /></div>
		{{/each}}
    </div>
    <div class="swiper-pagination"></div>
</div>

