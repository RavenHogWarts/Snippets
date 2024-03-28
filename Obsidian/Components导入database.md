# 使用方法
！！！请仔细阅读文档，不是傻瓜式使用，需要自己修改参数才能达到理想的效果

- `ctrl+p`打开命令列表,输入components,打开database

![](Components导入database-240328204151.png)

- 复制代码片段粘贴，导入

![](Components导入database-240328204253.png)

## 关于dv.pages
dv.pages(`""`): 查询所有目录

dv.pages(`"temp"`): 只查询temp目录

dv.pages(`-"temp"`): 排除temp目录

多个目录使用and连接,比如

dv.pages(`-"temp" and -"demo"`): 排除temp和demo目录

## 关于文件创建时间
```js
// 这样的写法,是根据文件在Obsidian中的创建时间来分组
// 但是这样有一个问题,如果你的文件移动到其他设备,或者因为其他什么原因导致文件创建时间变动,会导致查询的结果发生变动
const data = dv.pages(`""`)
	.groupBy(p => p.file.ctime)
	.map(···)
	.values

// 所以就有了第二种方法,使用一个文档属性存储文件创建时间,比如使用created-date
// 那么代码需要修改成下面的样子
// 同时,需要在下方增加formatDate函数用于格式化你的日期字段
const data = dv.pages(`""`)
	.groupBy(p => formatDate(p["created-date"]))
	.map(···)
	.values

function formatDate(date) {
  const mdate = new Date(date)
  const year = String(mdate.getFullYear())
  const month = String(mdate.getMonth() + 1).padStart(2, '0')
  const day = String(mdate.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
```

# 代码片段
## 热力图-年度贡献

```Components
id: aaee2c5c-91e1-40d0-8c58-ef07a836d192
type: multi
titleAlign: center
tabTitle: ""
maxWidthRatio: -1
backgroundStyle: none
widgets:
  - id: b1543e7b-9854-4fa7-85fc-5ac151c44a9c
    type: dataview
    titleAlign: center
    query: |-
      const currentYear = new Date().getFullYear()
      const StartDate = new Date(currentYear, 0, 2)
      const EndDate = new Date(currentYear, 12, 0)
      const StartDateFormatted = StartDate.toISOString().split('T')[0]
      const EndDateFormatted = EndDate.toISOString().split('T')[0]
      const data = dv.pages(`""`) //替换为你需要的查询位置
      .groupBy(p => p.file.ctime.toFormat('yyyy-MM-dd'))
      .map(entry => {
      return {
      	date: entry.key,
      	value: entry.rows.length,
      	items: entry.rows.map(p => ({
                label: p.file.name,
                link: p.file.path,
                open: (e) => { app.workspace.openLinkText(p.file.name, p.file.path, e.ctrlKey) }}))
      	}
      })
      const calendarData = {
          title: `${currentYear}年度贡献`,
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
    queryType: dataviewjs
    backgroundStyle: card
    maxHeight: 1200
    contentAlign: left
    dynamicParamComponents: []
    title: 年度贡献
layoutType: column

```

## 热力图-标签检索
```Components
id: 4445ad6d-a9b7-40f8-b72f-d3b7a94bcb3e
type: multi
titleAlign: center
tabTitle: ""
maxWidthRatio: -1
backgroundStyle: none
widgets:
  - id: 36bf1d36-730d-4490-aaad-04d726bf193f
    type: dataview
    titleAlign: center
    query: |-
      const tag='{{Tag}}'
      const data = dv.pages(`${tag}`) //可以在这里排除某些目录,比如加上and -"_templates"
      .groupBy(p => p.file.ctime.toFormat('yyyy-MM-dd'))
      .map(entry => {
      return { 
      	date: entry.key, 
      	value: entry.rows.length, 
      	items: entry.rows.map(p => ({
              label: p.file.name,
              link: p.file.path,
              open: (e) => { app.workspace.openLinkText(p.file.name, p.file.path, e.ctrlKey) }}))
          }
      }).values
      const calendarData = {
      	title: ``,
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
    queryType: dataviewjs
    backgroundStyle: card
    maxHeight: 1200
    contentAlign: left
    dynamicParamComponents:
      - id: 4c64594c-646a-408a-95e3-976f6e536bec
        type: tagSuggestions
        name: Tag
        defaultValue: "#input"
        placeholder: ""
        label: 检索条件
    title: 🏷️标签热力图
layoutType: column

```

## 热力图-最近几个整月贡献
```Components
id: 74ecbcfa-e8a0-4506-9f58-7aa988d1c746
type: multi
titleAlign: center
tabTitle: ""
maxWidthRatio: -1
backgroundStyle: none
widgets:
  - id: 3770ab6c-4e46-4937-a65b-1601a2476b58
    type: dataview
    titleAlign: center
    query: |-
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
      const data = dv.pages(`""`) //替换为你需要的查询位置
      .groupBy(p => p.file.ctime.toFormat('yyyy-MM-dd'))
      .map(entry => {
      return {
      date: entry.key,
      value: entry.rows.length,
      items: entry.rows.map(p => ({
              label: p.file.name,
              link: p.file.path,
              open: (e) => { app.workspace.openLinkText(p.file.name, p.file.path, e.ctrlKey) }}))
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
    queryType: dataviewjs
    backgroundStyle: card
    maxHeight: 1200
    contentAlign: left
    dynamicParamComponents:
      - id: 67c1f954-5d63-45c5-8d94-d9ab5e3252c8
        type: number
        name: MonthNum
        defaultValue: "1"
        placeholder: 限制范围在1~24
        label: 查询整月数
    title: 整月贡献查询
layoutType: column

```

