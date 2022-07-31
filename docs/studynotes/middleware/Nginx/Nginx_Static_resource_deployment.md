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

### root/alias指令

+ `root` 指令是设置请求资源的根目录。默认值是 html。

| 语法          | 默认值     | 位置                   |
| ------------- | ---------- | ---------------------- |
| root \<path>; | root html; | http、server、location |

path 是 Nginx 服务器接收到请求以后查找资源的根目录路径。

+ `alias` 指令是用来更改 location 的 URI。

| 语法           | 默认值 | 位置     |
| -------------- | ------ | -------- |
| alias \<path>; | —      | location |

- path 是修改后的根路径。

**以上两个指令都可以来指定访问资源的路径，那么这两者之间的区别是什么？**

> **举例说明**

1. 在 `/usr/local/nginx/html` 目录下创建一个 images 目录,并在目录下放入一张图片 `mv.png` 图片。

   然后进入配置文件，添加如下内容：

```nginx
location /images {
    root /usr/local/nginx/html;
}
```

访问图片的路径为：`http://192.168.91.200/images/mv.png`

2. 如果把root改为alias

```nginx
location /images {
    alias /usr/local/nginx/html;
}
```

再次访问上述地址，页面会出现 404 的错误，查看错误日志会发现是因为地址不对，所以验证了：

- root 的处理结果是：**root 路径 + location 路径**，location 路径包括匹配后面的请求，即包括 /mv.png

  `/usr/local/nginx/html/images/mv.png`

+ alias 的处理结果是：**使用 alias 路径替换 location 路径**，但是不会替换匹配后面的请求，即不会替换 /mv.png

需要在 alias 后面路径改为：

```nginx
location /images {
    alias /usr/local/nginx/html/images;
}
```

3. 如果 location 路径是以 / 结尾,则 alias 也必须是以 / 结尾，root 没有要求。

将上述配置修改为：

```nginx
location /images/ {
    alias /usr/local/nginx/html/images;
}
```

访问就会出问题，查看错误日志还是路径不对，所以需要把 alias 后面加上 /

小结：

- root 的处理结果是: root 路径 + location 路径
- alias 的处理结果是:使用 alias 路径替换 location 路径
- alias 是一个目录别名的定义，root 则是最上层目录的含义
- 如果 location 路径是以 / 结尾,则 alias 也必须是以 / 结尾，root 没有要求
  - **alias 不支持 location 的 =**

这里再多言几句，alias 后指定的资源路径，Nginx 就会去这个路径下找资源，「忽略」location 本身的的请求，仅拼接 location 后面的请求。如果你想去拼接 location 本身，就用绝对路径（包括 location）的alias。

### index指令

`index` 指令是设置网站的默认首页。默认是 index.html。

| 语法               | 默认值            | 位置                   |
| ------------------ | ----------------- | ---------------------- |
| index \<file> ...; | index index.html; | http、server、location |

`index` 后面可以跟多个设置，如果访问的时候没有指定具体访问的资源，则会从左往右依次进行查找，找到第一个为止。

举例说明：

```nginx
location / {
	root /usr/local/nginx/html;
	index index.html index.htm;
}
```

访问该 location 的时候，可以通过 `http://ip:port/` 访问，地址后面如果不添加任何内容，则默认依次访问 index.html 和 index.htm，找到第一个来进行返回。

### error_page指令

error_page 指令是设置网站的错误页面。

| 语法                                            | 默认值 | 位置                          |
| ----------------------------------------------- | ------ | ----------------------------- |
| error_page \<code> ...... [=[response]] \<uri>; | —      | http、server、location ...... |

code 是响应码。

**当出现对应的响应 code 后，如何来处理？**

> **举例说明**

1. 可以指定具体跳转的地址

```nginx
server {
	error_page 404 http://www.frx.com;
}
```

当页面产生 404 时，自动跳转到 `http://www.frx.com`

