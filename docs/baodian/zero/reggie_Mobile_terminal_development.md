---
title: 瑞吉外卖-移动端开发
date: 2022-05-14 22:19:07
permalink: /pages/684cf3/
categories:
  - 初级开发篇
tags:
  - 初级开发篇
---
# 瑞吉外卖-移动端开发

[[toc]]

## 短信发送

### 短信发送介绍

目前市面上有很多第三方提供的短信服务，这些第三方短信服务会和各个运营商（移动、联通、电信）对接，我们只需要注册成为会员并且按照提供的开发文档进行调用就可以发送短信。需要说明的是，这些短信服务一般都是收费服务。

常用短信服务：

+ 阿里云
+ 华为云
+ 腾讯云
+ 京东
+ 梦网
+ 乐信

### 腾讯云短信服务-介绍

腾讯云短信（Short Message Service，SMS）可为广大企业级用户提供稳定可靠，安全合规的短信触达服务。用户可快速接入，调用 API / SDK 或者通过控制台即可发送，支持发送验证码、通知类短信和营销短信。国内验证短信秒级触达，99%到达率；国际/港澳台短信覆盖全球200+国家/地区，全球多服务站点，稳定可靠。

应用场景:

+ 验证码
+ 短信通知
+ 推广短信

![OcbcIU.png](https://s1.ax1x.com/2022/05/14/OcbcIU.png)

### 腾讯云短信服务-注册账号

+ 腾讯云官网:https://cloud.tencent.com/
+ 点击官网页面注册按钮，跳转到如下注册页面：

![OcHxET.png](https://s1.ax1x.com/2022/05/14/OcHxET.png)

### 腾讯云短信服务-创建签名

+ 搜索产品中的短信服务

> 创建签名，自用必须有网站、APP、公众号、小程序等

![OcbQxA.png](https://s1.ax1x.com/2022/05/14/OcbQxA.png)

> 待审核

### 腾讯云短信服务-创建正文模板

![image](https://fastly.jsdelivr.net/gh/xustudyxu/image-hosting@master/image.3r0aq6q44bg0.webp)

### 腾讯云短信服务-发送短信

![XuYuWV.png](https://s1.ax1x.com/2022/05/28/XuYuWV.png)

