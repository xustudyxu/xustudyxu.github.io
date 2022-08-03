---
title: Nginx 负载均衡
date: 2022-08-03 16:21:27
permalink: /middleware/Nginx/Nginx_load_balancing
categories:
  - Nginx
tags:
  - Nginx
---
# Nginx 负载均衡

::: tip 负载均衡

负载均衡是实际开发必须掌握的技能，Nginx 如何将少数请求跟多台服务器进行沟通，让每一台服务器的请求处理面面俱到？本内容将学习 Nginx 的负载均衡知识。

:::

[[toc]]

## 负载均衡概述

早期的网站流量和业务功能都比较简单，单台服务器足以满足基本的需求，但是随着互联网的发展，业务流量越来越大并且业务逻辑也跟着越来越复杂，单台服务器的性能及单点故障问题就凸显出来了，因此需要多台服务器进行性能的水平扩展及避免单点故障出现。那么如何将不同用户的请求流量分发到不同的服务器上呢？这就需要负载均衡来处理。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220803/image.5kgql84ikx80.webp)

## 负载均衡原理及处理流程

系统的扩展可以分为纵向扩展和横向扩展。

- 纵向扩展是从单机的角度出发，通过增加系统的硬件处理能力来提升服务器的处理能力
- 横向扩展是通过添加机器来满足大型网站服务的处理能力

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220803/image.1xwd1pm6du68.webp)

如上图，负载均衡涉及到两个重要的角色分别是「应用集群」和「负载均衡器」。

- 应用集群：将同一应用部署到多台机器上，组成处理集群，接收负载均衡设备分发的请求，进行处理并返回响应的数据
- 负载均衡器：将用户访问的请求根据对应的负载均衡算法，分发到集群中的一台服务器进行处理

### 负载均衡作用

- 解决服务器的高并发压力，提高应用程序的处理性能
- 提供故障转移，实现高可用
- 通过添加或减少服务器数量，增强网站的可扩展性
- 在负载均衡器上进行过滤，可以提高系统的安全性

## 负载均衡常用处理方式

先说明，我们常用的是 [四/七层负载均衡](/middleware/Nginx/Nginx_load_balancing/#四/七层负载均衡) 方式，前面两个方式可以了解。

### 用户手动选择

这种方式比较原始，主要实现的方式就是在网站主页上面提供不同线路、不同服务器链接方式，让用户来选择自己访问的具体服务器，来实现负载均衡。

如下图，用户点击不同的下载方式，就会跳转到不同的下载地址。这是主动式的负载均衡，我们无法控制用户的选择。如果用户全部点击第一个下载方式，那么服务器的压力将非常大。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220803/image.2auhoddxb2zo.webp)

### DNS轮询方式

DNS：域名系统（服务）协议（DNS）是一种分布式网络目录服务，主要用于域名与 IP 地址的相互转换。

大多域名注册商都支持对同一个主机名添加多条 A 记录，这就是 DNS 轮询，DNS 服务器将解析请求按照 A 记录的顺序，随机分配到不同的 IP 上，这样就能完成简单的负载均衡。DNS 轮询的成本非常低，在一些不重要的服务器，被经常使用。

如下图：客户端如果想访问服务器集群，首先去 DNS 服务器获取我们曾经在 DNS 服务器保存的「记录表」，这个「记录表」将会把某个服务器的地址返回给客户端，客户端再根据这个地址，访问指定的服务器。这个「记录表」在开始期间需要我们去 DNS 服务器进行添加。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220803/image.b1m3qaeuxsk.webp)

「记录表」长什么样，如下图的主机记录 www。这是我为某一个域名添加的 IP 地址，用 2 台服务器来做负载均衡。其中两个记录值都绑定了 `www.nginx521.cn` 地址。(一个域名可以绑定多个IP地址)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220803/image.3drj9szeeus0.webp)

验证:

```sh
ping www.nginx521.cn
```

注意：记得清空本地的 DNS 缓存，如果本地有缓存，无论你怎么 `ping`，都会 `ping` 到缓存的服务器地址，无法负载均衡

```sh
ipconfig/flushdns
```

目前需要 `ping` 一次然后清理一次缓存，才能实现负载均衡的轮询效果。

我们发现使用 DNS 来实现轮询，不需要投入过多的成本，虽然 DNS 轮询成本低廉，但是 DNS 负载均衡存在明显的缺点：

1. 可靠性低

   假设一个域名 DNS 轮询多台服务器，如果其中的一台服务器发生故障，那么所有的访问该服务器的请求将不会有所回应，即使你将该服务器的 IP 从 DNS 中去掉，但是由于各大宽带接入商将众多的 DNS 存放在缓存中，以节省访问时间，导致 DNS 不会实时更新。所以 DNS 轮流上一定程度上解决了负载均衡问题，但是却存在可靠性不高的缺点。