2. 可以指定重定向地址

```nginx
server{
	error_page 404 /50x.html;
	error_page 500 502 503 504 /50x.html;
	location =/50x.html {
		root html;
	}
}
```

产生错误页面时，重定向到 /50x.html，然后触发 location，最终访问的是 html 目录下的 50x.html 页面

3. 使用 location 的 @ 符合完成错误信息展示

```nginx
server{
	error_page 404 @jump_to_error;
	location @jump_to_error {
		default_type text/plain;
		return 404 'Not Found Page...';
	}
}
```

可选项 `=[response]` 的作用是用来将相应代码更改为另外一个，如下：

```nginx
server{
	error_page 404 =200 /50x.html;
	location =/50x.html {
		root html;
	}
}
```

这样的话，当返回 404 找不到对应的资源的时候，在浏览器上可以看到，最终返回的状态码是 200 而不是 404，这块需要注意下，编写 error_page 后面的内容，404 后面需要加空格，200 前面不能加空格。

## 静态资源优化配置

Nginx 对静态资源如何进行优化配置。这里从三个属性配置进行优化：

```nginx
sendfile on;
tcp_nopush on;
tcp_nodeplay on;
```

建议三个都开启。如果想知道为什么，请往下看。

### sendﬁle

该指令是用来开启高效的文件传输模式。默认关闭，建议开启。

| 语法                 | 默认值      | 位置                          |
| -------------------- | ----------- | ----------------------------- |
| sendﬁle <on \| off>; | sendﬁle oﬀ; | http、server、location ...... |

请求静态资源的过程：客户端通过网络接口向服务端发送请求，操作系统将这些客户端的请求传递给服务器端应用程序，服务器端应用程序会处理这些请求，请求处理完成以后，操作系统还需要将处理得到的结果通过网络适配器传递回去。

如：

```nginx
server {
	listen 80;
	server_name localhost；
	location / {
		root html;
		index index.html;
	}
}
```

假设在 html 目录下有一个 welcome.html 页面，访问地址：`http://192.168.91.200/welcome.html`。

流程如下：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220731/image.24hrbukvg0lc.webp)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220731/image.5l2efa1uqlo0.webp)

### tcp_nopush

该指令必须在 sendfile 打开的状态下才会生效，主要是用来提升网络包的传输「效率」。默认关闭。

| 语法                    | 默认值         | 位置                   |
| ----------------------- | -------------- | ---------------------- |
| tcp_nopush <on \| off>; | tcp_nopush oﬀ; | http、server、location |

### tcp_nodelay

该指令必须在 keep-alive 连接开启的情况下才生效，来提高网络包传输的「实时性」。默认开启。

| 语法                     | 默认值          | 位置                   |
| ------------------------ | --------------- | ---------------------- |
| tcp_nodelay <on \| off>; | tcp_nodelay on; | http、server、location |

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220731/image.1iu7wmocw0ao.webp)

`tcp_nopush` 就像大巴车，等所有旅客占满了座位，才开始发车到景点（客户端），而 `tcp_nodelay`，上来一个旅客，就马上发车到景点客户端）。

### 优化总结

经过分析，『 tcp_nopush 』和『 tcp_nodelay 』看起来是「互斥的」，那么为什么要将这两个值都打开，这个大家需要知道的是在 Linux2.5.9 以后的版本中两者是可以兼容的，三个指令都开启的好处是，sendfile 可以开启高效的文件传输模式，『 tcp_nopush 』开启可以确保在发送到客户端之前数据包已经充分「填满」，这大大减少了网络开销，并加快了文件发送的速度。然后，当它到达最后一个可能因为没有「填满」而暂停的数据包时，Nginx 会忽略『 tcp_nopush 』参数， 然后，『 tcp_nodelay 』强制套接字发送数据。由此可知，『 tcp_nopush 』可以与『 tcp_nodelay 』一起设置，它比单独配置『 tcp_nodelay 』具有更强的性能。

