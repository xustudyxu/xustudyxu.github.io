---
title: Nginx 核心配置文件
date: 2022-07-28 22:20:55
permalink: /middleware/Nginx/Nginx_Configuration_file
categories:
  - Nginx
tags:
  - Nginx
---
# Nginx 核心配置文件

::: tip

从前面的内容学习中，我们知道 Nginx 的核心配置文件默认是放在 `/usr/local/nginx/conf/nginx.conf`，本次我们就来学习下 nginx.conf 的内容和基本配置方法。

:::

[[toc]]

## 配置文件内容

读取 Nginx 自带的 Nginx 配置文件，配置文件内容很多，我们先将其中的注释部分【学习一个技术点就是在 Nginx 的配置文件中可以使用 `#` 来注释】删除掉后，就剩下如下内容：

```nginx
worker_processes  1;   # 使用指令 1 

events {    # 这是 events 块
    worker_connections  1024;
}

http {    # 这是 http 块
    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;

    server {
        listen       80;   # 监听 80 端口
        server_name  localhost;   # 监听请求过来的 IP
        location / {   # 请求的地址是 /，则进入这个配置，访问 idnex.html
            root   html;      # 进入 html 目录找到访问的页面
            index  index.html index.htm;
        }
        # 如果访问的页面是 500 502 503 504，则发送 /50x.html 请求
        error_page   500 502 503 504  /50x.html;  
        location = /50x.html {      # 如果匹配上 /50x.html 请求
            root   html;     # 则进入 html 目录找到 /50x.html
        }
    }
}
```

对上面文件内容的解释，一一对应比较解释：

```nginx
指令名	指令值;  # 全局块，主要设置 Nginx 服务器整体运行的配置指令

# events 块，主要设置 Nginx 服务器与用户的网络连接,这一部分对 Nginx 服务器的性能影响较大
events {	 
    指令名	指令值;
}

# http 块，是 Nginx 服务器配置中的重要部分，代理、缓存、日志记录、第三方模块配置...             
http {		
    指令名	指令值;

    server { 		# server 块，是 Nginx 配置和虚拟主机相关的内容
        指令名	指令值;
        location / {      # location 块，基于 Nginx 服务器接收请求字符串与 location 后面的值进行匹配，对特定请求进行处理
            指令名	指令值;
        }
    }
    ...
}
```

::: tip 小结

nginx.conf 配置文件中默认有三大块：全局块、events 块、http 块

http 块中可以配置多个 server 块，每个 server 块又可以配置多个 location 块。

:::

## 全局块

全局块的配置影响 Nginx 的全局设置。如用户权限，启动的进程数等。

### user指令

1. user：用于配置运行 Nginx 服务器的 worker 进程的用户和用户组。

| 语法                 | 默认值 | 位置   |
| -------------------- | ------ | ------ |
| user \<user> [group] | nobody | 全局块 |

该属性也可以在编译的时候指定，语法如下 `./configure --user=user --group=group`，如果两个地方都进行了设置，最终生效的是配置文件中的配置。

该指令的使用步骤:

1. 进入配置文件添加一个用户信息 『 www 』

```sh
user www
```

测试进行测试配置文件会报错：

```sh
nginx -t
```

```sh
[root@master conf]# nginx -t
nginx: [emerg] getpwnam("www") failed in /usr/local/nginx/conf/nginx.conf:1
nginx: configuration file /usr/local/nginx/conf/nginx.conf test failed
```

原因在于 Linux 系统不存在 www 用户，我们需要创建它。

2. 创建一个用户

```sh
useradd www
```

3. 重启 Nginx 的配置文件

```sh
nginx -s reload

# 查看重启是否生效
ps -ef | grep nginx
```

最后返回的结果由 root 用户改为 www 用户，代表配置成功。

```sh {3}
[root@master conf]# ps -ef | grep nginx
root       8960      1  0 16:13 ?        00:00:00 nginx: master process ./nginx
www       11975   8960  0 20:44 ?        00:00:00 nginx: worker process
root      11978  10615  0 20:44 pts/1    00:00:00 grep --color=auto nginx
```

4. 在 Linux 的 `/root` 下创建一个 html 目录，并且进入 html 目录，创建 index.html 文件

