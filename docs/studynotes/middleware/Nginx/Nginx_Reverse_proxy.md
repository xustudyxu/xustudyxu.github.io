---
title: Nginx 反向代理
date: 2022-08-02 15:36:59
permalink: /middleware/Nginx/Nginx_Reverse_proxy
categories:
  - Nginx
tags:
  - Nginx
---
# Nginx 反向代理

::: tip 引言

Nginx 如何变成一个代理服务器？Nginx 又如何将客户端的请求转发给其他的服务器？本内容将学习 Nginx 的反向代理知识。

:::

[[toc]]

## 反向代理概述

关于正向代理和反向代理，在 [Nginx - 介绍](/pages/9551ee/#名词解释) 已经通过一张图详细的介绍过了，简而言之就是正向代理代理的对象是客户端，反向代理代理的是服务端，这是两者之间最大的区别。

Nginx 即可以实现正向代理，也可以实现反向代理。

我们先来通过一个小案例演示下 Nginx 正向代理的简单应用。

### 正向代理

先提需求：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220802/image.53oygoz19gc0.webp)

1. 服务端的设置：

```nginx
http {
    log_format main 'client send request=>clientIp=$remote_addr serverIp=$host';
	server{
		listen 80;
		server_name	localhost;
		access_log logs/access.log main;
		location / {
			root html;
			index index.html index.htm;
		}
	}
}
```

2. 使用客户端访问服务端：`http://192.168.200.133`，打开日志查看结果

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220802/image.16ifxal7swyk.webp)

3. 代理服务器设置：

```nginx
server {
    listen  82;
    resolver 8.8.8.8;   # 设置 DNS 的 IP，用来解析 proxy_pass 中的域名
    location / {
        proxy_pass http://$host$request_uri;   # proxy_pass 实现正向代理
    }
}
```

`proxy_pass` 后面有讲解。

4. 配置代理服务器的 IP(192.168.200.146)和 Nginx 配置监听的端口(82)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220802/image.3yx93qbazra0.webp)

5. 设置完成后，再次通过浏览器访问服务端

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220802/image.6litsat09000.webp)

通过对比，上下两次的日志记录，会发现虽然我们是客户端访问服务端，但是使用了代理，那么服务端能看到的只是代理发送过去的请求，这样就使用 Nginx 实现了正向代理的设置。

但是 Nginx 正向代理，在实际的应用中不是特别多，所以我们简单了解下，接下来我们继续学习 Nginx 的反向代理，这是 Nginx 比较重要的一个功能。

## 反向代理语法配置

Nginx 反向代理模块的指令是由 `ngx_http_proxy_module` 模块进行解析，该模块在安装 Nginx 的时候已经自动加载到 Nginx 中了，接下来我们把反向代理中的常用指令一一介绍下：

- proxy_pass：配置代理的服务器地址
- proxy_set_header：转发给被代理服务器时，设置一些请求头信息
- proxy_redirect：防止客户端可以看到被代理服务器的地址

这里只介绍三个指令，关于反向代理的指令非常多，想要了解更多，请前往 [Nginx 反向代理文档](https://nginx.org/en/docs/stream/ngx_stream_proxy_module.html)

### proxy_pass

该指令用来设置被代理服务器地址，可以是主机名称、IP 地址加端口号形式，没有默认值。

| 语法               | 默认值 | 位置     |
| ------------------ | ------ | -------- |
| proxy_pass \<URL>; | —      | location |

`URL`：为要设置的被代理服务器地址，包含传输协议(`http`、`https://`)、主机名称或 IP 地址加端口号、URI 等要素。

例如：

```nginx
proxy_pass http://www.baidu.com;

# 例子
location /server {
    # 结尾不加斜杠
    proxy_pass http://192.168.200.146;
    # 访问的是：http://192.168.200.146/server/index.html

    # 结尾加斜杠
    proxy_pass http://192.168.200.146/;
    # 访问的是：http://192.168.200.146/index.html
}
```

> **实例**

准备两台服务器或者按照 Linux 系统的虚拟机，这里是 `192.168.200.133` 和 `192.168.200.146`，为了方便，我们称前者为服务器 A，后者为服务器 B。

1. 在服务器 A 的 Nginx 配置文件添加如下内容：

```nginx
http {
    # ......
    server {
        listen 8080;
        server_name localhost;
        location / {
            proxy_pass http://192.168.200.146;
        }
    }
    # ......
}
```

当客户端请求服务器 A `http://192.168.200.133`，它会转发给服务器 B，此时的服务器 A 就是一个代理的角色。

访问服务器 A，我们看到 Nginx 的欢迎界面其实是服务器 B 的 Nginx，可以在服务器 B 的 Nginx 欢迎页面添加新的内容：`I am 146`，再次访问服务器 A，效果如图：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220802/image.4ai1u3uxs940.webp)

