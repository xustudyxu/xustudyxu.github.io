<div align="center">

Vuepress Plugin Qrcode

![GitHub package.json version](https://img.shields.io/github/package-json/v/openHacking/vuepress-plugin-qrcode?style=flat-square)
[![GitHub license](https://img.shields.io/github/license/openHacking/vuepress-plugin-qrcode?style=flat-square)](https://github.com/openHacking/vuepress-plugin-qrcode)
</div>

English| [简体中文](./README-zh.md)

## Introduction

Vuepress Plugin Qrcode is a Vuepress plugin that displays the QR code of the current URL for mobile devices to scan.

## Documentation

- [Official Demo](https://openhacking.github.io/vuepress-template/)
- [Community case](https://dushusir.github.io/blog/)

![Demo](./assets/vuepress-plugin-qrcode-demo.png)

## Installation

```sh
yarn add -D vuepress-plugin-qrcode
# OR npm install -D vuepress-plugin-qrcode
```

## Usage

- Case One: Use without configuration
```js
module.exports = {
  plugins: ['qrcode']
}
```
- Case Two: set optional configuration,displayed text and QR code size
```js
module.exports = {
  plugins: [
    ['qrcode',{
        labelText:'Mobile Read', // displayed text
        size:'small' // QR code size
    }]
  ]
}
```
- Case Three: Multi-language configuration
```js
module.exports = {
  plugins: [
    ['qrcode',{
        // "/" and "/zh/" correspond to the path set by locales
        labelText: {
          "/": "QRCode", 
          "/zh/": "二维码",
        },
        size:'small' // QR code size
    }]
  ]
}
```
- Case Four: Adding parameters to the address, the mark comes from the QR code
```js
module.exports = {
  plugins: [
    ['qrcode',{
        channel:true, //Add mark
    }]
  ]
}

## Configuration(optional)

### labelText
- Type: `string`
- Default: `Mobile Read`   
Click the button to pop up the QR code, the text of the button.

  + Directly set `labelText` as a string, for example:
  ```js
  labelText:'QRCode'
  ```

  + Or configure different displays according to the site's multi-language configuration, such as:
  ```js
  labelText: {
    "/": "QRCode",
    "/zh/": "二维码",
  }
  ```

  > Refer to [Vuepress Internationalization](https://vuepress.vuejs.org/guide/i18n.html#internationalization)

### size
- Type: `string | number`
- Default: `small`    
Set the size of the QR code.

  + Can be a string, possible values are:
    - `small`: stands for 100px * 100px
    - `medium`: stands for 150px * 150px
    - `big`: stands for 200px * 200px

    such as:
    ```js
    size:'big'
    ```

  + Or set the specific value you think is appropriate, the recommended values are:
    - `80`: stands for 80px * 80px
    - `120`: stands for 120px * 120px

    such as:
    ```js
    size: 120
    ```

### channel
- Type: `boolean`
- Default: `false`    
Whether to add a parameter at the end of the QR code address to mark that the access comes from the QR code, so as to facilitate statistics on the access effect of mobile phone scanning, such as:
  ```js
  channel:true
  ```

## Sponsor

If you think this project is useful or inspiring for you, you can buy the author a glass of juice:

- [Paypal me](https://paypal.me/AlexLiu518)
- [Buy me a coffee](https://www.buymeacoffee.com/openHacking)

And contact the author to add to the sponsors list: alexliu518@gmail.com

## Sponsors List

- [Dushusir](https://dushusir.github.io)

## Resources

- [vuepress](https://vuepress.vuejs.org/)
- [vuepress plugins](https://github.com/vuepress/awesome-vuepress#plugins)