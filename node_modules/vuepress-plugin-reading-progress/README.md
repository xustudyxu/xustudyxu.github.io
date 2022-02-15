# vuepress-plugin-reading-progress

> a reading progress bar plugin for vuepress

[README](README.md) | [CHANGELOG](CHANGELOG.md)

add reading progress bar for vuepress

![vuepress-plugin-reading-progress](https://ououe.com/img/vuepress_plugin_reading_progress.gif)

---

## Installation

``` sh
yarn add vuepress-plugin-reading-progress
# or
npm i vuepress-plugin-reading-progress
```

## Usage

``` js
module.exports = {
  plugins: [
    'reading-progress'
  ]
}
```

[ Vuepress documentation](https://vuepress.vuejs.org/plugin/using-a-plugin.html)


## Options

### readingDir
- Type: `null`, `string`, `array`, `object`, `RegExp`
- Required: `false`

Specify regularPath that display reading progress bar

example
``` js
{
  readingDir: 'posts'
  // or
  readingDir: ['posts1', 'posts2', 'posts3']
  // or { dir: fixed }
  readingDir: {
    posts1: 'top',
    posts2: 'bottom',
    posts3: 'left'
  }
  // or RegExp
  readingDir: /[^/]+$/ // exclude regularPath end with `/`
  // or
  readingDir: new RegExp('[^/]+$')
}
```

### fixed
- Type: `string`
- Default: `top`
- Required: `false`

support `top`, `bottom`, `left`, `right`

set position for reading progress bar

## Front matter

Change the reading progress bar display of the current page by use `readingShow`
- Type: `string`, `boolean`
- Required: `false`
- one of `top`, `bottom`, `left`, `right`, `true`, `false`

``` md
---
readingShow: false
---
```

## Style

If you wish to apply simple color overrides to the styling

```
+- .vuepress
  +- styles
    +- palette.styl
```

``` styl
$readingBgColor = transparent
$readingZIndex = 1000
$readingSize = 3px
$readingProgressColor = $accentColor
$readingProgressImage = none
```

#### example

``` styl
$readingProgressImage = linear-gradient(-120deg, #E50743 0%, #F9870F 15%, #E8ED30 30%, #3FA62E 45%, #3BB4D7 60%, #2F4D9E 75%, #71378A 80%)
```

## License

[MIT](http://opensource.org/licenses/MIT)