**在编写 proxy_pass 的时候，后面的值要不要加 /?**

这是看情况的。

接下来通过例子来说明提到的问题：

```nginx
server {
	listen 80;
	server_name localhost;
	location / {
        # 下面两个地址加不加斜杠，效果都一样，因为 location 后的 / 会添加在代理地址后面
		proxy_pass http://192.168.200.146;
		proxy_pass http://192.168.200.146/;
	}
}

server{
	listen 80;
	server_name localhost;
	location /server {
        # 下面两个地址必须加斜杠，因为 location 后的 /server 会添加在代理地址后面，第一个将没有 / 结尾
		#proxy_pass http://192.168.200.146;
		proxy_pass http://192.168.200.146/;
	}
}
# 上面的 location：当客户端访问 http://localhost/server/index.html
# 第一个 proxy_pass 就变成了 http://localhost/server/index.html
# 第二个 proxy_pass 就变成了 http://localhost/index.html 效果就不一样了。
```

- 第一个 location（第 4 行代码）：当客户端访问 `http://localhost/index.html`，两个 `proxy_pass` 效果是一样的，因为 location 后的 `/` 会添加在代理地址后面，所以有没有 `/`，效果都一样。

- 第一个 location（第 14 行代码）：当客户端访问 `http://localhost/server/index.html`，这个时候，第一个 proxy_pass 就变成了 `http://192.168.200.146/server/index.html`，第二个 proxy_pass 就变成了 `http://192.168.200.146/index.html` 效果就不一样了

  如果不以 `/` 结尾，则 location 后的 `/server` 会添加在地址后面，所以第一个 proxy_pass 因为没有 `/` 结尾而被加上 `/server`，而第二个自带了 `/` ，所以不会添加 `/server`。

上面的例子仅仅针对：访问任意请求如 `/server` 时，想要代理到其他服务器的首页，则加 `/`，否则你如果真的想访问 `/server` 下的资源，那么不要加 `/`。

所以加了 `/` 后，请求的是服务器根目录下的资源。

### proxy_set_header

该指令可以更改 Nginx 服务器接收到的客户端请求的请求头信息，然后将新的请求头发送给代理的服务器。默认值是发送代理服务器的地址和 close。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220802/image.4bt7qzhbz1i0.webp)

| 语法                                | 默认值                                                       | 位置                   |
| ----------------------------------- | ------------------------------------------------------------ | ---------------------- |
| proxy_set_header \<field> \<value>; | proxy_set_header Host $proxy_host; proxy_set_header Connection close; | http、server、location |

需要注意的是，如果想要看到结果，必须在被代理的服务器上来获取添加的头信息。

> **实例**

被代理服务器：服务器 B `192.168.200.146` 的 Nginx 配置文件内容：

```nginx
server {
    listen  8080;
    server_name localhost;
    default_type text/plain;
    return 200 $http_username;    # 获取代理服务器发送过来的 http 请求头的 username 值
}
```

代理服务器: 服务器 A `192.168.200.133` 的 Nginx 配置文件内容：

