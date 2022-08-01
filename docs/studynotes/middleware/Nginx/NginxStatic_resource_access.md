---
title: Nginx 静态资源访问
date: 2022-08-01 19:15:28
permalink: /middleware/Nginx/NginxStatic_resource_access
categories:
  - Nginx
tags:
  - Nginx
---
# Nginx 静态资源访问

::: tip 引言

如何访问 Nginx 的静态资源？这其中涉及到了 Nginx 的核心功能 Rewrite 重写技术，本内容将讲解处理访问静态资源的相关知识。

:::

[[toc]]

## Nginx的跨域问题

跨域问题，我们主要从以下方面进行解决：

- 什么情况下会出现跨域问题
- 实例演示跨域问题
- 具体的解决方案是什么

### 同源策略

浏览器的同源策略：是一种约定，是浏览器最核心也是最基本的安全功能，如果浏览器少了同源策略，则浏览器的正常功能可能都会受到影响。

同源：协议、域名(IP)、端口相同即为同源

```sh
http://192.168.200.131/user/1
https://192.168.200.131/user/1
# 不满足同源

http://192.168.200.131/user/1
http://192.168.200.132/user/1
# 不满足同源

http://192.168.200.131/user/1
http://192.168.200.131:8080/user/1
# 不满足同源

http://www.nginx.com/user/1
http://www.nginx.org/user/1
# 不满足同源

http://192.168.200.131/user/1
http://192.168.200.131:8080/user/1
# 不满足同源

http://www.nginx.org:80/user/1
http://www.nginx.org/user/1
# 满足同源
```

### 跨域问题

简单描述下：

有两台服务器分别为 A、B，如果从服务器 A 的页面发送异步请求到服务器 B 获取数据，如果服务器 A 和服务器 B 不满足同源策略，则就会出现跨域问题。

### 跨域案例

出现跨域问题会有什么效果？接下来通过一个需求来给大家演示下：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220801/image.vlv6telsbb4.webp)

1.  Nginx 的 html 目录下新建一个 a.html

```sh
vim /usr/local/nginx/html/a.htm
```

添加如下内容：

```html
<html>
  <head>
        <meta charset="utf-8">
        <title>跨域问题演示</title>
        <script src="jquery.js"></script>
        <script>
            $(function(){
                $("#btn").click(function(){
                        $.get('http://192.168.200.133:8080/getUser',function(data){
                                alert(JSON.stringify(data));
                        });
                });
            });
        </script>
  </head>
  <body>
        <input type="button" value="获取数据" id="btn"/>
  </body>
</html>
```

2. 在 nginx.conf 配置如下内容

```sh
vim /usr/local/nginx/conf/nginx.conf
```

```nginx
server{
    listen  8080;
    server_name localhost;
    location /getUser{
        default_type application/json;
        return 200 '{"id":1,"name":"TOM","age":18}';
    }
}
server{
	listen 	80;
	server_name localhost;
	location /{
		root html;
		index index.html;
	}
}
```

3. 通过浏览器测试访问

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220801/image.4md37urjzug0.webp)

### 解决方案

使用 `add_header` 指令，该指令可以用来添加一些头信息。

| 语法                               | 默认值 | 位置                   |
| ---------------------------------- | ------ | ---------------------- |
| add_header \<name> \<value> ...... | —      | http、server、location |

此处用来解决跨域问题，需要添加两个头信息，分别是

- `Access-Control-Allow-Origin`
- `Access-Control-Allow-Methods`

`Access-Control-Allow-Origin`：直译过来是允许跨域访问的源地址信息，可以配置多个(多个用逗号分隔)，也可以使用 `*` 代表所有源。

`Access-Control-Allow-Methods`：直译过来是允许跨域访问的请求方式，值可以为 GET、POST、PUT、DELETE ......，可以全部设置，也可以根据需要设置，多个用逗号分隔。

具体配置方式：

```nginx
location /getUser {
    add_header Access-Control-Allow-Origin *;
    add_header Access-Control-Allow-Methods GET,POST,PUT,DELETE;
    default_type application/json;   # return 的格式是 json
    return 200 '{"id":1,"name":"TOM","age":18}';
}
```

## 静态资源防盗链

### 什么是资源盗链

