---
title: ElasticSearch 安装
date: 2022-06-28 22:57:13
permalink: /middleware/ElasticSearch/ElasticSearch_install
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

下载地址：https://www.elastic.co/cn/downloads/past-releases#elasticsearch![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220628/image.27e4pq25bt34.webp)

Elasticsearch 分为 Linux 和 Windows 版本，基于我们主要学习的是 Elasticsearch 的 Java客户端的使用，所以课程中使用的是安装较为简便的 Windows 版本。

### 安装软件

Windows 版的 Elasticsearch 的安装很简单，解压即安装完毕，解压后的 Elasticsearch 的目录结构如下

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.6oxm14d4fkc0.webp)

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

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.20npni7unbi8.webp)

> 注意:**9300** 端口为 Elasticsearch 集群间组件的通信端口，**9200** 端口为浏览器访问的 http协议 RESTful 端口。

打开浏览器（推荐使用谷歌浏览器），输入地址：http://localhost:9200，测试结果

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting@master/20220629/image.3dkg1w533xq0.webp)

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

## Linux上安装ES

请先确保 Linux 里已经安装了 jdk 1.8 以上版本

前往官网下载 Linux 版本，[https://www.elastic.co/cn/downloads/elasticsearch)](https://www.elastic.co/cn/downloads/elasticsearch)

准备一台服务器或者有 Linux 系统的虚拟机

准备一台服务器或者有 Linux 系统的虚拟机

在 Linux 里，进入 `/usr/local/` 目录，创建一个目录 `elastic-stack`

```sh
cd /usr/local/
mkdir elastic-stack
```

将下载的 Linux 版本通过 `Xftp` 工具传输到 Linux 刚刚创建的目录下

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/image.76xlq94tidk0.webp)

在 Linux 里进入该目录，解压压缩包

```sh
cd elastic-stack
tar -zxvf elasticsearch-7.8.0-linux-x86_64.tar.gz
```

解压后在当前目录下，如果名字太长，可以去掉版本号，也可以移动到其他位置

```sh
mv elasticsearch-7.8.0 es
```

**增加 elasticSearch 用户**

必须创建一个非 root 用户来运行 ElasticSearch<Badge text="5"> 及以上版本，基于安全考虑，强制规定不能以 root 身份运行。

如果你使用 root 用户来启动 ElasticSearch，则会报错。

增加 elasticsearch 用户：

```sh
useradd es
passwd es
# 设置的密码
```

修改目录权限至新增的 elasticsearch 用户（没权限启动会报错）

在 root 用户下执行命令（ElasticSearch 安装目录）

```sh
# ElasticSearch 安装目录
chown -R es /usr/local/elastic-stack/es
```

然后修改上述的data和log路径，`vim /usr/local/elastic-stack/es/config/elasticsearch.yml`

```yaml
# ----------------------------------- Paths ------------------------------------
#
# Path to directory where to store the data (separate multiple locations by comma):
#
path.data: /data/es
#
# Path to log files:
#
path.logs: /var/log/es
```

**配置文件修改**

1. 修改系统中允许应用最多创建多少文件等的限制权限。Linux 默认来说，一般限制应用最多创建的文件是 65535 个。但是 ES 至少需要 65536 的文件创建权限。
2. 修改系统中允许用户启动的进程开启多少个线程。默认的 Linux 限制 root 用户开启的进程可以开启任意数量的线程，其他用户开启的进程可以开启 1024个线程。必须修改限制数为 4096+。因为ES至少需要 4096 的线程池预备。ES在 5.x 版本之后，强制要求在 Linux 中不能使用 root 用户启动 ES 进程。所以必须使用其他用户启动 ES 进程才可以。
3. Linux 低版本内核为线程分配的内存是 128K。4.x 版本的内核分配的内存更大。如果虚拟机的内存是 1G，最多只能开启 3000+ 个线程数。至少为虚拟机分配 1.5G 以上的内存。

ES 可以对每个进程的文件数进行限制等，如果服务器内存或空间不足，可以通过修改配置文件，进行「裁剪」

修改 /usr/local/elastic-stack/es/config/elasticsearch.yml 文件

```yaml
# 集群名
cluster.name: elasticsearch
# 节点名
node.name: node-1
# 允许外界访问的 ip
network.host: 0.0.0.0
# http 访问端口
http.port: 9200
# 集群节点的 master
cluster.initial_master_nodes: ["node-1"]
```

修改 /etc/security/limits.conf，在文件末尾中增加下面内容：

```sh
# 每个进程可以打开的文件数的限制
es soft nofile 65536
es hard nofile 65536
# 操作系统级别对每个用户创建的进程数的限制
* hard nproc 4096
# 注：* 带表 Linux 所有用户名称
```

修改 /etc/sysctl.conf，在文件末尾中增加下面内容：

```sh
# 一个进程可以拥有的 VMA (虚拟内存区域)的数量,默认值为 65536
vm.max_map_count=655360
```

配置文件后，记得重新加载

```sh
sysctl -p
```

切换创建好的用户进行启动

-d 代表后台启动

```sh
#	切换用户
su es
# 先进入安装目录
cd /usr/local/elastic-stack/es
./bin/elasticsearch -d
```

启动时，会动态生成文件，如果文件所属用户不匹配，会发生错误，需要重新进行修改用户

```sh
# ElasticSearch 安装目录
chown -R elasticsearch /usr/local/elastic-stack/es
```

### 测试

```sh
[es@master es]$ curl 127.0.0.1:9200
{
  "name" : "node-1",
  "cluster_name" : "elasticsearch",
  "cluster_uuid" : "ytGjTl0CSkeVGwIbplIKYQ",
  "version" : {
    "number" : "7.8.0",
    "build_flavor" : "default",
    "build_type" : "tar",
    "build_hash" : "757314695644ea9a1dc2fecd26d1a43856725e65",
    "build_date" : "2020-06-14T19:35:50.234439Z",
    "build_snapshot" : false,
    "lucene_version" : "8.5.1",
    "minimum_wire_compatibility_version" : "6.8.0",
    "minimum_index_compatibility_version" : "6.0.0-beta1"
  },
  "tagline" : "You Know, for Search"
}
```

## Windows上安装Kibana

Kibana 是一个免费且开放的用户界面，能够让你对 Elasticsearch 数据进行可视化，并 让你在 Elastic Stack 中进行导航。你可以进行各种操作，从跟踪查询负载，到理解请求如 何流经你的整个应用，都能轻松完成。

下载时尽量下载与 ElasicSearch 一致的版本。

### Windows版本

前往官网下载 Windows 版本：[https://www.elastic.co/cn/downloads/kibana]()

下载后进行解压，目录如图：

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220708/image.3t3mfecg2ao0.webp)

进入 bin 目录，双击 `kibana.bat` 启动服务

> 启动 Kibana 之前要启动 Elasticsearch

访问：http://localhost:5601/

kibana 会自动去访问 9200，也就是 elasticsearch 的端口号

**修改界面语言**

访问界面是英文，可修改成中文，进入根目录下的 config 目录，打开 `kibana.yml` 文件

滑到最底部，加入

```yaml
# 默认端口
server.port: 5601
# ES 服务器的地址
elasticsearch.hosts: ["http://localhost:9200"]
# 索引名
kibana.index: ".kibana"
# 支持中文
i18n.locale: "zh-CN"
```

进入根目录下的 bin 目录，执行 kibana.bat 文件即可启动

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220708/image.7duf733o8340.webp)

