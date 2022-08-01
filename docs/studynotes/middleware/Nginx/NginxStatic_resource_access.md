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

## Rewrite功能配置

Rewrite 是 Nginx 服务器提供的一个重要基本功能，是 Web 服务器产品中几乎必备的功能。主要的作用是用来实现 URL 的重写。

::: warning 

Nginx 服务器的 Rewrite 功能的实现依赖于 PCRE 的支持，因此在编译安装 Nginx 服务器之前，需要安装 PCRE 库。Nginx 使用的是`ngx_http_rewrite_module` 模块来解析和处理 Rewrite 功能的相关配置。

:::

### 地址重写与地址转发

重写和转发的区别:

- 地址重写浏览器地址会发生变化而地址转发则不变
- 一次地址重写会产生两次请求而一次地址转发只会产生一次请求
- 地址重写到的页面必须是一个完整的路径而地址转发则不需要
- 地址重写因为是两次请求，所以 request 范围内属性不能传递给新页面，而地址转发因为是一次请求所以可以传递值
- 地址转发速度快于地址重写

### set指令

该指令用来设置一个新的变量。

| 语法                 | 默认值 | 位置                 |
| -------------------- | ------ | -------------------- |
| set <$key> \<value>; | —      | server、location、if |

- variable：变量的名称，该变量名称要用 `$` 作为变量的第一个字符，且不能与 Nginx 服务器内置的全局变量同名。
- value：变量的值，可以是字符串、其他变量或者变量的组合等。

例如：

```nginx
server {
    listen 8081;
    server_name localhost;
    location /server {
        set $name TOM;
        set $age 18;
        default_type text/plain;
        return 200 $name=$age;
    }
}
```

访问 `https://192.168.200.133:8081:server`，返回结果如图：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220801/image.6t618fip2fo0.webp)

### Rewrite常用全局变量

| 变量               | 说明                                                         |
| ------------------ | ------------------------------------------------------------ |
| $args              | 变量中存放了请求 URL 中的请求指令。比如 `http://192.168.200.133:8080?arg1=value1&args2=value2` 中的『 arg1=value1&arg2=value2 』，功能和 $query_string 一样 |
| $http_user_agent   | 变量存储的是用户访问服务的代理信息（如果通过浏览器访问，记录的是浏览器的相关版本信息） |
| $host              | 变量存储的是访问服务器的 server_name 值                      |
| $document_uri      | 变量存储的是当前访问地址的URI。比如 `http://192.168.200.133/server?id=10&name=zhangsan`中的『 /server 』，功能和 $uri 一样 |
| $document_root     | 变量存储的是当前请求对应 location 的 root 值，如果未设置，默认指向 Nginx 自带 html 目录所在位置 |
| $content_length    | 变量存储的是请求头中的 Content-Length 的值                   |
| $content_type      | 变量存储的是请求头中的 Content-Type 的值                     |
| $http_cookie       | 变量存储的是客户端的 cookie 信息，可以通过 `add_header Set-Cookie 'cookieName=cookieValue'` 来添加 cookie 数据 |
| $limit_rate        | 变量中存储的是 Nginx 服务器对网络连接速率的限制，也就是 Nginx 配置中对 limit_rate 指令设置的值，默认是 0，不限制。 |
| $remote_addr       | 变量中存储的是客户端的 IP 地址                               |
| $remote_port       | 变量中存储了客户端与服务端建立连接的端口号                   |
| $remote_user       | 变量中存储了客户端的用户名，需要有认证模块才能获取           |
| $scheme            | 变量中存储了访问协议                                         |
| $server_addr       | 变量中存储了服务端的地址                                     |
| $server_name       | 变量中存储了客户端请求到达的服务器的名称                     |
| $server_port       | 变量中存储了客户端请求到达服务器的端口号                     |
| $server_protocol   | 变量中存储了客户端请求协议的版本，比如 『 HTTP/1.1 』        |
| $request_body_file | 变量中存储了发给后端服务器的本地文件资源的名称               |
| $request_method    | 变量中存储了客户端的请求方式，比如『 GET 』,『 POST 』等     |
| $request_filename  | 变量中存储了当前请求的资源文件的路径名                       |
| $request_uri       | 变量中存储了当前请求的 URI，并且携带请求参数，比如 `http://192.168.200.133/server?id=10&name=zhangsan` 中的 『 /server?id=10&name=zhangsan 』 |

