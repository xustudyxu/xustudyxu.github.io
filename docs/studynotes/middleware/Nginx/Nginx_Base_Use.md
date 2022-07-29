---
title: Nginx 基本使用
date: 2022-07-27 21:45:47
permalink: /middleware/Nginx/Nginx_Base_Use
categories:
  - Nginx
tags:
  - Nginx
---
# Nginx 基本使用

[[toc]]

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220727/image.7e2zl4ci9t40.webp)

## 目录结构

进入Nginx的主目录我们可以看到这些文件夹

```sh
[root@master /]# cd /usr/local/nginx/
[root@master nginx]# ll
总用量 0
drwx------ 2 nobody root   6 7月  27 20:35 client_body_temp
drwxr-xr-x 2 root   root 333 7月  27 20:31 conf
drwx------ 2 nobody root   6 7月  27 20:35 fastcgi_temp
drwxr-xr-x 2 root   root  40 7月  27 20:31 html
drwxr-xr-x 2 root   root  58 7月  27 20:35 logs
drwx------ 2 nobody root   6 7月  27 20:35 proxy_temp
drwxr-xr-x 2 root   root  36 7月  27 20:33 sbin
drwx------ 2 nobody root   6 7月  27 20:35 scgi_temp
drwx------ 2 nobody root   6 7月  27 20:35 uwsgi_temp
```

其中这几个文件夹在刚安装后是没有的，主要用来存放运行过程中的临时文件

```sh
client_body_temp fastcgi_temp proxy_temp scgi_temp
```

+ 主要目录说明

| 目录 | 说明                                   |
| ---- | -------------------------------------- |
| conf | 用来存放配置文件相关                   |
| html | 用来存放静态文件的默认目录 html、css等 |
| sbin | nginx的主程序                          |

## 基本运行原理

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220727/image.5klrdamfdsg0.webp)

## 启动停止命令

对于 Nginx 的启停在 Linux 系统中也有很多种方式，我们介绍两种方式：

- Nginx 服务的信号控制
- Nginx 的命令行控制

### 服务信号控制

在了解内容之前，我们首先要考虑一些问题：

::: tip 问题

Nginx 中的 master 和 worker 进程?

Nginx 的工作方式?

如何获取进程的 PID?

信号有哪些?

如何通过信号控制 Nginx 的启停等相关操作?

:::

前面在提到 Nginx 的高性能，其实也和它的架构模式有关。Nginx 默认采用的是多进程的方式来工作的，当将 Nginx 启动后，我们通过 `ps -ef | grep nginx` 命令可以查看到如下内容：

```sh
ps -ef | grep nginx
```

```sh
[root@master sbin]# ps -ef| grep nginx
root       3564      1  0 13:54 ?        00:00:00 nginx: master process ./nginx
nobody     3565   3564  0 13:54 ?        00:00:00 nginx: worker process
root       3567   3483  0 13:54 pts/1    00:00:00 grep --color=auto nginx
```

从上图中可以看到，Nginx 后台进程中包含一个 master 进程和多个 worker 进程，master 进程主要用来管理 worker 进程，包含接收外界的信息，并将接收到的信号发送给各个 worker 进程，监控 worker 进程的状态。当 worker 进程出现异常退出后，会自动重新启动新的 worker 进程。而 worker 进程则是专门用来处理用户请求的，各个 worker 进程之间是平等的并且相互独立，处理请求的机会也是一样的。

Nginx 的进程模型，我们可以通过下图来说明下：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220728/image.2i4zuw23isa0.webp)

我们现在作为管理员，只需要通过给 master 进程发送信号就可以来控制 Nginx，这个时候我们需要有两个前提条件，一个是要操作的 master 进程，一个是 给 master 进程的信号。

1. 要想操作 Nginx 的 master 进程，就需要获取到 master 进程的进程号 PID。获取方式简单介绍两个：

+ 通过 `ps -ef | grep nginx`

```sh
ps -ef | grep nginx
```

+ 在讲解 Nginx 的 `./configure` 的配置参数的时候，有一个参数 `--pid-path=PATH`，它的默认值是 `/usr/local/nginx/logs/nginx.pid`，所以可以通过查看该文件来获取 Nginx 的 master 进程 PID

```sh
cat /usr/local/nginx/logs/nginx.pid
```

2. 信号(signal)

