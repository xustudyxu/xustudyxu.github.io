---
title: Nginx 安装
date: 2022-07-27 20:53:13
permalink: /middleware/Nginx/Nginx_install
categories:
  - Nginx
tags:
  - Nginx
---
# Nginx 安装

[[toc]]

## Nginx版本介绍

Nginx 的官方网站为: [http://nginx.org](http://nginx.org/)

打开源码可以看到如下的页面内容

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220727/image.4wlfyfbk53i0.webp)

Nginx 的官方下载网站为 [http://nginx.org/en/download.html](http://nginx.org/en/download.html)，当然你也可以之间在首页选中右边的 download 进入版本下载网页。在下载页面我们会看到如下内容：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220727/image.3e7olqaurau0.webp)

## 获取Nginx源码

[http://nginx.org/download/](http://nginx.org/download/)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220727/image.3cu95u4zd440.webp)

## 准备服务器系统

### 环境准备

- 虚拟机：VMware WorkStation
- Linux 系统：Centos7
- 上传软件工具：MobaXterm、xsheel,SecureCRT 之一
- 网络

### 确认CentOS的内核

准备一个内核为 2.6 及以上版本的操作系统，因为 linux2.6 及以上内核才支持 epoll,而 Nginx 需要解决高并发压力问题是需要用到 epoll，所以我们需要有这样的版本要求。

我们可以使用 `uname -a` 命令来查询linux的内核版本

```sh
[root@master ~]# uname -a
Linux master 3.10.0-1160.el7.x86_64 #1 SMP Mon Oct 19 16:18:59 UTC 2020 x86_64 x86_64 x86_64 GNU/Linux
```

### 确保Centos能联网

```sh
ping www.baidu.com
```

三种网络模式：桥接、主机、NAT，建议使用虚拟机使用 NAT 模式

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220727/image.4ga3snmdtsa0.webp)

NAT 模式下，只要主机有网络，则虚拟机也有网络。

### 确认关闭防火墙

这一项的要求仅针对于那些对 Linux 系统的防火墙设置规则不太清楚的，建议大家把防火墙都关闭掉，因为把防火墙关闭掉，可以省掉后续 Nginx 使用过程中遇到的诸多问题。

关闭的方式有如下两种:

```sh
systemctl stop firewalld      # 关闭运行的防火墙，系统重新启动后，防火墙将重新打开
systemctl disable firewalld   # 永久关闭防火墙，，系统重新启动后，防火墙依然关闭
systemctl status firewalld	 # 查看防火墙状态
```

如果不想关闭防火墙，记得开放 Nginx 的访问端口

### 确认停用selinux

selinux(security-enhanced linux)，美国安全局对于强制访问控制的实现，在 Linux2.6 内核以后的版本中，selinux 已经成功内核中的一部分。可以说selinux 是 Linux 史上最杰出的新安全子系统之一。虽然有了 selinux，我们的系统会更安全，但是对于使用 Nginx 或者其他的学习过程中，会有很多设置，所以这块建议大家将 selinux 进行关闭。

`sestatus` 查看状态

```sh
[root@master ~]# sestatus
SELinux status:                 disabled
```

如果查看不是 disabled 状态，我们可以通过修改配置文件来进行设置,修改 `SELINUX=disabled`，然后重启下系统即可生效。

```sh
vim /etc/selinux/config
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220727/image.1063r7fk4lz4.webp)

## Nginx环境安装

Nginx 的安装方式有两种分别是：

- 通过 Nginx 源码
  - 通过 Nginx 源码简单安装
  - 通过 Nginx 源码复杂安装
- 通过 yum 安装

如果通过 Nginx 源码安装需要提前准备安装好环境，我相信，任何 C 语言编写的软件都离不开这些环境，安装后所有软件都会收益，往下看。

### GCC编译器

Nginx 是使用 C 语言编写的程序，因此想要运行 Nginx 就需要安装一个编译工具。GCC 就是一个开源的编译器集合，用于处理各种各样的语言，其中就包含了 C 语言。

使用命令 `yum install -y gcc` 来安装

安装成功后，可以通过 `gcc --version` 来查看 gcc 是否安装成功

```sh
# 安装 gcc
yum install -y gcc

# 查看 gcc 版本
gcc --version
```

### PCRE

Nginx 在编译过程中需要使用到 PCRE 库（perl Compatible Regular Expressoin 兼容正则表达式库)，因为在 Nginx 的 Rewrite 模块和 Http 核心模块都会使用到 PCRE 正则表达式语法。

可以使用命令 `yum install -y pcre pcre-devel` 来进行安装

安装成功后，可以通过 `rpm -qa pcre pcre-devel` 来查看是否安装成功

```sh
# 安装 PCRE 和 pcre-devel
yum install -y pcre pcre-devel

# 查看 PCRE 是否安装成功
rpm -qa pcre pcre-devel
```

### zlib

zlib 库提供了开发人员的压缩算法，在 Nginx 的各个模块中需要使用 gzip 压缩，所以我们也需要提前安装其库及源代码 zlib 和 zlib-devel。

可以使用命令 `yum install -y zlib zlib-devel` 来进行安装

安装成功后，可以通过 `rpm -qa zlib zlib-devel` 来查看是否安装成功

```sh
# 安装 zlib 和 zlib-devel
yum install -y zlib zlib-devel

# 查看 zlib 和 zlib-devel 是否安装成功
rpm -qa zlib zlib-devel
```

### OpenSSL

OpenSSL 是一个开放源代码的软件库包，应用程序可以使用这个包进行安全通信，并且避免被窃听。

SSL：Secure Sockets Layer 安全套接协议的缩写，可以在 Internet 上提供秘密性传输，其目标是保证两个应用间通信的保密性和可靠性。在 Nginx 中，如果服务器需要提供安全网页时就需要用到 OpenSSL 库，所以我们需要对 OpenSSL 的库文件及它的开发安装包进行一个安装。

可以使用命令 `yum install -y openssl openssl-devel` 来进行安装

安装成功后，可以通过 `rpm -qa openssl openssl-devel` 来查看是否安装成功

```sh
# 安装 OpenSSL 库
yum install -y openssl openssl-devel

# 查看 OpenSSL 是否安装成功
rpm -qa openssl openssl-devel
```

### 全部安装命令

上述命令，一个个来的话比较麻烦，我们也可以通过一条命令来进行安装

`yum install -y gcc pcre pcre-devel zlib zlib-devel openssl openssl-devel` 进行全部安装。

```sh
# 全部安装 GCC、PCRE、zlib、OpenSSL
yum install -y gcc pcre pcre-devel zlib zlib-devel openssl openssl-devel

# 查看安装版本
rpm -qa pcre pcre-devel zlib zlib-devel openssl openssl-devel
```

## Nginx安装

Nginx 的官方下载网站为 [http://nginx.org/en/download.html](http://nginx.org/en/download.html)

### 源码简单安装

1. 进入官网查找需要下载版本的链接地址，然后使用 wget 命令进行下载，这里下载在 `/opt` 目录下

```sh
cd /opt

wget http://nginx.org/download/nginx-1.21.6.tar.gz
```

这里下载的版本是 1.21.6，请根据需求更改版本号。如果 wget 命令下载速度慢，可以先下载到 Windows 系统，再使用工具上传到 Linux 下。

2. 建议大家将下载的资源进行包管理，在 `/opt` 目录下创建 `nginx/core` 目录，`-p` 代表允许创建多级目录

```sh
# 创建指定目录
mkdir -p /opt/nginx/core

# 移动到指定目录
mv nginx-1.21.6.tar.gz nginx/core
```

3. 解压缩

```sh
# 进入指定目录
cd /opt/nginx/core

# 解压
tar -xzf nginx-1.21.6.tar.gz
```

4. 进入资源文件中，发现 configure 文件，执行该文件

```sh
# 进入解压出的目录
cd nginx-1.21.6/

# 执行 configure 
./configure --prefix=/usr/local/nginx
```

5. 编译

```sh
make
```

6. 安装

```sh
make install
```

7. 查看 nginx 的安装位置

```sh
whereis nginx
```

```sh
[root@master sbin]# whereis nginx
nginx: /usr/local/nginx
```

8. 启动测试。启动文件在安装目录下的 sbin 命令

```sh
# 进入启动文件的目录
cd /usr/local/nginx/sbin

# 执行 nginx 文件
./nginx
```

访问自己 Linux 的 IP 地址，不需要加端口，如果看到如下图，代表成功

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220727/image.6xop32js8180.webp)

### yum安装

使用源码进行简单安装，我们会发现安装的过程比较繁琐，需要提前准备 GCC 编译器、PCRE 兼容正则表达式库、zlib 压缩库、OpenSSL 安全通信的软件库包，然后才能进行 Nginx 的安装。下面使用 yum 安装，过程更简单。

1. 安装 yum-utils

```sh
sudo yum  install -y yum-utils
```

2. 添加 yum 源文件

```sh
vim /etc/yum.repos.d/nginx.repo
```

3. 添加如下内容

```sh
[nginx-stable]
name=nginx stable repo
baseurl=http://nginx.org/packages/centos/$releasever/$basearch/
gpgcheck=1
enabled=1
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true

[nginx-mainline]
name=nginx mainline repo
baseurl=http://nginx.org/packages/mainline/centos/$releasever/$basearch/
gpgcheck=1
enabled=0
gpgkey=https://nginx.org/keys/nginx_signing.key
module_hotfixes=true
```

4. 使用 yum 安装 Nginx

```sh
sudo yum install -y nginx
```

5. 查看是否安装成功

```sh
yum list | grep nginx
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220727/image.36wvsdkk9zc0.webp)