> **例如**

```nginx
server {
    listen 8081;
    server_name localhost;
    location /server {
        root /usr/local/nginx/abc;
        set $name TOM;
        set $age 18;
        default_type text/plain;
        return 200 $name=$age=$args=$http_user_agent=$host=$document_root;
    }
}
```

访问：`http://192.168.200.133:8081/server?username=JERRY&gender=1`

效果如图：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220801/image.6s6hlgez73g0.webp)

> **可以把访问的信息记录在日志中**

```nginx {3,8}
http{
	# ......
	log_format main '$remote_addr - $request - $status - $request_uri - $http_user_agent';
    server {
        listen 8081;
        server_name localhost;
        location /server {
        	access_log logs/access.log main;
            root /usr/local/nginx/abc;
            set $name TOM;
            set $age 18;
            default_type text/plain;
            return 200 $name=$age=$args=$http_user_agent=$host=$document_root;
        }
    }
}
```

访问：`http://192.168.200.133:8081/server?username=JERRY&gender=1`

然后查看日志，效果如图：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220801/image.23y9h76w29b4.webp)

### if指令

该指令用来支持条件判断，并根据条件判断结果选择不同的 Nginx 配置。

| 语法                   | 默认值 | 位置             |
| ---------------------- | ------ | ---------------- |
| if (condition) { ... } | —      | server、location |

if 和括号之间要有空格，condition 为判定条件，可以支持以下写法：

- 变量名。如果变量名对应的值为空或者是 0，if 都判断为 false，其他条件为 true。

```nginx
if ($param){
	
}
```

+ 使用『 = 』和『 != 』比较变量和字符串是否相等，满足条件为 true，不满足为 false

```nginx
if ($request_method = POST){
	return 405;
}
```

注意：POST 和 Java 不太一样的地方是字符串不需要添加引号。

+ 使用正则表达式对变量进行匹配，匹配成功返回 true，否则返回 false。变量与正则表达式之间使用『 ~ 』，『 ~* 』，『 !~ 』，『 !~* 』来连接。
  + 『 ~ 』代表匹配正则表达式过程中区分大小写，进行模糊匹配
  + 『 ~* 』代表匹配正则表达式过程中不区分大小写，进行模糊匹配
  + 『 !~ 』和『 !~* 』刚好和上面取相反值，如果匹配上返回 false，匹配不上返回 true，进行模糊匹配

```nginx
if ($http_user_agent ~ MSIE){
	# $http_user_agent 的值中是否包含 MSIE 字符串，如果包含返回 true
}
```

+ 判断请求的文件是否存在使用『 -f 』和『 !-f 』
  + 当使用『 -f 』时，如果请求的文件存在返回 true，不存在返回 false。
  + 当使用『 !-f 』时，如果请求文件不存在，但该文件所在目录存在返回 true，文件和目录都不存在返回 false，如果文件存在返回 false。

```nginx
if (-f $request_filename){
	# 判断请求的文件是否存在
}
if (!-f $request_filename){
	# 判断请求的文件是否不存在
}
```

例如：用户访问的页面不存在，则返回一个友好的提示

```nginx
location / {
    root html;
    default_type text/html;
    # 判断请求的文件是否不存在
    if (!-f $request_filename){
        return 200 '<h1>不好意思，文件资源找不到！</h1>';
    }
}
```

- 判断请求的目录是否存在使用『 -d 』和『 !-d 』

  当使用『 -d 』时，如果请求的目录存在，返回 true，如果目录不存在则返回 false。

  当使用『 !-d 』时，如果请求的目录不存在但该目录的上级目录存在则返回 true，该目录和它上级目录都不存在则返回 false，如果请求目录存在也返回false。

### break指令

