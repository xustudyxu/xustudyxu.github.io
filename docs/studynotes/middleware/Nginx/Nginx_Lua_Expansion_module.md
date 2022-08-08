---
title: Nginx Lua扩展模块
date: 2022-08-07 16:57:34
permalink: /middleware/Nginx/Nginx_Lua_Expansion_module
categories:
  - Nginx
tags:
  - Nginx
---
# Nginx Lua扩展模块

[[toc]]

## ngx_lua模块概念

[ngx_lua 官方文档](https://github.com/openresty/lua-nginx-module#readme)

[ngx_lua 中文文档](https://www.kancloud.cn/qq13867685/openresty-api-cn/159175)

淘宝开发的 `ngx_lua` 模块通过将 Lua 解释器集成进 Nginx，可以采用 Lua 脚本实现业务逻辑，由于 Lua 的紧凑、快速以及内建协程，所以在保证高并发服务能力的同时极大地降低了业务逻辑实现成本。

## ngx_lua模块环境准备

下载 `ngx-lua-module` 模块有两个方式。

- 方式一安装比较繁琐，需要手动下载其他依赖
- 方式二安装简单快捷，集成了依赖，不需要手动下载依赖，建议方式二

不论方式一还是方式二安装，**首先确保你为它安装好了环境，否则会安装报错**。环境分别为：`GCC`、`PCRE`、`zlib`、`OpenSSL`。[环境安装传送门](/middleware/Nginx/Nginx_install/#nginx环境安装)。

### 方式一

方式一下载第三方模块 `lua-nginx-module`，前，需要先下载 `LuaJIT` 解析器。

`LuaJIT` 官网地址为：[http://luajit.org/](http://luajit.org/)。

- LuaJIT 是采用 C 语言编写的 Lua 代表的解释器，我们先下载它。

  在官网上找到对应的下载地址：[https://luajit.org/download.html](https://luajit.org/download.html)

  在 Linux 上使用 wget 来下载: `wget http://luajit.org/download/LuaJIT-2.0.5.tar.gz`，这里下载在 `/opt`，下载的版本是 2.0.5。

```sh
cd /opt
wget http://luajit.org/download/LuaJIT-2.0.5.tar.gz
```

将下载的资源进行解压

```sh
tar -zxf LuaJIT-2.0.5.tar.gz
```

进入解压的目录

```sh
cd LuaJIT-2.0.5
```

执行编译和安装:

```sh
make && make install
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220807/image.50moe87h8k00.webp)

+ 下载 `lua-nginx-module`

下载地址：[https://github.com/openresty/lua-nginx-module/tags](https://github.com/openresty/lua-nginx-module/tags)

在 Linux 上使用 wget 来下载: `wget https://github.com/openresty/lua-nginx-module/archive/v0.10.16rc4.tar.gz`，这里下载在 `/opt`，版本是 0.10.16rc4。

```sh
wget https://github.com/openresty/lua-nginx-module/archive/v0.10.16rc4.tar.gz
```

将下载的资源进行解压

```sh
tar -zxf lua-nginx-module-0.10.16rc4.tar.gz
```

目录名太长，更改目录名

```sh
mv lua-nginx-module-0.10.16rc4 lua-nginx-module
```

导入环境变量，告诉 Nginx 去哪里找 LuaJIT

```sh
export LUAJIT_LIB=/usr/local/lib
export LUAJIT_INC=/usr/local/include/luajit-2.0
```

进入 Nginx 的源码目录（安装包目录）执行如下命令：

```sh
./configure --prefix=/usr/local/nginx --add-module=/opt/lua-nginx-module
make && make install
```

**注意事项**

1. 如果启动 Nginx 出现如下错误:

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220807/image.3mn8xd7igx20.webp)

解决方案：

设置软链接，使用如下命令

```sh
 ln -s /usr/local/lib/libluajit-5.1.so.2 /lib64/libluajit-5.1.so.2
```

2. 如果启动 Nginx 出现以下错误信息

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220807/image.6h5kw6afg4w0.webp)

分析原因：因为 `lua-nginx-module` 是来自 OpenResty，错误中提示的 resty.core 是 OpenRestry 的核心模块，对其下的很多函数进行了优化等工作。以前的版本默认不会把该模块编译进去，所以需要使用的话，我们得手动安装，或者禁用就可以。但是最新的 `lua-nginx-module` 模块已经强制性安装了该模块，所以此处因为缺少 resty 模块导致的报错信息。

解决方案有两个：一种是下载对应的模块，另一种则是禁用掉 restry 模块，禁用的方式为：

```nginx
http{
	lua_load_resty_core off;
}
```

+ 测试

在 nginx.conf 下配置如下内容:

```nginx
location /lua{
    default_type 'text/html';
    content_by_lua 'ngx.say("<h1>HELLO,LUA</h1>")';
}
```

配置成功后，启动 Nginx，通过浏览器进行访问，如果获取到如下结果，则证明安装成功。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220807/image.6dtqzlgzk5s0.webp)

### 方式二

方式二使用 OpenRestry 进行安装。OpenRestry 就是我们上面说到的 Nginx 的 Spring 之一。

#### 概述

前面我们提到过，OpenResty 是由淘宝工程师开发的，所以其官方网站（[http://openresty.org/](http://openresty.org/cn/)）我们读起来是非常的方便。OpenResty 是一个基于 Nginx 与 Lua 的高性能 Web 平台，其内部集成了大量精良的 Lua 库、第三方模块以及大多数的依赖项。用于方便地搭建能够处理超高并发、扩展性极高的动态 Web 应用、Web 服务和动态网关。所以本身 OpenResty 内部就已经集成了 Nginx 和 Lua，所以我们使用起来会更加方便。

#### Linux安装

下载地址：[http://openresty.org/cn/download.html](http://openresty.org/cn/download.html)。这里下载 1.19.9.1 版本。

- 可以在 Windows 下载 OpenResty：[https://openresty.org/download/openresty-1.19.9.1.tar.gz](https://openresty.org/download/openresty-1.19.9.1.tar.gz)，然后上传到 Linux

  或者直接在 Linux 使用 wget 下载: `wget https://openresty.org/download/openresty-1.19.9.1.tar.gz`

```sh
cd /opt/openresty    # 没有就创建：mkdir /opt/openresty

wget https://openresty.org/download/openresty-1.19.9.1.tar.gz
```

+ 解压缩

```sh
tar -zxvf openresty-1.19.9.1.tar.gz
```

+ 进入 OpenResty 目录

```sh
cd openresty-1.19.9.1
```

+ 执行命令

```sh
./configure
```

+ 执行命令进行编译和安装

```sh
make && make install
# 或者
gmake && gmake install
```

默认安装在 `/usr/local/` 下。

+ 进入 OpenResty 的目录，找到 nginx

```sh
cd /usr/local/openresty/nginx
```

+ 在 conf 目录下的 nginx.conf 添加如下内容：

```sh
vim conf/nginx.conf
```

```nginx
location /lua {
    default_type 'text/html';
    content_by_lua 'ngx.say("<h1>HELLO,OpenRestry</h1>")';
}
```

重启 Nginx 配置文件

```sh
nginx -s reload
```

+ 先把 Nginx 停止运行

```sh
systemctl stop Nginx
```

然后在 sbin 目录下启动可执行文件 nginx

```nginx
./sbin/nginx
```

+ 通过浏览器访问测试`192.168.91.200`

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220807/image.502009iyfd00.webp)

+ 通过浏览器访问测试`192.168.91.200/lua`

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220807/image.4r1610qz44g0.webp)

### OpenResty卸载

卸载非常简单粗暴，相信我，这样卸载是对的，没什么问题。

1. 停止 Nginx 服务

```sh
# 查看 Nginx 是否停止，没有则去停止
ps -ef | grep nginx 

# 进入 sbin 目录
cd /usr/local/openresty/nginx/sbin
./nginx -s stop
```

2. 输入以下指令全局查找 OpenResty 相关的文件

```sh
find / -name openresty
```

3. find / -name openresty

```sh
rm -rf  此处跟查找出来的 Openresty 文件
```

## ngx_lua指令图

使用 Lua 编写 Nginx 脚本的基本构建块是指令。指令用于指定何时运行用户 Lua 代码以及如何使用结果。

下图显示了执行指令的顺序。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220807/image.3xichpazdxy0.webp)

先来解释下 * 的作用

- \* 代表 *_by_lua 指令，指令后面跟的是 lua 指令
- *:\_file，即 *_by_lua_file 指令，后面跟的是 lua 文件
- *:\_block，即 *_by_lua_block 指令，在 0.9.17 版后替换 init_by_lua_file

如上图所示，OpenResty 的执行阶段分为：

- init_by_lua*：在每次 Nginx 重新加载配置时执行，初始化一些全局配置。
- init_worker_by_lua*：该指令用于启动一些定时任务，如心跳检查、定时拉取服务器配置等。
- set_by_lua* : 流程分支处理判断变量初始化
- rewrite_by_lua* : 转发、重定向、缓存等功能(例如特定请求代理到外网)
- access_by_lua* : IP 准入、接口权限等情况集中处理(例如配合 iptable 完成简单防火墙)
- content_by_lua* : 内容生成
- header_filter_by_lua* : 响应头部过滤处理(例如添加头部信息)
- body_filter_by_lua* : 响应体过滤处理(例如完成应答内容统一成大写)
- log_by_lua* : 会话完成后本地异步完成日志记录(日志可以记录在本地，还可以同步到其他机器)

## 语法API

### ngx.say

返回结果给客户端。

语法：`ngx.say("")`。

```nginx {4}
location / {
    default_type 'text/plain';
    content_by_lua_block {
        ngx.say("Hello World")
    }
}
```

你会在网页上看到 Hello World。

### ngx.print

将输入参数合并发送给 HTTP 客户端 (作为 HTTP 响应体)。如果此时还没有发送响应头信息，本函数将先发送 HTTP 响应头，再输出响应体。

语法：`ok, err = ngx.print(...)`

```lua
local table = {
     "hello, ",
     {"world: ", true, " or ", false,
         {": ", nil}}
 }
ok, err = ngx.print(table)
```

将输出：

```lua
 hello, world: true or false: nil
```

其中 ok 存储着输出的内容，如果输出失败，err 存储失败的原因。

本函数为异步调用，将立即返回，不会等待所有数据被写入系统发送缓冲区。要以同步模式运行，请在调用 `ngx.print` 之后调用 `ngx.flush`。

### ngx.flush

向客户端刷新响应输出。

语法：`ok, err = ngx.flush(wait)`

`ngx.flush` 接受一个布尔型可选参数 `wait` (默认值 `false`)。当通过默认参数（`false`）调用时，本函数发起一个异步调用。当把 `wait` 参数设置为 `true` 时，本函数将以同步模式执行。

- 异步调用下，直接将数据返回，不等待输出数据被写入系统发送缓冲区。
- 同步模式下，本函数不会立即返回，一直到所有输出数据被写入系统输出缓冲区，或到达发送超时 send_timeout 时间。

这个要和上方的 ngx.print 进行配合使用，开启同步模式，可以优化返回客户端多条数据的速度。

```lua
local table = {
     "hello, ",
     {"world: ", true, " or ", false,
         {": ", nil}}
 }
ok, err = ngx.print(table)
ngx.flush(true) 		-- 开启同步模式
```

### ngx.arg

获取定义的变量。

语法：`ngx.arg[n]`。

```nginx {4}
 location /foo {
     set $a 32;
     set $b 56;
     sum = ngx.arg[1] + ngx.arg[2]  # 等价于 $a + $b
     echo $sum;  
 }
```

将输出 88，是 32 和 56 的和。

### ngx.var

读写 Nginx 变量值。

语法：`ngx.var.xxx`。

```nginx {2,4}
location /foo {
    set $my_var '';  # 创建 $my_var 变量
    content_by_lua '
        ngx.var.my_var = 123;  # 使用 $my_var 变量
    ';
}
```

### ngx.log

输出到日志中。格式：`ngx.log(ngx.level,...)`

可指定多个日志常量 ngx.level。

ngx.level有：

```lua
ngx.STDERR    -- 例如 ngx.log(ngx.STDERR)
ngx.EMERG
ngx.ALERT
ngx.CRIT
ngx.ERR
ngx.WARN
ngx.NOTICE
ngx.INFO
ngx.DEBUG
```

### HTTP 方法常量

```lua
ngx.HTTP_GET
ngx.HTTP_HEAD
ngx.HTTP_PUT
ngx.HTTP_POST
ngx.HTTP_DELETE
ngx.HTTP_OPTIONS   (v0.5.0rc24 版本加入)
ngx.HTTP_MKCOL     (v0.8.2 版本加入)
ngx.HTTP_COPY      (v0.8.2 版本加入)
ngx.HTTP_MOVE      (v0.8.2 版本加入)
ngx.HTTP_PROPFIND  (v0.8.2 版本加入)
ngx.HTTP_PROPPATCH (v0.8.2 版本加入)
ngx.HTTP_LOCK      (v0.8.2 版本加入)
ngx.HTTP_UNLOCK    (v0.8.2 版本加入)
ngx.HTTP_PATCH     (v0.8.2 版本加入)
ngx.HTTP_TRACE     (v0.8.2 版本加入)
```

### HTTP 状态常量

```lua
value = ngx.HTTP_OK 					(等于 200)
value = ngx.HTTP_CREATED 				(等于 201)
value = ngx.HTTP_SPECIAL_RESPONSE 		(等于 300)
value = ngx.HTTP_MOVED_PERMANENTLY 		(等于 301)
value = ngx.HTTP_MOVED_TEMPORARILY 		(等于 302)
value = ngx.HTTP_SEE_OTHER 				(等于 303)
value = ngx.HTTP_NOT_MODIFIED 			(等于 304)
value = ngx.HTTP_BAD_REQUEST 			(等于 400)
value = ngx.HTTP_UNAUTHORIZED 			(等于 401)
value = ngx.HTTP_FORBIDDEN 				(等于 403)
value = ngx.HTTP_NOT_FOUND 				(等于 404)
value = ngx.HTTP_NOT_ALLOWED 			(等于 405)
value = ngx.HTTP_GONE 					(等于 410)
value = ngx.HTTP_INTERNAL_SERVER_ERROR 	(等于 500)
value = ngx.HTTP_METHOD_NOT_IMPLEMENTED (等于 501)
value = ngx.HTTP_SERVICE_UNAVAILABLE 	(等于 503)
value = ngx.HTTP_GATEWAY_TIMEOUT 		(等于 504) (v0.3.1rc38 版本加入)
```

### print

将参数值以 `ngx.NOTICE` 日志级别写入 Nginx 的 `error.log` 文件。

语法：`print(...)`。

```lua
print("Hello")
```

等价于

```lua
ngx.log(ngx.NOTICE, "Hello")
```

### ngx.ctx

一个 location 模块里的全局环境变量，存储基于请求的 Lua 环境数据。

语法：`ngx.ctx.xxx`。

```nginx
location /sub {
    content_by_lua '
        ngx.say("sub pre: ", ngx.ctx.blah)
        ngx.ctx.blah = 32
        ngx.say("sub post: ", ngx.ctx.blah)
    ';
}

location /main {
    content_by_lua '
        ngx.ctx.blah = 73
        ngx.say("main pre: ", ngx.ctx.blah)
        local res = ngx.location.capture("/sub")
        ngx.print(res.body)
        ngx.say("main post: ", ngx.ctx.blah)
    ';
}
```

访问 `GET /main` 输出：

```lua
main pre: 73
sub pre: nil
sub post: 32
main post: 73
```

### ngx.exit

退出某个阶段，如处理请求阶段、重定向阶段等。

语法：`ngx.exit(status)`。

`status` 参数可以是 `ngx.OK`，`ngx.ERROR` 等等 [HTTP 状态常量](/middleware/Nginx/Nginx_Lua_Expansion_module/#http-状态常量)

```lua
ngx.status = ngx.HTTP_GONE
ngx.say("This is our own content")

-- 退出整个请求而不是当前处理阶段
ngx.exit(ngx.HTTP_OK)
```

可以直接使用数字作为参数，例如：

```lua
 ngx.exit(501)
```

::: warning

数字作为参数仅支持 `NGX_OK` 和 `NGX_ERROR` 的数字。

:::

### ngx.sleep

无阻塞地休眠特定秒。时间可以精确到 0.001 秒 (毫秒)。

语法：`ngx.sleep(seconds)`。

```lua
ngx.sleep(1000)
```

## 请求API

### ngx.req.get_uri_args

返回一个 Lua table，包含当前请求的所有 URL 查询参数。

语法：`args = ngx.req.get_uri_args([max_args])`

```nginx
location = /test {
     content_by_lua '
         local args = ngx.req.get_uri_args()
         for key, val in pairs(args) do
             if type(val) == "table" then
                 ngx.say(key, ": ", table.concat(val, ", "))
             else
                 ngx.say(key, ": ", val)
             end
         end
     ';
 }
```

访问 `GET /test?foo=bar&bar=baz&bar=blah` 将输出：

```lua
 foo: bar
 bar: baz, blah
```

多次出现同一个参数 key 时，将生成一个 Lua table，按顺序保存其所有 value。

### ngx.req.set_uri_args

用 `args` 参数重写当前请求的 URI 请求参数。

语法：`ngx.req.set_uri_args(args)`。

```lua
ngx.req.set_uri_args("a=3&b=hello%20world")

ngx.req.set_uri_args({ a = 3, b = "hello world" })

ngx.req.set_uri_args({ a = 3, b = {5, 6} })
```

在第二种情况下，本方法将根据 URI 转义规则转义参数的 key 和 value。

在第三种情况下，请求参数字符串为 `a=3&b=5&b=6`。

### ngx.header.HEADER

修改、添加、或清除当前请求待发送的 `HEADER` 响应头信息。

语法：`ngx.header.HEADER = VALUE`。

`HEADER` 响应头信息不是自定义的，是请求头带有的。

```lua
 -- 与 ngx.header["Content-Type"] = 'text/plain' 相同
 ngx.header.content_type = 'text/plain';

 ngx.header["X-My-Header"] = 'blah blah'
```

### ngx.req.get_method

获取当前请求的 HTTP 请求方法名称。结果为类似 `"GET"` 和 `"POST"` 的字符串。

语法：`ngx.req.get_method`。

```lua
value = ngx.req.get_method
```

### ngx.req.set_method

用 `method_id` 参数的值改写当前请求的 HTTP 请求方法。当前仅支持 [HTTP 请求方法](/middleware/Nginx/Nginx_Lua_Expansion_module/#http-方法常量) 中定义的数值常量。

语法：`ngx.req.set_method(method_id)`。

```lua
ngx.req.set_method(method_id)

ngx.req.set_method(ngx.HTTP_GET)
```

### ngx.req.read_body

同步读取客户端请求体，不阻塞 Nginx 事件循环。

语法：`ngx.req.read_body()`。

```lua
ngx.req.read_body()
local args = ngx.req.get_post_args()
```

### ngx.req.get_post_args

返回一个 Lua table，包含当前请求的所有 POST 查询参数。

语法：`args, err = ngx.req.get_post_args(max_args?)`

::: warning

使用 `ngx.req.get_post_args` 获取参数前，必须使用 `ngx.req.read_body` 读取请求体。

:::

```lua
 location = /test {
     content_by_lua '
         ngx.req.read_body()
         local args, err = ngx.req.get_post_args()
         if not args then
             ngx.say("failed to get post args: ", err)
             return
         end
         for key, val in pairs(args) do
             if type(val) == "table" then
                 ngx.say(key, ": ", table.concat(val, ", "))
             else
                 ngx.say(key, ": ", val)
             end
         end
     ';
 }
```

请求

```sh
 # Post request with the body 'foo=bar&bar=baz&bar=blah'
 $ curl --data 'foo=bar&bar=baz&bar=blah' localhost/test
```

将输出：

```lua
 foo: bar
 bar: baz, blah
```

多次出现同一个参数 key 时，将生成一个 Lua table，按顺序保存其所有 value。

### ngx.redirect

发出一个 HTTP `301` 或 `302` 重定向到 `uri`。

可选项 `status` 参数指定 `301` 或 `302` 哪个被使用。 默认使用 `302`。

语法：`ngx.redirect(uri, [status])`。

```lua
return ngx.redirect("/foo")

-- 等价于
return ngx.redirect("/foo", 301)

-- 等价于
return ngx.redirect("/foo", ngx.HTTP_MOVED_TEMPORARILY)
```

重定向到任意外部 URL 也是支持的，例如：

```lua
return ngx.redirect("http://www.baidu.com")
```

### ngx.exec

使用 `uri`、`args` 参数执行一个内部跳转。内部指的是 Nginx 的某个 location 模块。

语法：`ngx.exec(uri, [args])`

```nginx
location /foo {
     content_by_lua '
         ngx.exec("/bar", "a=goodbye");
     ';
 }

 location /bar {
     content_by_lua '
         local args = ngx.req.get_uri_args()
         for key, val in pairs(args) do
             if key == "a" then
                 ngx.say(val)
             end
         end
     ';
 }
```

访问 `GET /foo/file.php?a=hello`，将返回 『 hello 』 ，而不是 『 goodbye 』

::: warning

`ngx.exec` 方法与 [ngx.redirect](/middleware/Nginx/Nginx_Lua_Expansion_module#nginx-redirect) 是完全不同的，前者是个纯粹的内部跳转并且没有引入任何额外 HTTP 信号。

此方法的调用终止当前请求的处理。

:::

### ngx.location.capture

向 `uri` 发起一个同步非阻塞 Nginx 子请求。

语法：`ngx.location.capture(uri,[options])`。

::: warning

它会请求 Nginx 的其他 location 模块，location 模块可以是其他文件目录的配置文件中，或任何其他 Nginx 模块。

:::

```lua
res = ngx.location.capture(uri,[options])
```

`res` 是返回的结果，它是一个「对象」，将包含四个元素的 Lua 表 (`res.status`, `res.header`, `res.body`, 和 `res.truncated`)。

- `res.status` (状态) 保存子请求的响应状态码。
- `res.header` (头) 用一个标准 Lua 表储子请求响应的所有头信息。如果是“多值”响应头，这些值将使用 Lua (数组) 表顺序存储。

如果子请求响应头包含下面的行：

```lua
 Set-Cookie: a=3
 Set-Cookie: foo=bar
 Set-Cookie: baz=blah
```

则 `res.header["Set-Cookie"]` 将存储 Lua 表 `{"a=3", "foo=bar", "baz=blah"}`。

**options 选项**

| 选项                | 作用                                                         |
| ------------------- | ------------------------------------------------------------ |
| method              | 指定子请求的请求方法, 只接受类似 `ngx.HTTP_POST` 的常量      |
| body                | 指定子请求的请求体 (仅接受字符串值)                          |
| args                | 指定子请求的 URI 请求参数 (可以是字符串或者 Lua 表)          |
| ctx                 | 指定一个 Lua 表作为子请求的 ngx.ctx 表，可以是当前请求的 ngx.ctx 表 |
| vars                | 用一个 Lua 表设置子请求中的 Nginx 变量值                     |
| copy_all_vars       | 设置是否复制所有当前请求的 Nginx 变量值到子请求中，修改子请求的 nginx 变量值不影响当前 (父) 请求 |
| share_all_vars      | 设置是否共享所有当前 (父) 请求的 Nginx 变量值到子请求中，修改子请求的 nginx 变量值将影响当前 (父) 请求 |
| always_forward_body | 当设置为 true 时，如果没有设置 `body` 选项，当前 (父) 请求的请求体将被转发给子请求 |

例如，发送一个 POST 子请求，可以这样做：

```nginx
 res = ngx.location.capture(
     '/foo/bar',
     { method = ngx.HTTP_POST, args = { a = 1,b = 3}, body = 'Hello，World' }
 )
```

等价于：

```lua
res = ngx.location.capture('/foo/bar?a=1&b=3')
```

`method` 选项默认值是 `ngx.HTTP_GET`。

其他内容具体看中文文档，开头有转送门。

::: tip ngx.exec 和 ngx.location.capture 区别

`ngx.exec` 只会访问同一个配置文件的 location 模块。

`ngx.location.capture` 不仅如此，还可以访问其他配置文件的 location 模块。

:::

### ngx.req.set_uri

语法：`ngx.req.set_uri(uri, jump?)`

通过参数 uri 重写当前请求的 uri；参数 jump，表明是否进行 locations 的重新匹配。当 jump 为 true 时，调用 `ngx.req.set_uri` 后，Nginx 将会根据修改后的 uri，重新匹配新的 locations；如果 jump 为 false，将不会进行 locations 的重新匹配，而仅仅是修改了当前请求的 URI 而已。jump 的默认值为 false。

- jump 为 true，等价于 rewrite...last
- jump 为 false，等价于 rewrite...break

例如：

```lua
ngx.req.set_uri("/foo", true)  === rewrite ^ /foo last;

ngx.req.set_uri("/foo", false)  ===  rewrite ^ /foo break;
```

## 指令API

### init_by_lua

该指令在每次 Nginx 重新加载配置时执行，可以用来完成一些耗时模块的加载，或者初始化一些全局配置。

这是一个公共模块，把所有都用到的代码放到这个模块里，避免重复使用相同的代码。

比如每个模块都需要 MySQL 和 Redis，则在这个公共模块进行引用。

```nginx
init_by_lua_block{
    mysql = require "resty.mysql"
	redis = require "resty.redis"
}
# 下方直接使用 MySQL 和 Redis 的 API
```

如果不喜欢直接写 Lua 语法，把 Lua 语法 放到 Lua 文件里，使用 `init_by_lua_file` 引用 Lua 文件。

### init_worker_by_lua

该指令用于启动一些定时任务，如心跳检查、定时拉取服务器配置等。

例如：

```lua
 init_worker_by_lua '
     local delay = 3  -- in seconds
     local new_timer = ngx.timer.at
     local log = ngx.log
     local ERR = ngx.ERR
     local check

     check = function(premature)
         if not premature then
             -- do the health check or other routine work
             local ok, err = new_timer(delay, check)
             if not ok then
                 log(ERR, "failed to create timer: ", err)
                 return
             end
         end
     end

     local ok, err = new_timer(delay, check)
     if not ok then
         log(ERR, "failed to create timer: ", err)
         return
     end
 ';
```

如果不喜欢直接写 Lua 语法，把 Lua 语法 放到 Lua 文件里，使用 `init_worker_by_lua_file` 引用 Lua 文件。

### set_by_lua

该指令只要用来做变量赋值，这个指令一次只能返回一个值，并将结果赋值给 Nginx 中指定的变量。

| 语法                        | 说明                                      |
| --------------------------- | ----------------------------------------- |
| set_by_lua* \<key> \<value> | key要加上 $ 符号，value 是 Lua 语言的格式 |

例如：

```lua
set_by_lua $name "
		local uri_args = ngx.req.get_uri_args()   -- 获取请求 ? 后的参数
		name = uri_args['name']   -- 获取 key 为 name 的参数
		return name..'先生'   -- 在 name 后面加上 先生，作为 $name 的 value 返回给客户端
	";
```

此时 key 为 `$name` 的 value 值是 URL 的参数 name 加上「先生」。

如果不喜欢直接写 Lua 语法，把 Lua 语法 放到 Lua 文件里，使用 `set_by_lua_file` 引用 Lua 文件。

### rewrite_by_lua

该指令用于执行内部 URL 重写或者外部重定向，典型的如伪静态化 URL 重写，本阶段在 Rewrite 处理阶段的最后默认执行。

例如：

```nginx
location /foo {
    set $a 12; # 创建变量 $a
    set $b ""; # 创建变量 $b
    rewrite_by_lua '
         ngx.var.b = tonumber(ngx.var.a) + 1  # 此时 b = 13
         if tonumber(ngx.var.b) == 13 then
             return ngx.redirect("/bar");   # 重定向到 /bar
         end
     ';
    echo "res = $b";  # res = 13
}
```

如果不喜欢直接写 Lua 语法，把 Lua 语法 放到 Lua 文件里，使用 `rewrite_by_lua_file` 引用 Lua 文件。

### access_by_lua

该指令用于访问控制。例如，如果只允许内网 IP 访问。

```nginx
location / {
    access_by_lua '
        local res = ngx.location.capture("/auth")

        if res.status == ngx.HTTP_OK then
        return
        end

        if res.status == ngx.HTTP_FORBIDDEN then
        ngx.exit(res.status)
        end

        ngx.exit(ngx.HTTP_INTERNAL_SERVER_ERROR)
        ';

        # proxy_pass/fastcgi_pass/postgres_pass/...
}
```

注意，在 access_by_lua 处理内部，当调用 `ngx.exit(ngx.OK)` 时，nginx 请求将继续下一阶段的内容处理。要在 access_by_lua 处理中终结当前请求，调用 ngx.exit ，成功的请求设定 status >= 200 (`ngx.HTTP_OK`) 并 status < 300 (`ngx.HTTP_SPECIAL_RESPONSE`)，失败的请求设定`ngx.exit(ngx.HTTP_INTERNAL_SERVER_ERROR)` (或其他相关的)。

如果不喜欢直接写 Lua 语法，把 Lua 语法 放到 Lua 文件里，使用 `access_by_lua_file` 引用 Lua 文件。

### content_by_lua

**该指令是应用最多的指令**，大部分任务是在这个阶段完成的，其他的过程往往为这个阶段准备数据，正式处理基本都在本阶段。

这个指令就相当于 Java 的一个方法，所有的代码都需要一个方法体作为环境。

例如：

```lua
content_by_lua_block {
    set_by_lua $name "
        local uri_args = ngx.req.get_uri_args()   -- 获取请求 ? 后的参数
        name = uri_args['name']   -- 获取 key 为 name 的参数
        return name..'先生'   -- 在 name 后面加上 先生，作为 $name 的 value 返回给客户端
    ";
}
```

如果不喜欢直接写 Lua 语法，把 Lua 语法 放到 Lua 文件里，使用 `content_by_lua_file` 引用 Lua 文件。

### header_filter_by_lua

该指令用于设置应答消息的头部信息。

例如：

```nginx
location / {
	 proxy_pass http://mybackend;
	 header_filter_by_lua 'ngx.header.username = "frx"';
 }
```

你会在请求头看到 name 为 frx

如果不喜欢直接写 Lua 语法，把 Lua 语法 放到 Lua 文件里，使用 `header_filter_by_lua_file` 引用 Lua 文件。

### body_filter_by_lua

该指令是对响应数据进行过滤，如截断、替换。

例如，在输出体转换所有的小写字母，我们可以这样用：

```sh
 location / {
     proxy_pass http://mybackend;
     body_filter_by_lua 'ngx.arg[1] = string.upper(ngx.arg[1])';  # 转小写
 }
```

如果不喜欢直接写 Lua 语法，把 Lua 语法 放到 Lua 文件里，使用 `body_filter_by_lua_file` 引用 Lua 文件。

### log_by_lua

该指令用于在 log 请求处理阶段，用 Lua 代码处理日志，但并不替换原有 log 处理。

例如：

```nginx
server {
    location / {
        proxy_pass http://mybackend;

        log_by_lua '
            local log_dict = ngx.shared.log_dict
            local upstream_time = tonumber(ngx.var.upstream_response_time)

            local sum = log_dict:get("upstream_time-sum") or 0
            sum = sum + upstream_time
            log_dict:set("upstream_time-sum", sum)

            local newval, err = log_dict:incr("upstream_time-nb", 1)
            if not newval and err == "not found" then
            log_dict:add("upstream_time-nb", 0)
            log_dict:incr("upstream_time-nb", 1)
            end
            ';
    }
}
```

如果不喜欢直接写 Lua 语法，把 Lua 语法 放到 Lua 文件里，使用 `log_by_lua_file` 引用 Lua 文件。

### balancer_by_lua

 该指令主要的作用是用来实现上游服务器的负载均衡器算法

### ssl_certificate_by

该指令作用在 Nginx 和下游服务开始一个 SSL 握手操作时将允许本配置项的 Lua 代码。

## 简单案例

### 需求

发送请求：`http://192.168.91.200?name=张三&gender=1`

Nginx 接收到请求后，根据 gender 传入的值进行判断，如果 gender 传入的是 1，则在页面上展示张三先生,如果 gender 传入的是 0，则在页面上展示张三女士，如果未传或者传入的不是 1 和 2，则在页面上展示张三。

### 实现

在配置文件进行如下配置：

```nginx
location /getByGender {
	default_type 'text/html';
    
	set_by_lua $name "
		local uri_args = ngx.req.get_uri_args()
		gender = uri_args['gender']
		name = uri_args['name']
		if gender=='1' then
			return name..'先生'
		elseif gender=='0' then
			return name..'女士'
		else
			return name
		end
	";
	header_filter_by_lua "
		ngx.header.aaa='bbb'
	";
	charset utf-8;
	return 200 $name;
}
```

访问测试：`http://192.168.91.200/getByGender?name=冯荣旭&gender=1`

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220807/image.43wr3kwp3ag0.webp)

访问测试：`http://192.168.91.200/getByGender?name=冯荣旭`

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220807/image.44pzvk2lzlk0.webp)

## ngx_lua操作Redis

Redis 在系统中经常作为数据缓存、内存数据库使用，在大型系统中扮演着非常重要的作用。

在 Nginx 核心系统中，Redis 是常备组件。Nginx 支持 3 种方法访问 Redis，分别是 HttpRedis 模块、HttpRedis2Module 模块、lua-resty-redis 库。

这三种方式中 HttpRedis 模块提供的指令少，功能单一，适合做简单缓存。HttpRedis2Module 模块比 HttpRedis 模块操作更灵活，功能更强大。而Lua-resty-redis 库是 OpenResty 提供的一个操作 Redis 的接口库，可根据自己的业务情况做一些逻辑处理，适合做复杂的业务逻辑。

本内容将主要以 Lua-resty-redis 来进行讲解。

### Redis环境准备

准备一个 Redis 环境，并确保正常连接

```sh
# 连接地址
host= 192.168.91.200
port=6379
```

```sh
[root@master local]# /usr/local/bin/redis-server /etc/redis.conf
[root@master local]# redis-cli
127.0.0.1:6379>
```

### API学习

`lua-resty-redis` 提供了访问 Redis 的详细 API，包括创建对接、连接、操作、数据处理等。这些 API 基本上与 Redis 的操作一一对应。

| API                                             | 作用                                                         |
| ----------------------------------------------- | ------------------------------------------------------------ |
| redis = require "resty.redis"                   | 引入 Redis 模块，类似于 Java 的 import。                     |
| redis,err = redis:new()                         | 创建一个 Redis 对象给 redis，err 记录创建失败的原因。        |
| ok,err=redis:connect(host,port[,options_table]) | 设置连接 Redis 的连接信息。 ok：连接成功返回 1，连接失败返回 nil。 err：返回对应的错误信息。 |
| redis:set_timeout(time)                         | 设置请求操作 Redis 的超时时间，单位毫秒。                    |
| ok,err = redis:close()                          | 关闭当前连接。 ok：连接成功返回 1，连接失败返回 nil。 err：返回对应的错误信息。 |
| 原生 Redis 命令如 get、set、lpush 等            | 所有的 Redis 命令都有自己的方法，方法名字和命令名字相同，只是全部为小写。 |

### 效果实现

```lua
location /redis {
    default_type "text/html";
    content_by_lua_block {
        local redis = require "resty.redis" 	-- 引入 Redis
        local redisObj = redis:new()  			-- 创建 Redis 对象
        redisObj:set_timeout(1000) 				-- 设置超时数据为 1s
        local ok,err = redisObj:connect("192.168.91.200",6379) -- 设置 Redis 连接信息
        if not ok then 							-- 判断是否连接成功
            ngx.say("failed to connection redis",err)
            return
        end
        ok,err = redisObj:set("username","TOM")	-- 存入数据
        if not ok then 							-- 判断是否存入成功
            ngx.say("failed to set username",err)
            return
        end
        local res,err = redisObj:get("username") -- 从 Redis 中获取数据
        ngx.say(res)							 -- 将数据写会消息体中
        redisObj:close()						 -- 关闭 Redis 连接
    }
}
```

运行测试效果

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220807/image.4iflh85c7ma0.webp)

+ 查询redis

```sh
[root@master conf]# redis-cli
127.0.0.1:6379> get username
"TOM"
```

## ngx_lua操作Mysql

MySQL 是一个使用广泛的关系型数据库。在 ngx_lua 中，MySQL 有两种访问模式，分别是是：

- 用 `ngx_lua` 模块和 `lua-resty-mysql` 模块，这两个模块是安装 OpenResty 时默认安装的。
- 使用 `drizzle_nginx_module`（HttpDrizzleModule）模块，需要单独安装，这个库现不在 OpenResty 中。

### lua-resty-mysql

这里使用的是 `lua-resty-mysql` 模块。

`lua-resty-mysql` 是 OpenResty 开发的模块，使用灵活、功能强大，适合复杂的业务场景，同时支持存储过程的访问。

### MySQL环境准备

准备 MySQL，确保能正常连接

```sh
host: 192.168.91.200
port: 3306
username: root
password: 12345678
```

### API学习

- `mysql = require "resty.mysql"`

  引入 MySQL 模块，类似于 Java 的 import。

- `db,err = mysql:new()`

  创建一个 MySQL 连接对象给 db，连接对象遇到错误时，db 为nil，err 为错误描述信息。

- `ok,err = db:connect(Options)`

  尝试连接到一个MySQL服务器。Options 是一个参数的 Lua 表结构，里面包含数据库连接的相关信息。

  Options 选项：

```sql
host：服务器主机名或IP地址
port：服务器监听端口，默认为3306
user：登录的用户名
password：登录密码
database：使用的数据库名
```

- `db:set_timeout(time)`

  设置子请求的超时时间，单位毫秒。

- `ok,err = db:close()`

  关闭当前 MySQL 连接并返回状态。

```lua
ok：如果成功，则返回 1；如果出现任何错误，则将返回 nil。
err：如果出现任何错误，返回错误描述。
```

- `bytes,err=db:send_query(sql)`

  异步向远程 MySQL 发送一个查询。

  如果成功则返回成功发送的字节数；如果错误，则返回 nil 和错误描述。

- `res, err, errcode, sqlstate = db:read_result([rows])`

  从 MySQL 服务器返回结果中读取一行数据。

  `rows` 指定返回结果集的最大值，默认为 4，可不写。

返回值：

```lua
res：操作的结果集，返回一个描述 OK 包或结果集包的 Lua 表
err：错误信息
errcode：MySQL 的错误码，比如 1064
sqlstate：返回由 5 个字符组成的标准 SQL 错误码，比如 42000
```

如果是查询，则返回一个容纳多行的数组。每行是一个数据列的key-value对，如下:

```json
{
    {id=1,username="TOM",birthday="1988-11-11",salary=10000.0},
	{id=2,username="JERRY",birthday="1989-11-11",salary=20000.0}
}
```

如果是增删改，则返回类上如下数据

```json
{
    insert_id = 0,
    server_status=2,
    warning_count=1,
    affected_rows=2,
    message=nil
}
```

数据库连接四要素:

```sql
driverClass=com.mysql.jdbc.Driver
url=jdbc:mysql://192.168.91.200:3306/nginx_db
username=root
password=12345678
```

### 表创建并插入数据

```sql
create table users(id int primary key auto_increment,name varchar(20));
insert into users(id,name) values(null,"TOM");
insert into users(id,name) values(null,"JERRY");
insert into users(id,name) values(null,"ROWS");
insert into users(id,name) values(null,"LUCY");
insert into users(id,name) values(null,"JACK");
```

### 数据查询

```sql
location /testMysql {
    content_by_lua_block{
        local mysql = require "resty.mysql"
        local db, err = mysql:new()  			-- 创建实例  
        if not db then  
            ngx.say("new mysql error : ", err)  
            return  
        end  
        
        local ok,err = db:connect{
            host="192.168.91.200",
            port=3306,
            user="root",
            password="12345678",
            database="nginx_db"
        }
        
        db:set_timeout(1000)			-- 设置超时时间(毫秒)  
        -- 查询语句
		local query_sql = "select * from users"
        db:send_query(query_sql)
        local res,err,errcode,sqlstate = db:read_result()
        
        -- 返回数据 .. 代表拼接
        ngx.say(res[1].id..","..res[1].name)
    	db:close()
    }

}
```

**问题**

上面返回的是需要我们指定返回的数据，但是我们根本不知道查询的数据有多少条，长什么样子。

- 如何获取返回数据的内容
- 如何实现查询多条数据
- 如何实现数据库的删改操作

### lua-cjson处理查询结果

通过上述的案例学习，read_result() 得到的结果 res 都是 table 类型，要想在页面上展示，就必须知道 table 的具体数据结构才能进行遍历获取。处理起来比较麻烦。

接下来我们使用一种简单方式 cjson，使用它就可以将 table 类型的数据转换成 Json 字符串，把 Json 字符串展示在页面上即可。

步骤一：引入 cjson 模块

```lua
local cjson = require "cjson"
```

步骤二：调用 cjson 的 encode 方法进行类型转换

```lua
cjson.encode(res) 
```

步骤三：测试

```lua {20-27}
location /testMysql {
    content_by_lua_block{

        local mysql = require "resty.mysql"
        local cjson = require "cjson"

        local db = mysql:new()

        local ok,err = db:connect{
            host="192.168.199.27",
            port=3306,
            user="root",
            password="123456",
            database="nginx_db"
        }
        db:set_timeout(1000)

        -- db:send_query("select * from users where id = 1")
        
        db:send_query("select * from users")
        local res,err,errcode,sqlstate = db:read_result()
        
        ngx.say(cjson.encode(res))   -- 转为 JSON 字符串格式

        for i,v in ipairs(res) do     -- 循环来返回数据
            ngx.say("返回的数据："，v.id..","..v.name)
        end
        
        db:close()
    }

}
```

### 数据库删改

优化 `send_query` 和 `read_result`，两个可以变成一体。

本方法是 `send_query` 和 `read_result` 组合的快捷方法。

语法:

```lua
res, err, errcode, sqlstate = db:query(sql[,rows])
```

有了该 API，上面的代码我们就可以进行对应的优化，如下：

```lua {22,24}
location /testMysql {
    content_by_lua_block{

        local mysql = require "resty.mysql"

        local db = mysql:new()

        local ok,err = db:connect{
            host="192.168.91.200",
            port=3306,
            user="root",
            password="12345678",
            database="nginx_db",
            max_packet_size=1024,
            compact_arrays=false
        }
        
        db:set_timeout(1000)
        -- 查询操作
        local res,err,errcode,sqlstate = db:send_query("select * from users where id = 1")
        -- 修改操作
        local res,err,errcode,sqlstate = db:query("update users set name = 'bing' where id = 1")
        -- 删除操作
        local res,err,errcode,sqlstate = db:query("delete from users where id = 1")
        -- 插入操作
        local insert_sql = "insert into users(id,name) values(null,'kele')"
        db:close()
    }

}
```

 综合小案例

使用 ngx_lua 模块完成查询 MySQL 数据，然后在 Redis 缓存预热。

分析:

1. 先得有一张表（users），上面已经创建
2. 浏览器输入如下地址

```http
http://191.168.91.200?name=frx
```

3. 从MySQL 表中查询出符合条件的数据，此时获取的结果为 table 类型
4. 使用 cjson 将 table 数据转换成 json 字符串
5. 将查询的结果数据存入 Redis 中

这里利用到 `init_by_lua_block` 指令，该指令上面介绍过，用于初始化全局变量。这里用于初始化 MySQL、Redis、cjson 模块。

还是使用了 `quote_sql_str` 指令，防止「拼」SQL，导致 SQL 注入。

```lua
init_by_lua_block{
    redis = require "resty.redis"
    mysql = require "resty.mysql"
    cjson = require "cjson"
}
location /testMysql {
    default_type "text/html";
    content_by_lua_block{
        -- 获取请求的参数 name
        local param = ngx.req.get_uri_args()["name"]
        -- 建立 mysql 数据库的连接
        local db = mysql:new()
        local ok,err = db:connect{
            host="192.168.91.200",
            port=3306,
            user="root",
            password="12345678",
            database="nginx_db"
        }
        if not ok then
            ngx.say("failed connect to mysql:",err)
            return
        end
        
        -- 设置连接超时时间
        db:set_timeout(1000)
        
        -- 查询数据
        local sql = "";
        
        if not param then
            sql="select * from users"
        else
            sql="select * from users where name=" .. "'" .. param .."'" -- sql 注入 ，不建议
            sql="select * from users where name=" .. ngx.quote_sql_str(ch_param) -- 防止 sql 注入
        end
        
        local res,err,errcode,sqlstate=db:query(sql)
        
        if not res then
            ngx.say("failed to query from mysql:",err)
            return
        end
        
        -- 连接redis
        local rd = redis:new()
        ok,err = rd:connect("192.168.91.200",6379)
        
        if not ok then
            ngx.say("failed to connect to redis:",err)
            return
        end
        
        rd:set_timeout(1000)
        
        -- 循环遍历数据
        for i,v in ipairs(res) do
            rd:set("user_"..v.username,cjson.encode(v))
        end
        
        ngx.say("success")
        
        -- 关闭 MySQL 和 Rdis 的连接
        rd:close()
        db:close()
    }
}
```