```sh
mkdir /root/html

cd /root/html

vim index.html
```

然后在 `/root/html/index.html` 文件里添加如下内容：

```html
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
<style>
    body {
        width: 35em;
        margin: 0 auto;
        font-family: Tahoma, Verdana, Arial, sans-serif;
    }
</style>
</head>
<body>
<h1>Welcome to nginx!</h1>
<p>If you see this page, the nginx web server is successfully installed and
working. Further configuration is required.</p>

<p>For online documentation and support please refer to
<a href="http://nginx.org/">nginx.org</a>.<br/>
Commercial support is available at
<a href="http://nginx.com/">nginx.com</a>.</p>

<p><em>Thank you for using nginx.</em></p>
<p><em>I am WWW</em></p>
</body>
</html>
```

这些内容其实就是在 Nginx 的欢迎页面上多加别 `I am WWW` 内容。

5. 修改 nginx.conf

```nginx {3}
location / {
	# root   html;  # 原始的代码注释掉
	root   /root/html;    # 不再是 html 目录，而是 root 下的 html 目录
	index  index.html index.htm;  # 就是上方创建的 index.html
}
```

6. `nginx -s reload`重新加载后，测试启动访问

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220728/image.6dtnfz58zpo0.webp)

 页面会报 403 拒绝访问的错误。

7. 分析原因：因为当前用户（www 用户）没有访问 `/root/html` 目录的权限，这个目录只有 root 才能访问。

那么 www 如何访问我们写的 index.html 页面呢？我们知道，每新建一个用户，`/home` 下都会生成该用户权限的目录。

8. 将文件移动到 `/home/www/html/index.html`

```sh
mv /root/html /home/www
```

9. 记得修改配置文件的资源内容

```nginx
location / {
	# root   html;  # 原始的代码注释掉
	# root   /root/html;   # 这属于 root 权限的页面，注释或者删除掉
	root   /home/www/html;  # 这是 www 用户有权限访问的目录
	index  index.html index.htm;   # 访问了 html 目录，然后访问 index.html 文件
}
```

10. 再次测试启动访问，可以正常访问。

综上所述，使用 user 指令可以指定启动运行工作进程的用户及用户组，这样对于系统的权限访问控制的更加精细，也更加安全。

我们也能理解了配置文件的 `locaotion` 块的基本使用，root 对应着访问目录，index 对应着访问目录下的默认页面。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220728/image.6igjptnd6eo0.webp)

### work process指令

1. `master_process` 指令用来指定是否开启 worker 工作进程。

如果为 off，则代表关闭了 worker 进程，这时候启动 Nginx，只有 master 进程启动，没有 worker 进程。默认开启 worker 工作进程。(<mark>需要重启nginx服务生效</mark>)

| 语法                        | 默认值             | 位置   |
| --------------------------- | ------------------ | ------ |
| master_process <on \| off>; | master_process on; | 全局块 |

2. `worker_processes` 指令用于配置 Nginx 生成 worker 工作进程的数量，这个是 Nginx 服务器实现并发处理

   服务的关键所在。

理论上来说 `workder process` 的值越大，可以支持的并发处理量也越多，但事实上这个值的设定是需要受到来自服务器自身的限制，建议将该值和服务器 CPU 的内核数保存一致。

| 语法                            | 默认值 | 位置   |
| ------------------------------- | ------ | ------ |
| worker_processes <num \| auto>; | 1      | 全局块 |

如果将 `worker_processes` 设置成 2，则会看到如下内容:

```sh
[root@master conf]# ps -ef | grep nginx
root       8960      1  0 16:13 ?        00:00:00 nginx: master process ./nginx
www       12299   8960  0 21:14 ?        00:00:00 nginx: worker process
www       12300   8960  0 21:14 ?        00:00:00 nginx: worker process
root      12302  10615  0 21:14 pts/1    00:00:00 grep --color=auto nginx
```

出现两个 worker 工作进程。

### 其他指令

1. `daemon` 指令设置 Nginx 是否以守护进程的方式启动。on 代表开启守护进程，off 代表关闭守护进程，默认开启。(<mark>需要重启nginx生效</mark>)

