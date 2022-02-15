# Change Log

[README](README.md) | [CHANGELOG](CHANGELOG.md)

## 1.0.5
- up readme.md

## 1.0.4
- add lastPost and nextPost information on the `$list`

  If you are in the post page. you can get
  ``` js
  {
    index,
    total,
    dir,
    lastPost,
    nextPost
  }
  ```
  from `this.$list`

## 1.0.3
- change pagination

  Keep the `$tags`, `$categories` and `$lists` concise

  Get the current page by `this.$route.meta.current`

- change paginatioPath default

  default: `page/`

## 1.0.2
- fix tags link

## 1.0.1
- fix bug