```nginx
server {
    listen  8080;
    server_name localhost;
    location /server {           # 访问 /server 触发代理
        proxy_pass http://192.168.200.146:8080/;  # 配置服务器 B 的地址
        proxy_set_header username TOM;  # 发送 key 为 username，value 为 TOM 的请求头给服务器 B
    }
}
```

访问测试

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220802/image.398ksbw6rv20.webp)

客户端访问的是服务器 A，服务器 A 会将请求转发给服务器 B，服务器 B 返回打印 TOM 的页面给服务器 A，服务器 A 最后返回给客户端。

### proxy_redirect

该指令是用来重置头信息中的『 Location 』和『 Refresh 』的值，防止客户端可以看到被代理服务器的地址。

因为客户端看到的返回结果是『 Location 』和『 Refresh 』的值，所以在到达代理服务器的时，将两个值修改掉，防止客户端直接看到被代理服务器的地址。

| 语法                                                         | 默认值                  | 位置                   |
| ------------------------------------------------------------ | ----------------------- | ---------------------- |
| proxy_redirect redirect replacement;</br> proxy_redirect default; </br>proxy_redirect off; | proxy_redirect default; | http、server、location |

> **为什么要用该指令？**

首先说明一下思路：客户端通过代理服务器 A 访问服务器 B 的资源，但是服务器 B 不存在该资源，则会报错。此时我们不希望它直接返回报错页面给客户端，我们希望服务器 B 返回的是它的欢迎页面。那么如何做呢？

- 首先在服务器 B 进行判断是否存在资源，不存在则返回自己的欢迎页面，即重定向到自己的欢迎页面地址并返回，此时浏览器的地址将会发生改变
- 代理服务器 A 收到服务器 B 的欢迎页面和地址，但是我们不能直接返回给客户端，因为它会暴露服务器 B 的地址，这是重定向的原因

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220802/image.a4tptcx6lbk.webp)

- 此时用到 `proxy_redirect` 指令，重置服务器 B 返回过来的『 Location 』和『 Refresh 』值，将两个值改为代理服务器 A 的某个地址
- 因为改为了代理服务器 A 的某个地址，所以代理服务器 A 根据这个地址又去获取理服务器 B 的欢迎页面地址，返回给客户端

很绕，简单总结下：客户端通过 A 找 B 不存在的资源，B 不想返回报错页面，于是重定向到自己的欢迎页面地址并返回给 A，A 收到了页面和地址（正常情况不要接收地址，只接收页面），发现不能暴露 B 的地址，于是修改接收的 B 的地址为自己的某一个地址，这个地址会重新发送请求去获取 B 的欢迎页面地址，然后返回给客户端。

这里要明白 B 返回的是重定向后的欢迎页面，重定向后，浏览器地址栏会变成重定向的地址，所以 A 才会以自己的地址转发获取到 B 的地址，所以最后浏览器显示 A 的地址，看到的却是 B 的欢迎页面。

代码：

服务端 B `192.168.200.146`

```nginx
server {
    listen  8081;
    server_name localhost;
    if (!-f $request_filename){
    	return 302 http://192.168.200.146;   #  2.如果请求的资源不存在，则重定向到服务器 B
    }
}
```

代理服务端 A `192.168.200.133`

```nginx
server {
	listen  8081;
	server_name localhost;
	location / {
		proxy_pass http://192.168.200.146:8081/;  # 1.转发给服务器 B
		proxy_redirect http://192.168.200.146 http://192.168.200.133; # 3.修改服务器 B 的地址
	}
}
# 该 server 去请求服务器 B 的欢迎页面
server {
	listen  80;
	server_name 192.168.200.133;
	location / {
		proxy_pass http://192.168.200.146;  # 4.重新发送请求给服务器 B，获取欢迎页面
	}
}
```

