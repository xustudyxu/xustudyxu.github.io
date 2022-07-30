---
title: Nginx 静态资源部署
date: 2022-07-31 00:24:20
permalink: /middleware/Nginx/Nginx_Static_resource_deployment
categories:
  - Nginx
tags:
  - Nginx
---
# Nginx 静态资源部署

::: tip 引言

静态资源如何部署？本内容带你了解静态资源相关的操作和内容。

静态资源指令配置、静态资源优化配置、静态资源压缩配置、静态资源缓存配置。

:::

[[toc]]

## Nginx静态资源概述

上网去搜索访问资源对于我们来说并不陌生，通过浏览器发送一个 HTTP 请求实现从客户端发送请求到服务器端获取所需要内容后并把内容回显展示在页面的一个过程。这个时候，我们所请求的内容就分为两种类型，一类是静态资源、一类是动态资源。

静态资源即指在服务器端真实存在并且能直接拿来展示的一些文件，比如常见的 html 页面、css 文件、js 文件、图片、视频等资源；

动态资源即指在服务器端真实存在但是要想获取需要经过一定的业务逻辑处理，根据不同的条件展示在页面不同这 一部分内容，比如说报表数据展示、根据当前登录用户展示相关具体数据等资源；

Nginx 处理静态资源的内容，我们需要考虑下面这几个问题：

- 静态资源的配置指令
- 静态资源的配置优化
- 静态资源的压缩配置指令
- 静态资源的缓存处理
- 静态资源的访问控制，包括跨域问题和防盗链问题

## 静态资源指令配置

### listen指令

该指令是用来配置监听端口。默认监听 80（root 启动 Nginx） 和 8000（非 root 启动 Nginx） 端口。

| 语法                                                         | 默认值                | 位置   |
| ------------------------------------------------------------ | --------------------- | ------ |
| listen \<address>[:port] [default_server] ...... ;</br> listen \<port> [default_server] ...... ; | listen *:80 \| *:8000 | server |

`listen` 指令的设置比较灵活，我们通过几个例子来把常用的设置方式熟悉下：

```sh
listen 127.0.0.1:8000; # listen localhost:8000 监听指定的IP和端口
listen 127.0.0.1;	# 监听指定IP的所有端口
listen 8000;	# 监听指定端口上的连接
listen *:8000;	# 监听指定端口上的连接
```

`default_server` 属性是标识符，用来将此虚拟主机设置成默认主机。所谓的默认主机指的是如果没有匹配到对应的 `address:port`，则会执行默认的 server。如果不指定该标识符，又没有匹配到对应的 `address:port` 时，默认使用的是第一个 server，所以第一个 server 要好好设置，建议第一个 server 就加上 `default_server`。

```nginx {10}
server{
	listen 8080;
	server_name 127.0.0.1;
	location / {
		root html;
		index index.html;
	}
}
server{
	listen 8080 default_server;
	server_name localhost;
	default_type text/plain;
	return 444 'This is a error request';
}
```

此时访问 8080 端口，它会访问第二个 server，如果第二个 server 去掉 `default_server` ，则默认访问第一个 server。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220730/image.2e5c4uo1ghlw.webp)

### server_name指令

该指令用来设置虚拟主机服务名称。默认为空。

比如 127.0.0.1、localhost、域名[www.baidu.com | www.jd.com]。

| 语法                         | 默认值          | 位置   |
| ---------------------------- | --------------- | ------ |
| server_name \<name> ...... ; | server_name ""; | server |

- name 可以提供多个中间用空格分隔。

关于 server_name 的配置方式有三种，分别是：

- 精确匹配
- 通配符匹配
- 正则表达式匹配

> **配置方式一：精确匹配**

如：

```nginx
server {
	listen 80;
	server_name www.frx.com www.bing.com;
	...
}
```

此时以 `www.frx.com` 或者 `www.bing.com` 域名进行访问，就会跳转到 Nginx 的欢迎页面，前提是你需要拥有该域名，并且该域名和 Nginx 所在的系统 IP 进行绑定。

所以我可以利用 hosts 文件进行「模拟」域名。

> 补充小知识点

hosts 是一个没有扩展名的系统文件，可以用记事本等工具打开，其作用就是将一些常用的网址域名与其对应的IP地址建立一个关联「数据库」，当用户在浏览器中输入一个需要登录的网址时，系统会首先自动从 hosts 文件中寻找对应的IP地址，一旦找到，系统会立即打开对应网页，如果没有找到，则系统会再将网址提交 DNS 域名解析服务器进行 IP 地址的解析。

hosts 文件不同系统的位置：