该指令用于中断当前相同作用域中的其他 Nginx 配置。与该指令处于同一作用域的 Nginx 配置中，位于它前面的指令配置生效，位于后面的指令配置无效。并且break还有另外一个功能就是终止当前的匹配并把当前的URI在本location进行重定向访问处理。

| 语法   | 默认值 | 位置                 |
| ------ | ------ | -------------------- |
| break; | —      | server、location、if |

例子：

```nginx
location /testbreak {
    default_type text/plain;
    set $username TOM;
	if ($args){
		set $username JERRY;
		break;
		set $username ROSE;
	}
    add_header username $username;
    return 200 $username;
}
```

不带参数访问：`http://192.168.200.133:8081/testbreak`

效果如图：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220802/image.2ok6tnbtnx20.webp)

带参数访问：`http://192.168.200.133:8081/testbreak/1`

效果如图：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220802/image.1f6a03pxv4ow.webp)

### return指令

该指令用于完成对请求的处理，直接向客户端返回响应状态代码。在 return 后的所有 Nginx 配置都是无效的。

| 语法                                                         | 默认值 | 位置                 |
| ------------------------------------------------------------ | ------ | -------------------- |
| return \<code> [text];</br> return \<code> \<URL>; </br>return \<URL>; | —      | server、location、if |

- code：返回给客户端的 HTTP 状态代理。可以返回的状态代码为 0 ~ 999 的任意 HTTP 状态代理
- text：返回给客户端的响应体内容，支持变量的使用和 JSON 字符串
- URL：跳转给客户端的 URL 地址。

例如：

```nginx
location / {
    default_type text/plain;
    return 200 "欢迎使用 Nginx";
}

location /baidu {
    return 302 https://www.baidu.com;
}
```

此时访问 Nginx，就会在页面看到这句话：欢迎使用 Nginx。

如果访问 `/baidu`，则跳转到 `https://www.baidu.com`。

### rewrite指令

该指令通过正则表达式的使用来改变 URI。可以同时存在一个或者多个指令，按照顺序依次对 URL 进行匹配和处理。

URL 和 URI 的区别：

- URI：统一资源标识符
- URL：统一资源定位符

| 语法                              | 默认值 | 位置                 |
| --------------------------------- | ------ | -------------------- |
| rewrite regex replacement [flag]; | —      | server、location、if |

- regex：用来匹配 URI 的正则表达式

- replacement：匹配成功后，用于替换 URI 中被截取内容的字符串。如果该字符串是以 『 http:// 』或者『 https:// 』开头的，则不会继续向下对URI 进行其他处理，而是直接返回重写后的 URI 给客户端。

  例如：（括号的值会作为 $1 的值）^ 代表匹配输入字符串的起始位置

```nginx
# ......
listen 8081;
location /rewrite {
    rewrite ^/rewrite/url\w*$ https://www.baidu.com;
    rewrite ^/rewrite/(test)\w*$ /$1;   # 如果是 /rewrite/testxxx，则重写 url 为 test
    rewrite ^/rewrite/(demo)\w*$ /$1;    # 如果是 /rewrite/demoxxx，则重写 url 为 demo
}
location /test {   # 重写后的 url 如果为 test，触发 location
    default_type text/plain;
    return 200 test_sucess;
}
location /demo {   # 重写后的 url 如果为 demo，触发 location
    default_type text/plain;
    return 200 demo_sucess;
}
```

访问 `http://192.168.200.113/8081/rewrite/urlxxx`，跳转到 `https://www.baidu.com`。

访问 `http://192.168.200.113/8081/rewrite/testxxx`，返回 test_sucess。

访问 `http://192.168.200.113/8081/rewrite/demoxxx`，返回 demo_sucess。

flag：用来设置 Rewrite 对 URI 的处理行为，可选值有如下：

- `last`：终止继续在本 location 块中处理接收到的后续 URI，并将此处重写的 URl 作为一个新的 URI，使用各 location 块进行处理。该标志将重写后的 URI 重写在 server 块中执行，为重写后的 URI 提供了转入到其他 location 块的机会。**重写地址后访问其他的 location 块，浏览器地址栏 URL 地址不变**