第 6 行代码，当服务器 B 返回的是 `http://192.168.200.146`，为了不让它出现在浏览器的地址栏上，我们需要利用 `proxy_redirect` 将它修改为代理服务器 A 的地址，这个地址会以自己的地址重新访问服务器 B 的欢迎页面，最后返回给客户端。

**该指令的三组选项**

- `proxy_redirect redirect replacement;`

  - redirect：被代理服务器返回的 Location 值
  - replacement：要替换 Location 的值

- `proxy_redirect default;`

  - default：相比较第一组选项，default 仅仅提供了 `redirect` 和 `replacement` 的默认值

    将本范围 location 块的 uri 变量作为 replacement。

    将 proxy_pass 变量作为 redwadairect

```nginx {6}
server {
	listen  8081;
	server_name localhost;
	location /server { 
		proxy_pass http://192.168.200.146:8081/;
		proxy_redirect default;  # redirect 是 proxy_pass 的值：http://192.168.200.146:8081/
        						 # replacement 是 location 后的值：/server
        # 等价于：proxy_redirect http://192.168.200.146:8081/ /server
	}
}
```

- `proxy_redirect off;`

  关闭 proxy_redirect 的功能

## 反向代理实战

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220802/image.59ecpsonzxc0.webp)

服务器 1，2，3 存在两种情况

- 第一种情况: 三台服务器的内容不一样
- 第二种情况: 三台服务器的内容是一样

第一种情况

- 如果服务器 1、服务器 2 和服务器 3 的内容不一样，那我们可以根据用户请求来分发到不同的服务器。

  服务器有限，只能以三个端口模拟三台服务器，实际上是一个 IP 对应一个服务器。

  代理服务器配置文件内容：

```nginx
# 代理服务器
server {
    listen  8082;
    server_name  localhost; 
    location /server1 {    
        proxy_pass http://192.168.200.146:9001/;   # 代理 server1
    }
    location /server2 {
        proxy_pass http://192.168.200.146:9002/;   # 代理 server2
    }
    location /server3 {
        proxy_pass http://192.168.200.146:9003/;   # 代理 server3
    }
}
```

服务器配置文件内容：

```nginx
# 服务器
# server1
server {
    listen  9001;
    server_name  localhost;
    default_type text/html;
    return 200 '<h1>192.168.200.146:9001</h1>'
}
# server2
server {
    listen  9002;
    server_name  localhost;
    default_type text/html;
    return 200 '<h1>192.168.200.146:9002</h1>'
}
# server3
server {
    listen  9003;
    server_name  localhost;
    default_type text/html;
    return 200 '<h1>192.168.200.146:9003</h1>'
}
```

- 如果服务器 1、服务器 2 和服务器 3 的内容是一样的，该如何处理?

  请看负载均衡的相关内容，里面将进行详细的介绍。

## 斜杠总结

这里将发送 `http://192.168.199.27/frx/xu` 请求。

**不带字符串情况**

| 案例 | localtion | proxy_pass             | 匹配    |
| ---- | --------- | ---------------------- | ------- |
| 1    | /frx      | http://192.168.199.27  | /frx/xu |
| 2    | /frx/     | http://192.168.199.27  | /frx/xu |
| 3    | /frx      | http://192.168.199.27/ | //xu    |
| 4    | /frx/     | http://192.168.199.27/ | /xu     |

若 Nginx 会将原请求路径原封不动地转交给其他地址，如案例 3 和 4。

`proxy_pass` 的 ip:port 后加了 `/`，代表去除掉请求和 location 的匹配的字符串，不加则追加全部请求到地址后面。

**带字符串情况**

| 案例 | localtion | proxy_pass                  | 匹配      |
| ---- | --------- | --------------------------- | --------- |
| 1    | /frx      | http://192.168.199.27/bing  | /bing/xu  |
| 2    | /frx/     | http://192.168.199.27/bing  | /bingxu   |
| 3    | /frx      | http://192.168.199.27/bing/ | /bing//xu |
| 4    | /frx/     | http://192.168.199.27/bing/ | /bing/xu  |

