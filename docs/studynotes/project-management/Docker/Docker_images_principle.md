---
title: Docker 镜像原理
date: 2022-09-11 17:25:45
permalink: /project-management/Docker/Docker_images_principle
categories:
  - Docker
tags:
  - Docker
---
# Docker 镜像原理

[[toc]]

## 什么是镜像

镜像是一种轻量级、可执行的独立软件包，用来打包软件运行环境和基于运行环境开发的软件，它包含运行某个软件所需的所有内容，包括代码、运行时、库、环境变量和配置文件。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220911/image.2eyaa1qewe80.webp)

**镜像就是花卷，多个镜像组成一个完整的镜像**

+ UnionFS（联合文件系统）

Union 文件系统是一种分层，轻量级并且高性能的文件系统，它支持对文件系统的修改作为一次提交来一层层的叠加，同时可以将不同目录挂载到同一个虚拟文代系统下。镜像可以通过分层来进行继承，基于基础镜像（没有父镜像），可以制作各种具体的应用镜像。Union 文件系统是 Docker 镜像的基础。

这种文件系统特性就是一次同时加载多个文件系统，但从外面看起来，只能看到一个文件系统，联合加载会把各层文件系统叠加起来，这样最终的文件系统会包含所有底层的文件和目录。

## Docker 镜像原理 

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220911/image.44m96fv6jxo0.webp)

> **docker 的镜像实际上由一层一层的文件系统组成，这种层级的文件系统 UnionFS。**

- 典型的 Linux 文件系统由 **bootfs** 和 **rootfs** 两部分组成

- **bootfs（boot file system）**主要包含 **bootloader** 和 **kernel**，**bootloader** 主要是引导加载 **kernel**，**Linux** 刚启动时会加载 **bootfs** 文件系统，**在 Docker 镜像的最底层是 bootfs**。这一层与我们典型的 Linux/Unix 系统是一样的，包含 boot 加载器和内核。当 boot 加载完成之后整个内核就都在内存中了，此时内存的使用权已由 bootfs 转交给内核，此时系统也会卸载 bootfs。
- **rootfs (root file system)** ，在 bootfs 之上。包含的就是典型 Linux 系统中的 /dev，/proc，/bin，/etc 等标准目录和文件。rootfs 就是各种不同的操作系统发行版，比如 Ubuntu，Centos 等等
- 我们平时安装进虚拟机的 CentOS 都有 1 到几个 GB，为什么 Docker 这里才 200MB？对于一个精简的 OS，rootfs 可以很小，只需要包括最基本的命令，工具，和程序库就可以了，因为底层直接使用 Host 的 Kemal,自己只需要提供 rootfs 就行了。由此可见不同的 Linux 发行版，他们的 bootfs 是一致的，rootfs 会有差别。**因此不同的发行版可以共用 bootfs**

