开发者文档[^readme_advance]
# 前置插件
- `Contribution Widget` v0.312
- `Contribution Garph` v0.9.0
- `dataview` v0.5.64
- `Weread` v0.9.0 (非必需)

# 使用说明
本库存放Widget插件的dataview组件代码

- 安装好三个必要前置插件

dataview插件需在设置中开启`Enable Inline JavaScript Queries`

- 鼠标右键创建挂件，选择dataview组件

![Contribution-Widget&Garph-240313210228](../attachment/Contribution-Widget&Garph-240313210228.png)

- 根据代码注释修改参数


# 代码片段
均使用dataviewjs

## 热力图-年度贡献
自动获取今年年份，按照文件创建时间检索全库

![Contribution-Widget&Garph-240313211800](../attachment/Contribution-Widget&Garph-240313211800.png)

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
        link: p.file.path,
        open: (e) => {app.workspace.openLinkText(p.file.name, p.file.path, e.ctrlKey)}
        }))
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

![Contribution-Widget&Garph-240313211852](../attachment/Contribution-Widget&Garph-240313211852.png)

![Contribution-Widget&Garph-240313211819](../attachment/Contribution-Widget&Garph-240313211819.png)

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
        link: p.file.path,
        open: (e) => {app.workspace.openLinkText(p.file.name, p.file.path, e.ctrlKey)}
        }))
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

![Contribution-Widget&Garph-240313211917](../attachment/Contribution-Widget&Garph-240313211917.png)

![Contribution-Widget&Garph-240313211827](../attachment/Contribution-Widget&Garph-240313211827.png)

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
        link: p.file.path,
        open: (e) => {app.workspace.openLinkText(p.file.name, p.file.path, e.ctrlKey)}
        }))
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

![Contribution-Widget&Garph-240313211630](../attachment/Contribution-Widget&Garph-240313211630.png)

![Contribution-Widget&Garph-240313211712](../attachment/Contribution-Widget&Garph-240313211712.png)

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

## 文件检索器(升级)
- 参考vran给出的代码
- 增加了分页功能
- **注意**！SortFiled的下拉选项需要手动维护

7个动态参数：

![Contribution-Widget&Garph-240313210739](../attachment/Contribution-Widget&Garph-240313210739.png)

![Contribution-Widget&Garph-240313211353](../attachment/Contribution-Widget&Garph-240313211353.png)

```js
const dateFormat = "YYYY-MM-DD"
const headers = ["tags"] // 期望的展示的属性列表
const pageNum = {{PageNum}} // 当前页码
const pageSize = {{PageSize}} // 单页数量
const pageTitleLike = "{{FileName}}"
const authorLike = "{{Author}}"
const tagLike = "{{TagA}}"
const titleMatch = (page, title) => {
    if (title) {
        return page.file.name?.toLowerCase().includes(title?.toLowerCase())
    }
    return true
}
const authorMatch = (page, author) => {
    if (author && page["author"]) { // page["author"]中的author可替换为自己的属性
	    const pageAuthor = String(page["author"])
	    const regex = new RegExp(`.*${author}.*`, 'i')
	    return regex.test(pageAuthor)
    }else{
	    return false
    }
}
const tagMatch = (page, tag) => {
	if (tag){
		return page.file.tags && page.file.tags.some(t => t.includes(tag))
	}
	return true
}
const filteredData = dv.pages(`""`) //替换为你需要的查询位置
    .where(p => {
        if (pageTitleLike && !authorLike && !tagLike) {
            return titleMatch(p, pageTitleLike)
        } else if (!pageTitleLike && authorLike && !tagLike) {
            return authorMatch(p, authorLike)
        } else if (!pageTitleLike && !authorLike && tagLike) {
            return tagMatch(p, tagLike)
        } else if (pageTitleLike && authorLike && !tagLike) {
            return titleMatch(p, pageTitleLike) && authorMatch(p, authorLike)
        }
         else if (pageTitleLike && !authorLike && tagLike) {
            return titleMatch(p, pageTitleLike) && tagMatch(p, tagLike)
        }
         else if (!pageTitleLike && authorLike && tagLike) {
            return authorMatch(p, authorLike) && tagMatch(p, tagLike)
        }
         else if (pageTitleLike && authorLike && tagLike) {
            return titleMatch(p, pageTitleLike) && authorMatch(p, authorLike) && tagMatch(p, tagLike)
        }else{
	        return true
        }
    })
    .sort(p => {{SortFiled}},"{{Sort}}")
    .map(p => {
        return [p.file.link, ...headers.map(property => p[property]), moment(Number(p.file.ctime)).format(dateFormat)]
    })
const totalData = filteredData.length;
const pageData = filteredData.slice((pageNum - 1) * pageSize, pageNum * pageSize);
dv.paragraph("检索出 " + totalData + " 条数据");
dv.table(["FileName", ...headers, "CreatedDate"], pageData);
```


## 微信读书笔记热力图
需安装WeRead插件

![Contribution-Widget&Garph-240313211323](../attachment/Contribution-Widget&Garph-240313211323.png)

```js
const data = dv.pages(`"Linkages/WeRead"`) // `Linkages/WeRead` can be replaced with your path
  .groupBy(p => formatDate(p["readingDate"])) // `readingDate` can be replaced with your date field
  .map(group => {
    const createdDate = group.key
    let countsSum = 0
    let labeltemp
    let valuetemp
    const items = []
    group.rows.forEach(p => {
      countsSum += p["reviewCount"]+p["noteCount"] // `reviewCount`and`noteCount` can be replaced with your value field
      valuetemp = p["reviewCount"]+p["noteCount"] // `reviewCount`and`noteCount` can be replaced with your value field
      labeltemp += ` [Counts:${valuetemp}]`
      const openLink = (e) => { app.workspace.openLinkText(p.file.name, p.file.path, e.ctrlKey) };
      items.push({
        label: labeltemp,
        value: valuetemp,
        link: p.file.path,
        open: openLink,
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

![Contribution-Widget&Garph-240313211137](../attachment/Contribution-Widget&Garph-240313211137.png)

![Contribution-Widget&Garph-240313210803](../attachment/Contribution-Widget&Garph-240313210803.png)

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