- 在 windows 的位置：C:\Windows\System32\drivers\etc
- 在 centos 的位置：/etc/hosts

因为域名是要收取一定的费用，所以我们可以使用修改 hosts 文件来制作一些虚拟域名来使用。需要修改 `/etc/hosts` 文件来添加

```sh
# 进入 hosts 文件
vim /etc/hosts

# 添加内容
127.0.0.1 www.frx.com
127.0.0.1 www.bing.com
```

+ 访问测试

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220730/image.3nbv3p1703y0.webp)

>  **配置方式二：使用通配符配置**

server_name 指令支持通配符 *，但需要注意的是通配符不能出现在域名的中间，只能出现在首段或尾段，如：

```nginx
server {
	listen 80;
	server_name  *.frx.com	www.frx.*;
	# www.frx.cn abc.frx.cn www.bing.cn www.frx.com
	...
}
```

下面的配置就会报错，因为 * 不能出现在域名的中间和与其他字符串联使用

```nginx
server {
	listen 80;
	server_name  www.*.cn www.frx.c*
	...
}
```

```nginx
server {
	listen 80;
	server_name  .frx.com
	...
}
```

`.frx.com` 相当于 `*..frx.com` + `frx.com`

> **配置三：使用正则表达式配置**

server_name 指令可以使用正则表达式，并且使用 `~` 作为正则表达式字符串的开始标记。

常见的正则表达式：

| 代码  | 说明                                                       |
| ----- | ---------------------------------------------------------- |
| ^     | 匹配搜索字符串开始位置                                     |
| $     | 匹配搜索字符串结束位置                                     |
| .     | 匹配除换行符 \n 之外的任何单个字符                         |
| \     | 转义字符，将下一个字符标记为特殊字符                       |
| [xyz] | 字符集，与任意一个指定字符匹配                             |
| [a-z] | 字符范围，匹配指定范围内的任何字符                         |
| \w    | 与以下任意字符匹配 A-Z a-z 0-9 和下划线,等效于[A-Za-z0-9_] |
| \d    | 数字字符匹配，等效于[0-9]                                  |
| {n}   | 正好匹配 n 次                                              |
| {n,}  | 至少匹配 n 次                                              |
| {n,m} | 匹配至少 n 次至多 m 次                                     |
| *     | 零次或多次，等效于{0,}                                     |
| +     | 一次或多次，等效于{1,}                                     |
| ?     | 零次或一次，等效于{0,1}                                    |

配置如下：

```nginx
server{
	listen 80;
    server_name ~^www\.(\w+)\.com$;
    default_type text/plain;
    return 200 $1;
}
```

**注意 ~ 后面不能加空格**。括号代表可以在 Ngxin 配置文件内获取其中的值，如上方的 (\w+) 的内容可以用 $1 获取到参数，如果有多个括号，依次使用 $2 $3 ...... 获取。

比如现在访问 `http://www.frx.com`，则返回 frx 到页面上，因为frx 被放在 $1 处：`return 200 frx`。

::: tip 这里进行说明：server_name 配置了 localhost 和配置 IP 或者域名的区别

localhost 是「虚拟 IP」，如果不是本机访问，而是外界访问，那么这个就是无效的，但是为什么学习阶段的时候都不改呢，因为当 Nginx 没有匹配到指定的 `server_name`，默认找到第一个 server 块，而 Nginx 默认的第一个 server 块就是 localhost，哪怕你把 localhost 改为其他的，如 hello，它也能访问。只是因为在匹配不到的情况下，默认是第一个 service 块，哪怕它确实和访问的 IP 不匹配。

IP 如果和域名进行了绑定，那么在 `server_name` 中，两者都可以填写，填了域名，最后也是找到 IP，只是因为域名好记住。

:::

知道了区别，在生产环境上，可以给个指定的错误页面。如果匹配不上，则返回友好的提示，如第一个 server 块：

```nginx
server{
	listen 80 default_server;
    server_name _;    # 匹配不上的时候，也可以填写 localhost
    return "<h1>不好意思，匹配不到！";
    # return 403;   # 也可以直接返回错误码
    # 
}

server{
	listen 80;
    server_name www.frxcat.fun;    # 匹配域名访问
    # ......
}
```

上面代码块只允许域名访问，而不允许 IP 访问，避免其他人把未备案的域名解析到自己的服务器 IP。

当然你也可以不设置错误页面。因为 Nginx 匹配不上时，直接返回它的欢迎界面。

### 匹配执行顺序

由于 server_name 指令支持通配符和正则表达式，因此在包含多个虚拟主机的配置文件中，可能会出现一个名称被多个虚拟主机的 server_name 匹配成功，当遇到这种情况，当前的请求交给谁来处理呢？如下：

