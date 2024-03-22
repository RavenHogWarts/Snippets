
# 代码片段

## 展示插件信息(更新版)
源片段来自Blue-topaz主题示例库[^Blue-topaz-example-vault]

修改逻辑,第一次使用会自动将community-plugins.json下载到本地,之后会读取本地json数据

同时,每次打开都会尝试更新一次community-plugins.json

前置插件:
- `Dataview` v0.5.64
- `Advanced URI` v1.40.0
- `Buttons` v0.5.1

![Dataview-240313210604](../attachment/Dataview-240313210604.png)

```dataviewjs
const plugins_url = 'https://raw.gitmirror.com/obsidianmd/obsidian-releases/master/community-plugins.json'; //可自行更换成其他加速访问方式
const localPluginsJsonPath = './.obsidian/plugins-info.json'; //设置本地文件路径变量,直接填库内的文件路径,填外部的绝对路径理论上也可以
let plugins_json = [];

// 更新和加载社区插件JSON,使用本地缓存作为回退
async function updateAndLoadPluginsJson() {
    try {
        // 尝试从远程URL获取最新的JSON数据
        let response = await request({ method: 'GET', url: plugins_url });
        plugins_json = JSON.parse(response);
        // 如果更新成功,写入新的JSON数据到本地存储
        await app.vault.adapter.write(localPluginsJsonPath, JSON.stringify(plugins_json));
    } catch (networkError) {
        // 如果网络请求失败,尝试读取本地文件
        try {
            let localData = await app.vault.adapter.read(localPluginsJsonPath);
            plugins_json = JSON.parse(localData);
        } catch (readError) {
            // 如果本地读取失败,检查文件是否存在
            try {
                await app.vault.adapter.stat(localPluginsJsonPath);
            } catch (statError) {
                // 文件不存在,先创建一个空的JSON文件
                await app.vault.adapter.write(localPluginsJsonPath, JSON.stringify([]));
            }
            // 再次尝试读取或设置默认值
            try {
                let localData = await app.vault.adapter.read(localPluginsJsonPath);
                plugins_json = JSON.parse(localData);
            } catch (finalReadError) {
                console.error('Failed to read local plugins JSON after creating:', finalReadError);
                plugins_json = []; // 设置默认值
            }
        }
    }
}
await updateAndLoadPluginsJson();

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
async function getinfo(id) {
    if (plugins_json.length === 0) {
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
dv.table(["插件设置", "状态", "版本号","描述","仓库"], list)
```

[^Blue-topaz-example-vault]: [Blue-topaz-example](https://github.com/PKM-er/Blue-topaz-example)