资源盗链指的是此内容不在自己服务器上，而是通过技术手段，绕过别人的限制将别人的内容放到自己页面上最终展示给用户。以此来盗取大网站的空间和流量。简而言之就是用别人的东西成就自己的网站。

提供两种图片进行演示：

- 京东：`https://img14.360buyimg.com/n7/jfs/t1/101062/37/2153/254169/5dcbd410E6d10ba22/4ddbd212be225fcd.jpg`
- 百度：`https://pics7.baidu.com/feed/cf1b9d16fdfaaf516f7e2011a7cda1e8f11f7a1a.jpeg?token=551979a23a0995e5e5279b8fa1a48b34&s=BD385394D2E963072FD48543030030BB`

我们在 html 目录下准备一个页面 a.html，在页面上利用 img 标签引入这两个图片:

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220801/image.614vk7i0kx80.webp)

访问：`http://192.168.200.133/a.html` 来查看效果

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220801/image.2m5u48xesf60.webp)

从上面的效果，可以看出来，下面的图片地址添加了防止盗链的功能，京东这边我们可以直接使用其图片。

### 防盗链实现原理

了解防盗链的原理之前，我们得先学习一个 HTTP 的头信息 Referer，当浏览器向 Web 服务器发送请求的时候，一般都会带上 Referer，来告诉浏览器该网页是从哪个页面链接过来的。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220801/image.64vdmkvdywk0.webp)

后台服务器可以根据获取到的这个 Referer 信息来判断是否为自己信任的网站地址，如果是则放行继续访问，如果不是则可以返回 403（服务端拒绝访问）的状态信息。

### 防盗链实现实例

在本地模拟上述的服务器效果图：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220801/image.4hr6e3mrf440.webp)

Nginx 防盗链的具体实现：

valid_referers 指令：Nginx 会通过查看 Referer 自动和 valid_referers 的内容进行匹配，如果匹配到了就将 `$invalid_referer` 变量置 0，如果没有匹配到，则将 `$invalid_referer` 变量置为 1，匹配的过程中不区分大小写。

所以我们可以在配置文件判断 `$invalid_referer` 是否等于 1（true），即没有匹配到 ，等于则返回 403。

| 语法                                                         | 默认值 | 位置             |
| ------------------------------------------------------------ | ------ | ---------------- |
| valid_referers <none \| blocked \| server_names \| string> ...... | —      | server、location |

- none：如果 Header 中的 Referer 为空，允许访问
- blocked：在 Header 中的 Referer 不为空，但是该值被防火墙或代理进行伪装过，如不带『 http:// 』 、『 https:// 』等协议头的资源才允许访问。
- server_names：指定具体的域名或者 IP
- string：可以支持正则表达式和 `*` 的字符串。如果是正则表达式，需要以 `~` 开头表示

例如：

```nginx
location ~ *\.(png|jpg|gif){
    valid_referers none blocked www.baidu.com 192.168.91.200;
    
    # valid_referers none blocked *.example.com example.*  www.example.org  ~\.google\.;
    
    if ($invalid_referer){
        return 403;
    }
    root /usr/local/nginx/html;
}
```

上方代码如果没有匹配上 `www.baidu.com` 和 `192.168.91.200`，则 `$invalid_referer` 为 1（true），返回 403，代表不允许获取资源。

Nginx 配置文件支持 if 判断，但是 if 后面必须有空格。

**问题：如果图片有很多，该如何批量进行防盗链？可以针对目录进行防盗链。**

### 针对目录防盗链

假设 html 目录下有一个 images 目录，里面专门放防盗链的图片。

配置如下：

```nginx
location /images {
    valid_referers none blocked www.baidu.com 192.168.199.27;
    
    # valid_referers none blocked *.example.com example.*  www.example.org  ~\.google\.;
    
    if ($invalid_referer){
        return 403;
    }
    root /usr/local/nginx/html;
}
```

只需将 location 的地址改成一个目录，这样我们可以对一个目录下的所有资源进行翻到了操作。

**问题：Referer 的限制比较粗，比如浏览器发送请求时恶意加一个 Referer，上面的方式是无法进行限制的。那么这个问题改如何解决？**

此时我们需要用到 Nginx 的第三方模块 `ngx_http_accesskey_module`，第三方模块如何实现盗链，如何在 Nginx 中使用第三方模块的功能，在后面有讲解。