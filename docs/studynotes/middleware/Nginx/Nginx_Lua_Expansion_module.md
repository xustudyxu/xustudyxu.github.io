---
title: Nginx Lua扩展模块
date: 2022-08-07 16:57:34
permalink: /middleware/Nginx/Nginx_Lua_learn
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

