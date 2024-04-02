# 前置插件
- `Templater`[^Templater] 1.8.4

# Scripts
## 时间戳-插入当前时间
```js
<%*
let today0 = tp.date.now("YYYY-MM-DD")
let today1 = tp.date.now("HH:MM:SS")
let inputDate = await tp.system.prompt("选择格式. 1: 年-月-日, 2: 时:分:秒, 3: 年-月-日 时:分:秒")
let date;

switch(inputDate) {
    case "1":
        date = today0;
        break;
    case "2":
        date = today1;
        break;
    case "3":
        date = today0 + " " + today1;
        break;
    default:
        date = "Invalid input";
}
-%><% date %>
```

## 插入callout
```js
<%*
const callouts = {
	note: '✏Note',
	info: 'ℹ️Info',
	todo: '☑️Todo',
	tip: '🔥Tip',
	hint: '🔥Hint',
	important: '🔥Important',
	abstract: '📋Abstract',
	summary: '📋Summary',
	tldr: '📋TLDR',
	question: '❓Question',
	help: '❓Help',
	faq: '❓FAQ',
	quote: '💬Quote',
	cite: '💬Cite',
	example: '📜Example',
	success: '✔️Success',
	check: '✔️Check',
	done: '✔️Done',
	warning: '⚠️Warning',
	caution: '⚠️Caution',
	attention: '⚠️Attention',
	failure: '❌Failure',
	fail: '❌Fail',
	missing: '❌Missing',
	danger: '⚡Danger',
	error: '⚡Error',
	bug: '🐞Bug',
};
const type = await tp.system.suggester(Object.values(callouts), Object.keys(callouts), true, 'Select callout type.');
const fold = await tp.system.suggester(['None', 'Expanded', 'Collapsed'], ['', '+', '-'], true, 'Select callout fold option.');
const title = await tp.system.prompt('Title:', '', true);

let content = await tp.system.prompt('Content (New line -> Shift + Enter):', '', true, true);
content = content.split('\n').map(line => `> ${line}`).join('  \n')  
const calloutHead = `> [!${type}]${fold} ${title}\n`;

tR += calloutHead + content
-%>
```

[^Templater]: [SilentVoid13/Templater: A template plugin for obsidian (github.com)](https://github.com/SilentVoid13/Templater)