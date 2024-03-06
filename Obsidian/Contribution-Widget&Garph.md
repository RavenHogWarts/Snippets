开发者文档[^readme_advance]
# 前置插件
- `Contribution Widget` v0227
- `Contribution Garph` v0.9.0
- `dataview` v0.5.64
- `Weread` v0.9.0 (非必需)

# 使用说明
- 安装好三个必要前置插件

dataview插件需在设置中开启`Enable Inline JavaScript Queries`

- 鼠标右键创建挂件，选择dataview组件

![alt text](../attachment/Contribution-Widget&Garph-image-5.png)

- 根据代码注释修改参数


# 代码片段
均使用dataviewjs

## 热力图-年度贡献
自动获取今年年份，按照文件创建时间检索全库
![alt text](../attachment/Contribution-Widget&Garph-image.png)

```js
const currentYear = new Date().getFullYear()
const StartDate = new Date(currentYear, 0, 2)
const EndDate = new Date(currentYear, 12, 0)
const StartDateFormatted = StartDate.toISOString().split('T')[0]
const EndDateFormatted = EndDate.toISOString().split('T')[0]
const data = dv.pages('""')
.groupBy(p => p.file.ctime.toFormat('yyyy-MM-dd'))
.map(entry => {
return {
	date: entry.key,
	value: entry.rows.length,
	items: entry.rows.map(p => ({
        label: p.file.name,
        link: p.file.path}))
	}
})
const options = {
    title:  `${currentYear}年度贡献`,
    titleStyle:{
    fontSize: '14px',
    textAlign: 'center',
    },
    data: data,
    fromDate: StartDateFormatted,
    toDate: EndDateFormatted,
    cellStyleRules: [
    	{color: "#f1d0b4",
    	min: 1,
    	max: 3,
    	},
    	{
    	color: "#e6a875",
    	min: 3,
    	max: 10,
    	},
    	{
    	color: "#d97d31",
    	min: 10,
    	max: 50,
    	},
    	{
    	color: "#b75d13",
    	min: 50,
    	max: 999,
    	},
    ]
}
renderContributionGraph(this.container, options)
```

## 热力图-标签检索
1个动态参数: 
- Tag
  - 组件类型: 标签列表
  - 参数名称: Tag
  - 需要设置默认值!

![alt text](../attachment/Contribution-Widget&Garph-image-1.png)

```js
const tag = '{{Tag}}'
const data = dv.pages(tag)
.groupBy(p => p.file.ctime.toFormat('yyyy-MM-dd'))
.map(entry => {
return { 
	date: entry.key, 
	value: entry.rows.length, 
	items: entry.rows.map(p => ({
        label: p.file.name,
        link: p.file.path}))
    }
}).values
const calendarData = {
	title: '',
	titleStyle: {
  		fontSize: '18px',
  		textAlign: 'center'
	},
	data: data,
	graphType: 'month-track',
	startOfWeek: 1,
	cellStyleRules: [
	  	{color: "#f1d0b4",
	   	min: 1,
	  	max: 3,
	  	},
	   	{color: "#e6a875",
	  	min: 3,
	   	max: 10,
	  	},
	   	{color: "#d97d31",
	  	min: 10,
	  	max: 50,
	  	},
	   	{color: "#b75d13",
	  	min: 50,
	   	max: 999,
	  	},
	  ]
}
renderContributionGraph(this.container, calendarData)
```

## 热力图-最近几个整月贡献
1个动态参数: 
- MonthNum
  - 组件类型: 数字
  - 参数名称: MonthNum
  - 需要设置默认值!
  - 提示语: 限制范围:1~24

![alt text](../attachment/Contribution-Widget&Garph-image-2.png)


```js
const MonthNumPre = {{MonthNum}}
const MonthNum = MonthNumPre<=0 ? 1 : MonthNumPre>24 ? 24 : MonthNumPre
const currentDate = new Date()
const currentMonth = currentDate.getMonth()+1
const currentYear = currentDate.getFullYear()
const casualMonth = currentMonth-MonthNum
const i = Math.floor((-casualMonth)/12)+1
const FirstYear = casualMonth<0 ? currentYear-i : currentYear
const LastYear = currentYear
const FirstMonth = casualMonth<0 ? casualMonth+12*i : casualMonth
const LastMonth = currentMonth
const FirstDay = new Date(FirstYear,FirstMonth, 2)
const LastDay = new Date(LastYear, LastMonth, 1)
const FirstDayFormatted = FirstDay.toISOString().split('T')[0]
const LastDayFormatted = LastDay.toISOString().split('T')[0]
const data = dv.pages('""')
.groupBy(p => p.file.ctime.toFormat('yyyy-MM-dd'))
.map(entry => {
return {
date: entry.key,
value: entry.rows.length,
items: entry.rows.map(p => ({
        label: p.file.name,
        link: p.file.path}))
  }
})

const calendarData = {
    title: `最近${MonthNum}个整月贡献`,
    titleStyle:{
		fontSize: '14px',
		textAlign: 'center',
    },
    data: data, 
    graphType: 'month-track',
    startOfWeek: 1,
    fromDate: FirstDayFormatted, 
    toDate: LastDayFormatted,
    cellStyleRules: [
    	{color: "#f1d0b4",
    	min: 1,
    	max: 3,
    	},
    	{color: "#e6a875",
    	min: 3,
    	max: 10,
    	},
    	{color: "#d97d31",
    	min: 10,
    	max: 50,
    	},
    	{color: "#b75d13",
    	min: 50,
    	max: 999,
    	},
    ]
}
renderContributionGraph(this.container, calendarData)
```
## 文件检索器
4个动态参数:
- FileName(模糊匹配)
  - 组件类型: 文本
  - 参数名称: FileName
  - 无需默认值