守护式进程是 Linux 后台执行的一种服务进程，特点是 **独立于控制终端，不会随着终端关闭而停止**，也就是后台启动。

| 语法                | 默认值     | 位置   |
| ------------------- | ---------- | ------ |
| daemon <on \| off>; | daemon on; | 全局块 |

2. `pid` 指令用来配置 Nginx 当前 master 进程的进程号 ID 存储的文件路径。默认路径是 `/usr/local/nginx/logs/nginx.pid`。

| 语法         | 默认值                          | 位置   |
| ------------ | ------------------------------- | ------ |
| pid \<file>; | /usr/local/nginx/logs/nginx.pid | 全局块 |

该属性也可以通过 `./configure --pid-path=PATH` 在编译时来指定。

3. `error_log` 指令用来配置 Nginx 的错误日志存放路径。默认路径是 `/usr/local/nginx/logs/error.log`。

| 语法                          | 默认值                          | 位置                           |
| ----------------------------- | ------------------------------- | ------------------------------ |
| error_log \<file> [日志级别]; | error_log logs/error.log error; | 全局块、http、server、location |

该属性也可以通过 `./configure --error-log-path=PATH` 在编译时来指定。

其中日志级别的值有『 debug | info | notice | warn | error | crit | alert | emerg 』，翻译过来为「调试 | 信息 | 通知 | 警告 | 错误 | 临界 | 警报 | 紧急」，这块建议大家设置的时候不要设置成 info 以下的等级，因为会带来大量的磁盘 I/O 消耗，影响 Nginx 的性能。

4. `include` 指令用来引入其他的配置文件，使 Nginx 的配置更加灵活。

| 语法             | 默认值 | 位置 |
| ---------------- | ------ | ---- |
| include \<file>; | 无     | any  |

## events块

### events指令

1. `accept_mutex` 指令用来设置是否开启 Nginx 网络连接序列化。默认开启。

| 语法                      | 默认值           | 位置   |
| ------------------------- | ---------------- | ------ |
| accept_mutex <on \| off>; | accept_mutex on; | events |

这个配置主要可以用来解决常说的「惊群」问题。大致意思是在某一个时刻，客户端发来一个请求连接，Nginx 后台是以多进程的工作模式，也就是说有多个 worker 进程会被同时唤醒，但是最终只会有一个进程可以获取到连接，如果每次唤醒的进程数目太多，就会影响 Nginx 的整体性能。如果将上述值设置为 on (开启状态)，将会对多个 Nginx 进程接收连接进行序列号，一个个来唤醒接收，就防止了多个进程对连接的争抢。

如图的小狗，如果只是一块「骨头」出现，则只需要唤醒一个小狗即可（开启 on），如果多个「骨头」如三个同时出现，那么唤醒三个小狗效率更高（此时需要设置 off）

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220728/image.118zwwf8v268.webp)

2. `multi_accept` 指令用来设置是否开启同时接收多个网络连接。默认开启。

| 语法                      | 默认值            | 位置   |
| ------------------------- | ----------------- | ------ |
| multi_accept <on \| off>; | multi_accept off; | events |

如果 multi_accept 被禁止了，Nginx 的一个工作进程只能同时接受一个新的连接。如果开启，一个工作进程可以同时接受所有的新连接。**建议开启。**

3. `worker_connections` 指令用来配置单个 worker 进程最大的连接数。默认 512 个连接数。

| 语法                          | 默认值                  | 位置   |
| ----------------------------- | ----------------------- | ------ |
| worker_connections \<number>; | worker_commections 512; | events |

这里的连接数不仅仅包括和前端用户建立的连接数，而是包括所有可能的连接数。另外，number 值不能大于操作系统支持打开的最大文件句柄数量。

4. `use` 指令用来设置 Nginx 服务器选择哪种事件驱动来处理网络消息。

| 语法           | 默认值           | 位置   |
| -------------- | ---------------- | ------ |
| use \<method>; | 根据操作系统规定 | events |

注意：此处所选择事件处理模型是 Nginx 优化部分的一个重要内容，method 的可选值有『 select | poll | epoll | kqueue 』等，之前在准备 Centos 环境的时候，我们强调过要使用 Linux 内核在 2.6 以上，就是为了能使用 epoll 函数来优化 Nginx。

