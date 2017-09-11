<div class="setting-panel buttonSetting">
  <a class="setting-panel-switch"></a>
  <!-- <div class="setting-panel-title">
       <div class="inner-title">组件设置</div>
  </div> -->
  <div class="setting-panel-content">
      <div class="DialogWindow" id="inpBtn" style="min-height: 120px;display: table;width:100%;position: relative;">
          <span class="active"><input type="button" value="标准按钮" name=""></span>
          <span class="jianbianBtn"><input type="button" value="渐变按钮" name=""></span>
          <span class="graphBtn"><i></i><input type="button" value="图文按钮" name="" ></span>
          <!-- <span class="opacBtn"><input type="button" value="透明按钮" name=""></span> -->
      </div>
      <div class="innerDialog styleSetting" style="border-top:0px solid #ddd;margin-top: 16px;" hasmodified="1">
          <div>
              <div class="advanceskin-content">
                <div>
                  <div id="groupSkin" class="groupSkin-content">
                    <div id="button_text" class="colorSelectorWrapper clearfix none" style="display: block;">
                        <label class="label_slide" style="width:90px;">按钮文字</label>
                        <div class="clearfix btnText" style="float:left;margin-bottom:20px;">
                            <input type="text" name="" value="标准按钮" class="form-control">
                        </div>
                    </div>
                      <div class="linkDemo">
                                <!-- <li class="linkStyle commonAddress" sign="2">
                                  <span>链接</span>
                                  <input type="text" class="shclickLi" value="站内链接" readonly>
                                  <i class="shclickI"></i>
                                  <ul class="linkChoose" style="display:none;">
                                      <li class="selectedLi" sign="1">请选择</li>
                                      <li sign="1">外部链接</li>
                                      <li sign="2" class="selectedLi">站内链接</li>
                                      <li sign="3">返回</li>
                                  </ul>
                                </li>
                                <li class="linkAddress commonAddress" remark="1">
                                  <span>链接地址</span>
                                  <input type="text" placeholder="请输入链接地址" class="shclickLi" urlname="">
                                </li>
                                <li class="selectAddress commonAddress" remark="2">
                                  <span>链接地址</span>
                                  <input type="text" readonly class="shclickLi" value="" placeholder="请选择链接地址" urlname="">
                                  <i class="shclickI"></i>
                                  <ul class="linkChoose" style="display:none;">
                                    <li class="selectedLi" urlname="">无</li> 
                                  </ul>
                                </li>
                                <li class="backAddress commonAddress" remark="3">
                                  <span>链接地址</span>
                                  <input type="text" readonly class="shclickLi" urlName="history.back()"> -->
                      </div>
                      <div id="font_color" class="colorSelectorWrapper clearfix none" style="display: block;margin-bottom:8px;">
                        <label class="skin-label" style="width: 90px;height:37px;float: left;">文本</label>
                        <div class="select" style="float:left;">
                          
                        </div>
                        <div class="c-colorWrapper selectCommon" style="float: left;">
                             <!-- <div class="c-opacityBg"></div>
                             <div class="fieldSkin-color colorConfig" style="background-color: rgb(255, 255, 255);" config="#687683" status="v_paragraph_style1_border_color"></div> -->
                             <input type="text" theColor="#fff" readonly class="skin-colorSelector skin-colorSelector-font">
                             <!-- <i class="skin-colorSelector-font"></i>
                             <b class="skin-colorSelector-font" style="background-color: rgb(255, 255, 255);"></b> -->
                         </div>
                         <div class="textStyle selectCommon">
                             <input type="text" readonly dataValue="1" class="textInput">
                             <i class="textInput"></i>
                             <i class="textIn textInput"></i>
                             <div class="textType" style="display:none;" id="fontConfig"> 
                                 <button>14px</button>
                                 <b class="arrowDown"></b>
                                 <i type="font-weight" config="bold">
                                  <img src="../src/component/imgs/f032.png" style="width:12px;">
                                </i>
                                 <i type="font-style" config="italic">
                                  <img src="../src/component/imgs/f033.png" style="width:12px;">
                                </i>
                                <ul style="display:none;">
                                  <li class="selected" value="14px">14px</li>
                                  <li value="16px">16px</li>
                                  <li value="18px">18px</li>
                                  <li value="20px">20px</li>
                                  <li value="22px">22px</li>
                                  <li value="24px">24px</li>
                                  <li value="26px">26px</li>
                                  <li value="28px">28px</li>
                                </ul>
                             </div>
                         </div>
                      </div>
                      <div id="border_color" class="colorSelectorWrapper clearfix none" style="display: block;">
                        <label class="skin-label" style="width: 90px;height:37px;float: left;">边框</label>
                        <div class="borderWidth selectCommon">
                            <input type="text" readonly value="0" dataValue="0">
                            <i></i>
                            <ul class="borWUi selectUl" style="display:none;"> 
                              <li class="selected">0</li>
                              <li>1</li>
                              <li>2</li>
                              <li>3</li>
                              <li>4</li>
                              <li>5</li>
                              <li>6</li>
                              <li>7</li>
                              <li>8</li>
                              <li>9</li>
                              <li>10</li>
                              <li>11</li>
                              <li>12</li>
                              <li>13</li>
                              <li>14</li>
                              <li>15</li>
                              <li>16</li>
                              <li>17</li>
                              <li>18</li>
                              <li>19</li>
                              <li>20</li>
                            </ul>
                        </div>

                        <div class="c-colorWrapper selectCommon" style="float: left;">
                          <!-- <div class="c-opacityBg"></div>
                          <div class="fieldSkin-color colorConfig" style="background-color: rgb(198, 198, 230);" config="#687683" status="v_paragraph_style1_border_color"></div> -->
                          <input type="text" theColor="#000" readonly class="skin-colorSelector skin-colorSelector-border">
                          <!-- <i class="skin-colorSelector-border"></i>
                          <b class="skin-colorSelector-border" style="background-color: rgb(198, 198, 230);"></b> -->
                          <!-- <div class="skin-colorSelector skin-colorSelector-border"></div> -->
                        </div>

                        <div class="borderStyle selectCommon">
                            <input type="text" readonly value="一" dataValue="solid">
                            <i></i>
                            <ul class="borSUi selectUl" style="display:none;"> 
                              <li class="selected" value="solid">一</li>
                              <li value="dashed">--</li>
                            </ul>
                        </div>
                      </div>
                      <div id="background_color" class="colorSelectorWrapper none">
                        <label class="skin-label" style="float: left">背景</label>
                        <div class="c-colorWrapper selectCommon" style="float: left;">
                            <!-- <div class="c-opacityBg"></div>
                            <div class="fieldSkin-color colorConfig" style="background-color: rgb(28, 154, 227);" config="#687683" status="v_paragraph_style1_border_color"></div> -->
                            <input type="text" theColor="#1c9ae3" readonly class="skin-colorSelector skin-colorSelector-bg">
                            <!-- <i class="skin-colorSelector-bg"></i>
                            <b class="skin-colorSelector-bg" style="background-color: rgb(28, 154, 227);"></b> -->
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