 {{#each this}}
<tr id="{{id}}" templateId="{{templateId}}">
    <td align="center"><input type="checkbox" templateId="{{templateId}}" id="{{id}}" /></td>
    <td>{{pageName}}</td>
    <td align="center">{{createTime}}</td>
    <td align="center">启用</td>
    <td align="center"><a href="mb_index.html?pageId={{id}}&isEdit=true" templateId="{{templateId}}" id="{{id}}">编辑</a>-<a class="dele" templateId="{{templateId}}" id="{{id}}">删除</a></td>
</tr>
{{/each}}