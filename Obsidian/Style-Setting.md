# 前置插件
- `Style Setting`[^style-setting]

# Components插件非官方样式设置
前置插件:
- `Components`[^components] v20240411

目前修改选项:
- 有数据视图的页面是否全宽
- 画廊样式设置
- 进度条样式设置

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
- id: Components-dynamic-dataview
  title: 数据视图
  type: heading
  level: 1
  collapsed: true
- id: Components-dynamic-dataview-fullwidth
  title: 数据视图全宽
  type: class-toggle
  default: true
  description: 数据视图是否全宽显示
- id: Components-dynamic-dataview-gallary
  title: 画廊视图设置
  type: heading
  level: 2
  collapsed: true
- id: Components-dynamic-dataview-cover-aspect-ratio
  title: 封面宽高比
  type: variable-text
  default: 10/7
  description: 数据视图画廊封面宽高比,值设置成0则自动计算宽高比
- id: Components-dynamic-dataview-title
  title: 标题不换行显示
  type: class-toggle
  default: false
  description: 数据视图画廊标题是否不换行显示
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
  description: 进度条指示器与进度条的间距
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

/* Components-body */
body {
  --Components-progress-indicator-margin: 20px;
  --Components-dynamic-dataview-cover-aspect-ratio: 10/7;
}

/* Components-dynamic-dataview-cover-aspect-ratio */
.dynamic-data-view-gallary .gallary-item .gallary-cover{
  aspect-ratio: var(--Components-dynamic-dataview-cover-aspect-ratio) !important;
}

/* Components-dynamic-dataview-title */
.Components-dynamic-dataview-title .dynamic-data-view-gallary .gallary-item .gallary-title{
  white-space: nowrap !important;
  overflow: hidden !important;
}

/* Components-dynamic-dataview-fullwidth */
body.Components-dynamic-dataview-fullwidth .workspace-leaf:has(.dynamic-data-view) {
  --file-line-width: 100%;
}

/* Components-progress */
.dynamic-data-view .components--progress-bar {
  position: relative;
  display: flex;
}

.dynamic-data-view .components--progress-bar-track {
  flex-grow: 1;
}

