---
title: ElasticSearch 安装
date: 2022-06-28 22:57:13
permalink: /pages/39931b/
categories:
  - ElasticSearch
tags:
  - ElasticSearch
---
# ElasticSearch 安装

[[toc]]

## Windows上安装ES

### 下载软件

Elasticsearch 的官方地址：https://www.elastic.co/cn/

Elasticsearch 最新的版本是 7.11.2（截止 2021.3.10），我们选择 7.8.0 版本（最新版本半年前的版本）

下载地址：https://www.elastic.co/cn/downloads/past-releases#elasticsearch![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220628/image.27e4pq25bt34.webp)

Elasticsearch 分为 Linux 和 Windows 版本，基于我们主要学习的是 Elasticsearch 的 Java客户端的使用，所以课程中使用的是安装较为简便的 Windows 版本。

### 安装软件

Windows 版的 Elasticsearch 的安装很简单，解压即安装完毕，解压后的 Elasticsearch 的目录结构如下

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220629/image.6oxm14d4fkc0.webp)

| 目录     | 含义           |
| -------- | -------------- |
| bin      | 可执行脚本目录 |
| config   | 配置目录       |
| jdk      | 内置JDK目录    |
| lib      | 类库           |
| logs     | 日志目录       |
| moudules | 模块目录       |
| plugins  | 插件目录       |

解压后，进入 bin 文件目录，点击 elasticsearch.bat 文件启动 ES 服务

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220629/image.20npni7unbi8.webp)

> 注意:**9300** 端口为 Elasticsearch 集群间组件的通信端口，**9200** 端口为浏览器访问的 http协议 RESTful 端口。

打开浏览器（推荐使用谷歌浏览器），输入地址：http://localhost:9200，测试结果

![image](https://cdn.jsdelivr.net/gh/xustudyxu/image-hosting@master/20220629/image.3dkg1w533xq0.webp)

### 问题解决

+ Elasticsearch 是使用 java 开发的，且 7.8 版本的 ES 需要 JDK 版本 1.8 以上，默认安装包带有 jdk 环境，如果系统配置 JAVA_HOME，那么使用系统默认的 JDK，如果没有配置使用自带的 JDK，一般建议使用系统配置的 JDK。
+ 双击启动窗口闪退，通过路径访问追踪错误，如果是“空间不足”，请修改config/jvm.options 配置文件

```properties
# 设置 JVM 初始内存为 1G。此值可以设置与-Xmx 相同，以避免每次垃圾回收完成后 JVM 重新分配内存
# Xms represents the initial size of total heap space
# 设置 JVM 最大可用内存为 1G
# Xmx represents the maximum size of total heap space
-Xms1g
-Xmx1g
```











##### 

