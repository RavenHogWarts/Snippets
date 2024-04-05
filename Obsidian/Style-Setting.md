# 前置插件
- `Style Setting`[^style-setting]

# 自定义设置
```css
/* @settings
name: 自定义设置
id: Customized-Settings
settings:
-
    id: heading-side-menu-bar
    title: 菜单栏
    type: heading
    level: 1
    collapsed: true
-
    id: right-tab-float
    title: 右侧侧边栏悬浮
    type: class-toggle
    default: false
    description: Modified from [熊猫别熬夜_PKMER_悬浮两侧菜单栏](https://ourl.io/wWQuE)
-
    id: left-tab-float
    title: 左侧侧边栏悬浮并自动隐藏
    type: class-toggle
    default: false
    description: Modified from [熊猫别熬夜_PKMER_悬浮两侧菜单栏](https://ourl.io/wWQuE) & [阿菜_PKMER_实现TiddlyWiki故事河](https://ourl.io/I4kyK)
-
    id: status-bar-float
    title: 下方状态栏悬浮
    type: class-toggle
    default: false
    description: Modified from [ProudBenzene_PKMER_将状态栏变为悬浮](https://ourl.io/SsmYM)
-
    id: filename-line-feed
    title: 文件名换行
    type: class-toggle
    default: true
-
    id: tab-top-height
    title: 菜单栏距离顶部高度
    type: variable-text
    default: 80px
-
    id: tab-bottom-height
    title: 菜单栏距离底部高度
    type: variable-text
    default: 25px    
-
    id: tab-right-length
    title: 调整右侧菜单距离
    type: variable-text
    default: 10px
-
    id: tab-left-length
    title: 调整左侧菜单距离
    type: variable-text
    default: 44px
-
    id: status-bar-height
    title: 调整状态栏高度
    type: variable-text
    default: 28px
-
    id: tab-opacity
    title: 菜单栏透明度
    type: variable-number
    default: 0.85
    description: 0~1之间
-
    id: hide-tab-header-container
    title: 隐藏关闭、最小化按钮、固定侧边栏按钮
    type: class-toggle
    default: false
    description: 如果使用右侧边栏悬浮,建议开启
-
    id: outline-enhanced
    title: 增强的大纲样式
    type: class-toggle
    default: false
    description: from https://github.com/subframe7536/obsidian-theme-maple, author:@subframe7536
-
    id: heading-segment-spacing
    title: 段间距设置
    type: heading
    level: 1
    collapsed: true
-
    id: paragraph-margin-top
    title: 段前间距
    type: variable-text
    default: 10px
-
    id: paragraph-margin-bottom
    title: 段后间距
    type: variable-text
    default: 5px
-
    id: heading-edit
    title: 编辑
    type: heading
    level: 1
    collapsed: true
-
    id: active-line
    title: 当前行高亮
    type: class-toggle
    default: true
-
    id: gradient-color-divider
    title: 渐变分割线
    type: class-toggle
    default: true
-
    id: custom-fonts
    title: 字体
    type: heading
    level: 1
    collapsed: true
    description: 不要点开
-
    id: custom-fonts-demo
    title: 伪装成可以设置
    type: class-toggle
    default: true
    description: 都说了不要点开,你看啥也没有吧 
-
    id: heading-other
    title: 其他
    type: heading
    level: 1
    collapsed: true
-
    id: search
    title: 类VSCode搜索替换框
    type: class-toggle
    default: false
-
    id: callout-style
    title: callout样式
    type: class-select
    default: callout-style-default
    description: Modified from [cuman_PKMER_Callout样式](https://ourl.io/muY8S)
    options:
    - 
        label: Default    
        value: callout-style-default
    - 
        label: Windows   
        value: callout-style-windows
-
    id: blockquote-style
    title: blockquote样式
    type: class-select
    default: blockquote-style-bubble
    description: Modified from [cuman_PKMER_引用框样式](https://ourl.io/mwkEW)
    options:
    - 
        label: 气泡   
        value: blockquote-style-bubble
    - 
        label: 单引号    
        value: blockquote-style-quote
    - 
        label: 边框   
        value: blockquote-style-frame
    - 
        label: 纯色背景  
        value: blockquote-style-color
-
    id: progress-style
    title: progress样式
    type: heading
    level: 2
    collapsed: true
-
    id: progress-cat-style
    title: 猫猫进度条样式
    type: class-select
    default: progress-style-rainbow
    description: Modified from https://github.com/AnubisNekhet
    options:
    - 
        label: Rainbow kitty cat
        value: progress-style-rainbow
    - 
        label: Cuddly kitty cat  
        value: progress-style-cuddly
*/
body {
    /* side-menu-bar */
    --tab-top-height: 80px;
    --tab-bottom-height: 25px;
    --tab-right-length: 10px;
    --tab-left-length: 44px;
    --status-bar-height: 10%;
    --tab-opacity: 0.85;
    --paragraph-margin-top:10px;
    --paragraph-margin-bottom:5px;
}

.right-tab-float .workspace-split.mod-horizontal.mod-right-split {
    position: fixed;
    display: flex;
    top: var(--tab-top-height);
    right: var(--tab-right-length);
    height: calc(100% - var(--tab-top-height) - var(--tab-bottom-height));
    z-index: var(--layer-popover);
    margin: 0;
    border: 1px solid var(--background-modifier-border);
    opacity: var(--tab-opacity);
}
.left-tab-float .workspace-split.mod-horizontal.mod-left-split {
    position: fixed;
    display: flex;
    width: 280px;
    top: var(--tab-top-height);
    height: calc(100% - var(--tab-top-height) - var(--tab-bottom-height));
    z-index: var(--layer-popover);
    margin: 0;
    align-self: center;
    background-color: var(--background-primary);
    /* transform: translateX(var(--tab-left-length)) translateZ(0px); */
    transform: translateX(-100%);
    transition: transform .3s;
    transition-delay: .5s;
    /* box-shadow: 0 0 10px; */
    border: 1px solid var(--background-modifier-border);
    opacity: var(--tab-opacity);
}
.left-tab-float .workspace-split.mod-horizontal.mod-left-split:hover {
  overflow: visible;
  height: calc(100% - var(--tab-top-height) - var(--tab-bottom-height));
  transform: translateX(var(--tab-left-length));
  transition: transform .5s;
}
.left-tab-float .workspace-split.mod-horizontal.mod-left-split:focus-within {
  overflow: visible;
  height: calc(100% - var(--tab-top-height) - var(--tab-bottom-height));
  transform: translateX(var(--tab-left-length));
  transition: transform .5s;
}
.left-tab-float .workspace-split.mod-horizontal.mod-left-split::before {
  content: "";
  text-align: end !important;
  /* background-color: var(--divider-color); */
  background-color: var(--background-secondary);
  position: absolute;
  display: flex;
  width: 10px;
  height: 120px;
  top:calc(50% - 60px);
  right: -10px;
  z-index: var(--layer-popover);
  border-bottom-right-radius: var(--input-radius);
  border-top-right-radius: var(--input-radius);
  box-shadow: var(--shadow-s);
}
.left-tab-float .workspace-split.mod-horizontal.mod-left-split::after {
  content: "";
  text-align: end !important;
  background-color: var(--color-base-50);
  position: absolute;
  display: flex;
  width: 5px;
  height: 90px;
  top:calc(50% - 45px);
  right: -8px;
  z-index: var(--layer-popover);
  border-radius: var(--input-radius);
}

body.status-bar-float {
    --status-bar-position: absolute;
    --status-bar-radius: var(--radius-m);
}
.status-bar-float .status-bar {
    transform: translateX(calc(100% + 0px));
    transition: transform 300ms 150ms;
    bottom: 5px;
    right: 10px;
}
.status-bar-float .status-bar::before {
    width: 100%;
    min-height: 100%;
    content: " ";
    position: absolute;
    left: 0;
    bottom: 0;
    transform: translateX(-100%);
}
.status-bar-float .status-bar:hover {
    transform: none;
    transition: transform 300ms 150ms;
}
.status-bar {
  height: var(--status-bar-height);
}
.hide-tab-header-container .workspace-tab-header-tab-list {
    position: absolute;
    right: 40px;
}
.hide-tab-header-container .sidebar-toggle-button {
    position: absolute !important;
    right: 10px;
}
.hide-tab-header-container.mod-windows .titlebar-button,
.is-hidden-frameless:not(.is-fullscreen)
.workspace-tabs.mod-top-right-space 
.workspace-tab-header-container:after {
  display: none;
}
/*outline pane*/
/* from https://github.com/subframe7536/obsidian-theme-maple, author:@subframe7536 */
.outline-enhanced .workspace-leaf-content[data-type=outline] .view-content .collapse-icon {
  padding-inline-end: var(--size-2-3);
}
.outline-enhanced .workspace-leaf-content[data-type=outline] .view-content .collapse-icon::before {
  content: "" !important;
}
.outline-enhanced:not(.is-grabbing) .workspace-leaf-content[data-type=outline] .view-content .tree-item {
  position: relative;
}
.outline-enhanced .workspace-leaf-content[data-type=outline] .view-content .tree-item-self {
  position: relative;
  margin-bottom: 0;
  white-space: nowrap;
  margin-top: -1px;
  /* fix item gap */
}
.outline-enhanced .workspace-leaf-content[data-type=outline] .view-content .tree-item-self .tree-item-inner {
  padding-left: 16px;
  margin-left: -16px;
  overflow: hidden;
  text-overflow: ellipsis;
  height: calc(var(--nav-item-size) * 1.8);
  line-height: calc(var(--nav-item-size) * 1.8);
  position: relative;
}
.outline-enhanced .workspace-leaf-content[data-type=outline] .view-content .tree-item-self .tree-item-inner::before {
  content: "";
  width: var(--size-4-1);
  height: var(--size-4-1);
  border: 2px solid var(--color-accent);
  border-radius: 50%;
  position: absolute;
  left: 0px;
  top: 50%;
  transform: translateY(-50%);
}
/*.outline-enhanced .workspace-leaf-content[data-type=outline] .view-content .tree-item-self .tree-item-icon~.tree-item-inner {
  padding-left: 4px;
}*/
.outline-enhanced .workspace-leaf-content[data-type=outline] .view-content .tree-item-self .tree-item-icon~.tree-item-inner::before {
  content: none;
}
.outline-enhanced .workspace-leaf-content[data-type=outline] .view-content .tree-item.is-collapsed .tree-item-icon::before {
  box-shadow: 0 0 0 4px var(--background-modifier-active-hover);
}
.outline-enhanced:not(.is-grabbing) .workspace-leaf-content[data-type=outline] .view-content .tree-item::after {
  content: "";
  width: 2px;
  position: absolute;
  background-color: transparent;
  top: calc(var(--nav-item-size) * 1.8 / 2 * -1);
  left: -9px;
  height: calc(100% - var(--nav-item-size) * 1.8 + var(--size-4-8));
}
.outline-enhanced .workspace-leaf-content[data-type=outline] .view-content .tree-item-icon {
  cursor: pointer;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
}
.outline-enhanced .workspace-leaf-content[data-type=outline] .view-content .tree-item-icon::before {
  width: var(--size-4-2);
  height: var(--size-4-2);
  background-color: var(--color-accent);
  border-radius: 50%;
  position: absolute;
  left: 4px;
  top: 50%;
  transform: translateY(-50%);
}
.outline-enhanced .workspace-leaf-content[data-type=outline] .view-content .tree-item-icon svg {
  display: block;
}
.outline-enhanced .workspace-leaf-content[data-type=outline] .view-content .tree-item-icon svg path {
  display: none;
}
.outline-enhanced .workspace-leaf-content[data-type=outline] .view-content .tree-item:hover>.tree-item-children>.tree-item::after {
  background-color: var(--color-accent);
}
.outline-enhanced .workspace-leaf-content[data-type=outline] .view-content .tree-item:hover>.tree-item-self:hover+.tree-item-children .tree-item::after {
  background-color: transparent;
}
.outline-enhanced .workspace-leaf-content[data-type=outline] .view-content .tree-item:hover>.tree-item-children>.tree-item:hover::after,
.outline-enhanced .workspace-leaf-content[data-type=outline] .view-content .tree-item:hover>.tree-item-children>.tree-item:hover~.tree-item::after {
  background-color: transparent;
}
.outline-enhanced:not(.is-grabbing) .workspace-leaf-content[data-type=outline] .view-content .tree-item:hover>.tree-item-children>.tree-item:hover::before {
  content: "";
  position: absolute;
  top: calc(var(--nav-item-size) * 1.8 / 2 * -1);
  left: -9px;
  bottom: calc(100% - (var(--nav-item-size) * 1.8 + var(--size-4-2)) / 2 - 1px);
  width: 16px;
  border-bottom-left-radius: var(--radius-m);
  border-bottom: 2px solid var(--color-accent);
  border-left: 2px solid var(--color-accent);
}
.outline-enhanced .workspace-leaf-content[data-type=outline] .view-content :is(.tree-item-children, .tree-item-self .tree-item-self) {
  padding-left: 0;
  margin-left: var(--size-4-5);
  border-left: none;
}


/* segment-spacing */
div:not(.HyperMD-header,.HyperMD-list-line).cm-line {
    padding-top:var(--paragraph-margin-top) !important;
    padding-bottom:var(--paragraph-margin-bottom) !important;
}
div:not(.HyperMD-header,.HyperMD-list-line).cm-line:has(.cm-fold-indicator) {
    padding-top:unset !important;
    padding-bottom:unset !important;
}
div:not(.HyperMD-header,.HyperMD-list-line).cm-line:has(.cm-hmd-frontmatter) {
    padding-top:unset !important;
    padding-bottom:unset !important;
}

/* edit */
.active-line .markdown-source-view.mod-cm6 .cm-line.cm-active {
    background-color: rgba(var(--mono-rgb-100), 0.05)
}
.active-line .markdown-source-view.mod-cm6 .cm-lineNumbers .cm-gutterElement.cm-active {
  font-weight: 600;
  color: grey;
}

.gradient-color-divider .markdown-preview-view hr {
	border-top: 1px solid;
	border-image: linear-gradient(to right, #ef201c, #e96036,#e6ef82, #e09a29, #41e249, #26c6da, #4e5ff2, #7e57c2, #de5fb8) 7;
}
.gradient-color-divider .markdown-source-view div.hr.cm-line hr {
	border-top: 1px solid;
	border-image: linear-gradient(to right, #ef201c, #e96036,#e6ef82, #e09a29, #41e249, #26c6da, #4e5ff2, #7e57c2, #de5fb8) 7;
}

/* other */
/* search */
body.search {
    --search-border-color: var(--text-accent);
    --search-top: calc(var(--header-height) + var(--size-4-4));
    --search-right: var(--size-4-4);
    --background-modifier-border-focus: hsl(
        var(--accent-h),
        calc(var(--accent-s) - 4%),
        calc(var(--accent-l) + 4%)
    );
}
.search .obsidian-search-match-highlight {
    background-color: var(--background-secondary);
}
.search .document-search-container {
  position: absolute;
  top: var(--search-top);
  /* right: var(--search-right); */
  right: calc(47% - var(--file-line-width) / 2);
  border-radius: var(--size-4-2);
  padding: var(--size-2-3) var(--size-4-1) var(--size-2-3) 0;
  height: fit-content;
  border: 2px solid var(--search-border-color);
  box-shadow: var(--shadow-s);
  margin: 0;
}
.search .document-search-container :is(.document-search, .document-replace) {
  align-items: center;
  padding: 0;
}
.search .document-search-container :is(.document-search, .document-replace) button:nth-child(3) {
  display: none;
}
.search .document-search-container :is(.document-search-input, .document-replace-input) {
  margin-left: 6px;
}
.search .document-search-container .document-search-close-button {
  position: relative;
  top: 0;
}
.search .document-search-close-button {
  height: var(--input-height);
  width: var(--input-height);
}
.search .document-search-close-button::before {
  content: "";
  -webkit-mask: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 30 30"><g transform="matrix(0.7071067094802856,-0.7071067094802856,0.7071067094802856,0.7071067094802856,-3.5424977926304564,6.277729735826142)"><rect x="5.806640625" y="7.4150390625" width="2" height="24" rx="1" fill="currentColor"/></g><g style="mix-blend-mode:passthrough" transform="matrix(0.7071067094802856,0.7071067094802856,-0.7071067094802856,0.7071067094802856,10.914602712669875,-14.349200366239529)"><rect x="22.7783203125" y="6.00048828125" width="2" height="24" rx="1" fill="currentColor"/></g></svg>');
  position: absolute;
  background-color: var(--text-accent);
  width: calc(var(--input-height) * 2 / 3);
  height: calc(var(--input-height) * 2 / 3);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.search .document-search-close-button:hover {
  background-color: var(--text-accent);
}
.search .document-search-close-button:hover::before {
  background-color: var(--text-on-accent);
}

/* callout-style */
/* default */
.callout-style-default .callout {
  --callout-radius: 2px;
  border-left: solid 4px rgb(var(--callout-color));
  padding: 0;
  background-color:var(--admonition-bg-color);
}
.callout-style-default .callout .callout-title {
  padding: 6px;
  background-color: rgba(var(--callout-color), 0.4);
}
.callout-style-default .callout .callout-content {
  background-color: rgba(var(--callout-color), 0.1);
}
.callout-style-default .callout-content {
  padding: 5px 15px;
}

/* windows */
.callout-style-windows .callout {
  border:none;
  box-shadow: inset 0 0 0 2px rgba(var(--callout-color), 0.25), 0px 0.5px 1px 0.5px rgba(0, 0, 0, 0.1) !important;
  padding: 0;
  background-color:var(--admonition-bg-color);
}
.callout-style-windows .callout .callout-title {
  padding: 6px;
  background-color: rgba(var(--callout-color), 0.4);
}
.callout-style-windows .callout .callout-content {
  background-color: rgba(var(--callout-color), 0.1);
}
.callout-style-windows .callout-content {
  padding: 5px 15px;
}

/* blockquote-style */
.blockquote-style-bubble :is(.markdown-preview-view,.markdown-rendered):not(.kanban-plugin__markdown-preview-view) blockquote {
  position: relative;
  color: var(--blockquote-border-color);
  font-weight: normal;
  line-height: 1.5;
  margin-top: 2em;
  margin-bottom: 2.5em;
  border: 3px solid;
  border-radius: 20px;
  padding: 10px 15px;
  background: var(--background-primary) !important;
}
.blockquote-style-bubble .theme-dark :is(.markdown-preview-view,.markdown-rendered):not(.kanban-plugin__markdown-preview-view) blockquote {
  background-color: var(--background-primary) !important;
}
.blockquote-style-bubble :is(.markdown-preview-view,.markdown-rendered):not(.kanban-plugin__markdown-preview-view) blockquote p {
  color: var(--text-normal);
}
.blockquote-style-bubble :is(.markdown-preview-view,.markdown-rendered):not(.kanban-plugin__markdown-preview-view) blockquote:after {
  content: '';
  position: absolute;
  border: 2.5px solid var(--blockquote-border-color);
  border-radius: 35px 0 0 0;
  width: 1.75rem;
  height: 3.45rem;
  bottom: -3.6rem;
  left: 1.8rem;
  border-bottom: none;
  border-left: none;
  border-right: none;
  z-index: 3;
}
.blockquote-style-bubble :is(.markdown-preview-view,.markdown-rendered):not(.kanban-plugin__markdown-preview-view) blockquote:before {
  content: '';
  position: absolute;
  width: 25px;
  border: 4px solid var(--background-primary);
  bottom: -4px;
  left: 20px;
  z-index: 2;
}

.blockquote-style-quote .markdown-preview-view blockquote:before {
  content: "❝";
  font-size: 2.5em;
  margin-right: .05em;
  line-height: 0.1em;
  vertical-align: -0.3em;
}
.blockquote-style-quote blockquote p {
  color: var(--blockquote-border);
  display: inline;
}
.blockquote-style-quote blockquote em{
	color: var(--blockquote-border);
}
.blockquote-style-quote .cm-hmd-indent-in-quote {
  padding-left: 0px;
}
.blockquote-style-quote .markdown-preview-view blockquote {
  line-height: 1.75em;
  color: var(--blockquote-border);
  font-family: var(--default-font);
  font-style: bold !important;
  letter-spacing: 0px;
  border: none;
  border-left: 0.2rem solid var(--blockquote-border);
  border-radius: 0px !important;
  margin: 1.5rem 0rem 1.5rem 0rem;
  padding-top: 1rem;
  padding-left: 2rem;
  padding-bottom: 1rem;
  background-color: var(--blockquote-bg);
}

.blockquote-style-frame :is(.markdown-preview-view,.markdown-rendered) blockquote {
 border: 3px solid var(--blockquote-border-color);
 background-color: transparent;
 border-radius: var(--radius-m);
}
.blockquote-style-frame :is(.markdown-preview-view,.markdown-rendered) blockquote >p:first-child {
margin-top:0.5em;
margin-bottom:0.5em;
margin-right:1em;

}
.blockquote-style-frame :is(.markdown-preview-view,.markdown-rendered) blockquote >p:last-child {
margin-bottom:0.5em;
margin-right:1em;
}

.blockquote-style-color .theme-light {
  --BlockqutoeColor_border-inline-start: rgb(177, 132, 255);
  --BlockqutoeColor_background-color: rgb(221, 207, 245);
}
.blockquote-style-color .theme-dark {
  --BlockqutoeColor_border-inline-start: rgb(59, 21, 121);
  --BlockqutoeColor_background-color: rgb(66, 46, 85);
}
/* PKMer网站的引用框 */
.blockquote-style-color .markdown-rendered blockquote {
  margin: 2rem 0 2rem 0;
  padding: 0.8em 0.8rem;
  border-inline-start: 0.5rem solid var(--BlockqutoeColor_border-inline-start);
  background-color: var(--BlockqutoeColor_background-color);
  border-radius: 0 0.25rem 0.25rem 0;
  line-height: 1.2;
  border-radius: 0.2rem;
  box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.05),
    0 0 0.05rem rgba(0, 0, 0, 0.1);
  outline: 1px solid transparent;
}

/* File name line feed */
.filename-line-feed div.nav-file-title-content,
div.nav-folder-title-content {
    white-space: normal;
}

/* AGPLv3 License
Nyan Cat Progress Bars
Author: AnubisNekhet
Note: If you decide to implement it in your theme or redistribute it, please keep this comment (Especially for *certain* individuals who may try to rebrand it as their own :))
Support me: https://buymeacoffee.com/AnubisNekhet
*/
/* 
Modifier: RavenHogwarts  
  This Snippet will only work for snippets with the following syntax:
  <progress value="x" max="100" class="nyan-cat" style="--progress-value: x"></progress>
  x can be an integer from 0 to 100.
  Example: <progress value="81" max="100" class="nyan-cat" style="--progress-value: 8.1"></progress>
*/
/* default */

/* Rainbow kitty cat */
.progress-style-rainbow .markdown-preview-view progress[value][max="100"][class*=nyan-cat]::-webkit-progress-bar,
.markdown-rendered progress[value][max="100"]::-webkit-progress-bar,
.markdown-source-view.is-live-preview progress[value][max="100"][class*=nyan-cat]::-webkit-progress-bar {
  background-color: var(--background-secondary);
  box-shadow: none;
  border-radius: 6px;
  overflow: hidden;
}

.progress-style-rainbow .markdown-preview-view progress[value][max="100"][class*=nyan-cat]::-webkit-progress-bar,
.markdown-rendered progress[value][max="100"][class*=nyan-cat]::-webkit-progress-bar,
.markdown-source-view.is-live-preview progress[value][max="100"][class*=nyan-cat]::-webkit-progress-bar {
  background: url("data:image/gif;base64,R0lGODlhMAAMAIAAAAxBd////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQECgAAACwAAAAAMAAMAAACJYSPqcvtD6MKstpLr24Z9A2GYvJ544mhXQmxoesElIyCcB3dRgEAIfkEBAoAAAAsAQACAC0ACgAAAiGEj6nLHG0enNQdWbPefOHYhSLydVhJoSYXPO04qrAmJwUAIfkEBAoAAAAsBQABACkACwAAAiGEj6nLwQ8jcC5ViW3evHt1GaE0flxpphn6BNTEqvI8dQUAIfkEBAoAAAAsAQABACoACwAAAiGEj6nLwQ+jcU5VidPNvPtvad0GfmSJeicUUECbxnK0RgUAIfkEBAoAAAAsAAAAACcADAAAAiCEj6mbwQ+ji5QGd6t+c/v2hZzYiVpXmuoKIikLm6hXAAAh+QQECgAAACwAAAAALQAMAAACI4SPqQvBD6NysloTXL480g4uX0iW1Wg21oem7ismLUy/LFwAACH5BAQKAAAALAkAAAAkAAwAAAIghI8Joe0Po0yBWTaz3g/z7UXhMX7kYmplmo0rC8cyUgAAIfkEBAoAAAAsBQAAACUACgAAAh2Ejwmh7Q+jbIFZNrPeEXPudU74IVa5kSiYqOtRAAAh+QQECgAAACwEAAAAIgAKAAACHISPELfpD6OcqTGKs4bWRp+B36YFi0mGaVmtWQEAIfkEBAoAAAAsAAAAACMACgAAAh2EjxC36Q+jnK8xirOW1kavgd+2BYtJhmnpiGtUAAAh+QQECgAAACwAAAAALgALAAACIYSPqcvtD+MKicqLn82c7e6BIhZQ5jem6oVKbfdqQLzKBQAh+QQECgAAACwCAAIALAAJAAACHQx+hsvtD2OStDplKc68r2CEm0eW5uSN6aqe1lgAADs=");
}

.progress-style-rainbow .markdown-preview-view progress[value][max="100"][class*=nyan-cat]::after,
.markdown-rendered progress[value][max="100"][class*=nyan-cat]::after,
.markdown-source-view.is-live-preview progress[value][max="100"][class*=nyan-cat]::after {
  background: url("data:image/gif;base64,R0lGODlhIgAVAKIHAL3/9/+Zmf8zmf/MmZmZmf+Z/wAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpDMkJBNjY5RTU1NEJFMzExOUM4QUM2MDAwNDQzRERBQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCREIzOEIzMzRCN0IxMUUzODhEQjgwOTYzMTgyNTE0QiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCREIzOEIzMjRCN0IxMUUzODhEQjgwOTYzMTgyNTE0QiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkM1QkE2NjlFNTU0QkUzMTE5QzhBQzYwMDA0NDNEREFDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkMyQkE2NjlFNTU0QkUzMTE5QzhBQzYwMDA0NDNEREFDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8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") !important;
}

.progress-style-rainbow .markdown-preview-view progress[value][max="100"][class*=nyan-cat]::-webkit-progress-value,
.markdown-rendered progress[value][max="100"][class*=nyan-cat]::-webkit-progress-value,
.markdown-source-view.is-live-preview progress[value][max="100"][class*=nyan-cat]::-webkit-progress-value {
  background: linear-gradient(to bottom, #FF0000 0%, #FF0000 16.5%, #FF9900 16.5%, #FF9900 33%, #FFFF00 33%, #FFFF00 50%, #33FF00 50%, #33FF00 66%, #0099FF 66%, #0099FF 83.5%, #6633ff 83.5%, #6633ff 100%) !important;
  overflow: hidden;
}

.progress-style-rainbow .markdown-preview-view progress[value][max="100"][class*=nyan-cat]::after,
.markdown-rendered progress[value][max="100"][class*=nyan-cat]::after,
.markdown-source-view.is-live-preview progress[value][max="100"][class*=nyan-cat]::after {
  content: "";
  width: 30px;
  height: 24px;
  background-size: contain !important;
  position: absolute;
  margin-top: -16px;
  background-repeat: no-repeat !important;
}

.progress-style-rainbow .markdown-preview-view progress[value][max="100"][class*=nyan-cat], .markdown-rendered progress[value][max="100"][class*=nyan-cat], .markdown-source-view.is-live-preview progress[value][max="100"][class*=nyan-cat] {
  -webkit-writing-mode: horizontal-tb;
  writing-mode: horizontal-tb;
  appearance: none;
  box-sizing: border-box;
  display: inline-block;
  height: 14px;
  margin-bottom: 4px;
  max-width: 100%;
  overflow: hidden;
  border-radius: 0px;
  border: 0;
  vertical-align: -0.2rem;
}

/* 手动赋值使用这个 */
/* .progress-style-rainbow .markdown-preview-view progress[value][max="100"][class*=nyan-cat]::after,
.markdown-rendered progress[value][max="100"][class*=nyan-cat]::after,
.markdown-source-view.is-live-preview progress[value][max="100"][class*=nyan-cat]::after {
  margin-left: calc(var(--progress-value) * 1em - 20px);
} */

/* dataviewjs使用这个 */
.progress-style-rainbow .markdown-preview-view progress[value][max="100"][class*=nyan-cat]::after,
.markdown-rendered progress[value][max="100"][class*=nyan-cat]::after,
.markdown-source-view.is-live-preview progress[value][max="100"][class*=nyan-cat]::after {
  margin-left: calc(var(--progress-value) * 1em - 100px);
}

/* Cuddly kitty cat */
.progress-style-cuddly .markdown-preview-view progress[value][max="100"][class*=nyan-cat]::-webkit-progress-bar,
.markdown-rendered progress[value][max="100"][class*=nyan-cat]::-webkit-progress-bar,
.markdown-source-view.is-live-preview progress[value][max="100"][class*=nyan-cat]::-webkit-progress-bar {
  background-color: var(--background-secondary);
  box-shadow: none;
  border-radius: 6px;
  overflow: hidden;
}

/*bar bg */
.progress-style-cuddly .markdown-preview-view progress[value][max="100"][class*=nyan-cat]::-webkit-progress-bar,
.markdown-rendered progress[value][max="100"][class*=nyan-cat]::-webkit-progress-bar,
.markdown-source-view.is-live-preview progress[value][max="100"][class*=nyan-cat]::-webkit-progress-bar {
  background: var(--text-selection);
  filter: opacity(0.80);
}

/* the cat */
.progress-style-cuddly .markdown-preview-view progress[value][max="100"][class*=nyan-cat]::after,
.markdown-rendered progress[value][max="100"][class*=nyan-cat]::after,
.markdown-source-view.is-live-preview progress[value][max="100"][class*=nyan-cat]::after {
  background: url("data:image/png;base64,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") !important;
}

.progress-style-cuddly .markdown-preview-view progress[value][max="100"][class*=nyan-cat]::-webkit-progress-value,
.markdown-rendered progress[value][max="100"][class*=nyan-cat]::-webkit-progress-value,
.markdown-source-view.is-live-preview progress[value][max="100"][class*=nyan-cat]::-webkit-progress-value {
  background: linear-gradient(to bottom, var(--color-red) 0%, var(--color-orange) 16.5%, var(--color-yellow) 33%, var(--color-green) 50%, var(--color-cyan) 66%, var(--color-purple) 83.5%, var(--color-red) 100%) !important;
  overflow: hidden;
}

.progress-style-cuddly .markdown-preview-view progress[value][max="100"][class*=nyan-cat]::after,
.markdown-rendered progress[value][max="100"][class*=nyan-cat]::after,
.markdown-source-view.is-live-preview progress[value][max="100"][class*=nyan-cat]::after {
  content: "";
  width: 30px;
  height: 24px;
  background-size: contain !important;
  position: absolute;
  margin-top: -24px;
  background-repeat: no-repeat !important;
}

.progress-style-cuddly .markdown-preview-view progress[value][max="100"][class*=nyan-cat], .markdown-rendered progress[value][max="100"][class*=nyan-cat], .markdown-source-view.is-live-preview progress[value][max="100"][class*=nyan-cat] {
  -webkit-writing-mode: horizontal-tb;
  writing-mode: horizontal-tb;
  appearance: none;
  box-sizing: border-box;
  display: inline-block; 
  height: 18px;
  margin-bottom: 4px;
  max-width: 100%;
  overflow: hidden;
  border-radius: 0px;
  border: 0;
  vertical-align: -0.2rem;
}
/* 手动赋值使用这个 */
/* .progress-style-cuddly .markdown-preview-view progress[value][max="100"][class*=nyan-cat]::after,
.markdown-rendered progress[value][max="100"][class*=nyan-cat]::after,
.markdown-source-view.is-live-preview progress[value][max="100"][class*=nyan-cat]::after {
  margin-left: calc(var(--progress-value) * 1em - 20px);
} */

/* dataviewjs使用这个 */
.progress-style-cuddly .markdown-preview-view progress[value][max="100"][class*=nyan-cat]::after,
.markdown-rendered progress[value][max="100"][class*=nyan-cat]::after,
.markdown-source-view.is-live-preview progress[value][max="100"][class*=nyan-cat]::after {
  margin-left: calc(var(--progress-value) * 1em - 100px);
}
```