| 信号     | 作用                                                         |
| -------- | ------------------------------------------------------------ |
| TERM/INT | 立即关闭整个服务（关闭 Nginx）                               |
| QUIT     | 「优雅」的关闭整个服务（关闭 Nginx）                         |
| HUP      | 重读配置文件并使用服务对新配置项生效（重启 Nginx）           |
| USR1     | 重新打开日志文件，可以用来进行日志切割（重启日志）           |
| USR2     | 平滑升级到最新版的 Nginx                                     |
| WINCH    | 所有子进程不在接收处理新连接，相当于给 Work 进程发送 QUIT 指令 |

调用命令为 `kill -signal PID`

> signal：即为信号；PID 即为获取到的 master 进程 PID

```sh
kill -signal PID
```

```sh
# 格式一：
kill -TERM PID

# 立即关闭当前线程
kill -TERM `cat /usr/local/nginx/logs/nginx.pid`

# 格式一：
kill -INT PID

# 立即关闭当前线程
kill -INT `cat /usr/local/nginx/logs/nginx.pid`
```

+ 案例

1. 发送 TERM/INT 信号给 master 进程，会将 Nginx 服务立即关闭。

```sh
[root@master nginx]# cat logs/nginx.pid
3564
[root@master nginx]# kill  -TERM 3564
[root@master nginx]# ps -ef | grep nginx
root       8874   8753  0 15:58 pts/2    00:00:00 grep --color=auto nginx
```

2. 发送 QUIT 信号给 master 进程，master 进程会控制所有的 work 进程不再接收新的请求，等所有请求处理完后，在把进程都关闭掉。

```sh
# 优雅 关闭线程
kill -QUIT PID

# 「优雅」关闭当前线程
kill -QUIT `cat /usr/local/nginx/logs/nginx.pid`
```

3. 发送 HUP 信号给 master 进程，master 进程会把控制旧的 worker 进程不再接收新的请求，等处理完请求后将旧的 worker 进程关闭掉，然后根据<mark>更改Nginx 的配置文件</mark>重新启动新的 worker 进程

```sh
# 重启 worker 进程
kill -HUP PID 

# 重启当前 worker 进程
kill -HUP `cat /usr/local/nginx/logs/nginx.pid`
```

4. 发送 USR1 信号给 master 进程，告诉 Nginx 重新开启日志文件。如果日志文件被删除了，可以利用此命令重新打开。

```sh
# 重新打开日志文件
kill -USR1 PID

# 重新打开当前 Nginx 的日志文件
kill -USR1 `cat /usr/local/nginx/logs/nginx.pid`
```

5. 发送 USR2 信号给 master 进程，告诉 master 进程要平滑升级，这个时候，会重新开启对应的 master 进程和 worker 进程，整个系统中将会有两个master 进程，并且新的 master 进程的 PID 会被记录在 `/usr/local/nginx/logs/nginx.pid`，而之前的旧的 master 进程 PID 会被记录在 `/usr/local/nginx/logs/nginx.pid.oldbin` 文件中，接着再次发送 QUIT 信号给旧的 master 进程，让其处理完请求后再进行关闭

```sh
# 开启新的进程，但是不删除旧的进程
kill -USR2 PID

# 开启新的进程，但是不删除当前进程
kill -USR2 `cat /usr/local/nginx/logs/nginx.pid`
```

当新进程升级后（完全启动后），再关闭旧的进程，旧进程的 PID 在另一个 `nginx.pid.oldbin` 文件里

```sh
# 关闭旧的线程
kill -QUIT `cat /usr/local/nginx/logs/nginx.pid.oldbin`
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220728/image.5dgklob27do0.webp)

6. 发送 WINCH 信号给 master 进程,让 master 进程控制不让所有的 worker 进程在接收新的请求了，请求处理完后关闭 worker 进程。注意 master 进程不会被关闭掉

```sh
# 停止 worker 进程，但是不停止 master 进程
kill -WINCH PID 

# 停止当前 worker 进程，但是不停止 master 进程
kill -WINCH `cat /usr/local/nginx/logs/nginx.pid`
```

### 命令行控制

此方式是通过 Nginx 安装目录下的 sbin 下的可执行文件 nginx(文件名) 来进行对 Nginx 状态的控制，我们可以通过 `nginx -h` 来查看都有哪些参数可以用

```sh
[root@master sbin]# ./nginx -h
nginx version: nginx/1.21.6
Usage: nginx [-?hvVtTq] [-s signal] [-p prefix]
             [-e filename] [-c filename] [-g directives]

