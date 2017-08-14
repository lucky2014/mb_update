{{#each this}}
	{{#if text}} <!-- 判定是否有text值 -->
	{{else}}
	    <li class="hasPics">
			<img src="{{value.value}}" class="addPicture" >
			<input type="button" value="上传">
			<input type="file" multiple="multiple" name="myfiles" id="companyProduct{{@index}}">
			<span class="sibSpan">重新上传</span>
			<img src="../src/1/images/delectCha.png" class="delectCha">
		</li>
	{{/if}}
{{/each}}
<li class="nodataPics">
	<img src="../src/1/images/addPicture2.png" alt="" class="addPicture" id="">
	<input type="button" value="上传">
	<input type="file" multiple="multiple" name="myfiles">
	<span class="dn sibSpan">重新上传</span>
	<img src="../src/1/images/delectCha.png" class="delectCha dn">
</li>