6. 使用 yum 进行安装

```sh
yun install -y nginx
```

7. 查看nginx的安装位置

```sh
whereis nginx
```

8. 启动测试

```sh
# 进入文件
cd /usr/sbin

# 启动 nginx
./nginx
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220727/image.38bsees6wz60.webp)

访问自己 Linux 的 IP 地址，不需要加端口，如果看到如下图，代表成功

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220727/image.6xop32js8180.webp)

### 源码简单安装和yum安装的差异

这里先介绍一个命令: `./nginx -V`，通过该命令可以查看到所安装 Nginx 的版本及相关配置信息。

简单安装的配置信息查看：

```sh
[root@master sbin]# ./nginx -V
nginx version: nginx/1.21.6
built by gcc 4.8.5 20150623 (Red Hat 4.8.5-44) (GCC)
configure arguments: --prefix=/usr/local/nginx
```

yum 安装的配置信息查看：（这里截取 1.16.1 版本的 图片）

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220727/image.os75hg8w3gg.webp)

可以看出 yum 安装的参数非常多，如果想源码简单安装也有这些参数，这涉及到源码复杂安装，往下看。

执行 `tar -zxvf nginx-1.16.1.tar.gz` 对下载的资源进行解压缩后，进入压缩后的目录，可以看到如下结构

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220727/image.320qb912jy00.webp)

内容解释：

| 内容名     | 作用                                                         |
| ---------- | ------------------------------------------------------------ |
| auto       | 存放的是编译相关的脚本                                       |
| CHANGES    | 版本变更记录                                                 |
| CHANGES.ru | 俄罗斯文的版本变更记录                                       |
| conf       | Nginx 默认的配置文件                                         |
| configure  | Nginx 软件的自动脚本程序,是一个比较重要的文件，作用如下： 1、检测环境及根据环境检测结果生成 C 代码 2、生成编译代码需要的 Makefile 文件 |
| contrib    | 存放的是几个特殊的脚本文件，其中 README 中对脚本有着详细的说明 |
| html       | 存放的是 Nginx 自带的两个 html 页面，访问 Nginx 的首页和错误页面 |
| LICENSE    | 许可证的相关描述文件                                         |
| man        | Nginx 的 man 手册                                            |
| README     | Nginx 的阅读指南                                             |
| src        | Nginx 的源代码                                               |

### 源码复杂安装

这种方式和简单的安装配置不同的地方在第一步，通过 `./configure` 来对编译参数进行设置，需要我们手动来指定。那么都有哪些参数可以进行设置，接下来我们进行一个详细的说明。

- PATH：是和路径相关的配置信息
- with：是启动模块，默认是关闭的
- without：是关闭模块，默认是开启的

我们先来认识一些简单的路径配置已经通过这些配置来完成一个简单的编译：

| 指令                  | 作用                              | 默认值                     |
| --------------------- | --------------------------------- | -------------------------- |
| --prefix=PATH         | 指向 Nginx 的安装目录             | /usr/local/nginx           |
| --sbin-path=PATH      | 指向(执行)程序文件(nginx)的路径   | <安装目录>/sbin/nginx      |
| --modules-path=PATH   | 指向 Nginx 动态模块安装目录       | <安装目录>//modules        |
| --conf-path=PATH      | 指向配置文件(nginx.conf)的路径    | <安装目录>/conf/nginx.conf |
| --error-log-path=PATH | 指向错误日志文件的路径            | <安装目录>/logs/error.log  |
| --http-log-path=PATH  | 指向访问日志文件的路径            | <安装目录>/logs/access.log |
| --pid-path=PATH       | 指向 Nginx 启动后进行ID的文件路径 | <安装目录>/logs/nginx.pid  |
| --lock-path=PATH      | 指向 Nginx 锁文件的存放路径       | <安装目录>/logs/nginx.lock |

源码复杂安装命令如下：（先进入解压目录）

```sh
# 进入解压目
cd ~/nginx/core

