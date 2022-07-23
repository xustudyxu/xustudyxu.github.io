---
title: RabbitMQ 安装
date: 2022-07-23 21:30:52
permalink: /middleware/RabbitMQ/RabbitMQ_install
categories:
  - RabbitMQ
tags:
  - RabbitMQ
---
# RabbitMQ 安装

[[toc]]

## 环境

Linux 的 `CentOS 7.x` 版本。

`Xftp` 传输安装包到 Linux。

`Xshell` 连接 Linux，进行解压安装。

## 下载

首先我们需要2个 `rpm` 安装包，分别是 RabbitMQ 安装包和 Erlang 环境安装包，后者提供环境给前者运行。

### 下载RabbitMQ

[RabbitMQ最新版下载地址](https://github.com/rabbitmq/rabbitmq-server/releases)

选择以 `noarch.rpm` 结尾的安装包

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220723/image.402esff13ek0.webp)

### 下载Erlang

RabbitMQ 是采用 Erlang 语言开发的，所以系统环境必须提供 Erlang 环境，需要先安装 Erlang。

`Erlang` 和 `RabbitMQ` 版本对照：[点击跳转](https://www.rabbitmq.com/which-erlang.html)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220723/image.4lr4qyk601a0.webp)

这里安装的是 3.8.8 版本的 RabbitMQ，需要的 Erlang 版本依然是21.3。

[Erlang 21.3下载地址](https://packagecloud.io/rabbitmq/erlang/packages/el/7/erlang-21.3.8.16-1.el7.x86_64.rpm)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220723/image.44zjpnbpbyo0.webp)

::: tip 版本选择

CentOs 7.x 版本需要e17。

CentOs 8.x 版本需要e18。包括 Red Hat 8,modern Fedora 版本。

:::

最终下载的两个安装包，如图：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220723/image.63s3aftotzs0.webp)

## 安装

### 传输

将在 Windows 或 Mac 下载好的安装包传输到 Linux 中。

首先在 Linux 的 `/usr/local` 目录下创建一个文件夹 `rabbitmq`。请根据需求自定义路径

```sh
mkdir /usr/local/rabbitmq
```

利用 `xftp` 工具将两个 `.rpm` 文件传输到刚刚创建的文件夹里

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220723/image.6smxk7gp2ig0.webp)

### 安装Erlang

进入 `/usr/local/rabbitmq` 目录，解压安装 Erlang

```sh
cd /usr/local/rabbitmq
rpm -ivh erlang-21.3-1.el7.x86_64.rpm
```

```sh
[root@master rabbitmq]# rpm -ivh erlang-21.3-1.el7.x86_64.rpm
警告：erlang-21.3-1.el7.x86_64.rpm: 头V4 RSA/SHA1 Signature, 密钥 ID 6026dfca: NOKEY
准备中...                          ################################# [100%]
正在升级/安装...
   1:erlang-21.3-1.el7                ################################# [100%]
```

安装完成后输入指令查看到版本号，代表成功

```sh
erl -v
```

```sh
[root@master rabbitmq]# erl -v
Erlang/OTP 21 [erts-10.3] [source] [64-bit] [smp:1:1] [ds:1:1:10] [async-threads:1] [hipe]

Eshell V10.3  (abort with ^G)
1>
```

**问题记录**

如果安装 Erlang 过程出现了如下问题：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220723/image.1urtg7o1ntfk.webp)

出现这个错误的主要原因是没有`libcrypto.so.10(OPENSSL_1.0.2)(64bit)`依赖，我们去下载一个就可以了

下载地址：[libcrypto.so.10(OPENSSL_1.0.2)(64bit)](https://rpmfind.net/linux/rpm2html/search.php?query=libcrypto.so.10%28OPENSSL_1.0.2%29%2864bit%29&submit=Search%20...&system=&arch=)

滑到最下面，下载最后一个

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220723/image.mrtslwlzvg0.webp)