所以回归开头，我们可以使用如下配置来优化 Nginx 静态资源的处理：

```nginx
# 三个都开启
sendfile on;
tcp_nopush on;
tcp_nodelay on;
```

## 静态资源压缩配置

经过上述内容的优化，我们再次思考一个问题，假如在满足上述优化的前提下，我们传送一个 1M 的数据和一个 10M 的数据那个效率高？答案显而易见，**传输内容小，速度就会快**。那么问题又来了，同样的内容，如果把大小降下来，我们脑袋里面要蹦出一个词就是「压缩」，接下来，我们来学习 Nginx 的静态资源压缩模块。

在 Nginx 的配置文件中可以通过配置 gzip 来对静态资源进行压缩，相关的指令可以配置在 http 块、server 块和 location 块中，Nginx 可以通过对这些指令进行解析和处理：

- `ngx_http_gzip_module` 模块
- `ngx_http_gzip_static_module` 模块
- `ngx_http_gunzip_module` 模块

接下来我们从以下内容进行学习：

- Gzip 各模块支持的配置指令
- Gzip 压缩功能的配置
- Gzip 和 sendfile 的冲突解决
- 浏览器不支持 Gzip 的解决方案

### Gzip模块配置指令

接下来所学习的指令都来自 `ngx_http_gzip_module` 模块，该模块会在 Nginx 安装的时候内置到 Nginx 的安装环境中，也就是说我们可以直接使用这些指令。

- `gzip` 指令是用于开启或者关闭 Gzip 功能。默认关闭

| 语法              | 默认值    | 位置                          |
| ----------------- | --------- | ----------------------------- |
| gzip <on \| off>; | gzip off; | http、server、location ...... |

注意：只有该指令为打开状态，下面的指令才有效果

```nginx
http{
	gzip on;
}
```

+ `gzip_types` 指令可以根据响应页的 MIME 类型选择性地开启 Gzip 压缩功能。默认是 text/html

| 语法                             | 默认值                | 位置                   |
| -------------------------------- | --------------------- | ---------------------- |
| gzip_types \<mime-type> ...... ; | gzip_types text/html; | http、server、location |

所选择的值可以从 mime.types 文件中进行查找，也可以使用 * 代表所有。

```nginx
http{
	gzip_types application/javascript;
	# * 代表所有
	gzip_types *
}
```

+ `gzip_comp_level` 指令是用于设置 Gzip 压缩程度，级别从 1-9，1 表示要是程度最低，要是效率最高，9 刚好相反，压缩程度最高，但是效率最低、最费时间。默认值是 1

| 语法                      | 默认值             | 位置                   |
| ------------------------- | ------------------ | ---------------------- |
| gzip_comp_level \<level>; | gzip_comp_level 1; | http、server、location |

```nginx
http{
	gzip_comp_level 6;
}
```

+ `gzip_vary` 指令是用于设置使用 Gzip 进行压缩发送是否携带『Vary:Accept-Encoding』头域的响应头部。主要是告诉接收方，所发送的数据经过了 Gzip 压缩处理。默认关闭

| 语法                   | 默认值         | 位置                   |
| ---------------------- | -------------- | ---------------------- |
| gzip_vary <on \| off>; | gzip_vary off; | http、server、location |

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220731/image.4bsq0xpu9s20.webp)

+ `gzip_buffers` 指令是用于处理请求压缩的缓冲区数量和大小

| 语法                            | 默认值                       | 位置                   |
| ------------------------------- | ---------------------------- | ---------------------- |
| gzip_buffers \<number> \<size>; | gzip_buffers 32 4k \| 16 8k; | http、server、location |

其中 number 是指定 Nginx 服务器向系统申请缓存空间个数，size 指的是每个缓存空间的大小。主要实现的是申请 number 个每个大小为 size 的内存空间。这个值的设定一般会和服务器的操作系统有关，所以建议此项不设置，使用默认值即可。