```nginx
# ......
listen 8081;
location /rewrite {
    rewrite ^/rewrite/(test)\w*$ /$1 last;   # 如果是 /rewrite/testxxx，则重写 url 为 test
    rewrite ^/rewrite/(demo)\w*$ $1 last;    # 如果是 /rewrite/demoxxx，则重写 url 为 demo
}
location /test {   # 重写后的 url 如果为 test，触发 location
    default_type text/plain;
    return 200 test_sucess;
}
location /demo {   # 重写后的 url 如果为 demo，触发 location
    default_type text/plain;
    return 200 demo_sucess;
}
```

访问 `http://192.168.200.113/8081/rewrite/testxxx`，返回 test_sucess。

访问 `http://192.168.200.113/8081/rewrite/demoxxx`，返回 demo_sucess。

单次访问不明显，多次访问，last 只处理第一个。

+ `break`：将此处重写的 URl 作为一个新的 URI，在本块中继续进行处理。该标志将重写后的地址在当前的 location 块中执行，不会将新的 URI 转向其他的 location 块。**仅仅重写地址，不会触发其他 location 块，浏览器地址栏 URL 地址不变**

```nginx
# ......
listen 8081;
location /rewrite {
    rewrite ^/rewrite/(test)\w*$ /$1 break;   # 如果是 /rewrite/testxxx，则重写 url 为 test
    rewrite ^/rewrite/(demo)\w*$ $1 break;    # 如果是 /rewrite/demoxxx，则重写 url 为 demo
    
    # /test 和 /demo 就在当前块进行处理，所以会在当前的 location 块找到如下 html 页面：
    # /usr/local/nginx/html/test/index.html
    # /usr/local/nginx/html/demo/index.html
}
location /test {   # 重写后的 url 如果为 test，触发 location
    default_type text/plain;
    return 200 test_sucess;
}
location /demo {   # 重写后的 url 如果为 demo，触发 location
    default_type text/plain;
    return 200 demo_sucess;
}
```

和 break 指令类似。假设访问的是 /test，则将 /test 放在当前的 location 块进行处理，哪怕第二个 location 块就是处理 /test 的，它也不会去找第二个 location 块，只在当前块进行处理。所以他会请求 `/usr/local/nginx/html/test/index.html`。

+ `redirect`：将重写后的 URI 返回给客户端，状态码为 302，指明是临时重定向 URL，主要用在 replacement 变量不是以『 http:// 』或者『 https:// 』开头的情况

```nginx
# ......
listen 8081;
location /rewrite {
    rewrite ^/rewrite/(test)\w*$ /$1 redirect;   # 如果是 /rewrite/testxxx，则重写 url 为 test
    rewrite ^/rewrite/(demo)\w*$ $1 redirect;    # 如果是 /rewrite/demoxxx，则重写 url 为 demo
}
location /test {   # 重写后的 url 如果为 test，触发 location
    default_type text/plain;
    return 200 test_sucess;
}
location /demo {   # 重写后的 url 如果为 demo，触发 location
    default_type text/plain;
    return 200 demo_sucess;
}
```

特点是重定向，就是浏览的地址栏会发送改变。如发送请求 `/testxxx`，它会重定向到 `/test`，触发第二个 location 块，浏览的地址栏也会由 `/testxxx` 变成 `/test`。

+ `permanent`：将重写后的 URI 返回给客户端，状态码为 301，指明是永久重定向 URL，主要用在 replacement 变量不是以『 http:// 』或者『 https:// 』开头的情况

```nginx
# ......
listen 8081;
location /rewrite {
    rewrite ^/rewrite/(test)\w*$ /$1 permanent;   # 如果是 /rewrite/testxxx，则重写 url 为 test
    rewrite ^/rewrite/(demo)\w*$ $1 permanent;    # 如果是 /rewrite/demoxxx，则重写 url 为 demo
}
location /test {   # 重写后的 url 如果为 test，触发 location
    default_type text/plain;
    return 200 test_sucess;
}
location /demo {   # 重写后的 url 如果为 demo，触发 location
    default_type text/plain;
    return 200 demo_sucess;
}
```

