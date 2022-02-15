<h1 align="center">vuepress-plugin-right-anchor</h1>
<div align="center">

![Version](https://img.shields.io/github/package-json/v/xuekai-china/vuepress-plugin-right-anchor?style=flat-square)
![NPM](https://img.shields.io/npm/l/vuepress-plugin-right-anchor?style=flat-square)

</div>

English ｜[中文](./zh-README.md)

> Add **anchor navigation bar** to the right of the document page written in Vuepress 2.x

## Version
  - 2.x.x -> Vuepress 2.x -> master branch
  - 0.x.x -> Vuepress 1.x -> legacy branch


## Features
  - Simplify the structure of the left sidebar without losing the function of Title navigation within the page.
  - Click anchor label page over scrolling.
  - When the page scrolls, the corresponding anchor label follows the highlight.
  - Non global component, which can be freely used in the page (under implementation).


## Install
```bash
yarn add -D vuepress-plugin-right-anchor@next
# or
npm i -D vuepress-plugin-right-anchor@next
```


## Use
Add in `.vuepress/config.js`
```js
module.exports = {
  // ...
  plugins: [
    // ...
    ['vuepress-plugin-right-anchor']
  ]
}
```


## Style
Add in `.vuepress/styles/index.scss`

```css
.right-anchor {
  --rightAnchorTextColor: red;
  --rightAnchorFontSize: 12px;
  /* Btn */
  --rightAnchorBtnTextColor: var(--rightAnchorTextColor);
  --rightAnchorBtnBgColor: #fff;
  /* Menu */
  --rightAnchorMenuTextColor: var(--rightAnchorTextColor);
  --rightAnchorMenuBgColor: #fff;
}

/* dark theme */
.dark .right-anchor {
  --rightAnchorTextColor: yellow;
  --rightAnchorFontSize: 16px;
  /* Btn */
  --rightAnchorBtnTextColor: var(--rightAnchorTextColor);
  --rightAnchorBtnBgColor: #000;
  /* Menu */
  --rightAnchorMenuTextColor: var(--rightAnchorTextColor);
  --rightAnchorMenuBgColor: #000;
}
```


## Global Config
Add in `.vuepress/config.js`
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
          // more...
        ],
        expand: {
          trigger: 'hover',
          clickModeDefaultOpen: true
        },
        customClass: 'your-customClass',
      }
    ]
  ]
}
```

## Param description

### showDepth

  Which level of title will be used in the right anchor display.
  The pointing meaning of the value is the same as [themeconfig.sidebardepth](https://vuepress.vuejs.org/zh/theme/default-theme-config.html#%E4%BE%A7%E8%BE%B9%E6%A0%8F).

  - Type: null | number
  - Default: null

### ignore

  Don't show right-anchor's pages.

  - Type: array
  - Default: []

### expand

  About expand configuration of menu.

  - Type: object
    - trigger: string  => The trigger mode of the open menu. `'hover' | 'click'`
    - clickModeDefaultOpen: boolean => Click mode is default open?
  - Default:
      ```js
      {
        trigger: 'hover',
        clickModeDefaultOpen: true
      }
      ```

### customClass

  Your customClass for right-anchor.

  - Type: null | string
  - Default: null

## Page Config

  Set `front-matter` by `vuepress` recommended method in `.md`.

  ```YAML
  ---
  rightAnchor: 
    showDepth: 1
    expand:
      trigger: hover
      clickModeDefaultOpen: true
    customClass: your-customClass
  ---
  ```

