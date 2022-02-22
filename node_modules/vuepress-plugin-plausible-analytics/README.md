# vuepress-plugin-plausible-analytics

VuePress plugin to add analytics from plausible.io

## Install

Run command:

```bash
yarn add -D vuepress-plugin-plausible-analytics
```

## Usage

Add in file `.vuepress/config.js`:

```js
module.exports = {
  plugins: [
    "plausible-analytics",
  ]
}
```

## Configuration

Pass `domain` to use your custom domain:

```js
module.exports = {
  plugins: [
    ["plausible-analytics", {
      domain: 'stats.yoursite.com'
    }]
  ]
}
```

## License

MIT
