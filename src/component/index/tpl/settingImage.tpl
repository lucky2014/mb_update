<div class="setting-panel">
  <a class="setting-panel-switch"></a>
  <div class="setting-panel-content">
      <div class="DialogWindow picture">
          <div class="innerDialog" style="padding-bottom:0;">
              <div id="show_pic_box">
                  <img src="../src/component/imgs/logoTip.png" id="show_pic_url">
              </div>
        			<div class="groupSkin-content clearfix" style="text-align:center; margin-bottom: 15px;">
          				  <div id="file_upload" class="uploadify-button" style="float:left;margin-right:25px;margin-top:10px;cursor:pointer">
          				      更换
          				  </div>
        			</div>
			</div>
          </div>
      </div>
      <div class="linkDemo">
          <li class="linkStyle commonAddress">
            <span>链接</span>
            <input type="text" class="shclickLi" value="请选择" readonly>
            <i class="shclickI"></i>
            <ul class="linkChoose" style="display:none;">
                <li class="selectedLi" sign="1">请选择</li>
                <li sign="2">外部链接</li>
                <li sign="3">站内链接</li>
                <li sign="4">返回</li>
            </ul>
          </li>
          <li class="linkAddress commonAddress" style="display:none;">
            <span>链接地址</span>
            <input type="text" placeholder="请输入链接地址" class="shclickLi" selUrl="">
          </li>
          <li class="selectAddress commonAddress" style="display:none;">
            <span>链接地址</span>
            <input type="text" readonly class="shclickLi" selUrl="" value="请选择">
            <i class="shclickI"></i>
            <ul class="linkChoose" style="display:none;">
              <li class="selectedLi" urlname="">请选择</li>
            </ul>
          </li>
      </div>
      <div class="innerDialog styleSetting" hasmodified="1" style="margin-top:0;">
          <div>
              <div class="advanceskin-content">
                <div>
                  <div class="groupSkin-content">
                    <div id="border_color" class="colorSelectorWrapper clearfix none" style="display: block;padding-bottom:32px; border-bottom: 1px solid #e0e0e0;">
                      <label class="skin-label">边框</label>
                      <div class="select" style="float:left;">
                        <select id="border_width_select" style="width: 53px;text-align: center;">
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                          <option value="13">13</option>
                          <option value="14">14</option>
                          <option value="15">15</option>
                          <option value="16">16</option>
                          <option value="17">17</option>
                          <option value="18">18</option>
                          <option value="19">19</option>
                          <option value="20">20</option></select>
                      </div>
                      <div class="c-colorWrapper" style="float: left;">
                        <div class="c-opacityBg"></div>
                        <div class="fieldSkin-color colorConfig" style="background-color: rgb(104, 118, 131);" config="#687683" status="v_paragraph_style1_border_color"></div>
                        <div class="skin-colorSelector skin-colorSelector-border"></div>
                      </div>
                      <div class="select" style="float:left;">
                        <select id="border_type_select" style="width: 53px;font-family: '微软雅黑';" status="v_paragraph_style1_border_style" config="solid">
                          <option value="solid">一</option>
                          <option value="dashed">--</option></select>
                      </div>
                    </div>
                    <!-- <div id="background_color" class="colorSelectorWrapper none" style="height: 50px; display: block;">
                      <label class="skin-label" style="float: left">背景</label>
                      <div class="c-colorWrapper n-c-colorWrapper" style="float:left;margin:-30px 0 0 0;">
                        <div class="c-opacityBg"></div>
                        <div class="fieldSkin-color colorConfig" style="background-color: none; " config="rgba(0,0,0,0)" status="v_paragraph_style1_background_color"></div>
                        <div class="skin-colorSelector skin-colorSelector-bg"></div>
                      </div>
                    </div> -->
                  </div>
                </div>
                <!-- <span class="line"></span> -->
                <div style="padding-bottom: 5px;padding-top: 30px;">
                  <div id="opacity" class="none" style="display: block;">
                    <!-- <div class="labelSkin-label">高级设置:</div> -->
                    <div class="groupSkin-content">
                      <label class="label_slide">不透明度</label>
                      <div class="clearfix progress">
                        <p maxvalue="100" value="100">
                          <b class="opacity">
                            <i class="progress-circle"></i>
                          </b>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="border_radius" class="none" style="display: block;">
                  <div class="groupSkin-content">
                    <div class="topCorners clearfix">
                      <label class="label_slide">圆角</label>
                      <div class="clearfix progress">
                        <p maxvalue="24" value="0">
                          <b class="radius"><i class="progress-circle"></i></b>
                          
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div id="box_shadow" class="none" style="display: none;">
                    <div class="groupSkin-content">
                      <div class="topCorners clearfix">
                        <label>
                          <span>阴影大小：</span>
                          <input type="number" class="inputSkin-input">px</label></div>
                      <div class="colorSelectorWrapper">
                        <label class="skin-label">阴影颜色：</label>
                        <div class="c-colorWrapper">
                          <div class="c-opacityBg"></div>
                          <div class="fieldSkin-color colorConfig" style="background-color: none; "></div>
                          <div class="skin-colorSelector"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
      </div>
  </div>
</div>