和 `redirect` 的区别就是状态码为 301，并且是永久重定向。

### flag 总结

| 标记符号  | 说明                                                 |
| --------- | ---------------------------------------------------- |
| last      | 本条规则匹配完成后继续向下匹配新的 location URI 规则 |
| break     | 本条规则匹配完成后终止，不在匹配任何规则             |
| redirect  | 返回 302 临时重定向                                  |
| permanent | 返回 301 永久重定向                                  |

- break 与 last 都停止处理后续重写规则，只不过 last 会重新发起新的请求并使用新的请求路由匹配location，但 break 不会。所以当请求 break 时，如匹配成功，则请求成功，返回 200；如果匹配失败，则返回 404
- 服务器配置好 redirect 和 permanent 之后，打开浏览器分别访问这两个请求地址，然后停止 Nginx 服务。这时再访问 redirect 请求会直接报出无法连接的错误。但是 permanent 请求是永久重定向，浏览器会忽略原始地址直接访问永久重定向之后的地址，所以请求仍然成功。（这个验证不能禁用浏览器的缓存，否则即使是 permanent 重定向，浏览器仍然会向原始地址发出请求验证之前的永久重定向是否有效）
- 对于搜索引擎来说，搜索引擎在抓取到 301 永久重定向请求响应内容的同时也会将原始的网址替换为重定向之后的网址，而对于 302 临时重定向请求则仍然会使用原始的网址并且可能会被搜索引擎认为有作弊的嫌疑。所以对于线上正式环境来讲，尽量避免使用 302 跳转
- 如果 replacement 以 「 http:// 」或「 https:// 」或「 $scheme 」开始，处理过程将终止，并将这个重定向直接返回给客户端

### rewrite_log指令

该指令配置是否开启 URL 重写日志的输出功能，默认关闭。

| 语法                     | 默认值           | 位置                       |
| ------------------------ | ---------------- | -------------------------- |
| rewrite_log <on \| off>; | rewrite_log off; | http、server、location、if |

开启后，URL 重写的相关日志将以 notice 级别输出到 error_log 指令配置的日志文件汇总。

```nginx
location /rewrite_log {
    rewrite_log on;    # 开启重写日志
	error_log logs /error.log notice;   # 切换为 notice 模式，因为只支持这个模式
    return 200 '开启了重写日志';
}
```

## Rewrite的案例

### 域名跳转

问题分析

先来看一个效果，如果我们想访问京东网站，大家都知道我们可以输入 `www.jd.com`，但是同样的我们也可以输入 `www.360buy.com` 同样也都能访问到京东网站。这个其实是因为京东刚开始的时候域名就是 `www.360buy.com`，后面由于各种原因把自己的域名换成了 `www.jd.com`，虽然说域名改变了，但是对于以前只记住了 `www.360buy.com` 的用户来说，我们如何把这部分用户也迁移到我们新域名的访问上来，针对于这个问题，我们就可以使用 Nginx 中 Rewrite 的域名跳转来解决。

### 环境准备

- 准备两个域名 www.360buy.com | www.jd.com

```sh
vim /etc/hosts
```

添加内容：

```nginx
192.168.200.133 www.360buy.com
192.168.200.133 www.jd.com
```

+ 在 `/usr/local/nginx/html/test` 目录下创建一个访问页面 frx.html

添加内容：

```html
<html>
	<title></title>
	<body>
		<h1>欢迎来到我的网站</h1>
	</body>
</html>
```

+ 通过 Nginx 实现当访问 `www.frx.com` 访问到 frx.html 页面

```nginx
server {
	listen 80;
	server_name www.frx.com;
	location / {
		root /usr/local/nginx/html/;
		index frx.html;
	}
}
```

通过 Rewrite 完成将 `www.360buy.com` 的请求跳转到 `www.jd.com`

```nginx
server {
	listen 80;
	server_name www.360buy.com;
	rewrite ^/ http://www.jd.com permanent;   # 永久重定向
}
```