```nginx
gzip_buffers 4 16K;	  # 缓存空间大小
```

+ `gzip_disable` 指令是针对不同种类客户端发起的请求，可以选择性地开启和关闭 Gzip 功能

| 语法                           | 默认值 | 位置                   |
| ------------------------------ | ------ | ---------------------- |
| gzip_disable \<regex> ...... ; | —      | http、server、location |

regex 是根据客户端的浏览器标志(user-agent)来设置，支持使用正则表达式。指定的浏览器标志不使用 Gzip.该指令一般是用来排除一些明显不支持 Gzip 的浏览器。

```nginx
gzip_disable "MSIE [1-6]\.";
```

`gzip_http_version` 指令是针对不同的 HTTP 协议版本，可以选择性地开启和关闭 Gzip 功能。默认是 1.1 版本

| 语法                            | 默认值                 | 位置                   |
| ------------------------------- | ---------------------- | ---------------------- |
| gzip_http_version <1.0 \| 1.1>; | gzip_http_version 1.1; | http、server、location |

该指令是指定使用 Gzip 的 HTTP 最低版本，该指令一般采用默认值即可。

- `gzip_min_length` 指令是针对传输数据的大小，可以选择性地开启和关闭 Gzip 功能

| 语法                       | 默认值              | 位置                   |
| -------------------------- | ------------------- | ---------------------- |
| gzip_min_length \<length>; | gzip_min_length 20; | http、server、location |

Nignx 计量大小的单位：bytes [字节] / kb [千字节] / M [兆]

例如: 1024 / 10k | K / 10m | M

Gzip 压缩功能对大数据的压缩效果明显，但是如果要压缩的数据比较小的话，可能出现越压缩数据量越大的情况，因此我们需要根据响应内容的大小来决定是否使用 Gzip 功能，响应页面的大小可以通过头信息中的 `Content-Length` 来获取。但是如何使用了 Chunk 编码动态压缩，该指令将被忽略。建议设置为 1K 或以上。

- `gzip_proxied` 指令设置是否对服务端返回的结果进行 Gzip 压缩

| 语法                                                         | 默认值            | 位置                   |
| ------------------------------------------------------------ | ----------------- | ---------------------- |
| gzip_proxied <off \| expired \| no-cache \| no-store \| private \| no_last_modified \| no_etag \| auth \| any>; | gzip_proxied off; | http、server、location |

- off：关闭 Nginx 服务器对后台服务器返回结果的 Gzip 压缩
- expired：如果 header 头中包含 『Expires』头信息，启用压缩
- no-cache：如果 header 头中包含 『Cache-Control:no-cache』头信息，启用压缩
- no-store：如果 header 头中包含 『Cache-Control:no-store』头信息，启用压缩
- private：如果 header 头中包含 『Cache-Control:private』头信息，启用压缩
- no_last_modified：如果 header 头中不包含 『Last-Modified』头信息，启用压缩
- no_etag：如果 header 头中不包含 『ETag』 头信息，启用压缩
- auth：如果 header 头中包含 『Authorization』 头信息，启用压缩
- any：无条件启用压缩

### Gzip压缩功能配置模板

```nginx
gzip on;  			   		 # 开启 Gzip 功能
gzip_types *;		   	 	 # 压缩源文件类型,根据具体的访问资源类型设定
gzip_comp_level 6;	   		 # Gzip 压缩级别
gzip_min_length 1k;          # 进行压缩响应页面的最小长度，content-length
gzip_buffers 4 16K;	         # 缓存空间大小
gzip_http_version 1.1;       # 指定压缩响应所需要的最低 HTTP 请求版本
gzip_vary  on;		         # 往头信息中添加压缩标识
gzip_disable "MSIE [1-6]\."; # 对 IE6 以下的版本都不进行压缩
gzip_proxied  off;           # Nginx 作为反向代理压缩服务端返回数据的条件
```