另外这些值的选择，我们也可以在编译的时候使用 `--with-select_module`、`--without-select_module`、`--with-poll_module`、`--without-poll_module` 来设置是否需要将对应的事件驱动模块编译到 Nginx 的内核。

### events指令配置模板

打开 Nginx 的配置文件 nginx.conf，添加如下配置

```nginx
events{
	accept_mutex on;    # 开启 Nginx 网络连接序列化
	multi_accept on;    # 开启同时接收多个网络连接
	worker_commections 1024;   # 单个 worker 进程最大的连接数
	use epoll;   # 使用 epoll 函数来优化 Nginx
}
```

启动测试

```sh
# 测试配置是否语法出错
nginx -t

# 重新加载 Nginx
nginx -s reload
```

## http块

### 定义MIME-Type

我们都知道浏览器中可以显示的内容有 HTML、XML、GIF 等种类繁多的文件、媒体等资源，浏览器为了区分这些资源，就需要使用 MIME Type。所以说 MIME Type 是网络资源的媒体类型。Nginx 作为 Web 服务器，也需要能够识别前端请求的资源类型。

在 Nginx 的配置文件中，默认有两行配置：

```sh
include mime.types;      # 引入 mime.types 文件的内容
default_type application/octet-stream;     # 默认的 MIME 类型
```

1. `default_type` 指令用来配置 Nginx 响应前端请求默认的 MIME 类型。默认是 text 文本。

| 语法                       | 默认值                   | 位置                   |
| -------------------------- | ------------------------ | ---------------------- |
| default_type \<mime-type>; | default_type text/plain; | http、server、location |

在 `default_type` 前面还有一句 `include mime.types`，include 之前我们已经介绍过，相当于把 mime.types 文件中 MIMT 类型与相关类型文件的文件后缀名的对应关系加入到当前的配置文件中。

举例来说明：

有些时候请求某些接口的时候需要返回指定的文本字符串或者 json 字符串，而不是页面，如果逻辑非常简单或者干脆是固定的字符串，那么可以使用 Nginx 快速实现，这样就不用编写程序响应请求了，可以减少服务器资源占用并且响应性能非常快。

如何实现：

```nginx
location /get_text {
    default_type text/html;      # 等价于 text/plain，返回文本类型
    return 200 "<h1>This is nginx's text</h1>";
}
location /get_json{
    default_type application/json;   # 返回 json 字符串类型
    return 200 '{"name": "xu", "age": 21}';
}
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220728/image.1joqriwre9j4.webp)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220728/image.47ty7dkhzmi0.webp)

### 自定义服务日志

Nginx 中日志的类型分 access.log、error.log。

`access.log` 日志用来记录用户所有的访问请求。

`error.log` 日志记录 Nginx 本身运行时的错误信息，不会记录用户的访问请求。

Nginx 服务器支持对服务日志的格式、大小、输出等进行设置，需要使用到两个指令，分别是 `access_log` 和 `log_format` 指令。

1. `access_log` 指令用来设置用户访问日志的相关属性。

| 语法                                      | 默认值                               | 位置                   |
| ----------------------------------------- | ------------------------------------ | ---------------------- |
| access_log \<path> [format[buffer=size]]; | access_log logs/access.log combined; | http、server、location |

format 对应着 `log_format` 的 name，必须保持一致。

2. `log_format` 指令用来指定日志的输出格式。

| 语法                                                         | 默认值                     | 位置 |
| ------------------------------------------------------------ | -------------------------- | ---- |
| log_format \<name> [escape=default \| json \| none] \<string> ...... ; | log_format combined "..."; | http |

name 对用 `access_log` 的 format，必须保持一致。

> **例子 1：自定义日志路径和输出格式**

+ 在 `/usr/local/nginx/logs` 下创建 my.log 文件，该文件作为日志。

```sh
mkdir /usr/local/nginx/logs/my.log
```

+ 自定义日志输出格式：`==========>This is My format`
+ 在配置文件配置相关指令

```nginx
log_format myformat '=========>This is My format';
access_log logs/my.log myformat;
```

+ 重启服务并进行测试

```sh
# 重启 Nginx 服务
nginx -s reload