`proxy_pass` 的 ip:port 后加了字符串，Nginx 会将匹配 location 的请求从「原请求路径」中剔除，再不匹配的字符串拼接到 proxy_pass 后生成「新请求路径」，然后将「新请求路径」转交给其他地址。

案例 2 中，`proxy_pass` 的 ip:port 后接了字符串，因此将 location 的 `/frx/` 从原请求路径 `/frx/xu` 中剔除，变为 `xu`，然后将 `xu` 拼接到 `http://192.168.1.48/bing` 后生成了新请求，因此其他地址收到的请求就是 `/bingxu`。

## Nginx安全控制

关于 Web 服务器的安全是比较大的一个话题，里面所涉及的内容很多，Nginx 反向代理是如何来提升 Web 服务器的安全呢？

答案是：安全隔离。

### 什么是安全隔离

通过代理分开了客户端到应用程序服务器端的连接，实现了安全措施。在反向代理之前设置防火墙，仅留一个入口供代理服务器访问。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220802/image.3vhdv63nf9q0.webp)

### 如何使用SSL对流量加密

翻译成大家能熟悉的说法就是将我们常用的 http 请求转变成 https 请求，那么这两个之间的区别简单的来说两个都是 HTTP 协议，只不过 https 是身披 SSL 外壳的 http.

HTTPS 是一种通过计算机网络进行安全通信的传输协议。它经由 HTTP 进行通信，利用 SSL/TLS 建立全通信，加密数据包，确保数据的安全性。

- SSL(Secure Sockets Layer)安全套接层
- TLS(Transport Layer Security)传输层安全

上述这两个是为网络通信提供安全及数据完整性的一种安全协议，TLS 和 SSL 在传输层和应用层对网络连接进行加密。

总结来说为什么要使用 https:

- http 协议是明文传输数据，存在安全问题，而 https 是加密传输，相当于 http + SSL，并且可以防止流量劫持。