这些配置在很多地方可能都会用到，所以我们可以将这些内容抽取到一个配置文件中，然后通过 include 指令把配置文件再次加载到 nginx.conf 配置文件中，方法使用。

创建压缩配置文件：`nginx_gzip.conf`，添加如下内容：

```nginx
gzip on;
gzip_types *;
gzip_comp_level 6;
gzip_min_length 1k;
gzip_buffers 4 16K;
gzip_http_version 1.1;
gzip_vary  on;
gzip_disable "MSIE [1-6]\.";
gzip_proxied  off;
```

在 Nginx 核心配置文件 `nginx.conf` 进行引入，添加如下内容：

```nginx
include nginx_gzip.conf
```

### Gzip和sendfile共存问题

前面在讲解 sendfile 的时候，提到过，开启 sendfile 以后，在读取磁盘上的静态资源文件的时候，可以减少拷贝的次数，可以不经过用户进程将静态文件通过网络设备发送出去，但是 Gzip 要想对资源压缩，是需要经过用户进程进行操作的。所以如何解决两个设置的共存问题。

可以使用 `ngx_http_gzip_static_module` 模块的 `gzip_static` 指令来解决。

### gzip_static指令

`gzip_static` 指令用于在检查与访问资源同名的 .gz 文件时，response 中以 Gzip 相关的 header 返回 .gz 文件的内容。默认关闭。

| 语法                               | 默认值           | 位置                   |
| ---------------------------------- | ---------------- | ---------------------- |
| gzip_static <on \| off \| always>; | gzip_static off; | http、server、location |

```nginx
gzip_static on;
```

在配置文件添加上述命令后，会报一个错误：`unknown directive "gzip_static"`，主要的原因是 Nginx 默认是没有添加 ngx_http_gzip_static_module 模块。如何来添加？

### Nginx模块添加

1. 查询当前 Nginx 的配置参数，即查看 `configure arguments` 的配置信息，拷贝出来

```sh
nginx -V

# 拷贝 configure arguments 后面的数据
```

```nginx
--prefix=/usr/local/nginx
```

2. 将 Nginx 安装目录下 sbin 目录中的 nginx 二进制文件进行更名备份

```sh
cd /usr/local/nginx/sbin
mv nginx nginx.backup
```

3. 进入 Nginx 的安装目录

```sh
cd /root/nginx/core/nginx-1.21.6
```

4. 执行 make clean 清空之前编译的内容

```sh
make clean
```

5. 使用 configure 来配置参数，添加 `ngx_http_gzip_static_module` 模块，记得加上第1步拷贝的配置信息

```sh
./configure --with-http_gzip_static_module  # 记得添加 configure arguments 后的数据
```

6. 使用 make 命令进行编译

```sh
make
```

7. 将 objs 目录下的 nginx 二进制执行文件移动到 nginx 安装目录下的 sbin 目录中

```sh
mv /opt/nginx/core/nginx-1.21.6/objs/nginx /usr/local/nginx/sbin
```

如果不执行第（2）步进行备份，则该步骤会覆盖原来的 nginx 可执行文件

8. 在源码目录下执行更新命令

```sh
cd /opt/nginx/core/nginx-1.21.6
make upgrade
```

### gzip_static测试

准备好一个 jquery.js 文件，放在 html 目录下

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220731/image.576ef03x00c0.webp)

1. 直接访问 `http://192.168.91.200/jquery.js`

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220731/image.2b8dhabn0cbo.webp)

2. 使用 Gzip 命令进行压缩

```sh
# 进入 html 目录
cd /usr/local/nginx/html

# 压缩 js 文件
gzip jquery.js
```

3. 再次访问 `http://192.168.91.200/jquery.js`

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220731/image.4ivj1d091pg.webp)

