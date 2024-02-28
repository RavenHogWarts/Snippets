
# 代码片段

## 展示插件信息(转)
片段来自Blue-topaz主题示例库[^Blue-topaz-example-vault]

前置插件:
- Dataview
- Advanced URI
- Buttons

![alt text](../attachment/Dataview-image.png)

```dataviewjs
const {createButton} = app.plugins.plugins["buttons"];
const jump = async(id,state) => {
if(state=="enable")
  {this.app.plugins.enablePluginAndSave(id);
   new obsidian.Notice("Enabled " + id);}
if(state=="disable")
  {this.app.plugins.disablePluginAndSave(id);
   new obsidian.Notice("Disabled " + id);}
   setTimeout(async () => {
    let content = app.vault.adapter.read(dv.current().file.path);
    app.vault.adapter.append(dv.current().file.path, "\na");
    content.then((content) => { app.vault.adapter.write(dv.current().file.path, content); })},10 );
}
let plugins_json = [];
async function getinfo(id) {
    if (plugins_json.length === 0) {
        let url = 'https://raw.gitmirror.com/obsidianmd/obsidian-releases/master/community-plugins.json';
        let finalURL = new URL(url);
        let response = await request({ method: 'GET', url: finalURL.toString() });
        plugins_json = JSON.parse(response);
        for (let i = 0; i < plugins_json.length; i++) {
            if (plugins_json[i].id === id) {
			        return plugins_json[i].repo
            }
        }
    } else {
        for (let i = 0; i < plugins_json.length; i++) {
            if (plugins_json[i].id === id) {
			        return plugins_json[i].repo
            }
        }
    }
}

dv.el("center", "一共安装【"+Object.keys(app.plugins.manifests).length+"】个插件，已启用【" + app.plugins.enabledPlugins.size + "】个插件");
dv.el("br","")
let list = [];
for (let i = 0; i < Object.keys(app.plugins.manifests).length; i++) {
let manifest =app.plugins.manifests[Object.keys(app.plugins.manifests)
  [i]]
  let name = '<a href="obsidian://advanced-uri?settingid=' + encodeURI(manifest.id) + '">' + manifest.name + "</a>";
   let status= "enable";
  if (Array.from(app.plugins.enabledPlugins).indexOf(Object.keys(app.plugins.manifests)[i]) != -1) {
    status= "disable";
  }
  if(manifest.id=="buttons")  status= "enable";
   let author =manifest?.author
   let repo = await getinfo(manifest.id);
  let version = manifest?.version; 
if(repo) 
{
	version ="["+version+"](https://ghproxy.com/https://github.com/"+repo+"/releases/tag/"+version+")";
	repo= "["+author+"](https://github.com/"+repo+")";
	
}
else repo= "["+author+"]("+manifest.authorUrl+")";
let description = manifest?.description;
  let x = [ name, createButton({app, el: this.container, args: {name: status=='enable'?'🔴':'🟢',class:'tiny'}, clickOverride: {click: jump, params: [manifest.id,status]}}),version,description,repo];
  list.push(x);
    list = list.sort(function (a, b) { return a[1].innerHTML.includes("🔴") - b[1].innerHTML.includes("🔴"); });
}
dv.table(["<div style='width: 12rem;'>插件设置</div>", "状态", "版本号","描述","仓库"], list)
```

[^Blue-topaz-example-vault]: [Blue-topaz-example](https://github.com/PKM-er/Blue-topaz-example)