2. 负载均衡不均衡

   DNS 负载均衡采用的是简单的轮询负载算法，不能区分服务器的差异，不能反映服务器的当前运行状态，不能做到为性能好的服务器多分配请求，另外本地计算机也会缓存已经解析的域名到 IP 地址的映射，这也会导致使用该 DNS 服务器的用户在一定时间内访问的是同一台 Web 服务器，从而引发 Web 服务器减的负载不均衡。

   负载不均衡则会导致某几台服务器负荷很低，而另外几台服务器负荷确很高，处理请求的速度慢，配置高的服务器分配到的请求少，而配置低的服务器分配到的请求多。

### 四/七层负载均衡

介绍四/七层负载均衡之前，我们先了解一个概念，OSI(open system interconnection)，叫开放式系统互联模型，这个是由国际标准化组织 ISO 指定的一个不基于具体机型、操作系统或公司的网络体系结构。该模型将网络通信的工作分为七层。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220803/image.5g3vvj5xa3g0.webp)

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220803/image.6uq265ihol80.webp)

- 应用层：为应用程序提供网络服务。
- 表示层：对数据进行格式化、编码、加密、压缩等操作
- 会话层：建立、维护、管理会话连接
- 传输层：建立、维护、管理端到端的连接，常见的有 TCP/UDP
- 网络层：IP 寻址和路由选择
- 数据链路层：控制网络层与物理层之间的通信
- 物理层：比特流传输

**什么是四层负载均衡**

所谓四层负载均衡指的是 OSI 七层模型中的传输层，主要是基于 IP + PORT 的负载均衡

实现四层负载均衡的方式：

- 硬件：F5 BIG-IP、Radware 等，性能好，成本高、无法扩展
- 软件：LVS、Nginx、Hayproxy 等，性能较好，成本低、可以扩展

**什么是七层负载均衡**

所谓的七层负载均衡指的是在应用层，主要是基于虚拟的 URL 或主机 IP 的负载均衡

实现七层负载均衡的方式：

- 软件：Nginx、Hayproxy 等

**四层和七层负载均衡的区别**

- 四层负载均衡数据包是在底层就进行了分发，而七层负载均衡数据包则在最顶端进行分发，所以四层负载均衡的效率比七层负载均衡的要高（四层比七层少，速度块，效率高，但是可能请求丢失等）
- 四层负载均衡不识别域名，而七层负载均衡识别域名

处理四层和七层负载以外，其实还有二层、三层负载均衡，二层是在数据链路层基于 mac 地址来实现负载均衡，三层是在网络层一般采用虚拟 IP 地址的方式实现负载均衡。

**实际环境采用的模式：四层负载(LVS) + 七层负载(Nginx)**

## 七层负载均衡

Nginx 要实现七层负载均衡需要用到 proxy_pass 代理模块配置。Nginx 默认安装支持这个模块，我们不需要再做任何处理。Nginx 的负载均衡是在 Nginx 反向代理的基础上把用户的请求根据指定的算法分发到一组「upstream 虚拟服务池」。

### 七层负载均衡指令

#### upstream指令

该指令是用来定义一组服务器，它们可以是监听不同端口的服务器，并且也可以是同时监听 TCP 和 Unix socket 的服务器。服务器可以指定不同的权重，默认为 1。

| 语法                   | 默认值 | 位置 |
| ---------------------- | ------ | ---- |
| upstream \<name> {...} | —      | http |

#### server指令

该指令用来指定后端服务器的名称和一些参数，可以使用域名、IP、端口或者 Unix socket。

| 语法                         | 默认值 | 位置     |
| ---------------------------- | ------ | -------- |
| server \<name> [paramerters] | —      | upstream |

server 后的 name 就是 upstream 后的 name，两者保持一致。

### 七层负载均衡指令案例

准备四台服务器，一台用来做负载均衡器，三台用来接收负载均衡器的请求。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220803/image.etsfgkwsxaw.webp)

因为目前只有两台服务器，所以一台用来做负载均衡器，另外一台用来接收负载均衡器的请求。

服务器设置：这里以三个端口代替三个服务器，在配置文件进行如下配置：

```nginx
# 服务器 1
server {
    listen   9001;
    server_name localhost;
    default_type text/html;
    location /{
    	return 200 '<h1>192.168.200.146:9001</h1>';
    }
}
# 服务器 2
server {
    listen   9002;
    server_name localhost;
    default_type text/html;
    location /{
    	return 200 '<h1>192.168.200.146:9002</h1>';
    }
}
# 服务器 3
server {
    listen   9003;
    server_name localhost;
    default_type text/html;
    location / {
    	return 200 '<h1>192.168.200.146:9003</h1>';
    }
}
```

负载均衡器设置：这是一个 Nginx 代理服务器，让它去负载均衡访问三个服务器，在配置文件进行如下配置：

```nginx
upstream backend{
	server 192.168.200.146:9091;
	server 192.168.200.146:9092;
	server 192.168.200.146:9093;
}
server {
	listen 8083;
	server_name localhost;
	location / {
		proxy_pass http://backend;   # backend 要对应上 upstream 后的值，根据需求修改
	}
}
```