```sh {3}
[root@frx01 ~]# docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
centos              latest              5d0da3dc9764        12 months ago       231MB
tomcat              8.5.27              a92c139758db        4 years ago         558MB
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220911/image.n12zxx92lls.webp)

### 为什么Docker镜像要采用这种分层结构呢

**最大的好处就是资源共享。**

比如：有多个镜像都是从相同的 base 镜像构建而来的，那么宿主机只需在磁盘中保存一份 base 镜像。同时内存中也只需要加载一份 base 镜像，就可以为所有容器服务了。而且镜像的每一层都可以被共享。Docker 镜像都是只读的。当容器启动时，一个新的可写层被加载到镜像的顶部。这一层通常被称为容器层，容器层之下都叫镜像层。

> **如何查看镜像分层？**

使用 `docker inspect` 命令，查看容器细节

```sh
[root@frx01 ~]# docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
ubuntu              latest              ba6acccedd29        11 months ago       72.8MB
centos              latest              5d0da3dc9764        12 months ago       231MB
tomcat              8.5.27              a92c139758db        4 years ago         558MB
[root@frx01 ~]# docker inspect tomcat:8.5.27
```

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220911/image.6rx8e7zvbnc0.webp)

所有的 Docker 镜像都起始于一个基础镜像层，当进行修改或增加新的内容时，就会在当前镜像层之上，创建新的镜像层。

举一个简单的例子，假如基于 Ubuntu Linux 16.04 创建一个新的镜像，这就是新镜像的第一层；如果在该镜像中添加 Python 包，就会在基础镜像层之上创建第二个镜像层；如果继续添加一个安全补丁，就会创建第三个镜像层。

该镜像当前已经包含 3 个镜像层，如下图所示（这只是一个用于演示的很简单的例子）。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220911/image.4xklf0i3iy80.webp)

在添加额外的镜像层的同时，镜像始终保持是当前所有镜像的组合，理解这一点非常重要。下图中举了一个简单的例子，每个镜像层包含 3 个文件，而镜像包含了来自两个镜像层的 6 个文件。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220911/image.7hlezkqhyrs0.webp)

这种情况下，上层镜像层中的文件覆盖了底层镜像层中的文件。这样就使得文件的更新版本作为一个新镜像层添加到镜像当中。

Docker 通过存储引擎（新版本采用快照机制）的方式来实现镜像层堆栈，并保证多镜像层对外展示为统一的文件系统。

Linux 上可用的存储引擎有 AUFS、Overlay2、Device Mapper、Btrfs 以及 ZFS。顾名思义，每种存储引擎都基于 Linux 中对应的文件系统或者块设备技术，并且每种存储引擎都有其独有的性能特点。

Docker 在 Windows 上仅支持 windowsfilter 一种存储引擎，该引擎基于 NTFS 文件系统之上实现了分层和 COW。

下图展示了与系统显示相同的三层镜像。所有镜像层堆叠并合并，对外提供统一的视图。

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220911/image.2rka9swxxwg.webp)

## 核心架构图

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220911/image.22vkerqfoi0w.webp)

## Docker镜像commit操作案例

+ docker commit提交容器副本使之成为一个新的镜像
+ <mark>docker commit  -m="提交的描述信息"  -a="作者" 容器ID 要创建的目标镜像名:[标签名]</mark>

+ 案例演示ubuntu安装vim
  + 从Hub上下载ubuntu镜像到本地并成功运行
  + 原始的默认Ubuntu镜像是不带着vim命令的

```sh
[root@frx01 ~]# docker run -it ubuntu /bin/bash
root@e4a6abf80ca5:/# ls
bin  boot  dev  etc  home  lib  lib32  lib64  libx32  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
root@e4a6abf80ca5:/# vim a.txt
bash: vim: command not found
```

+ 外网连通的情况下，安装vim，docker容器内执行以下两条命令：

```sh
#先更新我们的包管理工具
apt-get update
#然后安装我们需要的vim
apt-get install vim
```

+ 安装完成后，commit我们自己的新镜像

```sh {4}
[root@frx01 ~]# docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
e4a6abf80ca5        ubuntu              "/bin/bash"         21 minutes ago      Up 21 minutes                           nostalgic_mclaren
[root@frx01 ~]# docker commit -m="add vim cmd" -a="frx" e4a6abf80ca5 frx01/myubuntu:1.3
sha256:64df8ffb7faf445aa2c8e0e69e67819c4abe549dae7f6ddea943b1a62588b190
```

+ 启动我们的新镜像并和原来的对比

```sh
[root@frx01 ~]# docker images
REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
frx01/myubuntu      1.3                 64df8ffb7faf        40 seconds ago      179MB
ubuntu              latest              ba6acccedd29        11 months ago       72.8MB
centos              latest              5d0da3dc9764        12 months ago       231MB
tomcat              8.5.27              a92c139758db        4 years ago         558MB
```

1. 官网是默认下载的Ubuntu没有vim命令
2. 我们自己commit构建的镜像，新增加了vim功能，可以成功使用。

::: tip 小总结

Docker中的镜像分层，**支持通过扩展现有镜像，创建新的镜像**。类似Java继承于一个Base基础类，自己再按需扩展。

新镜像是从 base 镜像一层一层叠加生成的。每安装一个软件，就在现有镜像的基础上增加一层。

:::

![image](https://cdn.staticaly.com/gh/xustudyxu/image-hosting1@master/20220911/image.55hqvoufnsw0.webp)

