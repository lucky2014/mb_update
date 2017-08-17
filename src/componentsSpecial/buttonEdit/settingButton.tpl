<div class="setting-panel">
  <a class="setting-panel-switch"></a>
  <!-- <div class="setting-panel-title">
       <div class="inner-title">组件设置</div>
  </div> -->
  <div class="setting-panel-content">
      <div class="DialogWindow" id="inpBtn" style="min-height: 120px;display: table;width:100%;position: relative;">
          <span class="active"><input type="button" value="标准按钮" name=""></span>
          <span class="jianbianBtn"><input type="button" value="渐变按钮" name=""></span>
          <span class="graphBtn"><i></i><input type="button" value="图文按钮" name="" ></span>
          <span class="opacBtn"><input type="button" value="透明按钮" name=""></span>
      </div>
      <div class="innerDialog styleSetting" style="border-top:0px solid #ddd;margin-top: 16px;" hasmodified="1">
          <div>
              <div class="advanceskin-content">
                <div>
                  <div id="groupSkin" class="groupSkin-content">
                    <div id="button_text" class="colorSelectorWrapper clearfix none" style="display: block;">
                        <label class="label_slide" style="width:90px;">按钮文字</label>
                        <div class="clearfix btnText" style="float:left;margin-bottom:20px;">
                            <input type="value" name="" value="标准按钮" class="form-control">
                        </div>
                    </div>
                      <div class="linkDemo" style="margin-left:0;">
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
                      <div id="font_color" class="colorSelectorWrapper clearfix none" style="display: block;margin-bottom:8px;">
                        <label class="skin-label" style="width: 90px;height:37px;float: left;">文本</label>
                        <div class="select" style="float:left;">
                          
                        </div>
                        <div class="c-colorWrapper" style="float: left;">
                          <div class="c-opacityBg"></div>
                          <div class="fieldSkin-color colorConfig" style="background-color: rgb(104, 118, 131);" config="#687683" status="v_paragraph_style1_font_color"></div>
                          <div class="skin-colorSelector skin-colorSelector-font"></div>
                        </div>
                        <div class="select" style="float:left;margin-left:10px;">
                          <div id="font_type_select" style="width: 32px;font-family: '微软雅黑';" status="v_paragraph_style1_font_style" config="solid">
                            <i class="before"></i>
                            <div id="fontConfig">
                                <select>
                                    <option>14px</option>
                                    <option>16px</option>
                                    <option>18px</option>
                                    <option>20px</option>
                                    <option>22px</option>
                                    <option>24px</option>
                                    <option>26px</option>
                                    <option>28px</option>
                                </select>
                                <i type="font-weight" config="bold"><img src="../src/component/imgs/f032.png" style="width:12px;"></i>
                                <i type="font-style" config="italic"><img src="../src/component/imgs/f033.png" style="width:12px;"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div id="border_color" class="colorSelectorWrapper clearfix none" style="display: block;">
                        <label class="skin-label" style="width: 90px;height:37px;float: left;">边框</label>
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
                      <div id="background_color" class="colorSelectorWrapper none">
                        <label class="skin-label" style="float: left">背景</label>
                        <div class="c-colorWrapper n-c-colorWrapper">
                          <div class="c-opacityBg"></div>
                          <div class="fieldSkin-color colorConfig" style="background-color: rgb(223, 223, 237); " config="rgba(0,0,0,0)" status="v_paragraph_style1_background_color"></div>
                          <div class="skin-colorSelector skin-colorSelector-bg"></div>
                        </div>
                      </div>
                  </div>
                </div>
                <div style="padding-bottom: 5px;padding-top: 30px;">
                  <div id="opacity" class="none" style="display: block;">
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
                <div id="border_radius" class="none" style="display: block;">
                  <div class="groupSkin-content">
                    <div class="topCorners clearfix">
                      <label class="label_slide">圆角</label>
                      <div class="clearfix progress">
                        <p maxvalue="24" value="0">
                          <b class="radius">
                            <i class="progress-circle"></i>
                            <span class="percent" style="display:none;">0</span>
                            <span class="triangle-down" style="display:none;"></span>
                          </b>
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