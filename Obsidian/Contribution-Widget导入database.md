## 热力图-年度贡献

```contributionWidget
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
      const data = dv.pages(`-"_templates" and -"_excalidraw"`)
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


## 文件检索器(翻页第二版)
```contributionWidget
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
      const authorMatch = (page, author) => {
      	return author&&page["author"] ? new RegExp(`.*${author}.*`, 'i').test(String(page["author"])) : false;
      }
      const tagMatch = (page, tag) => {
      	return tag ? page.file.tags && page.file.tags.some(t => t.includes(tag)) : true;
      }
      const filteredData = dv.pages(`-"_templates" and -"_excalidraw" and -"Primer/99.Database"`)
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
