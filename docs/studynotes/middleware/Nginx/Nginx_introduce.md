---
title: Nginx 介绍
date: 2022-07-27 17:29:20
permalink: /pages/9551ee/
categories:
  - Nginx
tags:
  - Nginx
---
# Nginx 介绍

[学习视频地址](https://www.bilibili.com/video/BV1ov41187bq?spm_id_from=333.337.search-card.all.click&vd_source=6aafd031757cd8c1dbbb98344fb3d363)

[[toc]]

## Nginx是什么

Nginx (engine x) 是一个高性能的HTTP和反向代理web服务器，同时也提供了IMAP/POP3/SMTP服务。Nginx是由伊戈尔·赛索耶夫为俄罗斯访问量第二的Rambler.ru站点（俄文：Рамблер）开发的，第一个公开版本0.1.0发布于2004年10月4日。

其将源代码以类BSD许可证的形式发布，因它的稳定性、丰富的功能集、简单的配置文件和低系统资源的消耗而闻名。2011年6月1日，nginx 1.0.4发布。Nginx是一款轻量级的Web 服务器/反向代理服务器及电子邮件（IMAP/POP3）代理服务器，在BSD-like 协议下发行。其特点是占有内存少，并发能力强，事实上nginx的并发能力在同类型的网页服务器中表现较好，中国大陆使用nginx网站用户有：百度、京东、新浪、网易、腾讯、淘宝等。



## 名词解释

1. Web服务器

WEB 服务器也叫网页服务器，英文名叫 Web Server，主要功能是为用户提供网上信息浏览服务。

2. HTTP

HTTP 是超文本传输协议的缩写，是用于从 WEB 服务器传输超文本到本地浏览器的传输协议，也是互联网上应用最为广泛的一种网络协议。HTTP 是一个客户端和服务器端请求和应答的标准，客户端是终端用户，服务端是网站，通过使用 Web 浏览器、网络爬虫或者其他工具，客户端发起一个到服务器上指定端口的 HTTP 请求。

3. POP3/SMTP/IMAP

POP3(Post Offic Protocol 3)邮局协议的第三个版本；

SMTP(Simple Mail Transfer Protocol)简单邮件传输协议；

IMAP(Internet Mail Access Protocol)交互式邮件存取协议；

通过上述名词的解释，我们可以了解到 Nginx 也可以作为电子邮件代理服务器。

4. 正向代理

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220727/image.5u72na7a9hc0.webp)

反向代理

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220727/image.3622anezbxi0.webp)

正向代理的 Proxy 是多对一，反向代理的 Proxy 是一对多。

## 常见服务器对比

在介绍这一节内容之前，我们先来认识一家公司叫 Netcraft。

> Netcraft 公司于 1994 年底在英国成立，多年来一直致力于互联网市场以及在线安全方面的咨询服务，其中在国际上最具影响力的当属其针对网站服务器、SSL市场所做的客观严谨的分析研究，公司官网每月公布的调研数据（Web Server Survey）已成为当今人们了解全球网站数量以及服务器市场分额情况的主要参考依据，时常被诸如华尔街杂志，英国 BBC，Slashdot 等媒体报道或引用。

