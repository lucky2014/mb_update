{{#each this}}
	<li class="hasPics">
		<img src="{{value}}" class="addPicture">
		<input type="button" value="上传">
		<input type="file" multiple="multiple" id="companyAbstract{{@index}}" name="myfiles">
		<span class="sibSpan">重新上传</span>
		<p class="lastDtP">建议尺寸208*128</p>
		<img src="../src/1/images/delectCha.png" class="delectCha">
	</li>
{{/each}}

<li class="nodataPics">
	<img src="../src/1/images/addPicture1.png" class="addPicture">
	<input type="button" value="上传">
	<input type="file" multiple="multiple" name="myfiles">
	<p class="lastDtP">建议尺寸208*128</p>
	<span class="dn sibSpan">重新上传</span>
	<img src="../src/1/images/delectCha.png" class="delectCha dn">
</li>
