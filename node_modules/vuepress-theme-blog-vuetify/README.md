# vuepress-theme-blog-vuetify

[![](https://img.shields.io/npm/v/vuepress-theme-blog-vuetify?style=flat-square)](https://www.npmjs.com/package/vuepress-theme-blog-vuetify)
[![](https://img.shields.io/npm/dm/vuepress-theme-blog-vuetify?style=flat-square)](https://www.npmjs.com/package/vuepress-theme-blog-vuetify)

![](https://user-images.githubusercontent.com/4360663/80946098-43781280-8e28-11ea-8e50-667344f9f959.png)

💥The world's most simple, beautiful and customizable 2 columns [VuePress](https://vuepress.vuejs.org/) blog theme built with [Vuetify](https://vuetifyjs.com).

It has following features.

* List hot tags automatically
* List recent posts automatically
* Scroll-spy TOC
* SEO ready (perfect `<title>` and `<meta>` tags)
* Mobile friendly
* Customizable styles using scss (not stylus)
* Ability of inserting your own content into the layout of the theme

## Live demo

👉 <https://vuepress-theme-blog-vuetify.ttskch.com/>

## Installation

```bash
$ yarn add --dev vuepress-theme-blog-vuetify

# or
$ npm install -D vuepress-theme-blog-vuetify
```

## Usage

```js
// .vuepress/config.js
module.exports = {
  theme: 'blog-vuetify',
  themeConfig: {
    // ...
  }
}
```

### Configurations

You can see the valid options and default values [here](https://github.com/ttskch/vuepress-theme-blog-vuetify/blob/master/index.js#L14) 👍

### Customizing styles

You can customize styles flexibly by overwrite [scss variables](https://github.com/ttskch/vuepress-theme-blog-vuetify/blob/master/styles/_variables.scss).

In order to overwrite them, you have to just place `.vuepress/styles/variables.scss` which re-defines some variables [like this](https://github.com/ttskch/vuepress-theme-blog-vuetify/blob/master/example/blog/.vuepress/styles/variables.scss) 👍 

### Inserting your own content into the layout of the theme

You can insert your own content like as following.

**1. Create Vue component**

For example, create `.vuepress/components/AfterPage.vue` like following.

```vue
<template>
  <div id="after-page">
    <p>Some content for after page content of each page</p>
  </div>
</template>
```

**2. Create `enhanceApp.js` and register your component to Vue app**

```js
import AfterPage from './components/AfterPage'

// @see https://vuepress.vuejs.org/theme/writing-a-theme.html#app-level-enhancements
export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  Vue.component('MyAfterPage', AfterPage)
}
```

**3. Notify the name of your component to the theme**

```js
themeConfig: {
  components: {
    afterPage: 'MyAfterPage'
  }
}
```

That's it 😃

Default (empty) components for valid hook points are [them](https://github.com/ttskch/vuepress-theme-blog-vuetify/tree/master/components/extensions).