我们先来看一组数据，我们先打开 Nginx 的官方网站 [http://nginx.org/](http://nginx.org/)，找到 Netcraft 公司公布的数据，对当前主流服务器产品进行介绍。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220727/image.6wcjq3k197c0.webp)

上面这张图展示了 2019 年全球主流 Web 服务器的市场情况，其中有 Apache、Microsoft-IIS、google Servers、Nginx、Tomcat 等，而我们在了解新事物的时候，往往习惯通过类比来帮助自己理解事物的概貌。可以看出绿色线的 nginx 在 2019 年已经领现全球了。

所以下面我们把几种常见的服务器来给大家简单介绍下：

### IIS

全称(Internet Information Services)即互联网信息服务，是由微软公司提供的基于 Windows 系统的互联网基本服务。Windows 作为服务器在稳定性与其他一些性能上都不如类 UNIX 操作系统，因此在需要高性能 Web 服务器的场合下，IIS 可能就会被「冷落」.

### Tomcat

Tomcat是一个运行 Servlet 和 JSP 的 Web 应用软件，Tomcat 技术先进、性能稳定而且开放源代码，因此深受 Java 爱好者的喜爱并得到了部分软件开发商的认可，成为目前比较流行的 Web 应用服务器。但是 Tomcat 天生是一个重量级的 Web 服务器，对静态文件和高并发的处理比较弱。

### Apache

Apache 的发展时期很长，同时也有过一段辉煌的业绩。从上图可以看出大概在 2014 年以前都是市场份额第一的服务器。Apache 有很多优点，如稳定、开源、跨平台等。但是它出现的时间太久了，在它兴起的年代，互联网的产业规模远远不如今天，所以它被设计成一个重量级的、不支持高并发的 Web 服务器。在 Apache 服务器上，如果有数以万计的并发 HTTP 请求同时访问，就会导致服务器上消耗大量能存，操作系统内核对成百上千的 Apache 进程做进程间切换也会消耗大量的 CPU 资源，并导致 HTTP 请求的平均响应速度降低，这些都决定了 Apache 不可能成为高性能的 Web 服务器。这也促使了 Lighttpd 和 Nginx 的出现。

### Lighttpd

Lighttpd 是德国的一个开源的 Web 服务器软件，它和 Nginx 一样，都是轻量级、高性能的 Web 服务器，欧美的业界开发者比较钟爱 Lighttpd，而国内的公司更多的青睐 Nginx，同时网上 Nginx 的资源要更丰富些。

### 其他的服务器

Google Servers，Weblogic, Webshpere(IBM) ......

Google Servers 是闭源的，市面上很少看到。Weblogic 和 Webshpere(IBM) 使用起来都需要支付一定费用。

经过各个服务器的对比，种种迹象都表明，Nginx 将以性能为王。这也是我们为什么选择 Nginx 的理由。

## Nginx的优点

### 速度更快、并发更高

单次请求或者高并发请求的环境下，Nginx 都会比其他 Web 服务器响应的速度更快。一方面在正常情况下，单次请求会得到更快的响应，另一方面，在高峰期(如有数以万计的并发请求)，Nginx 比其他 Web 服务器更快的响应请求。Nginx 之所以有这么高的并发处理能力和这么好的性能原因在于 Nginx 采用了多进程和 I/O 多路复用(epoll)的底层实现。

### 配置简单，扩展性强

Nginx 的设计极具扩展性，它本身就是由很多模块组成，这些模块的使用可以通过配置文件的配置来添加。这些模块有官方提供的也有第三方提供的模块，如果需要完全可以开发服务自己业务特性的定制模块

### 高可靠性

Nginx 采用的是多进程模式运行，其中有一个 master 主进程和 N 多个 worker 进程，一个 master 管理多个 worker，worker 进程的数量我们可以手动设置，每个 worker 进程之间都是相互独立提供服务，并且 master 主进程可以在某一个 worker 进程出错时，快速去「拉起」新的 worker 进程提供服务。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220727/image.3wz8th685620.webp)

### 热部署(核心)

现在互联网项目都要求以 7 * 24 小时进行服务的提供，针对于这一要求，Nginx 也提供了热部署功能，即可以在 Nginx 不停止的情况下，对 Nginx 进行文件升级、更新配置和更换日志文件等功能。

### 成本低、BSD许可证

BSD 是一个开源的许可证，世界上的开源许可证有很多，现在比较流行的有六种分别是 GPL、BSD、MIT、Mozilla、Apache、LGPL。这六种的区别是什么，我们可以通过下面一张图来解释下：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220727/image.771jinl18hw0.webp)

## Nginx的功能特性及常用功能

Nginx 提供的基本功能服务从大体上归纳为「基本 HTTP 服务」、「高级 HTTP 服务」和「邮件服务」等三大类。

### 基本HTTP服务

Nginx 可以提供基本 HTTP 服务，可以作为 HTTP 代理服务器和反向代理服务器，支持通过缓存加速访问，可以完成简单的负载均衡和容错，支持包过滤功能，支持 SSL 等。

- 处理静态文件、处理索引文件以及支持自动索引
- 提供反向代理服务器，并可以使用缓存加上反向代理，同时完成负载均衡和容错
- 提供对 FastCGI、memcached 等服务的缓存机制，，同时完成负载均衡和容错
- 使用 Nginx 的模块化特性提供过滤器功能。Nginx 基本过滤器包括 gzip 压缩、ranges 支持、chunked 响应、XSLT、SSI 以及图像缩放等。其中针对包含多个 SSI 的页面，经由 FastCGI 或反向代理，SSI 过滤器可以并行处理
- 支持 HTTP 下的安全套接层安全协议 SSL.
- 支持基于加权和依赖的优先权的 HTTP/2

### 高级HTTP服务

- 支持基于名字和 IP 的虚拟主机设置
- 支持 HTTP/1.0 中的 KEEP-Alive 模式和管线(PipeLined)模型连接
- 自定义访问日志格式、带缓存的日志写操作以及快速日志轮转
- 提供 3xx~5xx 错误代码重定向功能
- 支持重写（Rewrite)模块扩展
- 支持重新加载配置以及在线升级时无需中断正在处理的请求
- 支持网络监控
- 支持 FLV 和 MP4 流媒体传输

### 邮件服务

Nginx 提供邮件代理服务也是其基本开发需求之一，主要包含以下特性：

- 支持 IMPA/POP3 代理服务功能
- 支持内部 SMTP 代理服务功能

### Nginx常用的功能模块

- 静态资源部署：核心功能
- Rewrite 地址重写：用到正则表达式
- 反向代理
- 负载均衡：轮询、加权轮询、ip_hash、url_hash、fair 等算法
- Web 缓存
- 环境部署：搭建高可用的环境
- 用户认证模块 ...
- Nginx 的核心组成
  - nginx 二进制可执行文件（启动、关闭、加载 Nginx）
  - nginx.conf 配置文件
  - error.log 错误的日志记录
  - access.log 访问日志记录