Nginx 默认不支持 https 开头的协议，如果要想使用 SSL，需要满足一个条件即需要添加一个模块 `--with-http_ssl_module`，而该模块在编译的过程中又需要 OpenSSL 的支持，OpenSSL 我们在 [Nginx 安装](/middleware/Nginx/Nginx_install/#nginx环境安装) 已经准备好了。

### 添加SSL支持

完成 `--with-http_ssl_module` 模块的增量添加。

1. 将原有 `/usr/local/nginx/sbin/nginx` 进行备份

```sh
cd /usr/local/nginx/sbin
mv nginx nginx.backup
```

2. 查看 `configure arguments` 的配置信息，拷贝出来

```sh
nginx -V

# 拷贝 configure arguments 后面的数据
```

3. 进入 Nginx 的安装目录，执行 make clean 清空之前编译的内容

```nginx
cd /root/nginx/core/nginx-1.20.2

make clean
```

4. 使用 configure 来配置参数，添加 `ngx_http_ssl_module` 模块，记得加上第（2）步拷贝的配置信息

```sh
./configure --with-http_ssl_module # 记得添加 configure arguments 后的数据
```

5. 通过 make 模板进行编译

```sh
make
```

6. 将 objs 下面的 nginx 可执行文件移动到 `/usr/local/nginx/sbin` 下

```sh
mv /opt/nginx/core/nginx-1.20.2/objs/nginx /usr/local/nginx/sbin
```

7. 在源码目录（安装包目录）下执行 `make upgrade` 进行升级，这个可以实现不停机添加新模块的功能

```sh
cd /opt/nginx/core/nginx-1.20.2
make upgrade
```

### SSL相关指令

该模块的指令都是通过 `ngx_http_ssl_module` 模块来解析的，我们上一步已经添加了。

这里只介绍常用的几个指令，了解更多指令请前往 [ngx_http_ssl_module 模块文档](http://nginx.org/en/docs/http/ngx_http_ssl_module.html)。

`ssl` 指令用来在指定的服务器开启 HTTPS，默认关闭。可以使用 listen 443 ssl，这种方式更通用些。

| 语法            | 默认值   | 位置         |
| --------------- | -------- | ------------ |
| ssl <on \|off>; | ssl off; | http、server |

ssl 默认监听的是 443 端口，所以使用下面的指令和 `ssl on` 效果一致，因为下面的指令能突出 sll 的监听端口，所以建议使用它。

```nginx
server{
	listen 443 ssl;
}
```

`ssl_certificate` 指令是为当前这个虚拟主机指定一个带有 PEM 格式证书的证书。

| 语法                     | 默认值 | 位置         |
| ------------------------ | ------ | ------------ |
| ssl_certificate \<file>; | —      | http、server |

`ssl_certificate_key` 指令用来指定 PEM secret key 文件的路径

| 语法                          | 默认值 | 位置         |
| ----------------------------- | ------ | ------------ |
| ssl_ceritificate_key \<file>; | —      | http、server |

`ssl_session_cache` 指令用来配置用于 SSL 会话的缓存

| 语法                                                         | 默认值                  | 位置         |
| ------------------------------------------------------------ | ----------------------- | ------------ |
| ssl_sesion_cache <off \| none \| [builtin[:size]] [shared:name:size]> | ssl_session_cache none; | http、server |

选项介绍：

- `off`：严格禁止使用会话缓存：Nginx 明确告诉客户端会话不能被重用

- `none`：禁止使用会话缓存，Nginx 告诉客户端会话可以被重用，但实际上并不在缓存中存储会话参数（任性，言语同意用，行为取消用）

- `builtin`：内置 OpenSSL 缓存，仅在一个工作进程中使用。缓存大小在会话中指定。如果未给出大小，则等于 20480 个会话。使用内置缓存可能会导致内存碎片

- `shared`：所有工作进程之间共享缓存，缓存的相关信息用 name 和 size 来指定，同 name 的缓存可用于多个虚拟服务器

  name 是允许缓存的数据名，size 是允许缓存的数据大小，以字节为单位

例如：

```nginx
ssl_session_cache builtin:1000 shared:SSL:10m;  
```

10m 的 m 是兆。

`ssl_session_timeout` 指令用于开启 SSL 会话功能后，设置客户端能够反复使用储存在缓存中的会话参数时间，默认值超时时间是 5 秒

| 语法                         | 默认值                  | 位置         |
| ---------------------------- | ----------------------- | ------------ |
| ssl_session_timeout \<time>; | ssl_session_timeout 5m; | http、server |

`ssl_ciphers` 指令指出允许的密码，密码指定为 OpenSSL 支持的格式

| 语法                    | 默认值                        | 位置         |
| ----------------------- | ----------------------------- | ------------ |
| ssl_ciphers \<ciphers>; | ssl_ciphers HIGH:!aNULL:!MD5; | http、server |

可以直接在 Linux 系统上使用 `openssl ciphers` 查看 OpenSSl 支持的格式

```sh
openssl ciphers
```

`ssl_prefer_server_ciphers` 指令指定是否服务器密码优先客户端密码，默认关闭，建议开启。

| 语法                                   | 默认值                         | 位置         |
| -------------------------------------- | ------------------------------ | ------------ |
| ssl_perfer_server_ciphers <on \| off>; | ssl_perfer_server_ciphers off; | http、server |

### SSL证书生成

**方式一：使用阿里云/腾讯云等第三方服务进行购买免费版**

需要购买域名进行证书的绑定，否则证书无法使用。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220802/image.5p2qyl61ozc0.webp)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220802/image.5l7iqyudol00.webp)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220802/image.6ci6w9wu24g0.webp)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220802/image.4k9v2b9n6tm0.webp)

接着在右边弹窗进行域名绑定，填完写域名和个人信息，进入到验证信息

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220802/image.11wx9z7jit3k.webp)