# 安装命令
./configure --prefix=/usr/local/nginx \
--sbin-path=/usr/local/nginx/sbin/nginx \
--modules-path=/usr/local/nginx/modules \
--conf-path=/usr/local/nginx/conf/nginx.conf \
--error-log-path=/usr/local/nginx/logs/error.log \
--http-log-path=/usr/local/nginx/logs/access.log \
--pid-path=/usr/local/nginx/logs/nginx.pid \
--lock-path=/usr/local/nginx/logs/nginx.lock

# 执行编译和安装
make && make install
```

在使用上述命令之前，需要将之前服务器已经安装的 Nginx 进行卸载。

## Nginx卸载

简单安装后如果想要卸载，步骤分为三步骤：

步骤一：需要将 Nginx 的进程关闭（要在 安装目录的 sbin 目录下）

```sh
./nginx -s stop
```

步骤二：将安装的 Nginx 进行删除

```sh
rm -rf /usr/local/nginx
```

步骤三：进入解压目录，将安装包之前编译的环境清除掉

```sh
# 进入解压目录
cd /opt/nginx/core

# 清除环境
make clean
```

## Nginx目录结构分析

在使用 Nginx 之前，我们先对安装好的 Nginx 目录文件进行一个分析，在这块给大家介绍一个工具 tree，通过 tree 我们可以很方面的去查看 Centos 系统上的文件目录结构，当然，如果想使用 tree 工具，就得先通过 `yum install -y tree` 来进行安装，安装成功后，可以通过执行 `tree /usr/local/nginx` (tree 后面跟的是 Nginx 的安装目录)，获取的结果如下：

```sh
[root@master /]# tree /usr/local/nginx
/usr/local/nginx
├── client_body_temp
├── conf
│   ├── fastcgi.conf
│   ├── fastcgi.conf.default
│   ├── fastcgi_params
│   ├── fastcgi_params.default
│   ├── koi-utf
│   ├── koi-win
│   ├── mime.types
│   ├── mime.types.default
│   ├── nginx.conf
│   ├── nginx.conf.default
│   ├── scgi_params
│   ├── scgi_params.default
│   ├── uwsgi_params
│   ├── uwsgi_params.default
│   └── win-utf
├── fastcgi_temp
├── html
│   ├── 50x.html
│   └── index.html
├── logs
│   ├── access.log
│   ├── error.log
│   └── nginx.pid
├── proxy_temp
├── sbin
│   ├── nginx
│   └── nginx.old
├── scgi_temp
└── uwsgi_temp