# 监听日志
tail -f /usr/local/nginx/logs/my.log
```

浏览器访问一次 Nginx 的欢迎页面，回来看日志的输出，结果如图：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220728/image.5t1f8j2rclc0.webp)

> **例子 2：输出内容加上访问机器的信息**

- 进入配置文件，在输出格式上加上 Nginx 的内置参数

```nginx
log_format myformat '=========>This is My format:$http_user_agent';
access_log logs/my.log myformat;
```

+ 重启测试

```sh
# 重启 Nginx 服务
nginx -s reload

# 监听日志
tail -f /usr/local/nginx/logs/my.log
```

浏览器访问一次 Nginx 的欢迎页面，回来看日志的输出，结果如图：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220728/image.2rkljjc3tlk0.webp)

### 其他配置指令

1. `sendfile`：用来设置 Nginx 服务器是否使用 sendfile 传输文件，该属性可以大大提高 Nginx 处理静态资源的性能。默认关闭，建议开启。

| 语法                  | 默认值        | 位置                   |
| --------------------- | ------------- | ---------------------- |
| sendfile <on \| off>; | sendfile off; | http、server、location |

2. `keepalive_timeout`：用来设置长连接的超时时间，默认超时时间是 75 秒。

**为什么要使用 keepalive？**

我们都知道 HTTP 是一种无状态协议，客户端向服务端发送一个 TCP 请求，服务端响应完毕后断开连接。

如何客户端向服务端发送多个请求，每个请求都需要重新创建一次连接，效率相对来说比较多，使用 keepalive 模式，可以告诉服务器端在处理完一个请求后保持这个 TCP 连接的打开状态，若接收到来自这个客户端的其他请求，服务端就会利用这个未被关闭的连接，而不需要重新创建一个新连接，提升效率，但是这个连接也不能一直保持，这样的话，连接如果过多，也会是服务端的性能下降，这个时候就需要我们进行设置其的超时时间。

| 语法                       | 默认值                 | 位置                   |
| -------------------------- | ---------------------- | ---------------------- |
| keepalive_timeout \<time>; | keepalive_timeout 75s; | http、server、location |

3. `keepalive_requests`：用来设置一个 keep-alive 连接使用的次数，默认是 100 次。

| 语法                          | 默认值                  | 位置                   |
| ----------------------------- | ----------------------- | ---------------------- |
| keepalive_requests \<number>; | keepalive_requests 100; | http、server、location |

## server块和location块

server 块和 location 块都是我们要重点学习的内容，因为我们后面会对 Nginx 的功能进行详细讲解，所以该内容在[静态资源部署](/middleware/Nginx/Nginx_Static_resource_deployment/)和[静态资源访问](/middleware/Nginx/NginxStatic_resource_access/)进行详细说明。

本次我们这是认识下 Nginx 默认给的 nginx.conf 中的相关内容，以及 server 块与 location 块在使用的时候需要注意的一些内容。

```nginx
server {
	listen       80;     # 监听 80 端口，如果更改端口，则外界访问的时候带上对应的端口号，如 8080
	server_name  localhost;  # 指定可以访问 Nginx 的 IP 地址
	
	location / {      
		root   html;    # 访问资源所对应的目录，这里是 html 目录
		index  index.html index.htm;    # 访问资源所对应目录下的默认页面，优先级递增
	}

	error_page   500 502 503 504 404  /50x.html;  # 访问错误，跳转访问 /50x.html 请求
	location = /50x.html {   # 访问 /50x.html 请求的处理
		root   html;    # 访问资源所对应的目录，这里是 html 目录的 50x.html
	}
}
```

- listen 和 server_name 是我们的 `http://server_name:listen`，如 `http://localhost:80`
- location / 就是访问 `http://server_name:listen/`，里面的配置对应着 `http://server_name:listen/html/index.html`
- 页面产生 500 502 503 504 404，就会发送 `http://server_name:listen/50x.html`
- location = /50x.html 就是 `http://server_name:listen/50x.html`，它会自动访问 `http://server_name:listen/html/50x.html`
- root 代表资源目录指令
- index 代表默认访问网页指令