点击验证，不成功则去自己的域名解析列表查看，如下，点击添加记录，进行配置，或者已经看到记录类型是 TXT，记录值和上图一样的，则说明成功。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220802/image.6qcpqete8ic0.webp)

提交审核后，点击下载

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220802/image.28m5753glfy8.webp)

下载 Nginx 服务器的证书

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220802/image.6kmq7nhonys0.webp)

下载压缩包进行加压后，得到 .pem 证书和 .key 证书，把两个证书上传到 Linux，进行配置，往下看。

**方式二：使用 OpenSSL 生成证书**

这个方式适用于学习阶段，实际开发阶段使用方式一

1. 先要确认当前系统是否有安装 OpenSSL

```sh
openssl version
```

安装下面的命令进行生成（一步一步来）

2. 创建 `/root/cerr` 目录并进入

```sh
mkdir /root/cert

cd /root/cert
```

3. 指定加密算法和加密方式，生成 `server.key`

```sh
# genrsa 是加密算法，des3 是加密方式，-out 代表输入长度为 2048 的 server.key
openssl genrsa -des3 -out server.key 2048

# 然后它会让你注册 server.key 的密码
# 输入密码 ......
```

4. 根据你注册的 server.key 密码，生成 server.csr 文件，生成后它会让你注册你的基本信息，因为是个人的，所以信息随便填写

```sh
openssl req -new -key server.key -out server.csr

# 这里注册你的基本信息，信息随便填写
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220802/image.2b4bgtawqb4.webp)

5. 备份 server.key

```sh
cp server.key server.key.org
```

6. 重新生成 server.key 文件，并输入刚才注册的密码

```sh
openssl rsa -in server.key.org -out server.key

