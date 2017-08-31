<div class="panelTitle"><p>页面设置</p></div>
<div class="skySet rightDiv" id="skySet" ind="0">
	<ul class="commonStyle">
		<li class="mustInput">
			<span  class="navSpan"><i>*</i>页面名称</span>
			<input type="text" class="navInput" value="{{pageName}}" placeholder="请输入页面名称" id="storeName" maxlength="16">
			<p class="inNumber"><b>0</b>/<i>16</i></p>
		</li>
		<!-- <li>
			<span >页面描述</span>
			<input type="text" class="descript" value="{{description}}" placeholder="">
		</li> -->
		<!-- <li class="backColor">
			<span  class="">背景颜色</span>
			<input type="text"  readonly>
			<button>重置</button>
			<p>背景颜色只在手机端显示</p>
			<i id="cp3" color="{{backgroundColor}}" style="background:{{backgroundColor}}"></i>
		</li> -->
		<div id="background_color" class="colorSelectorWrapper none backColor">
		  <label class="skin-label" style="float: left">背景颜色</label>
		  <div class="c-colorWrapper selectCommon" style="float: left;">
		      <!-- <div class="c-opacityBg"></div>
		      <div class="fieldSkin-color colorConfig" style="background-color: rgb(28, 154, 227);" config="#687683" status="v_paragraph_style1_border_color"></div> -->
		      <input type="text" theColor="#1c9ae3" id="cp3" readonly class="skin-colorSelector skin-colorSelector-bg">
		      <!-- <i class="skin-colorSelector-bg"></i>
		      <b class="skin-colorSelector-bg" style="background-color: rgb(28, 154, 227);"></b> -->
		  </div>
		  <button>重置</button>
		  <p class="backTip">背景颜色只在手机端显示</p>
	</ul>
	

	<!-- <button class="blueBtnSky">保存</button> -->
<div>