```nginx
server{
	listen 80;
	server_name ~^www\.\w+\.com$;
	default_type text/plain;
	return 200 'regex_success';
}

server{
	listen 80;
	server_name www.frx.*;
	default_type text/plain;
	return 200 'wildcard_after_success';
}

server{
	listen 80;
	server_name *.frx.com;
	default_type text/plain;
	return 200 'wildcard_before_success';
}

server{
	listen 80;
	server_name www.frx.com;
	default_type text/plain;
	return 200 'exact_success';
}

server{
	listen 80 default_server;
	server_name _;
	default_type text/plain;
	return 444 'default_server not found server';
}
```

访问 `http://www.kele.com` 的优先级：（访问完后请注释掉处理这个请求的 server）

- exact_success（第一个是精确匹配，然后注释掉该 server）
- wildcard_before_success（第二个是开始匹配符，然后注释掉该 server）
- wildcard_after_success（第三个是结尾匹配符，然后注释掉该 server）
- regex_success（第四个是正则表达式，然后注释掉该 server）
- default_server not found server!!（第五个是默认 server，因为前四个都注释了，所以只能走默认的 server）

**结论**

No1：准确匹配 server_name

No2：通配符在开始时匹配 server_name 成功

No3：通配符在结束时匹配 server_name 成功

No4：正则表达式匹配 server_name 成功

No5：被默认的 default_server 处理，如果没有指定默认找第一个 server

### location指令

`location` 指令是用来设置请求的 URI。

```nginx
server{
	listen 80;
	server_name localhost;
	location / {
	
	}
	location /abc {
	
	}
	...
}
```

| 语法                                             | 默认值 | 位置             |
| ------------------------------------------------ | ------ | ---------------- |
| location [ = \| ~ \| ~* \| ^~ \| @ ] \<uri>{...} | —      | server、location |

uri 变量是待匹配的请求字符串，可以不包含正则表达式，也可以包含正则表达式，那么 Nginx 服务器在搜索匹配 location 的时候，是先使用不包含正则表达式进行匹配，找到一个匹配度最高的一个，然后在通过包含正则表达式的进行匹配，**如果能匹配到直接访问正则表达式的，匹配不到，就使用刚才匹配度最高（前缀最长的）的那个 location 来处理请求**。

属性介绍:

不带符号，要求必须以指定模式开头，但是不要求精确匹配

```nginx
server {
	listen 80;
	server_name 127.0.0.1;
	location /abc {
		default_type text/plain;
		return 200 "access success";
	}
}

# 以下访问都是正确的
http://192.168.91.200/abc
http://192.168.91.200/abc?p1=kele
http://192.168.91.200/abc/
http://192.168.91.200/abcdef
```

`=` 是用于不包含正则表达式的 uri，必须与指定的模式精确匹配

```nginx
server {
	listen 80;
	server_name 127.0.0.1;
	location =/abc {
		default_type text/plain;
		return 200 "access success";
	}
}
# 匹配成功
http://192.168.91.200/abc
http://192.168.91.200/abc?p1=TOM
# 匹配失败
http://192.168.91.200/abc/
http://192.168.91.200/abcdef
```

`~` 是用于表示当前 uri 中包含了正则表达式，并且区分大小写

`~*` 是用于表示当前 uri 中包含了正则表达式，但是是不区分大小写

换句话说，**如果 uri 包含了正则表达式，需要用上述两个符号来标识**

```nginx
# 使用正则表达式，区分大小写
server {
	listen 80;
	server_name 127.0.0.1;
	location ~^/abc\w$ {
		default_type text/plain;
		return 200 "access success";
	}
}

# 使用正则表达式，不区分大小写
server {
	listen 80;
	server_name 127.0.0.1;
	location ~*^/abc\w$ {
		default_type text/plain;
		return 200 "access success";
	}
}
```

`^~` 是用于不包含正则表达式的 uri，功能和不加符号的一致，唯一不同的是，如果请求匹配上了，那么就停止搜索其他模式了。

```nginx
server {
	listen 80;
	server_name 127.0.0.1;
	location ^~/abc {
		default_type text/plain;
		return 200 "access success";
	}
}
```

`@` 前缀可以用来定义一个命名的 location,该 location 不处理正常的外部请求,一般用来当作标识供内部重定向使用。它们不能嵌套,也不能包含嵌套的 location。

```nginx
location /try {
    try_files $uri $uri/ @name;
}

location /error {
    error_page 404 = @name;
    return 404;
}

location @name {
    return 200 "@name";
}
```

这时访问 `/try` 或者 `/error` 都会返回 `@name`。

