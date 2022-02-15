# vuepress-plugin-permalink-pinyin

[![npm](https://img.shields.io/npm/v/vuepress-plugin-permalink-pinyin.svg)](https://www.npmjs.com/package/vuepress-plugin-permalink-pinyin)
[![LICENSE](https://img.shields.io/npm/l/vuepress-plugin-permalink-pinyin.svg)](https://github.com/viko16/vuepress-plugin-permalink-pinyin/blob/master/LICENSE)
[![Dependency Status](https://david-dm.org/viko16/vuepress-plugin-permalink-pinyin.svg?theme=shields.io)](https://david-dm.org/viko16/vuepress-plugin-permalink-pinyin)


A VuePress plugin which convert Chinese title to transliterate permalink.

> `/你今日饮咗未.md` => `/ni-jin-ri-yin-zuo-wei.html`

## Installation

> Note: Work For VuePress 1.x.x

```bash
npm i vuepress-plugin-permalink-pinyin --save-dev
# or
yarn add vuepress-plugin-permalink-pinyin --dev
```

## Usage

Modify your `.vuepress/config.js` and add into the `plugins` option.

```js
plugins: ['permalink-pinyin']
```

## Options

Pass any options of [transliteration#slugify](https://github.com/dzcpy/transliteration#slugifystr-options)

```js
plugins: {
  'permalink-pinyin': {
    lowercase: true, // Converted into lowercase, default: true
    separator: '-' // Separator of the slug, default: '-'
  }
}
```

## Test

```bash
npm test
```

## Related Projects

- Hexo version: https://github.com/viko16/hexo-permalink-pinyin

## License

[MIT License](https://opensource.org/licenses/MIT) © [viko16](https://github.com/viko16)
