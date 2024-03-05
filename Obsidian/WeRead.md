GitHub分享模板区[^模板分享区]

# 前置插件
- `Weread` v0.8.4


# 模板片段
## 模板1
![alt text](../attachment/WeRead-231225171958.png)

```js
---
title: {{metaData.title}}
pcUrl: {{metaData.pcUrl}}
lastReadDate: {{metaData.lastReadDate}}
---
> [!abstract] {{metaData.title}}
> - ![ {{metaData.title}}|200]({{metaData.cover}})

# 高亮划线
{% for chapter in chapterHighlights %}
{% if chapter.level == 1 %}## {{chapter.chapterTitle}}{% elif chapter.level == 2 %}### {{chapter.chapterTitle}}{% elif chapter.level == 3 %}#### {{chapter.chapterTitle}}{% endif %}
> [!INFO] {{chapter.chapterTitle}}{% for highlight in chapter.highlights %}{% if highlight.reviewContent %}{% else %}
> - {{ highlight.markText |trim }} ^{{highlight.chapterUid}}-{{highlight.range}}{% endif %}{% endfor %}
{% endfor %}
# 读书笔记
{% for chapter in bookReview.chapterReviews %}{% if chapter.reviews or chapter.chapterReview %}
> [!NOTE] {{chapter.chapterTitle}}{% if  chapter.chapterReviews %}{% for chapterReview in chapter.chapterReviews %}
> - {{chapterReview.content}}
{% endfor%}{%endif %}{% if chapter.reviews %}{%for review in chapter.reviews %}
> - {{review.abstract |trim }}
>   ==🦊{{review.content}}=={% endfor %}
{%endif %} {% endif %} {% endfor %}
# 本书评论
{% if bookReview.bookReviews %}{% for bookReview in bookReview.bookReviews %}
{{loop.index}}. {{bookReview.mdContent}}
{% endfor%}{% endif %}
```

## 模板2
此模板要求每个想法都要高亮
```js
---
title: {{metaData.title}}
pcUrl: {{metaData.pcUrl}}
lastReadDate: {{metaData.lastReadDate}}
---
> [!abstract] {{metaData.title}}
> - ![ {{metaData.title}}|200]({{metaData.cover}})

{% for chapter in chapterHighlights %}
{% if chapter.level == 1 %}## {{chapter.chapterTitle}}{% elif chapter.level == 2 %}### {{chapter.chapterTitle}}{% elif chapter.level == 3 %}#### {{chapter.chapterTitle}}{% endif %}
> [!INFO] {{chapter.chapterTitle}}{% for highlight in chapter.highlights %}{% if highlight.reviewContent %}{% set regExp = r/#/g %}{% if regExp.test(highlight.reviewContent) === false %}{% endif %}
> - {{ highlight.markText |trim }} 
>   ==🦊{{highlight.reviewContent}}=={% else %}
> - {{ highlight.markText |trim }} {% endif %}{% endfor %}{% endfor %}
```

## 模板3
![alt text](../attachment/WeRead-240117163324.png)

```js
---
title: {{metaData.title}}
pcUrl: {{metaData.pcUrl}}
lastReadDate: {{metaData.lastReadDate}}
---
> [!abstract] {{metaData.title}}
> - ![ {{metaData.title}}|200]({{metaData.cover}})
{% for chapter1 in chapterHighlights %}
{% if chapter1.level == 1 %}## {{chapter1.chapterTitle}}{% elif chapter1.level == 2 %}### {{chapter1.chapterTitle}}{% elif chapter1.level == 3 %}#### {{chapter1.chapterTitle}}{% endif %}
> [!INFO] {{chapter1.chapterTitle}}{% for highlight in chapter1.highlights %}{% if highlight.reviewContent %}{% else %}
> - {{ highlight.markText |trim }} ^{{highlight.chapterUid}}-{{highlight.range}}{% endif %}{% endfor %}{% for chapter2 in bookReview.chapterReviews %}{% if chapter1.chapterTitle == chapter2.chapterTitle %}{% if chapter2.chapterReviews %}{% for chapterReview in chapter2.chapterReviews %}
> - {{chapterReview.content}}{% endfor%}{%endif %}{% if chapter2.reviews %}{%for review in chapter2.reviews %}
> - {{review.abstract |trim }}
>   ==🦊{{review.content}}=={% endfor %}{%endif %}{% endif %}{% endfor%}{% endfor%}
```

## 模板4
![alt text](../attachment/WeRead-240206171303.png)

```js
---
title: {{metaData.title}}
pcUrl: {{metaData.pcUrl}}
lastReadDate: {{metaData.lastReadDate}}
---
> [!abstract] {{metaData.title}}
> - ![ {{metaData.title}}|200]({{metaData.cover}})
{% for chapter1 in chapterHighlights %}
{% if chapter1.level == 1 %}## {{chapter1.chapterTitle}}{% elif chapter1.level == 2 %}### {{chapter1.chapterTitle}}{% elif chapter1.level == 3 %}#### {{chapter1.chapterTitle}}{% endif %}{% for highlight in chapter1.highlights %}
{% if highlight.reviewContent %}{% else %}
> [!INFO] {{chapter1.chapterTitle}}
> - {{ highlight.markText |trim }} ^{{highlight.chapterUid}}-{{highlight.range}}{% endif %}{% endfor %}
{% for chapter2 in bookReview.chapterReviews %}{% if chapter1.chapterTitle == chapter2.chapterTitle %}{% if chapter2.chapterReviews %}{% for chapterReview in chapter2.chapterReviews %}
> - {{chapterReview.content}}{% endfor%}{%endif %}{% if chapter2.reviews %}{%for review in chapter2.reviews %}
> [!NOTE] {{chapter2.chapterTitle}}
> - {{review.abstract |trim }}
>   ==🦊{{review.content}}==
{% endfor %}{%endif %}{% endif %}{% endfor%}{% endfor%}
```

[^模板分享区]: [obsidian-weread-plugin/discussions/62#discussioncomment-7236718](https://github.com/zhaohongxuan/obsidian-weread-plugin/discussions/62#discussioncomment-7236718)