访问负载均衡器的地址，如 `http://192.168.200.133:8083`，它会找到 `proxy_pass` 后的地址，比如上方，它会根据 backend 找到对应的 upstream 里内地址，替换掉 backend，变成：

- proxy_pass `http://192.168.200.146:9091`
- proxy_pass `http://192.168.200.146:9092`
- proxy_pass `http://192.168.200.146:9093`

但是它不会全部访问三个服务器地址，而是根据自己的算法（轮询）选择其中一个服务器地址。

### 七层负载均衡状态

代理服务器在负责均衡调度中的状态有以下几个：

| 状态         | 概述                                |
| ------------ | ----------------------------------- |
| down         | 当前的 server 暂时不参与负载均衡    |
| backup       | 预留的备份服务器                    |
| max_fails    | 允许请求失败的次数                  |
| fail_timeout | 经过 max_fails 失败后，服务暂停时间 |
| max_conns    | 限制最大的接收连接数                |

#### down

`down` 指令将该服务器标记为永久不可用，那么负载均衡器将不参与该服务器的负载均衡。

如下，如果不希望负载均衡器以负载均衡来处理 `192.168.200.146` 服务器：

```nginx
upstream backend{
	server 192.168.200.146:9001 down;
	server 192.168.200.146:9002
	server 192.168.200.146:9003;
}
server {
	listen 8083;
	server_name localhost;
	location / {
		proxy_pass http://backend;
	}
}
```

该状态一般会对需要停机维护的服务器进行设置。

#### backup

`backup` 指令将该服务器标记为备份服务器，当主服务器不可用时，才用备份服务器来传递请求。

它不同于 down 指令，down 指令将服务器永久禁止，而 backp 指令仅仅临时禁止，当主服务器不可用后，临时禁止的服务器就会站出来。

```nginx {2}
upstream backend{
	server 192.168.200.146:9001 down;
	server 192.168.200.146:9002 backup;
	server 192.168.200.146:9003;
}
server {
	listen 8083;
	server_name localhost;
	location /{
		proxy_pass http://backend;
	}
}
```

上方代码中 9001 服务器永久禁止，而 9002 服务器是备份服务器，所以 9003 服务器是主服务器。

此时需要将 9003 端口的访问禁止掉，用它来模拟当唯一对外提供访问的服务宕机以后，backup 的备份服务器就能开始对外提供服务。

为了测试验证，我们需要使用防火墙来进行拦截。

介绍一个工具 `firewall-cmd`，该工具是 Linux 提供的专门用来操作 firewall 防火墙的。

查询防火墙中指定的端口是否开放

```sh
firewall-cmd --query-port=9001/tcp
```

开放一个指定的端口

```sh
firewall-cmd --permanent --add-port=9002/tcp
```

批量添加开发端口

```sh
firewall-cmd --permanent --add-port=9001-9003/tcp
```

如何移除一个指定的端口

```sh
firewall-cmd --permanent --remove-port=9003/tcp
```

重新加载

```sh
firewall-cmd --reload
```

其中

- `--permanent` 表示设置为持久
- `--add-port` 表示添加指定端口
- `--remove-port` 表示移除指定端口

经过测试，禁用掉 9003 端口后，再次访问负载均衡器，它只会请求 9002 端口的服务器(备份服务器)，而恢复 9003 端口，只会请求 9003 端口的服务器。

#### max_conns

`max_conns` 指令用来限制同时连接到 upstream 负载上的单个服务器的最大连接数。默认为 0，表示不限制，使用该配置可以根据后端服务器处理请求的并发量来进行设置，防止后端服务器被压垮。

| 语法                | 默认值 | 位置     |
| ------------------- | ------ | -------- |
| max_conns=\<number> | 0      | upstream |

- number 是大于 0 的数字。

```nginx
upstream backend{
	server 192.168.200.146:9001 down;
	server 192.168.200.146:9002 backup;
	server 192.168.200.146:9003 max_conns=2;
}
server {
	listen 8083;
	server_name localhost;
	location /{
		proxy_pass http://backend;
	}
}
```

第 4 行配置标识 9003 端口的服务器最大能被 2 个客户端请求。

#### max_fails和fail_timeout

`max_fails` 指令设置允许请求代理服务器失败的次数，默认为 1。

`fail_timeout` 指令设置经过 max_fails 失败后，服务暂停的时间，默认是 10 秒。

| 语法                 | 默认值 | 位置     |
| -------------------- | ------ | -------- |
| max_fails=\<number>  | 1      | upstream |
| fail_timeout=\<time> | 10 秒  | upstream |

- number 是大于 0 的数字
- time 是时间，单位为秒

```nginx {4}
upstream backend{
	server 192.168.200.133:9001 down;
	server 192.168.200.133:9002 backup;
	server 192.168.200.133:9003 max_fails=3 fail_timeout=15;
}
server {
	listen 8083;
	server_name localhost;
	location /{
		proxy_pass http://backend;
	}
}
```

