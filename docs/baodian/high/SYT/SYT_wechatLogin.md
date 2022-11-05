---
title: 尚医通-微信登录
date: 2022-11-06 00:37:43
permalink: /high/SYT/SYT_wechatLogin
categories:
  - 中高进阶篇
tags:
  - 中高进阶篇
---
# 尚医通-微信登录

[[toc]]

## OAuth2

### OAuth2 解决什么问题

#### 开放系统间授权

照片拥有者想要在云冲印服务上打印照片，云冲印服务需要访问云存储服务上的资源

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221105/image.3qbdx7nxkw80.webp)

#### 图例

资源拥有者：照片拥有者

客户应用：云冲印

受保护的资源：照片

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221105/image.1i1db73t8sps.webp)

#### 方式一：用户名密码复制

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221105/image.pvhhq53vjw0.webp)

用户将自己的"云存储"服务的用户名和密码，告诉"云冲印"，后者就可以读取用户的照片了。这样的做法有以下几个严重的缺点。

1. "云冲印"为了后续的服务，会保存用户的密码，这样很不安全。
2. Google不得不部署密码登录，而我们知道，单纯的密码登录并不安全。
3. "云冲印"拥有了获取用户储存在Google所有资料的权力，用户没法限制"云冲印"获得授权的范围和有效期。
4. 用户只有修改密码，才能收回赋予"云冲印"的权力。但是这样做，会使得其他所有获得用户授权的第三方应用程序全部失效。
5. 只要有一个第三方应用程序被破解，就会导致用户密码泄漏，以及所有被密码保护的数据泄漏。

::: tip 总结

将受保护的资源中的用户名和密码存储在客户应用的服务器上，使用时直接使用这个用户名和密码登录

适用于同一公司内部的多个系统，不适用于不受信的第三方应用

:::

#### 方式二：通用开发者key

适用于合作商或者授信的不同业务部门之间

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221105/image.2vz4ip6q3pm0.webp)

#### 方式三：颁发令牌

接近OAuth2方式，需要考虑如何管理令牌、颁发令牌、吊销令牌，需要统一的协议，因此就有了OAuth2协议

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221105/image.2y79wpk9zuk0.webp)

**令牌类比仆从钥匙**

### OAuth2 最简向导

#### OAuth 主要角色

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221105/image.6rm0atekmmk0.webp)

### OAuth2 的应用

#### 微服务安全

现代微服务中系统微服务化以及应用的形态和设备类型增多，不能用传统的登录方式

核心的技术不是用户名和密码，而是token，由AuthServer颁发token，用户使用token进行登录

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221105/image.4tqcnjq0zoc0.webp)

#### 社交登录

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221105/image.2pslhkildns0.webp)

## 微信登录介绍

### 前期准备

1. 注册

微信开放平台：[https://open.weixin.qq.com](https://open.weixin.qq.com)

2. 邮箱激活
3. 完善开发者资料
4. 开发者资质认证

准备营业执照，1-2个工作日审批、300元

5. 创建网站应用

提交审核，7个工作日审批

6. 内网穿透

ngrok的使用

### 授权流程

参考文档：[https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1419316505&token=e547653f995d8f402704d5cb2945177dc8aa4e7e&lang=zh_CN](https://open.weixin.qq.com/cgi-bin/showdocument?action=dir_list&t=resource/res_list&verify=1&id=open1419316505&token=e547653f995d8f402704d5cb2945177dc8aa4e7e&lang=zh_CN)

**获取access_token时序图**

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221105/image.ffug23frnko.webp)

第一步：请求CODE（生成授权URL）

第二步：通过code获取access_token（开发回调URL）

## 服务端开发

操作模块：service-user

说明：微信登录二维码我们是以弹出层的形式打开，不是以页面形式，所以做法是不一样的，参考如下链接，上面有相关弹出层的方式

[https://developers.weixin.qq.com/doc/oplatform/Website_App/WeChat_Login/Wechat_Login.html](https://developers.weixin.qq.com/doc/oplatform/Website_App/WeChat_Login/Wechat_Login.html)

如图：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20221105/image.2e58lcmi3ou8.webp)

因此我们的操作步骤为：

第一步我们通过接口把对应参数返回页面；

第二步在头部页面启动打开微信登录二维码；

第三步处理登录回调接口；

第四步回调返回页面通知微信登录层回调成功

第五步如果是第一次扫描登录，则绑定手机号码，登录成功