**问题描述：如何在域名跳转的过程中携带请求的 URI？**

比如 `www.360buy.com?part=显示器` 变成 `www.jd.com?part=显示器`

+ 修改配置信息

```nginx
server {
	listen 80;
	server_name www.itheima.com;
	rewrite ^(.*) http://www.hm.com$1 permanent;
}
```

括号里是 `www.itheima.com` 后面出现 0 次或 多次不以 \n（换行）结尾的值，该值赋给 $1。

**问题描述：我们除了上述说的只有 www.jd.com、www.360buy.com，其实还有我们也可以通过 www.jingdong.com 来访问，那么如何通过 Rewrite 来实现多个域名的跳转?**

+ 添加域名

```sh
# 打开 hosts 文件
vim /etc/hosts

# 添加域名
192.168.200.133 www.jingdong.com
```

+ 修改配置信息

```nginx
server{
	listen 80;
	server_name www.360buy.com www.jingdong.com;
	rewrite ^(.*) http://www.jd.com$1 permanent;
}
```

多个 server_name 用空格隔开。

### 域名镜像

上述案例中，将 `www.360buy.com` 和 `www.jingdong.com` 都能跳转到 `www.jd.com`，那么 `www.jd.com` 我们就可以把它起名叫主域名，其他两个就是我们所说的镜像域名，当然如果我们不想把整个网站做镜像，只想为其中某一个子目录下的资源做镜像，比如用户可以跳到首页 Web下，而管理员跳转到后台 Web，我们可以在 location 块中配置 Rewrite 功能。

比如：

```nginx
server {
	listen 80;
	server_name rewrite.myweb.com;
	location ^~ /user {
		rewrite ^/user(.*) http://www.myweb.com/index$1 last;  # 用户跳到首页
	}
	location ^~ /manage {
		rewrite ^/manage(.*) http://www.myweb.com/manage$1 last;  # 管理员跳到后台
	}
}
```

### 独立域名

一个完整的项目包含多个模块，比如购物网站有商品商品搜索模块、商品详情模块已经购物车模块等，那么我们如何为每一个模块设置独立的域名。

需求：

- `http://search.product.com`：访问商品搜索模块
- `http://item.product.com`：访问商品详情模块
- `http://cart.product.com`：访问商品购物车模块

```nginx
server{
	listen 80;
	server_name search.product.com;
	rewrite ^(.*) http://www.shop.com/search$1 last;
}
server{
	listen 81;
	server_name item.product.com;
	rewrite ^(.*) http://www.shop.com/item$1 last;
}
server{
	listen 82;
	server_name cart.product.com;
	rewrite ^(.*) http://www.shop.com/cart$1 last;
}
```

### 自动加『/』

有时候访问的地址要求后面以 `/` 结尾，那么我们需要解决如果用户忘记输入 `/`，Nginx 就会自动加上 `/`。

通过一个例子来演示问题：

```nginx
server {
	listen	80;
	server_name localhost;
	location / {
		root html;
		index index.html;
	}
}
```

要想访问上述资源，很简单，只需要通过 `http://192.168.200.133` 直接就能访问，地址后面不需要加 /，但是如果将上述的配置修改为如下内容:

```nginx
server {
	listen	80;
	server_name localhost;
	location /frx {
		root html;
		index index.html;
	}
}
```

这个时候，要想访问上述资源，按照上述的访问方式，我们可以通过 `http://192.168.200.133/frx/` 来访问，但是如果地址后面不加斜杠，如 `http://192.168.200.133/frx`，页面就会出问题。如果不加斜杠，Nginx 服务器内部会自动做一个 301 的重定向，重定向的地址会有一个指令叫 `server_name_in_redirect` 来决定重定向的地址：

- 如果该指令为 on

  重定向的地址为：`http://server_name/目录名/`

- 如果该指令为 off

  重定向的地址为：`http://原URL中的域名/目录名/`

所以就拿刚才的地址来说，访问 `http://192.168.200.133/frx` 如果不加斜杠，那么按照上述规则：

