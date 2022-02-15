<div align="center">

Vuepress Plugin Qrcode

![GitHub package.json version](https://img.shields.io/github/package-json/v/openHacking/vuepress-plugin-qrcode?style=flat-square)
[![GitHub license](https://img.shields.io/github/license/openHacking/vuepress-plugin-qrcode?style=flat-square)](https://github.com/openHacking/vuepress-plugin-qrcode)
</div>

简体中文 | [English](./README.md)

## 介绍

Vuepress Plugin Qrcode是一个展示当前网址二维码供移动设备扫描的Vuepress插件

## 文档

- [官方Demo](https://openhacking.github.io/vuepress-template/zh/)
- [社区案例](https://dushusir.github.io/blog/)

![Demo](./assets/vuepress-plugin-qrcode-demo.png)

## 安装

```sh
yarn add -D vuepress-plugin-qrcode
# OR npm install -D vuepress-plugin-qrcode
```

## 使用

- 案例一：不加配置直接使用
```js
module.exports = {
  plugins: ['qrcode']
}
```
- 案例二：设置可选配置，显示的文本和二维码大小
```js
module.exports = {
  plugins: [
    ['qrcode',{
        labelText:'Mobile Read', //显示的文本
        size:'small' // 二维码大小
    }]
  ]
}
```
- 案例三：多语言配置
```js
module.exports = {
  plugins: [
    ['qrcode',{
        // "/"和"/zh/"对应locales设置的路径
        labelText: {
          "/": "QRCode", 
          "/zh/": "二维码",
        },
        size:'small' // 二维码大小
    }]
  ]
}
```
- 案例四：地址添加参数，标记来自二维码
```js
module.exports = {
  plugins: [
    ['qrcode',{
        channel:true, //添加标记
    }]
  ]
}
```

## 配置(可选)

### labelText
- 类型: `string ｜ object`
- 默认值: `Mobile Read`   
点击按钮弹出二维码，按钮的文字。

  + 可以直接`labelText`为一个字符串，比如：
  ```js
  labelText: '二维码'
  ```

  + 或者根据站点多语言配置不同的显示，比如：
  ```js
  labelText: {
    "/": "QRCode", 
    "/zh/": "二维码",
  }
  ```

  > 参考 [vuepress多语言支持](https://vuepress.vuejs.org/zh/guide/i18n.html#%E5%A4%9A%E8%AF%AD%E8%A8%80%E6%94%AF%E6%8C%81)

### size
- 类型: `string | number`
- 默认值: `small`    
设置二维码大小
    + 可以为一个字符串，可能的值有：
      - `small`：代表100px * 100px
      - `medium`：代表150px * 150px
      - `big`：代表200px * 200px

      比如：
      ```js
      size:'big'
      ```
    
    + 或者设定你认为合适的具体数值，推荐的值有：
      - `80`：代表80px * 80px
      - `120`：代表120px * 120px

      比如：
      ```js
      size: 120
      ```

### channel
- 类型: `boolean`
- 默认值: `false`    
是否在二维码地址尾部添加参数，用于标记访问来自二维码，便于统计手机扫描的访问效果，比如：
  ```js
  channel:true
  ```

## 赞助

如果你觉得这个项目对你有用或者有所启发，可以请作者喝杯果汁：
| 微信捐赠  | 支付宝捐赠
|---|---|
| <img src="./assets/wechat.jpg" width="140" />| <img src="./assets/alipay.jpg" width="140" />

并联系作者加到赞助者列表： alexliu518@gmail.com

## 赞助者列表

- [Dushusir](https://dushusir.github.io)

## 资源

- [vuepress](https://vuepress.vuejs.org/)
- [vuepress plugins](https://github.com/vuepress/awesome-vuepress#plugins)