9 directories, 22 files
```

 CGI(Common Gateway Interface)通用网关【接口】，主要解决的问题是从客户端发送一个请求和数据，服务端获取到请求和数据后可以调用调用 CGI【程序】处理及相应结果给客户端的一种标准规范。

| 目录 | 文件名                    | 作用                                                         |
| ---- | ------------------------- | ------------------------------------------------------------ |
| conf |                           | Nginx 所有配置文件目录                                       |
|      | fastcgi.conf              | fastcgi相关配置文件                                          |
|      | fastcgi.conf.default      | fastcgi.conf 的备份文件                                      |
|      | fastcgi_params            | fastcgi 的参数文件                                           |
|      | fastcgi_params.default    | fastcgi 的参数备份文件                                       |
|      | scgi_params               | scgi 的参数文件                                              |
|      | scgi_params.default       | scgi 的参数备份文件                                          |
|      | uwsgi_params              | uwsgi 的参数文件                                             |
|      | uwsgi_params.default      | uwsgi 的参数备份文件                                         |
|      | mime.types                | **记录的是 HTTP 协议中的 Content-Type 的值和文件后缀名的对应关系** |
|      | mime.types.default        | mime.types 的备份文件                                        |
|      | nginx.conf                | **这是 Nginx 的核心配置文件，这个文件非常重要，也是我们即将要学习的重点** |
|      | nginx.conf.default        | nginx.conf 的备份文件                                        |
|      | koi-utf、koi-win、win-utf | 这三个文件都是与编码转换映射相关的配置文件，用来将一种编码转换成另一种编码 |
| html |                           | 存放 Nginx 自带的两个静态的 html 页面                        |
|      | 50x.html                  | 访问失败后的失败页面                                         |
|      | index.html                | 成功访问的默认首页                                           |
| logs |                           | 记录入门的文件，当 Nginx 服务器启动后，这里面会有 access.log error.log 和 nginx.pid 三个文件出现 |
|      | access.log                | **访问日志，每次访问成功都会进行记录**                       |
|      | error.log                 | **错误日志，每次访问失败都会进行记录**                       |
|      | nginx.pid                 | 启动 Nginx 后，系统生成一个进程 PID，这个文件记录这个 PID    |
| sbin |                           | 是存放执行程序文件 nginx                                     |
|      | nginx                     | 用来控制 Nginx 的启动和停止等相关的命令。**注意：该文件名就叫 nginx** |