- 如果指令 `server_name_in_redirect` 为 on，则 301 重定向地址变为 `http://localhost/frx/`，IP 发生改变，地址出现了问题
- 如果指令 `server_name_in_redirect` 为 off，则 301 重定向地址变为 `http://192.168.200.133/frx/`。这个符合我们的期望

注意 `server_name_in_redirect` 指令在 Nginx 的 0.8.48 版本之前默认都是 on，之后改成了 off，所以现在我们这个版本不需要考虑这个问题，但是如果是 0.8.48 以前的版本并且 server_name_in_redirect 设置为 on，我们如何通过 Rewrite 来解决这个问题？

解决方案

我们可以使用 Rewrite 功能为末尾没有斜杠的 URL 自动添加一个斜杠

```nginx
server {
	listen	80;
	server_name localhost;
	server_name_in_redirect on;
	location /frx {
		if (-d $request_filename){   # 如果请求的资源目录存在
			rewrite ^/(.*)([^/])$ http://$host/$1$2/ permanent; # $2 获取第二个括号的值：/
		}
	}
}
```

$1 是第一个括号的值，$2 是第二个括号的值。

### 合并目录

搜索引擎优化(SEO)是一种利用搜索引擎的搜索规则来提供目的网站的有关搜索引擎内排名的方式。我们在创建自己的站点时，可以通过很多中方式来有效的提供搜索引擎优化的程度。其中有一项就包含 URL 的目录层级，一般不要超过三层，否则的话不利于搜索引擎的搜索，也给客户端的输入带来了负担，但是将所有的文件放在一个目录下，又会导致文件资源管理混乱，并且访问文件的速度也会随着文件增多而慢下来，这两个问题是相互矛盾的，那么使用 Rewrite 如何解决这些问题呢？

举例，网站中有一个资源文件的访问路径 `/server/11/22/33/44/20.html`，也就是说 20.html 存在于第 5 级目录下，如果想要访问该资源文件，客户端的 URL 地址就要写成 `http://www.web.com/server/11/22/33/44/20.html`，并且在配置文件进行如下配置：

```nginx
server {
	listen 80;
	server_name www.web.com;
	location /server {
		root html;
	}
}
```

但是这个是非常不利于 SEO 搜索引擎优化的，同时客户端也不好记。使用 Rewrite 的正则表达式，我们可以进行如下配置：

```nginx
server {
    listen 80;
    server_name www.web.com;
    location /server {
        rewrite ^/server-([0-9]+)-([0-9]+)-([0-9]+)-([0-9]+)\.html$  /server/$1/$2/$3/$4/$5.html last;
    }
}
```

这样配置后，客户端只需要输入 `http://www.web.com/server-11-22-33-44-20.html` 就可以访问到 20.html 页面了。这里也充分利用了 Rewrite 指令支持正则表达式的特性。

### 多级域名

当你配置了多级域名，如二级域名 `xxx.frxcat.fun`，并且静态资源目录恰好和二级域名的 `xxx` 可以匹配，则可以使用正则表达式进行匹配，日后，如果又多个 `xxx`，则再创建对应的该目录即可。

```nginx
server {
	listen 80;
	server_name ~^(.+)?.frxcat.fun$;
    index idnex.html;
    if ($host = frxcat.fun){
        rewrite ^(.*)$ https://www.frxcat.fun$2 permanent;
    }
    root /data/html/$1/;
}
```

这样访问 `docs.frxcat.fun`，自动去 `/data/html/docs/` 目录下找到 index.html，如果是 `bing.youngkbt.cn`，则会去 `/data/html/bing/` 目录下找到 idnex.html，以此类推。

if 语句的作用是将 `frxcat.fun` 重定向到 `www.frxcat.fun`，这样既解决了网站的主目录访问，又可以增加 SEO 中对 `www.frxcat.fun` 的域名权重。

### 防盗链

防盗链之前我们已经介绍过了相关的知识，在 Rewrite 中的防盗链和之前将的原理其实都是一样的，只不过通过 Rewrite 可以将防盗链的功能进行完善下，当出现防盗链的情况，我们可以使用 Rewrite 将请求转发到自定义的一张图片和页面，给用户比较好的提示信息。