Options:
  -?,-h         : this help
  -v            : show version and exit
  -V            : show version and configure options then exit
  -t            : test configuration and exit
  -T            : test configuration, dump it and exit
  -q            : suppress non-error messages during configuration testing
  -s signal     : send signal to a master process: stop, quit, reopen, reload
  -p prefix     : set prefix path (default: /usr/local/nginx/)
  -e filename   : set error log file (default: logs/error.log)
  -c filename   : set configuration file (default: conf/nginx.conf)
  -g directives : set global directives out of configuration file
```

| 选项     | 作用                                                         |
| -------- | ------------------------------------------------------------ |
| -? 和 -h | 显示帮助信息                                                 |
| -v       | 打印版本号信息并退出                                         |
| -V       | 打印版本号信息和配置信息并退出                               |
| -t       | 测试 Nginx 的配置文件语法是否正确并退出                      |
| -T       | 测试 Nginx 的配置文件语法是否正确并列出用到的配置文件信息然后退出 |
| -q       | 在配置测试期间过滤掉非错误消息                               |
| -s       | signal 信号，后面的命令和服务信号控制功能类似：  `stop`：快速关闭，类似于 TERM/INT 信号的作用 `quit`：优雅的关闭，类似于 QUIT 信号的作用 `reopen`：重新打开日志文件类似于 USR1 信号的作用 `reload`：重启 Nginx，类似于 HUP 信号的作用 |
| -p       | prefix，指定 Nginx 的默认安装路径，(默认为：/usr/local/nginx/) |
| -c       | filename，指定 Nginx 的配置文件路径,(默认为：conf/nginx.conf) |
| -g       | 用来补充 Nginx 配置文件，向 Nginx 服务指定启动时应用全局的配置 |

+ 案例

如果觉得每次执行 nginx 指令都必须进入 sbin 目录，则将该指令设置为全局使用。

1. 两个查看版本命令

```sh {2,7}
# 查看版本指令 1
[root@master sbin]# nginx -v
# 返回结果
nginx version: nginx/1.21.6

# 查看版本指令 2
[root@master sbin]# nginx -V
# 返回结果
nginx version: nginx/1.21.6
built by gcc 4.8.5 20150623 (Red Hat 4.8.5-44) (GCC)
configure arguments: --prefix=/usr/local/nginx
```

2. 测试 Nginx 的配置文件语法

我们首先要知道配置文件的路径在哪，先执行 `-t` 进行测试

```sh {6}
# 测试 Nginx 的配置文件语法
[root@master sbin]# nginx -t

#结果 返回 成功
nginx: the configuration file /usr/local/nginx/conf/nginx.conf syntax is ok
nginx: configuration file /usr/local/nginx/conf/nginx.conf test is successful
```

由第 6 行代码可以知道测试成功，第 5 行代码告诉我们配置文件的目录，我们去修改配置文件，然后再进行测试

```sh
[root@master sbin]# vim /usr/local/nginx/conf/nginx.conf

###add
HelloWorld
```

重新进行测试

```sh {6}
# 测试 Nginx 的配置文件语法
[root@master sbin]# nginx -t

# 返回结果（失败）
nginx: [emerg] unknown directive "HelloWorld" in /usr/local/nginx/conf/nginx.conf:3
nginx: configuration file /usr/local/nginx/conf/nginx.conf test failed
```

由第 6 行代码可以知道，配置文件出错了。验证完了，记得将配置文件改回来。

3. 指定 Nginx 的默认安装路径

```sh
nginx -p /usr/local/nginx/
```

4. 指定 Nginx 的配置文件路径

先把配置文件拷贝到另一个目录，然后修改拷贝后的配置文件内容

```sh
# 拷贝配置文件
cp /usr/local/nginx/conf/nginx.conf /opt

# 修改拷贝后的配置文件内容
vim /opt/nginx.conf

# add
HelloWorld
```

测试配置文件的时候，指定拷贝后的配置文件进行测试

```sh {6}
# 指定配置文件进行测试
[root@master nginx]# nginx -tc /opt/nginx.conf