- Author(模糊匹配)
  - 组件类型: 文本
  - 参数名称: Author
  - 无需默认值
- TagA
  - 组件类型: 标签列表
  - 参数名称: TagA
  - 无需默认值
- MaxNum
  - 组件类型: 数字
  - 参数名称: MaxNum
  - 需要设置默认值!

![alt text](../attachment/Contribution-Widget&Garph-image-3.png)

```js
const fileName = '{{FileName}}'
const author = '{{Author}}'
const tag = '{{TagA}}'
const maxResults = {{MaxNum}}
let filenameField = 'file.name' // `file.name` can be replaced with your filename field
let authorField = 'author' 		// `author` can be replaced with your author field
let tagField = 'file.tags' 		// `file.tags` can be replaced with your tag field
let query = `
table
  file.tags as Tags,
  dateformat(file.ctime, "yyyy-MM-dd") as CreatedDate
from
  ""
`
if (fileName && !author && !tag) {
  query += ` where (icontains(${filenameField}, "${fileName}"))`
} else if (!fileName && author && !tag) {
  query += ` where (icontains(${authorField}, "${author}"))`
} else if (!fileName && !author && tag) {
  query += ` where (contains(${tagField}, "${tag}"))`
} else if (fileName && author && !tag) {
  query += ` where (icontains(${filenameField}, "${fileName}") and icontains(${authorField}, "${author}"))`
} else if (fileName && !author && tag) {
  query += ` where (icontains(${filenameField}, "${fileName}") and contains(${tagField}, "${tag}"))`
} else if (!fileName && author && tag) {
  query += ` where (icontains(${authorField}, "${author}") and contains(${tagField}, "${tag}"))`
} else if (fileName && author && tag) {
  query += ` where (icontains(${filenameField}, "${fileName}") and icontains(${authorField}, "${author}") and contains(${tagField}, "${tag}"))`
} else {
  query += ``
}
query += ` limit ${maxResults}`
await dv.execute(query)
```

## 微信读书笔记热力图
需安装WeRead插件

![alt text](../attachment/Contribution-Widget&Garph-image-4.png)

```js
const data = dv.pages(`"Linkages/WeRead"`) // `Linkages/WeRead` can be replaced with your path
  .groupBy(p => formatDate(p["readingDate"])) // `readingDate` can be replaced with your date field
  .map(group => {
    const createdDate = group.key
    let countsSum = 0
    let labeltemp
    let valuetemp
    const items = []
    group.rows.forEach(page => {
      countsSum += page["reviewCount"]+page["noteCount"] // `reviewCount`and`noteCount` can be replaced with your value field
      valuetemp = page["reviewCount"]+page["noteCount"]
      labeltemp += ` [Counts:${valuetemp}]`
      items.push({
        label: labeltemp,
        value: page["reviewCount"]+page["noteCount"], // `reviewCount`and`noteCount` can be replaced with your value field
        link: page.file.path,
      })
    })
    return {
      date: createdDate,
      value: countsSum,
      items: items
    }
  }).values
function formatDate(date) {
  const mdate = new Date(date)
  const year = String(mdate.getFullYear())
  const month = String(mdate.getMonth() + 1).padStart(2, '0')
  const day = String(mdate.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
const calendarData = {
    days: 366,
    title: `近一年读书笔记`,
    titleStyle:{
		fontSize: '14px',
		textAlign: 'center',
    },
    data: data, 
    graphType: 'default',
    startOfWeek: 1,
    cellStyleRules: [
    	{color: "#8dd1e2",
    	min: 1,
    	max: 6,
    	},
    	{color: "#63a1be",
    	min: 6,
    	max: 31,
    	},
    	{color: "#376d93",
    	min: 31,
    	max: 101,
    	},
    	{color: "#012f60",
    	min: 101,
    	max: 999,
    	},
    ]
}
renderContributionGraph(this.container, calendarData)
```

## 和风天气视图(转)
下载LumosLovegood大佬的js脚本[^WeatherView]

需要先按照WeatherView/Readme文档获取和风天气api以及js脚本

2个动态参数：
- City
  - 组件类型: 文本
  - 参数名称: City
  - 需要默认值
- Days
  - 组件类型: 数字
  - 参数名称: Days
  - 需要默认值（2~7）

![alt text](../attachment/Contribution-Widget&Garph-image-6.png)

```js
let setting = {};
setting.key = ""; //Api key
setting.city = `{{City}}`;
setting.days = {{Days}};
setting.headerLevel = 0; //添加标题的等级,0为不添加
setting.addDesc = false; //是否添加描述
setting.onlyToday = false; //是否只在当天显示
setting.anotherCity = "北京"; //添加另外一个城市

// 脚本文件 weatherView.js 所在路径
dv.view("../_templates/Snippets/weatherView",setting)
```


[^readme_advance]: [obsidian-contribution-graph/README_ADVANCE.md](https://github.com/vran-dev/obsidian-contribution-graph/blob/master/README_ADVANCE.md)
[^WeatherView]: [LumosLovegood/myScripts/WeatherView](https://github.com/LumosLovegood/myScripts/blob/main/WeatherView/Readme.md)