下面有两个配置实例：

- 根据文件类型实现防盗链配置：

```nginx
server{
	listen 80;
	server_name www.web.com;
	locatin ~* ^.+\.(gif|jpg|png|swf|flv|rar|zip)$ {
		valid_referers none blocked server_names *.web.com; # server_names 后指定具体的域名或者 IP
		if ($invalid_referer){
			rewrite ^/ http://www.web.com/images/forbidden.png;  # 跳转到默认地址
		}
	}
}
```

+ 根据目录实现防盗链配置：

```nginx
server{
	listen 80;
	server_name www.web.com;
	location /file {
		root /server/file;  # 资源在 server 目录下的 file 目录里
		valid_referers none blocked server_names *.web.com; # server_names 后指定具体的域名或者 IP
		if ($invalid_referer){
			rewrite ^/ http://www.web.com/images/forbidden.png;  # 跳转到 file 目录下的图片
		}
	}
}
```

## 访问限流

我们构建网站是为了让用户访问它们，我们希望用于合法访问。所以不得不采取一些措施限制滥用访问的用户。这种滥用指的是从同一 IP 每秒到服务器请求的连接数。因为这可能是在同一时间内，世界各地的多台机器上的爬虫机器人多次尝试爬取网站的内容。

```nginx
# 限制用户连接数来预防 DOS 攻击
limit_conn_zone $binary_remote_addr zone=perip:10m;
limit_conn_zone $server_name zone=perserver:10m;
# 限制同一客户端 ip 最大并发连接数
limit_conn perip 2;
# 限制同一server最大并发连接数
limit_conn perserver 20;
# 限制下载速度，根据自身服务器带宽配置
limit_rate 300k; 
```

## 链接超时

长时间占着连接资源不释放，最终会导致请求的堆积，Nginx 处理请求效率大大降低。所以我们对连接的控制都要注意设置超时时间，通过超时机制自动回收资源、避免资源浪费。

```nginx
# 客户端、服务端设置
server_names_hash_bucket_size 128;
server_names_hash_max_size 512;
# 长连接超时配置
keepalive_timeout  65;
client_header_timeout 15s;
client_body_timeout 15s;
send_timeout 60s;

# 代理设置
# 与后端服务器建立连接的超时时间。注意这个一般不能大于 75 秒
proxy_connect_timeout 30s;
proxy_send_timeout 120s;
# 从后端服务器读取响应的超时
proxy_read_timeout 120s;
```

## HTML引入

我们编写 .html 文件的时候，难免需要引入 css 和 js 文件，如果是在本地，那么引入非常简单，直接相对路径即可，但是部署到 Nginx 时，相对路径不再是相对 html 文件的目录，所以生产环境和开发环境的引入格式不一样。

在 Nginx 中的 .html 文件，引入 css 和 js，要加上 `/` 作为开头，`/` 代表 Nginx 的根目录，即配置文件 `location /` 的指定的 root 路径。

比如 Nginx 的配置文件内容如下：

```nginx
server {
	listen 80;
    server_name localhost;
    
    location / {
        root /usr/local/nginx/html; # 静态文件根目录
        index idnex.html;
    }
}
```

有一个 aa.html 在 `/usr/local/nginx/html/test` 目录下，并且 aa.html 引入了 aa.css 和 aa.js，两个静态文件在 aa.html 所在目录的 static 文件夹里。

```sh
/usr/local/nginx/html/test 目录
├── a.html
├── static
│	├── a.css
│	├── a.js
```

在本地环境，我们可以这样写：

```html
<link rel="stylesheet" href="static/aa.css" />
<script src="static/aa.js"></script>
```

但是部署到 Nginx 后，这样写会找不到这两个资源，因为 `/` 触发 `location /`，进入 `/usr/local/nginx/html` 目录，而这两个文件在 `/usr/local/nginx/html/test/static` 目录下，所以我们部署到 Nginx 后，需要修改为：

```html
<link rel="stylesheet" href="/test/static/aa.css" />
<script src="/test/static/aa.js"></script>
```

