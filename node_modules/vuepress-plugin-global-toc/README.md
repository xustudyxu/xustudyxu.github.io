# vuepress-plugin-global-toc

[![NPM version](https://badgen.net/npm/v/vuepress-plugin-global-toc)](https://npmjs.com/package/vuepress-plugin-global-toc) [![NPM downloads](https://badgen.net/npm/dm/vuepress-plugin-global-toc)](https://npmjs.com/package/vuepress-plugin-global-toc)

> This plugin requires VuePress >= **1.0.0**.

## Features

- Add a `<GlobalTableOfContents />` component that you can use in your markdown instead of `[[toc]]` to get a global Table of Contents, i.e. a table of contents that covers the entire vuepress website.
- Internally uses the same function that retrieves the items in the sidebar

## Install

```bash
npm i vuepress-plugin-global-toc
```

## Usage

Using this plugin:

```javascript
// .vuepress/config.js
module.exports = {
  plugins: ['vuepress-plugin-global-toc']
}
```

then add your table of components where you please in your markdown pages:

```mdx
# Table of contents

<GlobalTableOfContents />
```