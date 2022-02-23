<h1 align="center">vuepress-plugin-right-anchor</h1>
<div align="center">

![Version](https://img.shields.io/github/package-json/v/xuekai-china/vuepress-plugin-right-anchor?style=flat-square)
![NPM](https://img.shields.io/npm/l/vuepress-plugin-right-anchor?style=flat-square)

</div>

[English](./README.md) ｜中文

> 在用 VuePress 编写的文档页面右侧添加 **锚点导航栏**

## 特性
  - 简化左侧边栏结构的同时不丢失页面内标题导航的功能。
  - 点击锚点标签页面滚动过度。
  - 页面滚动时对应锚点标签跟随高亮。
  - 禁用全局 UI。

## 示例
  [soonspacejs 文档](http://www.xwbuilders.com:9018/soonspacejs/Docs/1.x/api/basics/sbm.html)

## 安装
```bash
yarn add vuepress-plugin-right-anchor -D
# or
npm i vuepress-plugin-right-anchor -D
```

## 使用
在 `.vuepress/config.js` 添加如下配置。 
```js
module.exports = {
  // ...
  plugins: [
    // ...
    ['vuepress-plugin-right-anchor']
  ]
}
```

## 样式
在 `.vuepress/styles/palette.styl` 添加样式变量。

```stylus
$rightAnchorBgColor = #fff;
$rightAnchorTextColor = $textColor;
$rightAnchorFontSize = 14px;
// btn
$rightAnchorBtnTextColor = $rightAnchorTextColor;
$rightAnchorBtnBgColor = $rightAnchorBgColor;
// menu
$rightAnchorMenuTextColor = $rightAnchorTextColor;
```

## 全局配置
在 `.vuepress/config.js` 添加如下配置。 
```js
module.exports = {
  // ...
  plugins: [
    // ...
    [
      'vuepress-plugin-right-anchor',
      {
        showDepth: 1,
        ignore: [
          '/',
          '/api/'
          // 更多...
        ],
        expand: {
          trigger: 'hover',
          clickModeDefaultOpen: true
        },
        customClass: 'your-customClass',
        disableGlobalUI: false,
      }
    ]
  ]
}
```

## 参数说明

### showDepth

  !!! `showLevel` 已经被废弃在 `0.3.x`。

  在右锚显示中将使用哪一级别的标题。
  该值的指向含义与 [themeconfig.sidebardepth](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E4%BE%A7%E8%BE%B9%E6%A0%8F) 相同。

  - Type: null | number
  - Default: null

### ignore

  不显示 right-anchor 的页面。

  - Type: array
  - Default: []

### expand

  关于菜单的展开配置。

  - Type: object
    - trigger: string  => 展开菜单的触发方式。 `'hover' | 'click'`
    - clickModeDefaultOpen: boolean => 点击模式下是否默认打开菜单?
  - Default:
      ```js
      {
        trigger: 'hover',
        clickModeDefaultOpen: true
      }

### customClass

  自定义的 `right-anchor` 类名。

  - Type: null | string
  - Default: null

### disableGlobalUI

  禁用所有页面的全局 UI。

  - Type: boolean
  - Default: false

  如果你需要禁用特定页面的全局 UI，试试 `frontmatter`:

  ```YAML
  ---
  rightAnchor:
    disableGlobalUI: true
  ---
  ```

## 页面单独配置

  在 `.md` 中通过 `vuepress` 推荐的方式设置 `front-matter`。

  ```YAML
  ---
  rightAnchor: 
    showDepth: 1
    expand:
      trigger: hover
      clickModeDefaultOpen: true
    customClass: your-customClass
    disableGlobalUI: true
  ---
  ```
