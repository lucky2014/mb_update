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
            <input type="text" class="shclickLi" value="站内链接" readonly>
            <i class="shclickI"></i>
            <ul class="linkChoose" style="display:none;">
                <!-- <li class="selectedLi" sign="1">请选择</li> -->
                <li sign="1">外部链接</li>
                <li sign="2" class="selectedLi">站内链接</li>
                <li sign="3">返回</li>
            </ul>
          </li>
          <li class="linkAddress commonAddress">
            <span>链接地址</span>
            <input type="text" placeholder="请输入链接地址" class="shclickLi" selUrl="">
          </li>
          <li class="selectAddress commonAddress">
            <span>链接地址</span>
            <input type="text" readonly class="shclickLi" value="" placeholder="请选择链接地址">
            <i class="shclickI"></i>
            <ul class="linkChoose" style="display:none;">
              <li class="selectedLi" urlname="">无</li> 
            </ul>
          </li>
          <li class="backAddress commonAddress">
            <span>链接地址</span>
            <input type="text" readonly class="shclickLi" urlName="history.back()">
          </li>
      </div>
      <div class="innerDialog styleSetting" hasmodified="1" style="margin-top:0;">
          <div>
              <div class="advanceskin-content">
                <div>
                  <div class="groupSkin-content">
                    <div id="border_color" class="colorSelectorWrapper clearfix none" style="display: block;padding-bottom:32px; border-bottom: 1px solid #e0e0e0;">
                      <label class="skin-label">边框</label>

                      <div class="borderWidth selectCommon">
                          <input type="text" readonly value="1" dataValue="1">
                          <i></i>
                          <ul class="borWUi selectUl" style="display:none;"> 
                            <li>0</li>
                            <li class="selected">1</li>
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
                        <div class="c-opacityBg"></div>
                        <div class="fieldSkin-color colorConfig" style="background-color: rgb(196, 196, 196);" config="#687683" status="v_paragraph_style1_border_color"></div>
                        <input type="text" readonly class="skin-colorSelector skin-colorSelector-border">
                        <i class="skin-colorSelector-border"></i>
                        <b class="skin-colorSelector-border" style="background-color: rgb(196, 196, 196);"></b>
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
                      <!-- <div class="select" style="float:left;">
                        <select id="border_type_select" style="width: 53px;font-family: '微软雅黑';" status="v_paragraph_style1_border_style" config="solid">
                          <option value="solid">一</option>
                          <option value="dashed">--</option></select>
                      </div> -->
                    </div>

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