下载到本地后通过 `Xftp` 上传到 Linux 中，传输目录一致。接着使用命令安装

```sh
rpm -ivh openssl-libs-1.0.2k-19.el7.x86_64.rpm --force
```

安装好这个后，再次安装 Erlang 即可成功

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220723/image.1or3k1972l6o.webp)

### 安装RabbitMQ

在 `RabiitMQ` 安装过程中需要依赖 `socat` 插件，首先安装该插件

```sh
yum install socat -y
```

解压 `RabbitMQ` 安装包

```sh
rpm -ivh rabbitmq-server-3.8.8-1.el7.noarch.rpm
```

```java
[root@master rabbitmq]# rpm -ivh rabbitmq-server-3.8.8-1.el7.noarch.rpm
警告：rabbitmq-server-3.8.8-1.el7.noarch.rpm: 头V4 RSA/SHA256 Signature, 密钥 ID 6026dfca: NOKEY
准备中...                          ################################# [100%]
正在升级/安装...
   1:rabbitmq-server-3.8.8-1.el7      ################################# [100%]
```

`i` 代表 install

`vh` 代表显示安装进度过程

### 启动

```shell
# 启动服务
systemctl start rabbitmq-server
# 查看服务状态
systemctl status rabbitmq-server
```

启动 `RabbitMQ` 服务后，查看该服务状态，显示绿色的 `active` 则表示服务安装并启动成功

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220723/image.3vmzww3gk2k0.webp)

其他指令：

```sh
# 开机自启动
systemctl enable rabbitmq-server
# 停止服务
systemctl stop rabbitmq-server
# 重启服务
systemctl restart rabbitmq-server
```

## 管理界面及授权操作

::: tip 默认端口

RabbitMQ 的默认访问端口是 15672

如果 Linux 有防火墙，记得开放 15672 端口，否则 Windows 无法访问

:::

默认情况下，RabbiMQ 没有安装 Web 端的客户端软件，需要安装才可以生效

```sh
rabbitmq-plugins enable rabbitmq_management
```

安装完毕以后，重启服务

```sh
systemctl restart rabbitmq-server
```

通过 `http://ip:15672` 访问，ip 为 Linux 的 ip。`rabbitmq` 有一个默认的账号密码 `guest`，但是登录该账号密码会出现权限问题

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220723/image.1irradyf2v28.webp)

默认的账号密码仅限于本机 localhost 进行访问，所以需要添加一个远程登录的用户

```sh
# 创建账号和密码
rabbitmqctl add_user 用户名 密码

# 设置用户角色
rabbitmqctl set_user_tags 用户名 角色

# 为用户添加资源权限，添加配置、写、读权限
# set_permissions [-p <vhostpath>] <user> <conf> <write> <read>
rabbitmqctl set_permissions -p "/" y ".*" ".*" ".*"
// Make sure to add code blocks to your code group
```

角色固定有四种级别：

- `administrator`：可以登录控制台、查看所有信息、并对rabbitmq进行管理
- `monToring`：监控者；登录控制台，查看所有信息
- `policymaker`：策略制定者；登录控制台指定策略
- `managment`：普通管理员；登录控制

添加用户和权限后，再次访问 `http://ip:15672` 登录，输入添加好的用户名和密码，即可进入后台

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220723/image.4o5hgcxxknm0.webp)

其他指令：

```sh
# 修改密码
rabbitmqctl change_ password 用户名 新密码

# 删除用户
rabbitmqctl delete_user 用户名

# 查看用户清单
rabbitmqctl list_user
```

## Docker安装RabbitMQ

```sh
# 安装启动 rabbitmq 容器
docker run -d --name myRabbitMQ -e RABBITMQ_DEFAULT_USER=用户名 -e RABBITMQ_DEFAULT_PASS=密码 -p 15672:15672 -p 5672:5672 rabbitmq:3.8.14-management
```