.dynamic-data-view .progress-indicator {
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
  background: url("data:image/gif;base64,R0lGODlhIgAVAKIHAL3/9/+Zmf8zmf/MmZmZmf+Z/wAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpDMkJBNjY5RTU1NEJFMzExOUM4QUM2MDAwNDQzRERBQyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpCREIzOEIzMzRCN0IxMUUzODhEQjgwOTYzMTgyNTE0QiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpCREIzOEIzMjRCN0IxMUUzODhEQjgwOTYzMTgyNTE0QiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkM1QkE2NjlFNTU0QkUzMTE5QzhBQzYwMDA0NDNEREFDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkMyQkE2NjlFNTU0QkUzMTE5QzhBQzYwMDA0NDNEREFDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+Af/+/fz7+vn49/b19PPy8fDv7u3s6+rp6Ofm5eTj4uHg397d3Nva2djX1tXU09LR0M/OzczLysnIx8bFxMPCwcC/vr28u7q5uLe2tbSzsrGwr66trKuqqainpqWko6KhoJ+enZybmpmYl5aVlJOSkZCPjo2Mi4qJiIeGhYSDgoGAf359fHt6eXh3dnV0c3JxcG9ubWxramloZ2ZlZGNiYWBfXl1cW1pZWFdWVVRTUlFQT05NTEtKSUhHRkVEQ0JBQD8+PTw7Ojk4NzY1NDMyMTAvLi0sKyopKCcmJSQjIiEgHx4dHBsaGRgXFhUUExIREA8ODQwLCgkIBwYFBAMCAQAAIfkECQcABwAsAAAAACIAFQAAA6J4umv+MDpG6zEj682zsRaWFWRpltoHMuJZCCRseis7xG5eDGp93bqCA7f7TFaYoIFAMMwczB5EkTzJllEUttmIGoG5bfPBjDawD7CsJC67uWcv2CRov929C/q2ZpcBbYBmLGk6W1BRY4MUDnMvJEsBAXdlknk2fCeRk2iJliAijpBlEmigjR0plKSgpKWvEUheF4tUZqZID1RHjEe8PsDBBwkAIfkECQcABwAsAAAAACIAFQAAA6B4umv+MDpG6zEj682zsRaWFWRpltoHMuJZCCRseis7xG5eDGp93TqS40XiKSYgTLBgIBAMqE/zmQSaZEzns+jQ9pC/5dQJ0VIv5KMVWxqb36opxHrNvu9ptPfGbmsBbgSAeRdydCdjXWRPchQPh1hNAQF4TpM9NnwukpRyi5chGjqJEoSOIh0plaYsZBKvsCuNjY5ptElgDyFIuj6+vwcJACH5BAkHAAcALAAAAAAiABUAAAOfeLrc/vCZSaudUY7Nu99GxhhcYZ7oyYXiQQ5pIZgzCrYuLMd8MbAiUu802flYGIhwaCAQDKpQ86nUoWqF6dP00wIby572SXE6vyMrlmhuu9GKifWaddvNQAtszXYCxgR/Zy5jYTFeXmSDiIZGdQEBd06QSBQ5e4cEkE9nnZQaG2J4F4MSLx8rkqUSZBeurhlTUqsLsi60DpZxSWBJugcJACH5BAkHAAcALAAAAAAiABUAAAOgeLrc/vCZSaudUY7Nu99GxhhcYZ7oyYXiQQ5pIZgzCrYuLMd8MbAiUu802flYGIhwaCAQDKpQ86nUoWqF6dP00wIby572SXE6vyMrlmhuu9GuifWaddvNwMkZtmY7AWMEgGcKY2ExXl5khFMVc0Z1AQF3TpJShDl8iASST2efloV5JTyJFpgOch8dgW9KZxexshGNLqgLtbW0SXFwvaJfCQAh+QQJBwAHACwAAAAAIgAVAAADoXi63P7wmUmrnVGOzbvfRsYYXGGe6MmF4kEOaSGYMwq2LizHfDGwIlLPNKGZfi6gZmggEAy2iVPZEKZqzakq+1xUFFYe90lxTsHmim6HGpvf3eR7skYJ3PC5tyystc0AboFnVXQ9XFJTZIQOYUYFTQEBeWaSVF4bbCeRk1meBJYSL3WbaReMIxQfHXh6jaYXsbEQni6oaF21ERR7l0ksvA0JACH5BAkHAAcALAAAAAAiABUAAAOeeLrc/vCZSaudUY7Nu99GxhhcYZ7oyYXiQQ5pIZgzCrYuLMfFlA4hTITEMxkIBMOuADwmhzqeM6mashTCXKw2TVKQyKuTRSx2wegnNkyJ1ozpOFiMLqcEU8BZHx6NYW8nVlZefQ1tZgQBAXJIi1eHUTRwi0lhl48QL0sogxaGDhMlUo2gh14fHhcVmnOrrxNqrU9joX21Q0IUElm7DQkAIfkECQcABwAsAAAAACIAFQAAA6J4umv+MDpG6zEj682zsRaWFWRpltoHMuJZCCRseis7xG5eDGp93bqCA7f7TFaYoIFAMMwczB5EkTzJllEUttmIGoG5bfPBjDawD7CsJC67uWcv2CRov929C/q2ZpcBbYBmLGk6W1BRY4MUDnMvJEsBAXdlknk2fCeRk2iJliAijpBlEmigjR0plKSgpKWvEUheF4tUZqZID1RHjEe8PsDBBwkAIfkECQcABwAsAAAAACIAFQAAA6B4umv+MDpG6zEj682zsRaWFWRpltoHMuJZCCRseis7xG5eDGp93TqS40XiKSYgTLBgIBAMqE/zmQSaZEzns+jQ9pC/5dQJ0VIv5KMVWxqb36opxHrNvu9ptPfGbmsBbgSAeRdydCdjXWRPchQPh1hNAQF4TpM9NnwukpRyi5chGjqJEoSOIh0plaYsZBKvsCuNjY5ptElgDyFIuj6+vwcJACH5BAkHAAcALAAAAAAiABUAAAOfeLrc/vCZSaudUY7Nu99GxhhcYZ7oyYXiQQ5pIZgzCrYuLMd8MbAiUu802flYGIhwaCAQDKpQ86nUoWqF6dP00wIby572SXE6vyMrlmhuu9GKifWaddvNQAtszXYCxgR/Zy5jYTFeXmSDiIZGdQEBd06QSBQ5e4cEkE9nnZQaG2J4F4MSLx8rkqUSZBeurhlTUqsLsi60DpZxSWBJugcJACH5BAkHAAcALAAAAAAiABUAAAOgeLrc/vCZSaudUY7Nu99GxhhcYZ7oyYXiQQ5pIZgzCrYuLMd8MbAiUu802flYGIhwaCAQDKpQ86nUoWqF6dP00wIby572SXE6vyMrlmhuu9GuifWaddvNwMkZtmY7AWMEgGcKY2ExXl5khFMVc0Z1AQF3TpJShDl8iASST2efloV5JTyJFpgOch8dgW9KZxexshGNLqgLtbW0SXFwvaJfCQAh+QQJBwAHACwAAAAAIgAVAAADoXi63P7wmUmrnVGOzbvfRsYYXGGe6MmF4kEOaSGYMwq2LizHfDGwIlLPNKGZfi6gZmggEAy2iVPZEKZqzakq+1xUFFYe90lxTsHmim6HGpvf3eR7skYJ3PC5tyystc0AboFnVXQ9XFJTZIQOYUYFTQEBeWaSVF4bbCeRk1meBJYSL3WbaReMIxQfHXh6jaYXsbEQni6oaF21ERR7l0ksvA0JACH5BAkHAAcALAAAAAAiABUAAAOeeLrc/vCZSaudUY7Nu99GxhhcYZ7oyYXiQQ5pIZgzCrYuLMfFlA4hTITEMxkIBMOuADwmhzqeM6mashTCXKw2TVKQyKuTRSx2wegnNkyJ1ozpOFiMLqcEU8BZHx6NYW8nVlZefQ1tZgQBAXJIi1eHUTRwi0lhl48QL0sogxaGDhMlUo2gh14fHhcVmnOrrxNqrU9joX21Q0IUElm7DQkAOw==") !important;
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
.components--progress-bar-value::after {
  right: 100%;
}
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