可以看出 `Content-Length` 的大小已经变得非常小。

## 静态资源缓存配置

当浏览器请求 Nginx 服务器的资源后，我们可以让这些资源缓存在浏览器里，这样再一次请求相同的资源时，无需请求 Nginx 服务器，直接从浏览器的缓存里获取，减少 Nginx 服务器的压力。

### 什么是缓存和Web缓存

缓存（cache），原始意义是指访问速度比一般随机存取存储器（RAM）快的一种高速存储器，通常它不像系统主存那样使用 DRAM 技术，而使用昂贵但较快速的 SRAM 技术。缓存的设置是所有现代计算机系统发挥高性能的重要因素之一。

Web 缓存是指一个 Web 资源（如 html 页面，图片，js，数据等）存在于 Web 服务器和客户端（浏览器）之间的副本。缓存会根据进来的请求保存输出内容的副本；当下一个请求来到的时候，如果是相同的 URL，缓存会根据缓存机制决定是直接使用副本响应访问请求，还是向源服务器再次发送请求。比较常见的就是浏览器会缓存访问过网站的网页，当再次访问这个 URL 地址的时候，如果网页没有更新，就不会再次下载网页，而是直接使用本地缓存的网页。只有当网站明确标识资源已经更新，浏览器才会再次下载网页。

### Web缓存的种类

客户端缓存

- 浏览器缓存

服务端缓存

- Nginx
- Redis
- Memcached 等

### 为什么要用浏览器缓存

- 成本最低的一种缓存实现
- 减少网络带宽消耗
- 降低服务器压力
- 减少网络延迟，加快页面打开速度

### 浏览器缓存执行流程

HTTP 协议中和页面缓存相关的字段，我们先来认识下：

| header        | 说明                                          |
| ------------- | --------------------------------------------- |
| Expires       | 缓存过期的日期和时间                          |
| Cache-Control | 设置和缓存相关的配置信息                      |
| Last-Modified | 请求资源最后修改时间                          |
| ETag          | 请求变量的实体标签的当前值，比如文件的 MD5 值 |

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220731/image.209c4krjzgf4.webp)

1. 用户首次通过浏览器发送请求到服务端获取数据，客户端是没有对应的缓存，所以需要发送 request 请求来获取数据；
2. 服务端接收到请求后，获取服务端的数据及服务端缓存的允许后，返回 200 的成功状态码并且在响应头上附上对应资源以及缓存信息；
3. 当用户再次访问相同资源的时候，客户端会在浏览器的缓存目录中查找是否存在响应的缓存文件；
4. 如果没有找到对应的缓存文件，则走第2步；
5. 如果有缓存文件，接下来对缓存文件是否过期进行判断，过期的判断标准是(Expires)；
6. 如果没有过期，则直接从本地缓存中返回数据进行展示；
7. 如果 Expires 过期，接下来需要判断缓存文件是否发生过变化；
8. 判断的标准有两个，一个是 ETag(Entity Tag)，一个是 Last-Modified；
9. 判断结果是未发生变化，则服务端返回 304，直接从缓存文件中获取数据；
10. 如果判断是发生了变化，重新从服务端获取数据，并根据缓存协商(服务端所设置的是否需要进行缓存数据的设置)来进行数据缓存。

### 浏览器缓存相关指令

Nginx 需要进行缓存相关设置，就需要用到如下的指令。

#### expires指令

该指令用来控制页面缓存的作用。可以通过该指令控制 HTTP 应答中的『Expires』和『Cache-Control』

| 语法                                                       | 默认值       | 位置                   |
| ---------------------------------------------------------- | ------------ | ---------------------- |
| expires [modified] \<time>; expires <epoch \| max \| off>; | expires off; | http、server、location |

- time：可以整数也可以是负数，指定过期时间，单位为 s（秒）。如果是负数，Cache-Control 则为 no-cache，如果为整数或 0，则 Cache-Control 的值为 max-age=time