# Components插件非官方样式设置
前置插件:
- `Components`[^components] v20240404

目前修改了数据视图组件的进度条样式

```css
/* MIT License
Author: RavenHogwarts
Note: If you decide to implement it in your theme or redistribute it, please keep this comment (Especially for *certain* individuals who may try to rebrand it as their own :))
Follow me: https://github.com/RavenHogWarts
*/
/* @settings
name: Components Unofficial StyleSetting
id: Components-Unofficial-StyleSetting
settings:
- id: Components-dataview
  title: 数据视图
  type: heading
  level: 1
  collapsed: true
- id: Components-progress
  title: 进度条
  type: heading
  level: 2
  collapsed: true
- id: Components-progress-indicator
  title: 隐藏进度条指示器
  type: class-toggle
  default: false
  description: 是否隐藏进度条指示器
- id: Components-progress-indicator-margin
  title: 进度条指示器间距
  type: variable-text
  default: 20px
  description: 进度条指示器与进度条的间距(先启用进度条位置修改才能生效)
- id: Components-progress-style
  title: 进度条样式
  type: class-select
  default: Components-progress-style-default
  options:
  - label: 默认
    value: Components-progress-style-default
  - label: 彩虹猫
    value: Components-progress-style-rainbow
  - label: 软萌猫
    value: Components-progress-style-soft

*/

/* Components-progress */
body {
  --Components-progress-indicator-margin: 20px;
}

.components--progress-bar {
  position: relative;
  display: flex;
}

.components--progress-bar-track {
  flex-grow: 1;
}

.progress-indicator {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 100%;
  margin-left: var(--Components-progress-indicator-margin);
  white-space: nowrap;
}

/* Components-progress-indicator */
.Components-progress-indicator .components--progress-bar .progress-indicator{
  display: none;
}

/* Components-progress-style */
/* 默认 */
.Components-progress-style-default .components--progress-bar-track {
  display: block;
}

/* 彩虹猫 */
.Components-progress-style-rainbow .components--progress-bar-track {
  background-color: var(--background-secondary);
  border-radius: 6px;
  overflow: hidden;
  background: url("data:image/gif;base64,R0lGODlhMAAMAIAAAAxBd////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQECgAAACwAAAAAMAAMAAACJYSPqcvtD6MKstpLr24Z9A2GYvJ544mhXQmxoesElIyCcB3dRgEAIfkEBAoAAAAsAQACAC0ACgAAAiGEj6nLHG0enNQdWbPefOHYhSLydVhJoSYXPO04qrAmJwUAIfkEBAoAAAAsBQABACkACwAAAiGEj6nLwQ8jcC5ViW3evHt1GaE0flxpphn6BNTEqvI8dQUAIfkEBAoAAAAsAQABACoACwAAAiGEj6nLwQ+jcU5VidPNvPtvad0GfmSJeicUUECbxnK0RgUAIfkEBAoAAAAsAAAAACcADAAAAiCEj6mbwQ+ji5QGd6t+c/v2hZzYiVpXmuoKIikLm6hXAAAh+QQECgAAACwAAAAALQAMAAACI4SPqQvBD6NysloTXL480g4uX0iW1Wg21oem7ismLUy/LFwAACH5BAQKAAAALAkAAAAkAAwAAAIghI8Joe0Po0yBWTaz3g/z7UXhMX7kYmplmo0rC8cyUgAAIfkEBAoAAAAsBQAAACUACgAAAh2Ejwmh7Q+jbIFZNrPeEXPudU74IVa5kSiYqOtRAAAh+QQECgAAACwEAAAAIgAKAAACHISPELfpD6OcqTGKs4bWRp+B36YFi0mGaVmtWQEAIfkEBAoAAAAsAAAAACMACgAAAh2EjxC36Q+jnK8xirOW1kavgd+2BYtJhmnpiGtUAAAh+QQECgAAACwAAAAALgALAAACIYSPqcvtD+MKicqLn82c7e6BIhZQ5jem6oVKbfdqQLzKBQAh+QQECgAAACwCAAIALAAJAAACHQx+hsvtD2OStDplKc68r2CEm0eW5uSN6aqe1lgAADs=");
  width: 100%;
  height: 16px;
}

.Components-progress-style-rainbow .components--progress-bar-value {
  background: linear-gradient(to bottom, #FF0000 0%, #FF0000 16.5%, #FF9900 16.5%, #FF9900 33%, #FFFF00 33%, #FFFF00 50%, #33FF00 50%, #33FF00 66%, #0099FF 66%, #0099FF 83.5%, #6633ff 83.5%, #6633ff 100%) !important;
  overflow: hidden;
}

.Components-progress-style-rainbow .components--progress-bar-value::after {
  content: "";
  width: 34px;
  height: 24px;
  position: absolute;
  top: 50%;
  transform: translate(50%, 0%);
  margin-top: -10px;
  background: url("data:image/gif;base64,R0lGODlhIgAVAKIHAL3/9/+Zmf8zmf/MmZmZmf+Z/wAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpDMkJBNjY5RTU1NEJFMzExOUM4QUM2MDAwNDQzRERBQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCREIzOEIzMzRCN0IxMUUzODhEQjgwOTYzMTgyNTE0QiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCREIzOEIzMjRCN0IxMUUzODhEQjgwOTYzMTgyNTE0QiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkM1QkE2NjlFNTU0QkUzMTE5QzhBQzYwMDA0NDNEREFDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkMyQkE2NjlFNTU0QkUzMTE5QzhBQzYwMDA0NDNEREFDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8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") !important;
  background-size: contain !important;
  background-repeat: no-repeat !important;
}

.Components-progress-indicator-position .Components-progress-style-rainbow .components--progress-bar-value::after{
  content: "";
  width: 34px;
  height: 24px;
  position: absolute;
  top: 50%;
  transform: translate(50%, 0%) !important;
  margin-top: -10px !important;
  background: url("data:image/gif;base64,R0lGODlhIgAVAKIHAL3/9/+Zmf8zmf/MmZmZmf+Z/wAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpDMkJBNjY5RTU1NEJFMzExOUM4QUM2MDAwNDQzRERBQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCREIzOEIzMzRCN0IxMUUzODhEQjgwOTYzMTgyNTE0QiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCREIzOEIzMjRCN0IxMUUzODhEQjgwOTYzMTgyNTE0QiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkM1QkE2NjlFNTU0QkUzMTE5QzhBQzYwMDA0NDNEREFDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkMyQkE2NjlFNTU0QkUzMTE5QzhBQzYwMDA0NDNEREFDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8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") !important;
  background-size: contain !important;
  background-repeat: no-repeat !important;
}

/* 软萌猫 */
.Components-progress-style-soft .components--progress-bar-track {
  background-color: var(--background-secondary);
  border-radius: 6px;
  overflow: hidden;
  background: var(--text-selection);
  width: 100%;
  height: 16px;
}

.Components-progress-style-soft .components--progress-bar-value {
  background: linear-gradient(to bottom, var(--color-red) 0%, var(--color-orange) 16.5%, var(--color-yellow) 33%, var(--color-green) 50%, var(--color-cyan) 66%, var(--color-purple) 83.5%, var(--color-red) 100%) !important;
  overflow: hidden;
}

.Components-progress-style-soft  .components--progress-bar-value::after {
  content: "";
  width: 34px;
  height: 24px;
  position: absolute;
  top: 50%;
  transform: translate(50%, 0%);
  margin-top: -16px;
  background: url("data:image/png;base64,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") !important;
  background-repeat: no-repeat !important;
  background-size: contain !important;
}

/* Components-progress-value */
.components--progress-bar-value[data-value="100"]::after {
  right: 0;
}
.components--progress-bar-value[data-value="99"]::after {
  right: 1%;
}
.components--progress-bar-value[data-value="98"]::after {
  right: 2%;
}
.components--progress-bar-value[data-value="97"]::after {
  right: 3%;
}
.components--progress-bar-value[data-value="96"]::after {
  right: 4%;
}
.components--progress-bar-value[data-value="95"]::after {
  right: 5%;
}
.components--progress-bar-value[data-value="94"]::after {
  right: 6%;
}
.components--progress-bar-value[data-value="93"]::after {
  right: 7%;
}
.components--progress-bar-value[data-value="92"]::after {
  right: 8%;
}
.components--progress-bar-value[data-value="91"]::after {
  right: 9%;
}
.components--progress-bar-value[data-value="90"]::after {
  right: 10%;
}
.components--progress-bar-value[data-value="89"]::after {
  right: 11%;
}
.components--progress-bar-value[data-value="88"]::after {
  right: 12%;
}
.components--progress-bar-value[data-value="87"]::after {
  right: 13%;
}
.components--progress-bar-value[data-value="86"]::after {
  right: 14%;
}
.components--progress-bar-value[data-value="85"]::after {
  right: 15%;
}
.components--progress-bar-value[data-value="84"]::after {
  right: 16%;
}
.components--progress-bar-value[data-value="83"]::after {
  right: 17%;
}
.components--progress-bar-value[data-value="82"]::after {
  right: 18%;
}
.components--progress-bar-value[data-value="81"]::after {
  right: 19%;
}
.components--progress-bar-value[data-value="80"]::after {
  right: 20%;
}
.components--progress-bar-value[data-value="79"]::after {
  right: 21%;
}
.components--progress-bar-value[data-value="78"]::after {
  right: 22%;
}
.components--progress-bar-value[data-value="77"]::after {
  right: 23%;
}
.components--progress-bar-value[data-value="76"]::after {
  right: 24%;
}
.components--progress-bar-value[data-value="75"]::after {
  right: 25%;
}
.components--progress-bar-value[data-value="74"]::after {
  right: 26%;
}
.components--progress-bar-value[data-value="73"]::after {
  right: 27%;
}
.components--progress-bar-value[data-value="72"]::after {
  right: 28%;
}
.components--progress-bar-value[data-value="71"]::after {
  right: 29%;
}
.components--progress-bar-value[data-value="70"]::after {
  right: 30%;
}
.components--progress-bar-value[data-value="69"]::after {
  right: 31%;
}
.components--progress-bar-value[data-value="68"]::after {
  right: 32%;
}
.components--progress-bar-value[data-value="67"]::after {
  right: 33%;
}
.components--progress-bar-value[data-value="66"]::after {
  right: 34%;
}
.components--progress-bar-value[data-value="65"]::after {
  right: 35%;
}
.components--progress-bar-value[data-value="64"]::after {
  right: 36%;
}
.components--progress-bar-value[data-value="63"]::after {
  right: 37%;
}
.components--progress-bar-value[data-value="62"]::after {
  right: 38%;
}
.components--progress-bar-value[data-value="61"]::after {
  right: 39%;
}
.components--progress-bar-value[data-value="60"]::after {
  right: 40%;
}
.components--progress-bar-value[data-value="59"]::after {
  right: 41%;
}
.components--progress-bar-value[data-value="58"]::after {
  right: 42%;
}
.components--progress-bar-value[data-value="57"]::after {
  right: 43%;
}
.components--progress-bar-value[data-value="56"]::after {
  right: 44%;
}
.components--progress-bar-value[data-value="55"]::after {
  right: 45%;
}
.components--progress-bar-value[data-value="54"]::after {
  right: 46%;
}
.components--progress-bar-value[data-value="53"]::after {
  right: 47%;
}
.components--progress-bar-value[data-value="52"]::after {
  right: 48%;
}
.components--progress-bar-value[data-value="51"]::after {
  right: 49%;
}
.components--progress-bar-value[data-value="50"]::after {
  right: 50%;
}
.components--progress-bar-value[data-value="49"]::after {
  right: 51%;
}
.components--progress-bar-value[data-value="48"]::after {
  right: 52%;
}
.components--progress-bar-value[data-value="47"]::after {
  right: 53%;
}
.components--progress-bar-value[data-value="46"]::after {
  right: 54%;
}
.components--progress-bar-value[data-value="45"]::after {
  right: 55%;
}
.components--progress-bar-value[data-value="44"]::after {
  right: 56%;
}
.components--progress-bar-value[data-value="43"]::after {
  right: 57%;
}
.components--progress-bar-value[data-value="42"]::after {
  right: 58%;
}
.components--progress-bar-value[data-value="41"]::after {
  right: 59%;
}
.components--progress-bar-value[data-value="40"]::after {
  right: 60%;
}
.components--progress-bar-value[data-value="39"]::after {
  right: 61%;
}
.components--progress-bar-value[data-value="38"]::after {
  right: 62%;
}
.components--progress-bar-value[data-value="37"]::after {
  right: 63%;
}
.components--progress-bar-value[data-value="36"]::after {
  right: 64%;
}
.components--progress-bar-value[data-value="35"]::after {
  right: 65%;
}
.components--progress-bar-value[data-value="34"]::after {
  right: 66%;
}
.components--progress-bar-value[data-value="33"]::after {
  right: 67%;
}
.components--progress-bar-value[data-value="32"]::after {
  right: 68%;
}
.components--progress-bar-value[data-value="31"]::after {
  right: 69%;
}
.components--progress-bar-value[data-value="30"]::after {
  right: 70%;
}
.components--progress-bar-value[data-value="29"]::after {
  right: 71%;
}
.components--progress-bar-value[data-value="28"]::after {
  right: 72%;
}
.components--progress-bar-value[data-value="27"]::after {
  right: 73%;
}
.components--progress-bar-value[data-value="26"]::after {
  right: 74%;
}
.components--progress-bar-value[data-value="25"]::after {
  right: 75%;
}
.components--progress-bar-value[data-value="24"]::after {
  right: 76%;
}
.components--progress-bar-value[data-value="23"]::after {
  right: 77%;
}
.components--progress-bar-value[data-value="22"]::after {
  right: 78%;
}
.components--progress-bar-value[data-value="21"]::after {
  right: 79%;
}
.components--progress-bar-value[data-value="20"]::after {
  right: 80%;
}
.components--progress-bar-value[data-value="19"]::after {
  right: 81%;
}
.components--progress-bar-value[data-value="18"]::after {
  right: 82%;
}
.components--progress-bar-value[data-value="17"]::after {
  right: 83%;
}
.components--progress-bar-value[data-value="16"]::after {
  right: 84%;
}
.components--progress-bar-value[data-value="15"]::after {
  right: 85%;
}
.components--progress-bar-value[data-value="14"]::after {
  right: 86%;
}
.components--progress-bar-value[data-value="13"]::after {
  right: 87%;
}
.components--progress-bar-value[data-value="12"]::after {
  right: 88%;
}
.components--progress-bar-value[data-value="11"]::after {
  right: 89%;
}
.components--progress-bar-value[data-value="10"]::after {
  right: 90%;
}
.components--progress-bar-value[data-value="9"]::after {
  right: 91%;
}
.components--progress-bar-value[data-value="8"]::after {
  right: 92%;
}
.components--progress-bar-value[data-value="7"]::after {
  right: 93%;
}
.components--progress-bar-value[data-value="6"]::after {
  right: 94%;
}
.components--progress-bar-value[data-value="5"]::after {
  right: 95%;
}
.components--progress-bar-value[data-value="4"]::after {
  right: 96%;
}
.components--progress-bar-value[data-value="3"]::after {
  right: 97%;
}
.components--progress-bar-value[data-value="2"]::after {
  right: 98%;
}
.components--progress-bar-value[data-value="1"]::after {
  right: 99%;
}
.components--progress-bar-value[data-value="0"]::after {
  right: 100%;
}
```

[^style-setting]: [mgmeyers/obsidian-style-settings: A dynamic user interface for adjusting theme, plugin, and snippet CSS variables within Obsidian (github.com)](https://github.com/mgmeyers/obsidian-style-settings)
[^components]: [vran-dev/obsidian-components-release: Obsidian missing components](https://github.com/vran-dev/obsidian-components-release)
