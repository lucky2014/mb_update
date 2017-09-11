<div class="setting-panel">
  <a class="setting-panel-switch"></a>
  <div class="setting-panel-content innerDialog styleSetting cuttingLineCss">
    <div class="border_color">
        <label class="skin-label">颜色</label>
        <div class="c-colorWrapper selectCommon" style="float: left;">
             <input type="text" theColor="#fff" readonly class="skin-colorSelector skin-colorSelector-font">
        </div>
    </div>
    <div class="border_width">
        <label class="skin-label">线宽</label>
        <div class="borderWidth selectCommon">
            <input type="text" readonly value="2px" dataValue="0">
            <i></i>
            <ul class="selectUl borCuttingWUi" style="display:none;"> 
              <li>0px</li>
              <li>1px</li>
              <li class="selected">2px</li>
              <li>3px</li>
              <li>4px</li>
              <li>5px</li>
              <li>6px</li>
              <li>7px</li>
              <li>8px</li>
              <li>9px</li>
              <li>10px</li>
              <li>11px</li>
              <li>12px</li>
              <li>13px</li>
              <li>14px</li>
              <li>15px</li>
              <li>16px</li>
              <li>17px</li>
              <li>18px</li>
              <li>19px</li>
              <li>20px</li>
            </ul>
        </div>
    </div> 
    <div class="border_style">
        <label class="skin-label">线条样式</label>
        <div class="borderStyle selectCommon">
            <input type="text" readonly dataValue="solid" style="">
            <b></b>
            <i></i>
            <ul class="selectUl borCuttingUi" style="display:none;"> 
              <li class="selected" value="solid"><b></b></li>
              <li value="dashed"><b></b></li>
              <li value="dotted"><b></b></li>
            </ul>
        </div>
    </div>  
    <div>
      <div id="opacity" class="none">
        <!-- <div class="labelSkin-label">高级设置:</div> -->
        <div class="groupSkin-content">
          <label class="label_slide">不透明度</label>
          <div class="clearfix progress">
            <p maxvalue="100" value="100">
              <b class="opacity">
                <i class="progress-circle"></i>
                <span class="percent" style="display:none;">0</span>
                <span class="triangle-down" style="display:none;"></span>
              </b>
            </p>
          </div>
        </div>
      </div>
    </div>
      <!-- <li class="borderStyle">
        <span>线条样式</span>
        <p>
          <i style=""></i>
          <b></b>
        </p>
        <ul style="display:none;">
          <li class="solid" name="solid"><i></i></li>
          <li class="dashed" name="dashed"><i></i></li>
          <li class="dotted" name="dotted"><i></i></li>
        </ul>
      </li> -->
      <!-- <li class="progressBar">
        <span>不透明度</span>
        <div class="progress">
                <div class="progress_bg">
                    <div class="progress_bar"></div>
                </div>
                <div class="progress_btn" style=""></div>
                <div class="text"></div>
            </div>
      </li> -->
    <!-- </ul> -->
  </div>
</div>