- epoch：指定 Expires 的值为『'1 January,1970,00:00:01 GMT'』，即 1970-01-01 00:00:00 ，Cache-Control 的值 no-cache

  因为 Expires（缓存过期时间）是 1970 年，所以不缓存。

- max：指定 Expires 的值为『'31 December2037 23:59:59GMT' 』，即(2037-12-31 23:59:59，Cache-Control 的值为 10 年

  因为 Expires（缓存过期时间）是 2037 年，虽然还有 16 年过期，但是最大只能缓存 10 年。

- off：默认不缓存

> **例子 1**

在配置文件添加如下内容：

```nginx
location ~ .*\.(html|js|css|png|jpg|jpeg|gif)$ {
    # ...
    expires max
    # ...
}
```

发送请求：`http://192.168.91.200/jquery.js`

查看开发者工具(F12)的 NetWork，如图：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220731/image.4x3yczk58lk0.webp)

315360000 折算下来正好是 10 年。

> **其他格式**

```nginx
expires 30s;  # 表示把数据缓存 30 秒

expires 30m;  # 表示把数据缓存 30 分

expires 10h;  # 表示把数据缓存 10 小时

expires 1d;   # 表示把数据缓存 1 天
```

#### add_header指令

add_header 指令是用来添加指定的响应头和响应值。

add_header 是响应体的指令，不是请求时的指令（比如 expires ），并且 add_header 也有和 expires 一样的功能。

如果 expires 和 add_header 同时开启的情况下，则 add_header 优于 expires 生效。

| 语法                                  | 默认值 | 位置                              |
| ------------------------------------- | ------ | --------------------------------- |
| add_header \<name> \<value> [always]; | —      | location > server > http > ...... |

always 可选，代表总是添加。

Cache-Control 作为响应头信息，可以在 Nginx 配置文件设置如下缓存响应指令：

```nginx
add_header Cache-control must-revalidate;
add_header Cache-control no-cache;
add_header Cache-control no-store;
add_header Cache-control no-transform;
add_header Cache-control public;
add_header Cache-control private;
add_header Cache-control proxy-revalidate;
add_header Cache-Control max-age=<seconds>;  # 秒
add_header Cache-control s-maxage=<seconds>; # 秒
```

描述：

| 指令             | 说明                                                         |
| ---------------- | ------------------------------------------------------------ |
| must-revalidate  | 可缓存但必须再向源服务器进行确认                             |
| no-cache         | 数据内容不能被缓存，每次请求都重新访问服务器，若有 max-age，则缓存期间不访问服务器 |
| no-store         | 不缓存请求或响应的任何内容，暂存也不可以(临时文件夹中不能暂存该资源) |
| no-transform     | 代理不可更改媒体类型                                         |
| public           | 可以被任何缓存区缓存，如: 浏览器、服务器、代理服务器等       |
| private（默认）  | 只能在浏览器中缓存，只有在第一次请求的时候才访问服务器，若有 max-age，则缓存期间不访问服务器 |
| proxy-revalidate | 要求中间缓存服务器对缓存的响应有效性再进行确认               |
| max-age=<秒>     | 过期时间，即以秒为单位的缓存时间                             |
| s-maxage=<秒>    | 公共缓存服务器响应的最大 Age 值                              |

值得注意的是：

- 设置了 no-cache 或者 private 后，打开新窗口时会重新访问服务器。若设置 max-age，则缓存期间不访问服务器
- 设置 private 和正数的 max-age 时，后退时候不会访问服务器
- 设置 no-cache 和正数的 max-age 时，后退时会访问服务器

### Nginx服务端缓存

在 Web 缓存的种类，我们提到了 Ngixn 服务端缓存，而上面仅仅介绍了在浏览器进行缓存，而因为 Ngixn 服务端缓存的内容比较多，所以前往 [Nginx - 缓存集成]() 进行学习。