## 文件检索器(翻页第二版)
```Components
id: cee4d365-a5f7-41bc-b3a9-f93b136b7b8d
type: multi
titleAlign: center
tabTitle: ""
maxWidthRatio: -1
backgroundStyle: none
widgets:
  - id: 9d9abd74-05eb-423d-ac10-89a297f6b50b
    type: dataview
    titleAlign: center
    tabTitle: ""
    maxWidthRatio: -1
    query: |-
      const dateFormat = "YYYY-MM-DD"
      const headers = ["tags"]
      let pageNum = 1
      const pageSize = {{PageSize}}
      const pageTitleLike = "{{FileName}}"
      const authorLike = "{{Author}}"
      const tagLike = "{{TagA}}"
      const titleMatch = (page, title) => {
          return title ? page.file.name?.toLowerCase().includes(title.toLowerCase()) : true;
      }
      const authorMatch = (page, author) => {// page["author"]中的author替换为自己的作者属性
      	return author&&page["author"] ? new RegExp(`.*${author}.*`, 'i').test(String(page["author"])) : false;
      }
      const tagMatch = (page, tag) => {
      	return tag ? page.file.tags && page.file.tags.some(t => t.includes(tag)) : true;
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
      const maxnum = Math.ceil(totalData / pageSize);

      let flexContainer = createFlexContainer("space-between");

      let paragraph = dv.el("span", "检索出 " + totalData + " 条数据");
      paragraph.style.flex = "1";
      flexContainer.appendChild(paragraph);

      let parentContainer = createFlexContainer("flex-end");
      let [button1, button2, pageSpan1, pageSpan2, pageSpan3] = createPaginationElements();
      parentContainer.append(button1, pageSpan1, pageSpan2, pageSpan3, button2);
      flexContainer.appendChild(parentContainer);

      function createPaginationElements() {
          let button1 = dv.el("button", "上一页");
          button1.onclick = () => {
              pageNum = pageNum > 1 ? pageNum - 1 : maxnum;
              fy();
          };
          let pageSpan1 = dv.el("span", pageNum);
          let pageSpan2 = dv.el("span", " / ");
          let pageSpan3 = dv.el("span", maxnum);
          let button2 = dv.el("button", "下一页");
          button2.onclick = () => {
              pageNum = pageNum < maxnum ? pageNum + 1 : 1;
              fy();
          };
          return [button1, button2, pageSpan1, pageSpan2, pageSpan3];
      }
      function createFlexContainer(justifyContent) {
          let container = dv.el("div", "");
          container.style.display = "flex";
          container.style.alignItems = "center";
          container.style.justifyContent = justifyContent;
          return container;
      }

      let table = dv.el("div", "")
      function fy() {
        if(document.querySelector(".dataview.table-view-table")){
          document.querySelector(".dataview.table-view-table").remove();
        }
        let pageData = filteredData.slice((pageNum - 1) * pageSize, pageNum * pageSize);
        dv.table(["FileName", ...headers, "CreatedDate"], pageData, ".dataview.table-view-table");
        pageSpan1.innerText = pageNum;
      }
      fy();
    queryType: dataviewjs
    backgroundStyle: card
    maxHeight: 1200
    dynamicParamComponents:
      - id: c4e2e7be-c19e-4c89-8b22-86dfeba97dc0
        type: text
        name: FileName
        defaultValue: ""
        placeholder: input filename
        fromProperty: ""
        label: 文件名称
      - id: f1aa6959-dbee-4e10-8e82-c7b4407002a6
        type: propertyValueSuggestions
        name: Author
        defaultValue: ""
        placeholder: ""
        fromProperty: author
        label: 作者
      - id: d82e226f-6331-4ee8-bfba-78925d319d90
        type: tagSuggestions
        name: TagA
        defaultValue: ""
        placeholder: ""
        fromProperty: ""
        label: 🏷️标签
      - id: 4415d10b-03e9-4aaf-b511-26fcd0895833
        type: number
        name: PageSize
        defaultValue: "5"
        placeholder: ""
        fromProperty: ""
        label: 数量控制
      - id: d0a4c6fd-16f3-4013-8ca9-b7904ba8b6ab
        type: select
        name: SortFiled
        defaultValue: p.file.name
        placeholder: ""
        fromProperty: ""
        label: 排序
        options:
          - id: cdb62e6e-2099-4dcb-a6bd-f7cdcc72569f
            label: 文件名
            value: p.file.name
          - id: 7fbe9fdf-3205-43bf-88f1-0e51598caa93
            label: 创建时间
            value: p.file.ctime
      - id: 652919e7-21f7-409b-81bf-9a24fa7df185
        type: select
        name: Sort
        defaultValue: asc
        placeholder: ""
        fromProperty: ""
        options:
          - id: 366f5d7f-8126-4378-ad65-cc4d1a008e11
            label: 升序
            value: asc
          - id: 98a5a785-fcd1-4f97-805c-6463c203d1ee
            label: 降序
            value: desc
    title: 🔍文件检索
layoutType: column

```