# 会让你重新输入注册密码
```

7. 生成 server.crt 文件

```sh
openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
```

8. 最后使用 `ll` 查看目录下是否生成相应的文件：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220802/image.3yl8ne2bkre0.webp)

### SSL实例模板(通用)

Nginx 的置文件添加如下内容：

```nginx
server {
    listen       80;
    # ......
}
server {
    listen       443 ssl;		# 开启 SSL 功能
    server_name  localhost;     # 如果是购买的域名，这里加上该域名

    ssl_certificate      /root/cert/server.cert; # 生成的 cert 或者 pem 证书路径，根据需求修改
    ssl_certificate_key  /root/cert/server.key; # 生成的 key 证书路径，根据需求修改
    ssl_session_timeout 5m; 
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4; # 表示使用的加密套件的类型
    ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3;  # 表示使用的TLS协议的类型
    ssl_prefer_server_ciphers on;

    location / {
        root   html;
        index  index.html index.htm;
    }
}
```

其实这个模板就是 Nginx 解压目录的 conf 目录下的 nginx.conf 内容。

::: tip 建议

配置 SSL 证书时候，不要修改原来的 server 模块（`listen 80` 模块），应该新建一个 server 模块。

:::

**解决默认 http 问题。**

配置完 SSL 证书还远远不安全。如果直接输入 `www.frx.com`，会默认加上『 http:// 』 而不是『 https:// 』，如何修改为『 https:// 』呢，我们利用 Rewrite 功能

```nginx {3,7}
server {
    listen 443 ssl;
    server_name www.frx.com;   # 如果是 www.frx.com 发送请求
    
    location / {
        # ......
        rewrite ^(.*)$ https://www.frx.com$1;  # 则改为 https 方式
        # ......
	}
    # ......
}
```

## 反向代理系统调优

反向代理值 Buffer 和 Cache。

Buffer 翻译过来是「缓冲」，Cache 翻译过来是「缓存」。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220802/image.6p7uoj5ab0k0.webp)

客户端通过代理服务器向被代理服务器获取数据后，代理服务器在获取的数据存储在缓存「瓶子」里，客户端再次获取相同资源时，直接从缓存「瓶子」里获取数据，不需要向被代理服务器获取数据，减轻压力。

相同点:

- 两种方式都是用来提供 IO 吞吐效率，都是用来提升 Nginx 代理的性能。

不同点:

- 缓冲主要用来解决不同设备之间数据传递速度不一致导致的性能低的问题，缓冲中的数据一旦此次操作完成后，就可以删除
- 缓存主要是备份，将被代理服务器的数据缓存一份到代理服务器，这样的话，客户端再次获取相同数据的时候，就只需要从代理服务器上获取，效率较高，缓存中的数据可以重复使用，只有满足特定条件才会删除

### Proxy Buffer 相关指令

- `proxy_buffering` 指令用来开启或者关闭代理服务器的缓冲区，默认开启。

  | 语法                         | 默认值              | 位置                   |
  | ---------------------------- | ------------------- | ---------------------- |
  | proxy_buffering <on \| off>; | proxy_buffering on; | http、server、location |

- `proxy_buffers` 指令用来指定单个连接从代理服务器读取响应的缓存区的个数和大小。

  | 语法                             | 默认值                                    | 位置                   |
  | -------------------------------- | ----------------------------------------- | ---------------------- |
  | proxy_buffers \<number> \<size>; | proxy_buffers 8 4k \| 8K;(与系统平台有关) | http、server、location |

  - number：缓冲区的个数
  - size：每个缓冲区的大小，缓冲区的总大小就是 number * size

- `proxy_buffer_size` 指令用来设置从被代理服务器获取的第一部分响应数据的大小。保持与 proxy_buffers 中的 size 一致即可，当然也可以更小。

  | 语法                       | 默认值                                      | 位置                   |
  | -------------------------- | ------------------------------------------- | ---------------------- |
  | proxy_buffer_size \<size>; | proxy_buffer_size 4k \| 8k;(与系统平台有关) | http、server、location |

- `proxy_busy_buffers_size` 指令用来限制同时处于 BUSY 状态的缓冲总大小。

  | 语法                             | 默认值                             | 位置                   |
  | -------------------------------- | ---------------------------------- | ---------------------- |
  | proxy_busy_buffers_size \<size>; | proxy_busy_buffers_size 8k \| 16K; | http、server、location |

- `proxy_temp_path` 指令用于当缓冲区存满后，仍未被 Nginx 服务器完全接受，响应数据就会被临时存放在磁盘文件上的该指令设置的文件路径下

  | 语法                     | 默认值                      | 位置                   |
  | ------------------------ | --------------------------- | ---------------------- |
  | proxy_temp_path \<path>; | proxy_temp_path proxy_temp; | http、server、location |

  注意 path 最多设置三层。

- `proxy_temp_file_write_size` 指令用来设置磁盘上缓冲文件的大小。

  | 语法                                | 默认值                                | 位置                   |
  | ----------------------------------- | ------------------------------------- | ---------------------- |
  | proxy_temp_file_write_size \<size>; | proxy_temp_file_write_size 8K \| 16K; | http、server、location |

### 网站调优模板(通用)

```nginx
proxy_buffering on;
proxy_buffers 4 64k;
proxy_buffer_size 64k;
proxy_busy_buffers_size 128k;
proxy_temp_file_write_size 128k;
```

## 反向代理问题

反向代理有一个严重的问题，那就是反向代理的网站需要的 css、js、png 等静态文件默认是从 Nginx 里获取，显然一个你的服务器的代理了如淘宝、京东等网站，那么淘宝、京东等网站的静态文件是从你的服务器里获取，但是服务器根本没有，那么我们如何让代理的网站以及网站需要的 css、js、png 等静态文件一同获取呢，添加如下配置：

```nginx
server {
    listen  80;
    server_name localhost;
    
    location ~ .* {							# 如果不是代理网站的根路径，请自行修改
        proxy_pass http://127.0.0.1:8081;   # 代理的网站地址
        # 将网站的静态文件也代理过来
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
	}
}
```

