{{#with this}}
	<div class="panelTitle">
	     <p>组件设置</p>
	</div>
	<ul class="setOuter">
		<li class="borderColor">
			<span>颜色</span>
			<p>
				<i></i>
				<b></b>
			</p>
		</li>
		<li class="borderWidth">
			<span>线宽</span>
			<p>
				<i>{{value.borderWidth}}</i>
				<b></b>
			</p>
			<ul style="display:none;">
				<li wwidth="1px">1px</li>
				<li wwidth="2px">2px</li>
				<li wwidth="3px">3px</li>
				<li wwidth="4px">4px</li>
				<li wwidth="5px">5px</li>
			</ul>
		</li>
		<li class="borderStyle">
			<span>线条样式</span>
			<p>
				<i style="border-bottom-style:{{value.borderStyle}};border-bottom-width:2px;"></i>
				<b></b>
			</p>
			<ul style="display:none;">
				<li class="solid" name="solid"><i></i></li>
				<li class="dashed" name="dashed"><i></i></li>
				<li class="dotted" name="dotted"><i></i></li>
				<!-- <li class="double" name="double"><i></i></li>
				<li class="groove" name="groove"><i></i></li>
				<li class="ridge" name="ridge"><i></i></li>
				<li class="inset" name="inset"><i></i></li>
				<li class="outset" name="outset"><i></i></li> -->
			</ul>
		</li>
		<li class="progressBar">
			<span>不透明度</span>
			<div class="progress">
	            <div class="progress_bg">
	                <div class="progress_bar"></div>
	            </div>
	            <div class="progress_btn" style="border-color:{{value.color}}"></div>
	            <div class="text"></div>
	        </div>
		</li>
	</ul>
	{{/with}}