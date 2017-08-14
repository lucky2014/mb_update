{{#each this}}
    <li class="pics1">
    	<img src="{{value}}" class="addPicture">
    	<input type="button" value="上传">
    	<input type="file" multiple="multiple" id="picText4{{@index}}" name="myfiles">
    	<span>重新上传</span>
    	<p class="lastDtP">建议尺寸208*128</p>
    </li>
{{/each}}