#返回结果
nginx: [emerg] unknown directive "HelloWorld" in /opt/nginx.conf:3
nginx: configuration file /opt/nginx.conf test failed
```

说明指定配置文件目录生效，只是文件内容语法不对。

## 版本升级和新增模块

如果想对 Nginx 的版本进行更新，或者要应用一些新的模块，最简单的做法就是停止当前的 Nginx 服务，然后开启新的 Nginx 服务。但是这样会导致在一段时间内，用户是无法访问服务器。为了解决这个问题，我们就需要用到 Nginx 服务器提供的平滑升级功能。这个也是 Nginx 的一大特点，使用这种方式，就可以使 Nginx 在 7 * 24 小时不间断的提供服务了。接下来我们分析下需求：

> 需求：Nginx 的版本最开始使用的是 Nginx-1.14.2，由于服务升级，需要将 Nginx 的版本升级到 Nginx-1.16.1,要求 Nginx 不能中断提供服务。

为了应对上述的需求，这里我们提供两种解决方案:

- 使用 Nginx 服务信号完成 Nginx 的升级
- 使用 Nginx 安装目录的 make 命令完成升级

版本升级其实就是替换可执行文件 nginx。

### 环境准备

1. 先准备两个版本的 Nginx 分别是 1.14.2 和 1.16.1
2. 使用 Nginx 源码安装的方式将 1.14.2 版本安装成功并正确访问

```sh
# 解压 1.14.2 版本
tar -xzf nginx-1.14.2.tar.gz
# 进入解压目录
cd nginx-1.14.2/

# 执行配置文件
./configure

# 编译安装
make && make install
```

3. 将 Nginx 1.16.1 版本进行参数配置和编译，不需要进行安装。

```sh
# 解压 1.16.1 版本
tar -xzf nginx-1.16.1.tar.gz
# 进入解压目录
cd nginx-1.16.1/

# 执行配置文件
./configure

# 仅仅编译
make 
```

### 服务信号进行升级

第一步:将 1.14.2 版本的 sbin 目录下的 nginx 进行备份

> 不是复制一份，是直接修改原来的 nginx。

```sh
# 进入 sbin 目录下
cd /usr/local/nginx/sbin

# 备份为 nginxold 文件
mv nginx nginx.backup
```

第二步：将 Nginx 1.16.1 安装目录编译后的 objs 目录下的 nginx 文件，拷贝到原来 `/usr/local/nginx/sbin` 目录下

如果第一步没有备份，那么将会覆盖 1.14.2 的 nginx 文件

```sh
# 进入 objs 目录
cd ~/nginx/core/nginx-1.16.1/objs

# 拷贝可执行文件到原来的目录
cp nginx /usr/local/nginx/sbin
```

第三步：发送信号 USR2 给 Nginx 的 1.14.2 版本对应的 master 进程

```sh
kill -USR2 `cat /usr/local/logs/nginx.pid`
```

第四步：发送信号 QUIT 给 Nginx 的 1.14.2 版本对应的 master 进程

```sh
kill -QUIT `cat /usr/local/logs/nginx.pid.oldbin`
```

### 安装目录的make命令完成升级

第一步：将 1.14.2 版本的 sbin 目录下的 nginx 进行备份

> 不是复制一份，是直接修改原来的 nginx。

```sh
# 进入 sbin 目录下
cd /usr/local/nginx/sbin

# 备份为 nginxold 文件
mv nginx nginx.backup
```

第二步：将 Nginx1.16.1 安装目录编译后的 objs 目录下的 nginx 文件，拷贝到原来 `/usr/local/nginx/sbin` 目录下

```sh
# 进入 objs 目录
cd ~/nginx/core/nginx-1.16.1/objs

# 拷贝可执行文件到原来的目录
cp nginx /usr/local/nginx/sbin
```

第三步：进入到安装目录，执行 `make upgrade`

```sh
make upgrade
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220728/image.2hpc905f42a0.webp)

第四步：查看是否更新成功

```sh
nginx -v
```

在整个过程中，其实 Nginx 是一直对外提供服务的。并且当 Nginx 的服务器启动成功后，我们是可以通过浏览器进行直接访问的，同时我们可以通过更改 html 目录下的页面来修改我们在页面上所看到的内容，那么问题来了，为什么我们要修改 html 目录下的文件，能不能多添加一些页面是 Nginx 的功能更加丰富，还有前面聊到 Nginx 的前端功能又是如何来实现的，这就需要我们对 [Nginx 的核心配置文件](/middleware/Nginx/Nginx_Configuration_file) 进行一个详细的学习。

